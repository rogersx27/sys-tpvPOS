import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { Cart } from './Cart';
import { CheckoutModal } from '../../components/checkout/CheckoutModal';
import { useProductSearch } from '../../hooks/useProductSearch';
import { useToast } from '../../context/ToastContext';
import { useStockManagement } from '../../hooks/useStockManagement';
import { useInvoice } from '../../hooks/useInvoice';
import { InvoiceTemplate } from '../../components/invoice/InvoiceTemplate';
import { calculateOrderTotals } from '../../utils/calculations';
import type { Product, CartItem } from '../../types';
import type { OrderDetails } from '../../types/checkout';

// Mock data - replace with actual data fetching
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Café Americano',
    description: 'Café negro tradicional',
    price: 2.50,
    stock: 100,
    category: 'Beverages',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Croissant',
    description: 'Croissant de mantequilla',
    price: 1.95,
    stock: 15,
    category: 'Food',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const SalesTerminal = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { showToast } = useToast();
  const { updateProductsStock } = useStockManagement();
  const { printInvoice } = useInvoice();
  
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredProducts
  } = useProductSearch(mockProducts);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems(items => {
      const existingItem = items.find(item => item.id === product.id);
      if (existingItem) {
        showToast(`Cantidad de "${product.name}" actualizada`, 'info');
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showToast(`"${product.name}" añadido al carrito`, 'info');
      return [...items, { ...product, quantity: 1 }];
    });
  }, [showToast]);

  const handleCheckoutComplete = useCallback((order: OrderDetails) => {
    updateProductsStock(cartItems);
    setCartItems([]);
    setIsCheckoutOpen(false);
    showToast(`Venta completada. Total: €${order.total.toFixed(2)}`, 'success');
    
    // Print invoice
    printInvoice(order);
  }, [showToast, cartItems, updateProductsStock, printInvoice]);

  const totals = calculateOrderTotals(cartItems);

  return (
    <>
      <div className="h-[calc(100vh-4rem)] grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => handleAddToCart(product)}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-left"
              >
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">€{product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-2">Stock: {product.stock}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="h-full">
          <Cart
            items={cartItems}
            onUpdateQuantity={(id, quantity) => {
              setCartItems(items =>
                items.map(item =>
                  item.id === id
                    ? { ...item, quantity }
                    : item
                )
              );
            }}
            onRemove={(id) => {
              const item = cartItems.find(item => item.id === id);
              if (item) {
                showToast(`"${item.name}" eliminado del carrito`, 'info');
              }
              setCartItems(items => items.filter(item => item.id !== id));
            }}
            onCheckout={() => setIsCheckoutOpen(true)}
          />
        </div>

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          items={cartItems}
          total={totals.total}
          onComplete={handleCheckoutComplete}
        />
      </div>

      {/* Hidden invoice template for printing */}
      <div id="invoice-content" className="hidden">
        {isCheckoutOpen && (
          <InvoiceTemplate order={{
            id: crypto.randomUUID(),
            items: cartItems,
            payment: { method: 'cash' },
            subtotal: totals.subtotal,
            tax: totals.tax,
            total: totals.total,
            date: new Date(),
            status: 'completed'
          }} />
        )}
      </div>
    </>
  );
};
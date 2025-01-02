import { useCallback } from 'react';
import { useProducts } from '../context/ProductContext';
import { useToast } from '../context/ToastContext';
import { calculateNewStock, isLowStock } from '../utils/stock';
import type { CartItem } from '../types';

export const useStockManagement = () => {
  const { updateProduct } = useProducts();
  const { showToast } = useToast();

  const updateProductsStock = useCallback((items: CartItem[]) => {
    items.forEach(item => {
      const newStock = calculateNewStock(item, item.quantity);
      
      updateProduct(item.id, { stock: newStock });

      if (isLowStock(newStock)) {
        showToast(
          `Stock bajo para "${item.name}": ${newStock} unidades restantes`,
          'info'
        );
      }
    });
  }, [updateProduct, showToast]);

  return { updateProductsStock };
};
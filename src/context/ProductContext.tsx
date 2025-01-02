import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Product, ProductUpdate } from '../types';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: ProductUpdate) => void;
  deleteProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = useCallback((product: Product) => {
    setProducts(current => [...current, product]);
  }, []);

  const updateProduct = useCallback((id: string, updates: ProductUpdate) => {
    setProducts(current =>
      current.map(product =>
        product.id === id
          ? { ...product, ...updates, updatedAt: new Date() }
          : product
      )
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(current => current.filter(product => product.id !== id));
  }, []);

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
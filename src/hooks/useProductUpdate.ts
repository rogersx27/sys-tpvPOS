import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import type { Product, ProductUpdate } from '../types';
import { validateProductUpdate } from '../utils/product-validation';

export const useProductUpdate = (
  initialProduct: Product,
  onSuccess: (updated: Product) => void
) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { updateProduct } = useProducts();

  const handleUpdate = async (updates: ProductUpdate) => {
    setIsUpdating(true);
    setErrors([]);

    try {
      const validationErrors = validateProductUpdate(updates);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      const updatedProduct: Product = {
        ...initialProduct,
        ...updates,
        updatedAt: new Date()
      };

      // Optimistically update UI
      updateProduct(initialProduct.id, updates);

      try {
        // TODO: Send to API/database
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
        
        onSuccess(updatedProduct);
      } catch (error) {
        // Rollback on error
        updateProduct(initialProduct.id, initialProduct);
        throw error;
      }
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Error al actualizar el producto']);
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateProduct: handleUpdate,
    isUpdating,
    errors
  };
};
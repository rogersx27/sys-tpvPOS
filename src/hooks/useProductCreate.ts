import { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import type { Product, ProductUpdate } from '../types';
import { validateProductUpdate } from '../utils/product-validation';

export const useProductCreate = (onSuccess: (product: Product) => void) => {
  const [isCreating, setIsCreating] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { addProduct } = useProducts();

  const createProduct = async (data: ProductUpdate) => {
    setIsCreating(true);
    setErrors([]);

    try {
      const validationErrors = validateProductUpdate(data);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        return;
      }

      const newProduct: Product = {
        id: crypto.randomUUID(),
        name: data.name!,
        description: data.description!,
        price: data.price!,
        stock: data.stock!,
        category: data.category!,
        barcode: data.barcode,
        imageUrl: data.imageUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Optimistically update UI
      addProduct(newProduct);

      try {
        // TODO: Send to API/database
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
        
        onSuccess(newProduct);
      } catch (error) {
        // Rollback on error
        // TODO: Implement rollback logic
        throw error;
      }
    } catch (error) {
      setErrors([error instanceof Error ? error.message : 'Error al crear el producto']);
    } finally {
      setIsCreating(false);
    }
  };

  return {
    createProduct,
    isCreating,
    errors
  };
};
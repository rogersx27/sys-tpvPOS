import type { Product, CartItem } from '../types';
import { LOW_STOCK_THRESHOLD } from '../config/constants';

export const calculateNewStock = (product: Product, quantity: number): number => {
  return Math.max(0, product.stock - quantity);
};

export const isLowStock = (stock: number): boolean => {
  return stock <= LOW_STOCK_THRESHOLD;
};

export const validateStockAvailability = (
  product: Product,
  requestedQuantity: number
): boolean => {
  return product.stock >= requestedQuantity;
};
import type { Product } from './index';

export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  barcode?: string;
  imageUrl?: string;
}

export interface ProductValidationError {
  field: keyof Product;
  message: string;
}
import type { Product, ProductUpdate } from '../types';
import { CATEGORIES } from '../config/constants';

export const validateProductUpdate = (update: ProductUpdate): string[] => {
  const errors: string[] = [];

  if (update.name !== undefined && update.name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }

  if (update.price !== undefined && update.price <= 0) {
    errors.push('El precio debe ser mayor que 0');
  }

  if (update.stock !== undefined && update.stock < 0) {
    errors.push('El stock no puede ser negativo');
  }

  if (update.category && !CATEGORIES.includes(update.category as any)) {
    errors.push('Categoría no válida');
  }

  if (update.imageUrl && !isValidUrl(update.imageUrl)) {
    errors.push('URL de imagen no válida');
  }

  return errors;
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
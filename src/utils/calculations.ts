import type { CartItem } from '../types';
import { TAX_RATE } from '../config/constants';

export const calculateOrderTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return {
    subtotal,
    tax,
    total
  };
};
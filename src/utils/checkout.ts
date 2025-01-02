import { TAX_RATE } from '../config/constants';
import type { CartItem } from '../types';
import type { CheckoutSummary } from '../types/checkout';

export const calculateCheckoutSummary = (items: CartItem[]): CheckoutSummary => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return {
    subtotal,
    tax,
    total,
    items
  };
};
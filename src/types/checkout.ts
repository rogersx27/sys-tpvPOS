import type { CartItem, PaymentMethod } from './index';

export interface PaymentDetails {
  method: PaymentMethod;
  cashAmount?: number;
  cardLast4?: string;
  splitPayments?: {
    cash?: number;
    card?: number;
    cardLast4?: string;
  };
}

export interface OrderTotals {
  subtotal: number;
  tax: number;
  total: number;
  tip?: number;
}

export interface OrderDetails extends OrderTotals {
  id: string;
  items: CartItem[];
  payment: PaymentDetails;
  date: Date;
  status: 'completed' | 'cancelled' | 'refunded';
}
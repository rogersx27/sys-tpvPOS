export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  barcode?: string;
  category: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  tax: number;
  paymentMethod: PaymentMethod;
  date: Date;
  cashierId: string;
}

export type PaymentMethod = 'cash' | 'card' | 'mixed';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'cashier';
}
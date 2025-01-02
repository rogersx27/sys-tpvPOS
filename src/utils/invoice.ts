import type { OrderDetails } from '../types/checkout';

export const formatCurrency = (amount: number): string => {
  return `€${amount.toFixed(2)}`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const generateInvoiceNumber = (orderId: string): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const sequence = orderId.slice(0, 4);
  
  return `INV-${year}${month}-${sequence}`;
};
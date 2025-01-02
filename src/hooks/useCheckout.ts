import { useState } from 'react';
import type { CartItem } from '../types';
import type { PaymentDetails, OrderDetails } from '../types/checkout';
import { calculateCheckoutSummary } from '../utils/checkout';

export const useCheckout = (items: CartItem[], onComplete: (order: OrderDetails) => void) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (payment: PaymentDetails) => {
    setIsProcessing(true);
    setError(null);

    try {
      const summary = calculateCheckoutSummary(items);
      
      // Validate payment amount for cash payments
      if (payment.method === 'cash' && payment.cashAmount! < summary.total) {
        throw new Error('Cantidad insuficiente');
      }

      // Create order
      const order: OrderDetails = {
        id: crypto.randomUUID(),
        items: [...items],
        payment,
        subtotal: summary.subtotal,
        tax: summary.tax,
        total: summary.total,
        date: new Date(),
        status: 'completed'
      };

      // TODO: Save order to database
      
      onComplete(order);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el pago');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processPayment,
    isProcessing,
    error
  };
};
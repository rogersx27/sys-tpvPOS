import React from 'react';
import type { CartItem } from '../../types';
import { formatCurrency } from '../../utils/currency';

interface OrderSummaryProps {
  items: CartItem[];
  totals: {
    subtotal: number;
    tax: number;
    tip?: number;
    total: number;
  };
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ items, totals }) => {
  return (
    <div className="space-y-4">
      <div className="max-h-48 overflow-y-auto">
        {items.map(item => (
          <div key={item.id} className="flex justify-between py-2">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.quantity} x {formatCurrency(item.price)}</p>
            </div>
            <p className="font-medium">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>{formatCurrency(totals.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>IVA (21%)</span>
          <span>{formatCurrency(totals.tax)}</span>
        </div>
        {totals.tip !== undefined && totals.tip > 0 && (
          <div className="flex justify-between text-sm">
            <span>Propina</span>
            <span>{formatCurrency(totals.tip)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold pt-2 border-t">
          <span>Total</span>
          <span>{formatCurrency(totals.total)}</span>
        </div>
      </div>
    </div>
  );
};
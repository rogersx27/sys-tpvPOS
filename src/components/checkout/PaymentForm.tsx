import React, { useState } from 'react';
import type { PaymentMethod } from '../../types';
import type { PaymentDetails } from '../../types/checkout';

interface PaymentFormProps {
  total: number;
  onSubmit: (payment: PaymentDetails) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ total, onSubmit }) => {
  const [method, setMethod] = useState<PaymentMethod>('cash');
  const [cashAmount, setCashAmount] = useState<string>('');
  const [cardLast4, setCardLast4] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const payment: PaymentDetails = {
      method,
      ...(method === 'cash' && { cashAmount: parseFloat(cashAmount) }),
      ...(method === 'card' && { cardLast4 })
    };

    onSubmit(payment);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Método de Pago
        </label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as PaymentMethod)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="cash">Efectivo</option>
          <option value="card">Tarjeta</option>
        </select>
      </div>

      {method === 'cash' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Cantidad Recibida
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">€</span>
            </div>
            <input
              type="number"
              min={total}
              step="0.01"
              value={cashAmount}
              onChange={(e) => setCashAmount(e.target.value)}
              className="pl-7 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          {parseFloat(cashAmount) >= total && (
            <p className="mt-2 text-sm text-gray-600">
              Cambio: €{(parseFloat(cashAmount) - total).toFixed(2)}
            </p>
          )}
        </div>
      )}

      {method === 'card' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Últimos 4 dígitos
          </label>
          <input
            type="text"
            pattern="[0-9]{4}"
            maxLength={4}
            value={cardLast4}
            onChange={(e) => setCardLast4(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Completar Pago
      </button>
    </form>
  );
};
import React from 'react';
import { Banknote, CreditCard, Split } from 'lucide-react';
import type { PaymentMethod } from '../../types';

interface PaymentMethodSelectProps {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

export const PaymentMethodSelect: React.FC<PaymentMethodSelectProps> = ({
  value,
  onChange
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <button
        type="button"
        onClick={() => onChange('cash')}
        className={`
          flex flex-col items-center p-4 rounded-lg border-2 transition-colors
          ${value === 'cash'
            ? 'border-blue-500 bg-blue-50 text-blue-700'
            : 'border-gray-200 hover:border-blue-200'}
        `}
      >
        <Banknote className="h-6 w-6 mb-2" />
        <span className="text-sm font-medium">Efectivo</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('card')}
        className={`
          flex flex-col items-center p-4 rounded-lg border-2 transition-colors
          ${value === 'card'
            ? 'border-blue-500 bg-blue-50 text-blue-700'
            : 'border-gray-200 hover:border-blue-200'}
        `}
      >
        <CreditCard className="h-6 w-6 mb-2" />
        <span className="text-sm font-medium">Tarjeta</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('mixed')}
        className={`
          flex flex-col items-center p-4 rounded-lg border-2 transition-colors
          ${value === 'mixed'
            ? 'border-blue-500 bg-blue-50 text-blue-700'
            : 'border-gray-200 hover:border-blue-200'}
        `}
      >
        <Split className="h-6 w-6 mb-2" />
        <span className="text-sm font-medium">Mixto</span>
      </button>
    </div>
  );
};
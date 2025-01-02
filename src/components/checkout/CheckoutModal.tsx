import React, { useState, useEffect } from 'react';
import { X, Printer, Mail, CheckCircle } from 'lucide-react';
import { PaymentMethodSelect } from './PaymentMethodSelect';
import { TipSelector } from './TipSelector';
import { OrderSummary } from './OrderSummary';
import { calculateOrderTotals } from '../../utils/calculations';
import type { CartItem, PaymentMethod } from '../../types';
import type { OrderDetails, PaymentDetails } from '../../types/checkout';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onComplete: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  total,
  onComplete
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [cashAmount, setCashAmount] = useState<string>('');
  const [cardLast4, setCardLast4] = useState<string>('');
  const [splitCash, setSplitCash] = useState<string>('');
  const [splitCard, setSplitCard] = useState<string>('');
  const [splitCardLast4, setSplitCardLast4] = useState<string>('');
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setPaymentMethod('cash');
      setCashAmount('');
      setCardLast4('');
      setSplitCash('');
      setSplitCard('');
      setSplitCardLast4('');
      setTipAmount(0);
      setShowSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totals = calculateOrderTotals(items);
  const finalTotal = totals.total + tipAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const payment: PaymentDetails = {
        method: paymentMethod,
        ...(paymentMethod === 'cash' && { cashAmount: parseFloat(cashAmount) }),
        ...(paymentMethod === 'card' && { cardLast4 }),
        ...(paymentMethod === 'mixed' && {
          splitPayments: {
            cash: parseFloat(splitCash),
            card: parseFloat(splitCard),
            cardLast4: splitCardLast4
          }
        })
      };

      const order: OrderDetails = {
        id: crypto.randomUUID(),
        items: [...items],
        payment,
        subtotal: totals.subtotal,
        tax: totals.tax,
        tip: tipAmount,
        total: finalTotal,
        date: new Date(),
        status: 'completed'
      };

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setShowSuccess(true);
      
      // Auto close after showing success
      setTimeout(() => {
        onComplete(order);
      }, 1500);
    } finally {
      setIsProcessing(false);
    }
  };

  const getChange = (): number | null => {
    if (paymentMethod === 'cash' && cashAmount) {
      return Math.max(0, parseFloat(cashAmount) - finalTotal);
    }
    if (paymentMethod === 'mixed' && splitCash) {
      return Math.max(0, parseFloat(splitCash) - parseFloat(splitCash));
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Finalizar Compra
              </h3>

              {showSuccess ? (
                <div className="mt-4 flex flex-col items-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                  <p className="text-lg font-medium text-gray-900">
                    ¡Pago completado!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                  <OrderSummary
                    items={items}
                    totals={{ ...totals, tip: tipAmount, total: finalTotal }}
                  />

                  <TipSelector
                    total={totals.total}
                    onSelect={setTipAmount}
                    selectedAmount={tipAmount}
                  />

                  <PaymentMethodSelect
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                  />

                  {paymentMethod === 'cash' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cantidad Recibida
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">€</span>
                        </div>
                        <input
                          type="number"
                          min={finalTotal}
                          step="0.01"
                          value={cashAmount}
                          onChange={(e) => setCashAmount(e.target.value)}
                          className="pl-7 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                      {getChange() !== null && (
                        <p className="mt-2 text-sm text-gray-600">
                          Cambio: €{getChange()?.toFixed(2)}
                        </p>
                      )}
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
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

                  {paymentMethod === 'mixed' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Cantidad en Efectivo
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">€</span>
                          </div>
                          <input
                            type="number"
                            min="0"
                            max={finalTotal}
                            step="0.01"
                            value={splitCash}
                            onChange={(e) => {
                              setSplitCash(e.target.value);
                              setSplitCard((finalTotal - parseFloat(e.target.value || '0')).toFixed(2));
                            }}
                            className="pl-7 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Cantidad con Tarjeta
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">€</span>
                          </div>
                          <input
                            type="number"
                            value={splitCard}
                            className="pl-7 block w-full rounded-md border-gray-300 bg-gray-50"
                            disabled
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Últimos 4 dígitos (Tarjeta)
                        </label>
                        <input
                          type="text"
                          pattern="[0-9]{4}"
                          maxLength={4}
                          value={splitCardLast4}
                          onChange={(e) => setSplitCardLast4(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between gap-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Procesando...
                        </span>
                      ) : (
                        'Completar Pago'
                      )}
                    </button>
                  </div>

                  <div className="flex justify-center gap-4 pt-4 border-t">
                    <button
                      type="button"
                      className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                      <Printer className="h-4 w-4" />
                      Imprimir
                    </button>
                    <button
                      type="button"
                      className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                    >
                      <Mail className="h-4 w-4" />
                      Enviar por Email
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
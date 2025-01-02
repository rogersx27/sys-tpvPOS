import React from 'react';
import { formatCurrency } from '../../utils/currency';
import { formatDate, generateInvoiceNumber } from '../../utils/invoice';
import type { OrderDetails } from '../../types/checkout';

interface InvoiceTemplateProps {
  order: OrderDetails;
}

export const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ order }) => {
  const invoiceNumber = generateInvoiceNumber(order.id);

  return (
    <div className="bg-white p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">FACTURA</h1>
          <p className="text-gray-600">#{invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">TPV System</p>
          <p className="text-gray-600">Fecha: {formatDate(order.date)}</p>
        </div>
      </div>

      <div className="mt-8">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Producto</th>
              <th className="text-right py-2">Cantidad</th>
              <th className="text-right py-2">Precio</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map(item => (
              <tr key={item.id} className="border-b">
                <td className="py-2">{item.name}</td>
                <td className="text-right py-2">{item.quantity}</td>
                <td className="text-right py-2">{formatCurrency(item.price)}</td>
                <td className="text-right py-2">
                  {formatCurrency(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(order.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>IVA (21%)</span>
          <span>{formatCurrency(order.tax)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2 border-t">
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-600">
        <p>Método de pago: {order.payment.method}</p>
        {order.payment.method === 'card' && (
          <p>Tarjeta terminada en: {order.payment.cardLast4}</p>
        )}
        {order.payment.method === 'cash' && order.payment.cashAmount && (
          <p>Efectivo recibido: {formatCurrency(order.payment.cashAmount)}</p>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-gray-600">
        <p>Gracias por su compra</p>
      </div>
    </div>
  );
};
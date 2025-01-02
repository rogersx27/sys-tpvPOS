import React from 'react';
import type { ReceiptSettings } from '../../../types/settings';
import { formatCurrency } from '../../../utils/currency';
import { formatDate } from '../../../utils/invoice';

interface ReceiptPreviewProps {
  settings: ReceiptSettings;
}

export const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ settings }) => {
  const sampleOrder = {
    id: 'PREVIEW-001',
    date: new Date(),
    items: [
      { name: 'Producto Ejemplo 1', quantity: 2, price: 10.50 },
      { name: 'Producto Ejemplo 2', quantity: 1, price: 15.75 }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-4">Vista Previa</h3>
        {settings.showLogo && settings.logoUrl && (
          <img
            src={settings.logoUrl}
            alt="Logo"
            className="h-16 mx-auto mb-4"
          />
        )}
        <h2 className="text-xl font-bold">{settings.businessName}</h2>
        {settings.address && <p className="text-sm text-gray-600">{settings.address}</p>}
        {settings.phone && <p className="text-sm text-gray-600">Tel: {settings.phone}</p>}
        {settings.taxId && <p className="text-sm text-gray-600">NIF: {settings.taxId}</p>}
      </div>

      <div className="border-t border-b py-2 my-4">
        <p className="text-sm">Fecha: {formatDate(sampleOrder.date)}</p>
        <p className="text-sm">Factura #: {sampleOrder.id}</p>
      </div>

      <table className="w-full text-sm mb-4">
        <thead>
          <tr className="border-b">
            <th className="text-left py-1">Producto</th>
            <th className="text-right py-1">Cant.</th>
            <th className="text-right py-1">Precio</th>
            <th className="text-right py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          {sampleOrder.items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-1">{item.name}</td>
              <td className="text-right py-1">{item.quantity}</td>
              <td className="text-right py-1">{formatCurrency(item.price)}</td>
              <td className="text-right py-1">
                {formatCurrency(item.quantity * item.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mb-4">
        <p className="text-sm">Subtotal: {formatCurrency(36.75)}</p>
        <p className="text-sm">IVA (21%): {formatCurrency(7.72)}</p>
        <p className="font-bold">Total: {formatCurrency(44.47)}</p>
      </div>

      <div className="text-center text-sm text-gray-600 mt-4">
        <p>{settings.footer}</p>
      </div>
    </div>
  );
};
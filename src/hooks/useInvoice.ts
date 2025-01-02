import { useCallback } from 'react';
import type { OrderDetails } from '../types/checkout';

export const useInvoice = () => {
  const printInvoice = useCallback((order: OrderDetails) => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Add necessary styles
    printWindow.document.write(`
      <html>
        <head>
          <title>Factura #${order.id}</title>
          <style>
            @media print {
              body { font-family: system-ui, -apple-system, sans-serif; }
              @page { margin: 2cm; }
            }
          </style>
        </head>
        <body>
    `);

    // Get the invoice content
    const invoiceElement = document.getElementById('invoice-content');
    if (invoiceElement) {
      printWindow.document.write(invoiceElement.innerHTML);
    }

    printWindow.document.write('</body></html>');
    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    };
  }, []);

  return { printInvoice };
};
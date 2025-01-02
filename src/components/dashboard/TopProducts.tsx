import React from 'react';
import type { TopProduct } from '../../types/dashboard';

interface TopProductsProps {
  products: TopProduct[];
}

export const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Productos Más Vendidos
      </h3>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {product.name}
              </p>
              <p className="text-sm text-gray-500">
                {product.quantity} unidades
              </p>
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              €{product.revenue.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
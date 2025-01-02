import React from 'react';
import { Package, Tag, Archive, Calendar } from 'lucide-react';
import type { Product } from '../../types';

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Información Básica</h2>
          <dl className="mt-4 space-y-4">
            <div className="flex items-center">
              <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 w-24">
                <Package className="h-4 w-4 mr-2" />
                Nombre
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white">{product.name}</dd>
            </div>
            <div className="flex items-center">
              <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 w-24">
                <Tag className="h-4 w-4 mr-2" />
                Precio
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white">€{product.price.toFixed(2)}</dd>
            </div>
            <div className="flex items-center">
              <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 w-24">
                <Archive className="h-4 w-4 mr-2" />
                Stock
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white">{product.stock} unidades</dd>
            </div>
          </dl>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Detalles</h2>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Descripción</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">{product.description}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Categoría</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white">{product.category}</dd>
            </div>
            {product.barcode && (
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Código de Barras</dt>
                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{product.barcode}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      <div className="space-y-6">
        {product.imageUrl && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Imagen</h2>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}

        <div>
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Información Adicional</h2>
          <dl className="mt-4 space-y-4">
            <div className="flex items-center">
              <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 w-24">
                <Calendar className="h-4 w-4 mr-2" />
                Creado
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white">
                {product.createdAt.toLocaleDateString()}
              </dd>
            </div>
            <div className="flex items-center">
              <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 w-24">
                <Calendar className="h-4 w-4 mr-2" />
                Actualizado
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white">
                {product.updatedAt.toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
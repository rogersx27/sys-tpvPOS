import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Edit, ArrowLeft } from 'lucide-react';
import { ProductInfo } from './ProductInfo';
import type { Product } from '../../types';

// Mock data - replace with actual data fetching
const mockProduct: Product = {
  id: '1',
  name: 'Café Americano',
  description: 'Café negro tradicional',
  price: 2.50,
  stock: 100,
  category: 'Beverages',
  barcode: '123456789',
  imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000',
  createdAt: new Date(),
  updatedAt: new Date()
};

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  // TODO: Fetch product data based on id

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link
          to="/productos"
          className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver al Catálogo
        </Link>
        <Link
          to={`/productos/${id}/editar`}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Edit className="h-5 w-5" />
          Editar Producto
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <ProductInfo product={mockProduct} />
      </div>
    </div>
  );
};
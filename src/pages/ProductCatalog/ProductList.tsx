import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { CATEGORIES } from '../../config/constants';
import type { Product } from '../../types';

interface ProductListProps {
  products: Product[];
  searchQuery: string;
  selectedCategory: string;
  onSearch: (query: string) => void;
  onFilter: (category: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  searchQuery,
  selectedCategory,
  onSearch,
  onFilter
}) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => onFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todas las categorías</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
              </div>
              <span className="text-lg font-bold">€{product.price.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className={`px-2 py-1 rounded-full text-sm ${
                product.stock > 5 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                Stock: {product.stock}
              </span>
              <Link
                to={`/productos/${product.id}`}
                className="text-blue-600 hover:text-blue-800"
              >
                Ver detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
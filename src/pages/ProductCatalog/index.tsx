import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductList } from './ProductList';
import { useProductSearch } from '../../hooks/useProductSearch';
import { useProducts } from '../../context/ProductContext';

export const ProductCatalog = () => {
  const { products } = useProducts();
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredProducts
  } = useProductSearch(products);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Catálogo de Productos
        </h1>
        <Link
          to="/productos/nuevo"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Producto</span>
        </Link>
      </div>

      <ProductList
        products={filteredProducts}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSearch={setSearchQuery}
        onFilter={setSelectedCategory}
      />
    </div>
  );
};
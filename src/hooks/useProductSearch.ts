import { useState, useMemo } from 'react';
import { Product } from '../types';
import { searchProducts } from '../utils/search';

export const useProductSearch = (products: Product[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredProducts = useMemo(() => {
    return searchProducts(products, searchQuery, selectedCategory || undefined);
  }, [products, searchQuery, selectedCategory]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
  };
};
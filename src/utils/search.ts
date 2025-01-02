import { Product } from '../types';

export const searchProducts = (
  products: Product[],
  query: string,
  category?: string
): Product[] => {
  const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
  
  return products.filter(product => {
    // Apply category filter if specified
    if (category && product.category !== category) {
      return false;
    }

    // If no search query, return all products (with category filter applied)
    if (searchTerms.length === 0) {
      return true;
    }

    // Search in multiple fields
    const searchableText = [
      product.name,
      product.description,
      product.barcode,
      product.category
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    // All search terms must match
    return searchTerms.every(term => searchableText.includes(term));
  });
};
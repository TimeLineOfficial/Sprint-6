import { useMemo } from 'react';
import { generateProducts } from '../data/productsGenerator';
import { useFilterContext } from '../context/FilterContext';

export const useProductFetcher = () => {
  const {
    searchQuery,
    selectedCategory,
    priceRange,
    sortBy,
    onlyInStock
  } = useFilterContext();

  const allProducts = useMemo(() => {
    return generateProducts(5000);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'ALL') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase() || p.categoryId === selectedCategory);
    }

    // Price range filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Only in stock
    if (onlyInStock) {
      result = result.filter(p => p.inStock);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || a.numId - b.numId);
        break;
    }

    return result;
  }, [allProducts, searchQuery, selectedCategory, priceRange, sortBy, onlyInStock]);

  const featuredProducts = useMemo(() => {
    return allProducts.filter(p => p.isFeatured).slice(0, 8);
  }, [allProducts]);

  const getProductById = (id) => {
    return allProducts.find(p => p.id === id) || null;
  };

  return {
    allProducts,
    filteredProducts,
    featuredProducts,
    getProductById,
    totalCount: allProducts.length,
    filteredCount: filteredProducts.length
  };
};

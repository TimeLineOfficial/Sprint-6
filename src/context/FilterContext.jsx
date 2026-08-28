import React, { createContext, useContext, useState, useMemo } from 'react';

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating', 'name'
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list'

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setPriceRange([0, 5000]);
    setSortBy('featured');
    setOnlyInStock(false);
  };

  const value = useMemo(() => ({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    onlyInStock,
    setOnlyInStock,
    viewMode,
    setViewMode,
    resetFilters
  }), [searchQuery, selectedCategory, priceRange, sortBy, onlyInStock, viewMode]);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilterContext must be used within FilterProvider");
  return ctx;
};

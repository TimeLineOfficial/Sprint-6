import React from 'react';
import { useFilterContext } from '../context/FilterContext';
import { CATEGORIES } from '../data/productsGenerator';
import { Filter, RotateCcw, Search, Tag, DollarSign, CheckSquare, Square, Star } from 'lucide-react';

export const FilterSidebar = () => {
  const {
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
    resetFilters
  } = useFilterContext();

  return (
    <aside className="w-full lg:w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm space-y-6 flex-shrink-0 text-xs">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
        <div className="flex items-center space-x-1.5 font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Filters</span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Search Products</label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 5,000 items..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* Category List */}
      <div>
        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-2">Category</label>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
              selectedCategory === 'ALL'
                ? 'bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
            }`}
          >
            <span>All Categories</span>
            <span className="text-[10px]">5,000</span>
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase() || selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px]">833</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
          <span>Max Price</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">${priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="29"
          max="2000"
          step="50"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-blue-600 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>$29</span>
          <span>$2,000+</span>
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-900 dark:text-white"
        >
          <option value="featured">Popularity / Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Customer Rating (High to Low)</option>
          <option value="name">Product Name (A-Z)</option>
        </select>
      </div>

      {/* In Stock Only */}
      <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setOnlyInStock(!onlyInStock)}
          className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 cursor-pointer w-full"
        >
          {onlyInStock ? (
            <CheckSquare className="w-4 h-4 text-blue-600" />
          ) : (
            <Square className="w-4 h-4 text-slate-400" />
          )}
          <span>In Stock Only</span>
        </button>
      </div>
    </aside>
  );
};

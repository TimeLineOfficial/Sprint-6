import React from 'react';
import { useFilterContext } from '../context/FilterContext';
import { CATEGORIES } from '../data/productsGenerator';
import { Filter, RotateCcw, Search, Tag, DollarSign, CheckSquare, Square } from 'lucide-react';

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
    <aside className="w-full lg:w-72 bg-cyber-card/90 border border-slate-800 rounded-2xl p-5 glass-card space-y-6 flex-shrink-0">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono font-bold text-sm tracking-wider">
          <Filter className="w-4 h-4" />
          <span>VAULT FILTERS</span>
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center space-x-1 text-xs text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-xs font-mono text-slate-400 mb-2">Search Catalog</label>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 5,000 items..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* Category List */}
      <div>
        <label className="block text-xs font-mono text-slate-400 mb-3.5 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-cyan-400" /> Categories
          </span>
          {selectedCategory !== 'ALL' && (
            <span className="text-[10px] text-cyan-400 uppercase font-mono">Filtered</span>
          )}
        </label>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center justify-between ${
              selectedCategory === 'ALL'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <span>All Technologies</span>
            <span className="text-[10px] font-mono opacity-70">5,000</span>
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase() || selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center justify-between ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[10px] font-mono opacity-60">833</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span className="flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-cyan-400" /> Max Price
          </span>
          <span className="text-cyan-300 font-bold">${priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="49"
          max="5000"
          step="50"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
          <span>$49</span>
          <span>$5,000+</span>
        </div>
      </div>

      {/* Sorting Dropdown */}
      <div>
        <label className="block text-xs font-mono text-slate-400 mb-2">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
        >
          <option value="featured">Featured Quantum Specs</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated & Verified</option>
          <option value="name">Alphabetical (A-Z)</option>
        </select>
      </div>

      {/* In Stock Toggle */}
      <div className="pt-2 border-t border-slate-800">
        <button
          onClick={() => setOnlyInStock(!onlyInStock)}
          className="flex items-center space-x-2 text-xs text-slate-300 hover:text-white cursor-pointer w-full"
        >
          {onlyInStock ? (
            <CheckSquare className="w-4 h-4 text-cyan-400" />
          ) : (
            <Square className="w-4 h-4 text-slate-600" />
          )}
          <span>In Stock Only</span>
        </button>
      </div>
    </aside>
  );
};

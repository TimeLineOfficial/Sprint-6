import React, { useState } from 'react';
import { useProductFetcher } from '../hooks/useProductFetcher';
import { useFilterContext } from '../context/FilterContext';
import { FilterSidebar } from '../components/FilterSidebar';
import { VirtualProductGrid } from '../components/VirtualProductGrid';
import { ProductCard } from '../components/ProductCard';
import { LayoutGrid, SlidersHorizontal, RefreshCw, Cpu, Layers } from 'lucide-react';

export const Catalog = () => {
  const { filteredProducts, filteredCount, totalCount } = useProductFetcher();
  const { resetFilters } = useFilterContext();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [useVirtualization, setUseVirtualization] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            5,000 Product E-Commerce Catalog
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Showing <strong className="text-blue-600 dark:text-blue-400">{filteredCount.toLocaleString()}</strong> of {totalCount.toLocaleString()} products available.
          </p>
        </div>

        {/* View Controls & Virtualization Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setUseVirtualization(!useVirtualization)}
            className={`px-3 py-2 rounded-lg text-xs font-mono font-bold border transition-all flex items-center space-x-1.5 ${
              useVirtualization
                ? 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-slate-700 dark:text-blue-300'
                : 'bg-slate-100 text-slate-600 border-slate-300'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>{useVirtualization ? 'Virtual Scroll: ON' : 'Virtual Scroll: OFF'}</span>
          </button>

          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 flex items-center space-x-1 text-xs font-semibold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>

        {/* Mobile Filter Modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto lg:hidden">
            <div className="max-w-md mx-auto relative">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="absolute top-3 right-3 text-slate-400 hover:text-white"
              >
                ✕
              </button>
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Product Grid View */}
        <main className="flex-1 min-w-0">
          {filteredCount === 0 ? (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto text-slate-400">
                <RefreshCw className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No Products Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try widening your price filter or clearing your active search query.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : useVirtualization ? (
            <VirtualProductGrid products={filteredProducts} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.slice(0, 100).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

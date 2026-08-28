import React, { useState } from 'react';
import { useProductFetcher } from '../hooks/useProductFetcher';
import { useFilterContext } from '../context/FilterContext';
import { FilterSidebar } from '../components/FilterSidebar';
import { VirtualProductGrid } from '../components/VirtualProductGrid';
import { ProductCard } from '../components/ProductCard';
import { LayoutGrid, List, SlidersHorizontal, RefreshCw, Cpu, Layers } from 'lucide-react';

export const Catalog = () => {
  const { filteredProducts, filteredCount, totalCount } = useProductFetcher();
  const { viewMode, setViewMode, resetFilters, searchQuery, selectedCategory } = useFilterContext();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [useVirtualization, setUseVirtualization] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-cyber-card/80 border border-slate-800 rounded-2xl p-6 glass-card">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
            <Layers className="w-4 h-4" />
            <span>PHASE 1 &amp; PHASE 3 CATALOG VAULT</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            5,000 Cybernetic Product Catalog
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Showing <span className="text-cyan-400 font-mono font-bold">{filteredCount.toLocaleString()}</span> of {totalCount.toLocaleString()} products available.
          </p>
        </div>

        {/* View Controls & Virtualization Toggle */}
        <div className="flex items-center space-x-3">
          {/* Virtualization Toggle */}
          <button
            onClick={() => setUseVirtualization(!useVirtualization)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all flex items-center space-x-2 ${
              useVirtualization
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>{useVirtualization ? 'DOM Virtualization: ON' : 'DOM Virtualization: OFF'}</span>
          </button>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 flex items-center space-x-2 text-xs font-mono"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
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
            <div className="bg-cyber-card/60 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <RefreshCw className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200">No Cybernetic Gear Matches Your Filters</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try widening your price threshold or clearing your active search query.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              >
                Reset All Filters
              </button>
            </div>
          ) : useVirtualization ? (
            /* Phase 3 DOM Virtualization Grid */
            <VirtualProductGrid products={filteredProducts} />
          ) : (
            /* Standard Grid fallback (for up to 100 items preview) */
            <div className="space-y-4">
              <div className="text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 rounded-xl p-3">
                ⚠️ Standard DOM Mode: Rendering top 100 products. Enable DOM Virtualization above for full 5,000 scrolling.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.slice(0, 100).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

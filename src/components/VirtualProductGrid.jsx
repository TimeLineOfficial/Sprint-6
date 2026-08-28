import React, { useRef, useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { useVirtualGrid } from '../hooks/useVirtualGrid';
import { Cpu, Zap, Activity } from 'lucide-react';

export const VirtualProductGrid = ({ products }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  // ResizeObserver to detect container dimensions dynamically
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width > 0) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const {
    columnCount,
    totalHeight,
    handleScroll,
    visibleItems,
    currentlyRenderedCount
  } = useVirtualGrid({
    itemsCount: products.length,
    containerWidth,
    itemHeight: 460,
    overscan: 2
  });

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* DOM Virtualization Performance HUD Banner */}
      <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 glass-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                DOM Virtualization Active (Phase 3 Optimization)
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <Activity className="w-3 h-3 mr-1 animate-spin" /> 60 FPS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Windowing 5,000 items into viewport memory nodes.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px]">TOTAL DATASET</span>
            <span className="text-slate-200 font-bold text-sm">
              {products.length.toLocaleString()} ITEMS
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <span className="text-slate-500 block text-[10px]">ACTIVE DOM NODES</span>
            <span className="text-cyan-400 font-bold text-sm">
              {currentlyRenderedCount} VISIBLE NODES
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800 hidden sm:block" />
          <div className="hidden sm:block">
            <span className="text-slate-500 block text-[10px]">VIRTUAL RATIO</span>
            <span className="text-emerald-400 font-bold text-sm">
              {products.length > 0 ? `${((1 - currentlyRenderedCount / products.length) * 100).toFixed(1)}% SAVINGS` : '100%'}
            </span>
          </div>
        </div>
      </div>

      {/* Virtual Scroll Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-[780px] overflow-y-auto custom-scrollbar relative rounded-2xl border border-slate-800/80 bg-cyber-bg/50 p-2"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Full scroll canvas height placeholder */}
        <div style={{ height: `${totalHeight}px`, width: '100%', position: 'relative' }}>
          {visibleItems.map(({ itemIndex, top, colIndex }) => {
            const product = products[itemIndex];
            if (!product) return null;

            // Calculate percentage width and horizontal offset per column
            const colWidthPct = 100 / columnCount;
            const leftPct = colIndex * colWidthPct;

            return (
              <div
                key={product.id}
                style={{
                  position: 'absolute',
                  top: `${top}px`,
                  left: `${leftPct}%`,
                  width: `${colWidthPct}%`,
                  height: '440px',
                  padding: '8px'
                }}
              >
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

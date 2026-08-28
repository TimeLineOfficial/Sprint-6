import React, { useRef, useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { useVirtualGrid } from '../hooks/useVirtualGrid';
import { Cpu, Activity, Zap } from 'lucide-react';

export const VirtualProductGrid = ({ products }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(1200);

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
    itemHeight: 450,
    overscan: 2
  });

  return (
    <div className="w-full flex flex-col space-y-4">
      {/* HUD Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm border border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono font-bold text-blue-400 uppercase">
              <span>Phase 3 DOM Virtualization Active</span>
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px]">60 FPS</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Windowing 5,000 products into memory viewport nodes.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px]">TOTAL PRODUCTS</span>
            <span className="text-white font-bold">{products.length.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">ACTIVE DOM NODES</span>
            <span className="text-blue-400 font-bold">{currentlyRenderedCount} VISIBLE</span>
          </div>
        </div>
      </div>

      {/* Virtual Scroll Window Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-[760px] overflow-y-auto custom-scrollbar relative rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 p-2"
      >
        <div style={{ height: `${totalHeight}px`, width: '100%', position: 'relative' }}>
          {visibleItems.map(({ itemIndex, top, colIndex }) => {
            const product = products[itemIndex];
            if (!product) return null;

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
                  height: '430px',
                  padding: '6px'
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

import { useState, useEffect, useMemo, useCallback } from 'react';

export const useVirtualGrid = ({
  itemsCount,
  containerWidth,
  itemHeight = 440,
  overscan = 2
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  // Dynamic column calculation based on screen width
  const columnCount = useMemo(() => {
    if (containerWidth < 640) return 1;
    if (containerWidth < 1024) return 2;
    if (containerWidth < 1280) return 3;
    return 4;
  }, [containerWidth]);

  // Calculate total rows required for 5,000 items
  const rowCount = useMemo(() => {
    return Math.ceil(itemsCount / columnCount);
  }, [itemsCount, columnCount]);

  const totalHeight = rowCount * itemHeight;

  // Handle scroll events
  const handleScroll = useCallback((e) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Calculate visible row indices
  const { startRow, endRow, visibleRowsCount } = useMemo(() => {
    const viewportHeight = window.innerHeight || 800;
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const end = Math.min(
      rowCount - 1,
      Math.ceil((scrollTop + viewportHeight) / itemHeight) + overscan
    );

    return {
      startRow: start,
      endRow: end,
      visibleRowsCount: Math.max(0, end - start + 1)
    };
  }, [scrollTop, itemHeight, rowCount, overscan]);

  // Map rows to visible items
  const visibleItems = useMemo(() => {
    const items = [];
    for (let rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
      for (let colIndex = 0; colIndex < columnCount; colIndex++) {
        const itemIndex = rowIndex * columnCount + colIndex;
        if (itemIndex < itemsCount) {
          items.push({
            itemIndex,
            rowIndex,
            colIndex,
            top: rowIndex * itemHeight
          });
        }
      }
    }
    return items;
  }, [startRow, endRow, columnCount, itemHeight, itemsCount]);

  return {
    columnCount,
    rowCount,
    totalHeight,
    scrollTop,
    handleScroll,
    startRow,
    endRow,
    visibleItems,
    currentlyRenderedCount: visibleItems.length
  };
};

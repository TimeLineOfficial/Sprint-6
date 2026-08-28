import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToastContext } from './ToastContext';

const WishlistContext = createContext(null);
const WISHLIST_STORAGE_KEY = 'NEXUS_WISHLIST_STORAGE_V1';

export const WishlistProvider = ({ children }) => {
  const { addToast } = useToastContext();
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (e) {
      console.error("Wishlist storage failed", e);
    }
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    if (!product) return;

    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        addToast(`Removed ${product.name} from Wishlist`, "info");
        return prev.filter((item) => item.id !== product.id);
      } else {
        addToast(`Saved ${product.name} to Wishlist`, "success");
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlistItems.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlistContext must be used within WishlistProvider");
  return ctx;
};

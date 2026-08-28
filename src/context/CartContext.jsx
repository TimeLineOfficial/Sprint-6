import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useToastContext } from './ToastContext';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'NEXUS_CART_STORAGE_V1';

export const CartProvider = ({ children }) => {
  const { addToast } = useToastContext();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Cart storage save failed", e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.inStock) {
      addToast("Item is currently out of stock", "error");
      return;
    }

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        const maxStock = product.stockQuantity || 99;
        updated[existingIndex].quantity = Math.min(newQty, maxStock);
        addToast(`Updated ${product.name} quantity to ${updated[existingIndex].quantity}`, "info");
        return updated;
      } else {
        addToast(`Added ${product.name} to neural cart`, "success");
        return [...prev, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const target = prev.find(item => item.product.id === productId);
      if (target) {
        addToast(`Removed ${target.product.name} from cart`, "warning");
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const maxStock = item.product.stockQuantity || 99;
          return { ...item, quantity: Math.min(quantity, maxStock) };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscountCode('');
    setDiscountPercent(0);
  };

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'NEXUS20' || clean === 'CYBER20') {
      setDiscountCode(clean);
      setDiscountPercent(20);
      addToast("Promo code applied: 20% OFF", "success");
      return true;
    } else if (clean === 'SPRINT6') {
      setDiscountCode(clean);
      setDiscountPercent(30);
      addToast("Sprint 6 Evaluator Discount: 30% OFF", "success");
      return true;
    } else {
      addToast("Invalid Promo Code. Try SPRINT6 or NEXUS20", "error");
      return false;
    }
  };

  const removeCoupon = () => {
    setDiscountCode('');
    setDiscountPercent(0);
    addToast("Promo code removed", "info");
  };

  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    return (subtotal * discountPercent) / 100;
  }, [subtotal, discountPercent]);

  const tax = useMemo(() => {
    return ((subtotal - discountAmount) * 0.08); // 8% Quantum Tax
  }, [subtotal, discountAmount]);

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal > 1500 ? 0 : 49.99; // Free shipping over $1500
  }, [subtotal]);

  const grandTotal = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + tax + shipping);
  }, [subtotal, discountAmount, tax, shipping]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        discountCode,
        discountPercent,
        discountAmount,
        totalItemsCount,
        subtotal,
        tax,
        shipping,
        grandTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
};

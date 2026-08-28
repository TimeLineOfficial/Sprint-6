import { useCartContext } from '../context/CartContext';

export const useCartOperations = () => {
  const {
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
  } = useCartContext();

  const isCartEmpty = cartItems.length === 0;

  const getItemQuantity = (productId) => {
    const item = cartItems.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const formattedSubtotal = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formattedTax = `$${tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formattedShipping = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  const formattedDiscount = `$${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formattedGrandTotal = `$${grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    discountCode,
    discountPercent,
    isCartEmpty,
    getItemQuantity,
    totalItemsCount,
    subtotal,
    tax,
    shipping,
    grandTotal,
    formattedSubtotal,
    formattedTax,
    formattedShipping,
    formattedDiscount,
    formattedGrandTotal
  };
};

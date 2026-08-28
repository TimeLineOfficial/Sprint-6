import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartOperations } from '../hooks/useCartOperations';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

export const Cart = () => {
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    discountCode,
    discountPercent,
    isCartEmpty,
    formattedSubtotal,
    formattedTax,
    formattedShipping,
    formattedDiscount,
    formattedGrandTotal
  } = useCartOperations();

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  if (isCartEmpty) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Your Shopping Cart is Empty</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Explore our 5,000 product marketplace catalog to add electronics, appliances, and fashion items.
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore 5K Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Shopping Cart ({cartItems.length} Unique Products)
          </h1>
          <p className="text-xs text-slate-500">React Context API Global Store Connected</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-semibold"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-contain rounded-lg bg-slate-50 dark:bg-slate-900 p-2 flex-shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                    {product.brand} • {product.category}
                  </span>
                  <Link
                    to={`/product/${product.id}`}
                    className="block font-semibold text-sm text-slate-900 dark:text-white hover:text-blue-600 line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  <div className="text-xs text-slate-500">
                    ${product.price.toFixed(2)} each
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-700">
                <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 p-1">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 font-bold text-slate-900 dark:text-white text-xs">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    ${(product.price * quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
            <h2 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 pb-3">
              Price Details
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleCouponSubmit} className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Apply Promo Code (Try SPRINT6)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="SPRINT6"
                  className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-700"
                >
                  Apply
                </button>
              </div>
              {discountCode && (
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Code {discountCode} ({discountPercent}% OFF)</span>
                  <button onClick={removeCoupon} className="text-slate-400 hover:text-rose-600">Remove</button>
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs border-t border-slate-200 dark:border-slate-700 pt-3">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Price ({cartItems.length} items)</span>
                <span className="text-slate-900 dark:text-white font-semibold">{formattedSubtotal}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-{formattedDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Estimated Tax (8%)</span>
                <span className="text-slate-900 dark:text-white font-semibold">{formattedTax}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Delivery Charges</span>
                <span className="text-emerald-600 font-bold">{formattedShipping}</span>
              </div>
              <div className="flex justify-between text-slate-900 dark:text-white font-extrabold text-sm pt-3 border-t border-slate-200 dark:border-slate-700">
                <span>Total Payable</span>
                <span className="text-blue-600 dark:text-blue-400">{formattedGrandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase flex items-center justify-center space-x-2 shadow-sm transition-all"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

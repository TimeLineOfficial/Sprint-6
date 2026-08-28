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
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-white">Your Neural Cart is Empty</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Explore our 5,000 product cybernetic catalog to select components.
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
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
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
            // PHASE 2 GLOBAL REACT CONTEXT STORE
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Shopping Cart ({cartItems.length} Unique Lines)
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All Cart Items</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="p-5 rounded-2xl bg-cyber-card/80 border border-slate-800 glass-card flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-xl bg-slate-950 flex-shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">
                    {product.category} • {product.id}
                  </span>
                  <Link
                    to={`/product/${product.id}`}
                    className="block font-semibold text-sm text-white hover:text-cyan-300 line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  <div className="font-mono text-xs text-slate-400">
                    ${product.price.toFixed(2)} each
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Subtotal */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                <div className="flex items-center border border-slate-700 rounded-xl bg-slate-900 p-1">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 font-mono font-bold text-slate-100 text-xs">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right font-mono">
                  <div className="text-sm font-bold text-cyan-400">
                    ${(product.price * quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-cyber-card border border-slate-800 glass-card space-y-6">
            <h2 className="font-mono font-bold text-sm text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleCouponSubmit} className="space-y-2">
              <label className="block text-xs font-mono text-slate-400">Promo Code (Try SPRINT6)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="SPRINT6"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-mono font-bold"
                >
                  Apply
                </button>
              </div>
              {discountCode && (
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400 pt-1">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> {discountCode} ({discountPercent}% OFF)</span>
                  <button onClick={removeCoupon} className="text-slate-500 hover:text-rose-400">Remove</button>
                </div>
              )}
            </form>

            {/* Price Calculations Breakdown */}
            <div className="space-y-3 font-mono text-xs border-t border-slate-800 pt-4">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200">{formattedSubtotal}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-{formattedDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Quantum Tax (8%)</span>
                <span className="text-slate-200">{formattedTax}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Express Shipping</span>
                <span className="text-slate-200">{formattedShipping}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-sm pt-3 border-t border-slate-800">
                <span>Grand Total</span>
                <span className="text-cyan-400">{formattedGrandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-xs flex items-center justify-center space-x-2 hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
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

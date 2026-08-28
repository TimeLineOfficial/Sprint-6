import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartOperations } from '../hooks/useCartOperations';
import { X, ShoppingBag, Trash2, ArrowRight, Plus, Minus, Tag } from 'lucide-react';

export const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    totalItemsCount,
    formattedSubtotal,
    formattedGrandTotal,
    isCartEmpty
  } = useCartOperations();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cyber-bg border-l border-cyan-500/20 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-cyber-card/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-mono font-bold text-slate-100 text-sm tracking-wider uppercase">
                  Neural Cart ({totalItemsCount})
                </h2>
                <span className="text-[11px] text-slate-400">Global State Connected</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
            {isCartEmpty ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200 text-base">Your Cart is Empty</h3>
                  <p className="text-xs text-slate-400 max-w-xs mt-1">
                    Explore the 5,000+ Quantum Catalog to add cybernetic enhancements.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/catalog');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3.5 rounded-xl bg-cyber-card/80 border border-slate-800/80 hover:border-slate-700 transition-all"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-slate-950 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        onClick={onClose}
                        className="font-medium text-xs text-slate-200 hover:text-cyan-300 truncate"
                      >
                        {product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-700/80 rounded-lg bg-slate-900">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-slate-200">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-mono text-xs font-bold text-cyan-400">
                        ${(product.price * quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {!isCartEmpty && (
            <div className="p-5 border-t border-slate-800 bg-cyber-card/70 space-y-4">
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-slate-200">{formattedSubtotal}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Est. Quantum Tax (8%) & Shipping</span>
                  <span className="text-slate-200">Calculated at Checkout</span>
                </div>
                <div className="flex justify-between text-slate-100 font-bold text-sm pt-2 border-t border-slate-800">
                  <span>Estimated Total</span>
                  <span className="text-cyan-400">{formattedGrandTotal}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="py-3 px-4 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 hover:text-white font-semibold text-xs text-center hover:bg-slate-800 transition-all"
                >
                  View Cart
                </Link>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="py-3 px-4 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, CheckCircle2, ShieldCheck, Truck, Sparkles, Wrench, Clock } from 'lucide-react';
import { useCartOperations } from '../hooks/useCartOperations';
import { useWishlistContext } from '../context/WishlistContext';

export const ProductCard = ({ product }) => {
  const { addToCart, getItemQuantity } = useCartOperations();
  const { toggleWishlist, isInWishlist } = useWishlistContext();

  const isLiked = isInWishlist(product.id);
  const qtyInCart = getItemQuantity(product.id);

  return (
    <div className="group relative flex flex-col h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      {/* Badge Overlay */}
      <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
        {product.isService ? (
          <span className="px-2 py-0.5 text-[9px] font-extrabold tracking-wide rounded bg-emerald-600 text-white uppercase shadow-sm flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> Urban Service
          </span>
        ) : (
          product.discountPct > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide rounded bg-rose-600 text-white uppercase shadow-sm">
              {product.discountPct}% OFF
            </span>
          )
        )}
        {!product.isService && product.isAssured && (
          <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-blue-600 text-white uppercase tracking-wider flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-2.5 h-2.5" /> Assured
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full border shadow-sm transition-all ${
          isLiked
            ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-900/40 dark:border-rose-800'
            : 'bg-white/90 border-slate-200 text-slate-400 hover:text-rose-500 dark:bg-slate-800/90 dark:border-slate-700'
        }`}
        aria-label="Wishlist"
      >
        <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600' : ''}`} />
      </button>

      {/* Image Thumbnail */}
      <Link to={`/product/${product.id}`} className="relative block aspect-square bg-slate-50 dark:bg-slate-900 overflow-hidden p-3">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Body Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
          {product.isService ? <Wrench className="w-3 h-3 text-emerald-500" /> : null}
          <span>{product.brand}</span>
        </div>

        <Link to={`/product/${product.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm line-clamp-2 mb-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-1.5 mb-3">
          <span className="inline-flex items-center space-x-1 px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold">
            <span>{product.rating}</span>
            <Star className="w-2.5 h-2.5 fill-white" />
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Service / Delivery pill */}
        {product.isService ? (
          <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mb-3">
            <Clock className="w-3 h-3" /> Tech Slot: 45 Mins • 30d Warranty
          </div>
        ) : (
          product.freeDelivery && (
            <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mb-3">
              <Truck className="w-3 h-3" /> Free Express Delivery
            </div>
          )
        )}

        {/* Footer Price & Action */}
        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-base font-extrabold text-slate-900 dark:text-white">
                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ${product.originalPrice}
              </span>
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className={`px-3 py-2 rounded-lg font-semibold text-xs transition-all flex items-center space-x-1.5 ${
              !product.inStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800'
                : qtyInCart > 0
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300'
                : product.isService
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{qtyInCart > 0 ? `(${qtyInCart})` : (product.isService ? 'Book' : 'Add')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

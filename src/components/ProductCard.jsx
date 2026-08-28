import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Zap, ShieldCheck } from 'lucide-react';
import { useCartOperations } from '../hooks/useCartOperations';
import { useWishlistContext } from '../context/WishlistContext';

export const ProductCard = ({ product }) => {
  const { addToCart, getItemQuantity } = useCartOperations();
  const { toggleWishlist, isInWishlist } = useWishlistContext();

  const isLiked = isInWishlist(product.id);
  const qtyInCart = getItemQuantity(product.id);

  return (
    <div className="group relative flex flex-col h-full bg-cyber-card/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)]">
      {/* Badge Overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.badge && (
          <span className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase backdrop-blur-md">
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <span className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 uppercase backdrop-blur-md">
            Out of Stock
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
        className={`absolute top-3 right-3 z-10 p-2.5 rounded-xl border backdrop-blur-md transition-all duration-200 ${
          isLiked
            ? 'bg-rose-500/20 border-rose-500 text-rose-400'
            : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-500'
        }`}
        aria-label="Wishlist"
      >
        <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
      </button>

      {/* Image Thumbnail */}
      <Link to={`/product/${product.id}`} className="relative block aspect-[4/3] bg-slate-950 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-transparent to-transparent opacity-80" />
      </Link>

      {/* Body Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-mono text-cyan-400/90 tracking-wider uppercase">
            {product.category}
          </span>
          <div className="flex items-center space-x-1 text-amber-400 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-500 font-normal">({product.reviewCount})</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`} className="group-hover:text-cyan-300 transition-colors">
          <h3 className="font-semibold text-slate-100 text-base line-clamp-1 mb-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-slate-400 line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        {/* Specs Pill Summary */}
        <div className="flex items-center gap-2 mb-4 text-[10px] font-mono text-slate-400">
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 flex items-center gap-1">
            <Zap className="w-3 h-3 text-cyan-400" />
            {product.specs?.latency || '< 1ms'}
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            {product.specs?.warranty || '2Y Care'}
          </span>
        </div>

        {/* Footer Price & Action */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
          <div>
            <div className="text-xs text-slate-500 line-through">
              ${product.originalPrice}
            </div>
            <div className="text-lg font-mono font-bold text-white tracking-tight">
              ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 ${
              !product.inStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : qtyInCart > 0
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30'
                : 'bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{qtyInCart > 0 ? `In Cart (${qtyInCart})` : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

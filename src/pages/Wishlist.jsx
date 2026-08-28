import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlistContext } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowLeft, Layers } from 'lucide-react';

export const Wishlist = () => {
  const { wishlistItems, wishlistCount } = useWishlistContext();

  if (wishlistCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-white">Your Saved Wishlist is Empty</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Save your favorite quantum cybernetic enhancements while exploring the 5,000 product catalog.
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse 5K Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
            // SAVED HARDWARE VAULT
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Saved Wishlist ({wishlistCount} Items)
          </h1>
        </div>
        <Link
          to="/catalog"
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
        >
          <Layers className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

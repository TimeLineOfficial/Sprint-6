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
        <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mx-auto text-slate-400">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Your Wishlist is Empty</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Save items you love to your wishlist while exploring our 5,000 product catalog.
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse 5K Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Wishlist ({wishlistCount} Saved Items)
          </h1>
        </div>
        <Link
          to="/catalog"
          className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-1"
        >
          <Layers className="w-4 h-4" />
          <span>Explore Catalog</span>
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

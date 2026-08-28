import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Layers } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 text-blue-600 flex items-center justify-center mx-auto">
        <ShoppingBag className="w-12 h-12" />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-bold text-rose-600 tracking-widest uppercase">404 PAGE NOT FOUND</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Page Does Not Exist
        </h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          The requested URL path does not exist in our GlobalMart marketplace.
        </p>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <Link
          to="/"
          className="px-6 py-3.5 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center space-x-2 hover:bg-blue-700 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN HOME</span>
        </Link>
        <Link
          to="/catalog"
          className="px-6 py-3.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs flex items-center space-x-2"
        >
          <Layers className="w-4 h-4" />
          <span>5K PRODUCT CATALOG</span>
        </Link>
      </div>
    </div>
  );
};

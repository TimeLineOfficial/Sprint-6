import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductFetcher } from '../hooks/useProductFetcher';
import { useCartOperations } from '../hooks/useCartOperations';
import { useWishlistContext } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Check, 
  Radio, 
  Share2,
  Truck,
  RotateCcw
} from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, featuredProducts } = useProductFetcher();
  const { addToCart, getItemQuantity } = useCartOperations();
  const { toggleWishlist, isInWishlist } = useWishlistContext();

  const [quantity, setQuantity] = useState(1);
  const [selectedSpecTab, setSelectedSpecTab] = useState('specs'); // 'specs', 'reviews', 'shipping'

  const product = getProductById(id);
  const isLiked = product ? isInWishlist(product.id) : false;
  const qtyInCart = product ? getItemQuantity(product.id) : 0;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-rose-500">
          <Cpu className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-white">Cybernetic Product Not Found</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          The requested product ID [{id}] does not exist in the 5,000 Nexus Synthesis vault catalog.
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
        <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-cyan-400 transition-colors">Catalog</Link>
        <span>/</span>
        <span className="text-cyan-400 font-semibold truncate">{product.name}</span>
      </div>

      {/* Main Product Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Product Media Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 glass-card">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-mono font-bold tracking-wider rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase backdrop-blur-md">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Product Information & Purchasing */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                {product.category} • ID: {product.id}
              </span>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-xl border backdrop-blur-md transition-all ${
                  isLiked
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              {product.name}
            </h1>

            {/* Ratings & Stock Badge */}
            <div className="flex items-center space-x-4 text-xs font-mono">
              <div className="flex items-center space-x-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-500 font-normal">({product.reviewCount} customer reviews)</span>
              </div>
              <span className="text-slate-600">•</span>
              <span className={product.inStock ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {product.inStock ? `IN STOCK (${product.stockQuantity} UNITS)` : 'OUT OF STOCK'}
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-cyber-card/90 border border-slate-800 glass-card space-y-2">
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-mono font-extrabold text-white">
                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-sm font-mono text-slate-500 line-through">
                ${product.originalPrice}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                SAVE 20%
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Includes Quantum Warranty &amp; Global Express Transit.
            </p>
          </div>

          {/* Product Description */}
          <p className="text-sm text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Specs Highlights */}
          <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] block">ARCHITECTURE</span>
              <span className="text-slate-200 font-bold">{product.specs?.architecture}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px] block">LATENCY</span>
              <span className="text-cyan-400 font-bold">{product.specs?.latency}</span>
            </div>
          </div>

          {/* Quantity Selector & Add To Cart Button */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-slate-700 rounded-xl bg-slate-900 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-mono font-bold text-slate-100 text-sm">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockQuantity || 99, quantity + 1))}
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                disabled={!product.inStock}
                className={`flex-1 py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                  !product.inStock
                    ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{qtyInCart > 0 ? `Add More (${quantity}) — In Cart: ${qtyInCart}` : `Add ${quantity} To Cart`}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Featured Products */}
      <div className="space-y-6 pt-12 border-t border-slate-800">
        <h3 className="text-2xl font-bold text-white">Related Cybernetic Enhancements</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

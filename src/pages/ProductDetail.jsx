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
  Truck, 
  ArrowLeft, 
  Plus, 
  Minus, 
  CheckCircle2, 
  Tag, 
  MapPin, 
  RotateCcw,
  Zap
} from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, featuredProducts } = useProductFetcher();
  const { addToCart, getItemQuantity } = useCartOperations();
  const { toggleWishlist, isInWishlist } = useWishlistContext();

  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);

  const product = getProductById(id);
  const isLiked = product ? isInWishlist(product.id) : false;
  const qtyInCart = product ? getItemQuantity(product.id) : 0;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Product Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          The requested product ID [{id}] does not exist in our catalog.
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-blue-600">Catalog</Link>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-semibold truncate">{product.name}</span>
      </div>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Product Media Gallery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            {product.discountPct > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded bg-rose-600 text-white uppercase">
                {product.discountPct}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full border shadow-sm transition-all ${
                isLiked
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Product Details & Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
              {product.brand} • {product.category}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              {product.name}
            </h1>

            {/* Rating & Assured Badge */}
            <div className="flex items-center space-x-3 text-xs">
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-600 text-white font-bold">
                <span>{product.rating}</span>
                <Star className="w-3 h-3 fill-white" />
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {product.reviewCount.toLocaleString()} Customer Ratings
              </span>
              {product.isAssured && (
                <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Assured
                </span>
              )}
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 space-y-2">
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-sm text-slate-400 line-through">
                ${product.originalPrice}
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                Save ${Math.round(product.originalPrice - product.price)} ({product.discountPct}% OFF)
              </span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Inclusive of all taxes. Free Express Shipping available.
            </div>
          </div>

          {/* Bank Offers */}
          <div className="border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl p-4 space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <div className="font-bold text-blue-800 dark:text-blue-300 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-blue-600" /> Available Bank Offers &amp; Discounts:
            </div>
            <ul className="space-y-1 list-disc pl-4 text-[11px] text-slate-600 dark:text-slate-400">
              <li><strong>Bank Offer:</strong> Get 10% Instant Discount on Credit/Debit Cards</li>
              <li><strong>Promo Code:</strong> Apply code <strong className="text-blue-600">SPRINT6</strong> at checkout for 30% OFF</li>
              <li><strong>No Cost EMI:</strong> Available starting at $25/month</li>
            </ul>
          </div>

          {/* Delivery Pincode Checker */}
          <div className="space-y-2 text-xs">
            <label className="block font-bold text-slate-900 dark:text-white">Delivery Options</label>
            <div className="flex gap-2 max-w-sm">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter Delivery Pincode..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white"
                />
              </div>
              <button
                onClick={() => setPincodeChecked(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-xs hover:bg-blue-700"
              >
                Check
              </button>
            </div>
            {pincodeChecked && (
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                <Truck className="w-4 h-4" /> Delivered by Tomorrow, Express Guarantee to {pincode || 'Location'}
              </div>
            )}
          </div>

          {/* Specs Summary Table */}
          <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-2 text-xs">
            <div className="font-bold text-slate-900 dark:text-white mb-2">Specifications &amp; Services</div>
            <div className="grid grid-cols-2 gap-3 text-slate-600 dark:text-slate-400">
              <div><strong>Warranty:</strong> {product.specs?.warranty}</div>
              <div><strong>Seller:</strong> {product.specs?.seller}</div>
              <div><strong>Delivery:</strong> {product.specs?.delivery}</div>
              <div><strong>Return:</strong> 7 Days Easy Replacement Guarantee</div>
            </div>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="flex items-center space-x-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 font-bold text-slate-900 dark:text-white text-xs">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => addToCart(product, quantity)}
              className="flex-1 py-3.5 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase flex items-center justify-center space-x-2 shadow-sm transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{qtyInCart > 0 ? `In Cart (${qtyInCart})` : 'Add To Cart'}</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 py-3.5 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-sm transition-all"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

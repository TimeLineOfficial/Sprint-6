import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductFetcher } from '../hooks/useProductFetcher';
import { useCartOperations } from '../hooks/useCartOperations';
import { useWishlistContext } from '../context/WishlistContext';
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
  Clock,
  Calendar,
  Sparkles,
  Wrench,
  Zap,
  Check
} from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProductFetcher();
  const { addToCart, getItemQuantity } = useCartOperations();
  const { toggleWishlist, isInWishlist } = useWishlistContext();

  const [quantity, setQuantity] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState("11:30 AM");
  const [selectedDay, setSelectedDay] = useState("Tomorrow");
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);

  const product = getProductById(id);
  const isLiked = product ? isInWishlist(product.id) : false;
  const qtyInCart = product ? getItemQuantity(product.id) : 0;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Item Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          The requested item ID [{id}] does not exist in our catalog.
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

  const handleAddToCart = () => {
    if (product.isService) {
      addToCart({
        ...product,
        bookingSlot: selectedSlot,
        bookingDay: selectedDay
      }, 1);
    } else {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
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

      {/* Main Item Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Media Gallery */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
            {product.isService ? (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-extrabold rounded bg-emerald-600 text-white uppercase flex items-center gap-1 shadow-md">
                <Sparkles className="w-3.5 h-3.5" /> Urban Service Guarantee
              </span>
            ) : (
              product.discountPct > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded bg-rose-600 text-white uppercase">
                  {product.discountPct}% OFF
                </span>
              )
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

        {/* Details & Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-2">
              {product.isService ? <Wrench className="w-4 h-4 text-emerald-500" /> : <Tag className="w-4 h-4" />}
              <span>{product.brand} • {product.category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              {product.name}
            </h1>

            {/* Rating & Guarantee */}
            <div className="flex items-center space-x-3 text-xs">
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-600 text-white font-bold">
                <span>{product.rating}</span>
                <Star className="w-3 h-3 fill-white" />
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                {product.reviewCount.toLocaleString()} Ratings & Reviews
              </span>
              {product.isService ? (
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 30-Day Service Guarantee
                </span>
              ) : (
                product.isAssured && (
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Assured
                  </span>
                )
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
              {product.isService ? 'Fixed rate including door inspection, labor & safety protocol.' : 'Inclusive of all taxes. Free Express Shipping available.'}
            </div>
          </div>

          {/* Urban Company Service Time Slot Picker */}
          {product.isService && (
            <div className="border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl p-5 space-y-4">
              <div className="font-bold text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Select Preferred Date & Time Slot:</span>
              </div>
              
              {/* Day Selection */}
              <div className="flex gap-2">
                {["Today", "Tomorrow", "In 2 Days"].map(day => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedDay === day 
                        ? 'bg-emerald-600 text-white shadow-sm' 
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Time Slots */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "07:00 PM"].map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                      selectedSlot === slot 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>{slot}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions Checklist for Services */}
          {product.isService && (
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-2 text-xs">
              <div className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> What's Included in This Service:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Background Verified Technician</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Genuine Spare Parts Used</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> Post-Service Mess Cleaning</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-500" /> 30 Days Re-service Guarantee</li>
              </ul>
            </div>
          )}

          {/* Quantity Selector & Action Buttons */}
          <div className="flex items-center space-x-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            {!product.isService && (
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
            )}

            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase flex items-center justify-center space-x-2 shadow-sm transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{qtyInCart > 0 ? `In Cart (${qtyInCart})` : (product.isService ? 'Add Service to Cart' : 'Add To Cart')}</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="flex-1 py-3.5 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-sm transition-all"
            >
              {product.isService ? 'Book Service Now' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCartOperations } from '../hooks/useCartOperations';
import { useWishlistContext } from '../context/WishlistContext';
import { useFilterContext } from '../context/FilterContext';
import { useThemeContext } from '../context/ThemeContext';
import { CartDrawer } from './CartDrawer';
import { LocationModal } from './LocationModal';
import { CATEGORIES } from '../data/productsGenerator';
import { 
  ShoppingBag, 
  Search, 
  ShoppingCart, 
  Heart, 
  Menu, 
  X, 
  MapPin, 
  Sun, 
  Moon, 
  Sparkles,
  ChevronDown,
  User,
  ShieldCheck,
  Truck,
  Users,
  Wrench
} from 'lucide-react';

const LOCATION_STORAGE_KEY = 'NEXUS_LOCATION_STORAGE_V1';

export const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  // Location State
  const [location, setLocation] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCATION_STORAGE_KEY);
      return saved ? JSON.parse(saved) : { address: '', city: 'New York', pincode: '10001' };
    } catch {
      return { address: '', city: 'New York', pincode: '10001' };
    }
  });

  const { totalItemsCount } = useCartOperations();
  const { wishlistCount } = useWishlistContext();
  const { setSearchQuery, setSelectedCategory } = useFilterContext();
  const { theme, cycleTheme } = useThemeContext();

  const handleSaveLocation = (newLoc) => {
    setLocation(newLoc);
    try {
      localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(newLoc));
    } catch (e) {
      console.error("Location storage save error", e);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      setSearchQuery(navSearch.trim());
      setIsMobileSearchOpen(false);
      navigate('/catalog');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-blue-700 dark:bg-slate-900 text-white shadow-md transition-colors">
        {/* Top Notification Bar */}
        <div className="bg-blue-900 dark:bg-slate-950 text-blue-100 text-xs py-1 px-4 text-center font-medium hidden sm:block">
          ⚡ <strong>Himesh Store &amp; Services:</strong> Products &amp; On-Demand Home Workers • Express Same-Day Repair Dispatch
        </div>

        {/* Primary Header Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
              <div className="w-9 h-9 rounded-lg bg-amber-400 text-slate-900 font-extrabold text-xl flex items-center justify-center shadow-md">
                H
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-white italic">
                  HIMESH<span className="text-amber-400">STORE</span>
                </span>
                <span className="text-[9px] font-semibold text-blue-200 uppercase -mt-1 tracking-widest">
                  Products &amp; Services
                </span>
              </div>
            </Link>

            {/* Delivery Location Pincode Selector Button */}
            <button
              type="button"
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden lg:flex items-center space-x-1.5 text-xs text-blue-100 bg-blue-800/80 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-blue-600 dark:border-slate-700 hover:bg-blue-600 transition-all text-left"
              title="Click to Change Delivery Location"
            >
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <div>
                <div className="text-[10px] text-blue-200">Deliver to</div>
                <div className="font-bold text-white leading-none truncate max-w-[120px]">
                  {location.city} {location.pincode}
                </div>
              </div>
            </button>

            {/* Desktop Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative max-w-xl w-full">
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search for products, AC repair, home cook, laptop fix..."
                className="w-full bg-white text-slate-900 rounded-lg pl-4 pr-10 py-2.5 text-xs placeholder-slate-400 focus:outline-none shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-3 bg-amber-400 text-slate-900 hover:bg-amber-300 rounded-r-lg font-bold transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Mobile Quick Search Button */}
              <button
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="md:hidden p-2 rounded-lg bg-blue-800 dark:bg-slate-800 text-white hover:bg-blue-600"
                aria-label="Toggle Quick Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Theme Switcher Toggle Button */}
              <button
                onClick={cycleTheme}
                className="p-2 rounded-lg bg-blue-800 dark:bg-slate-800 text-white hover:bg-blue-600 transition-all flex items-center space-x-1 text-xs font-semibold"
                title={`Current Theme: ${theme.toUpperCase()}. Click to switch between Light, Dark, and Solar.`}
                aria-label="Switch Theme"
              >
                {theme === 'solar' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-amber-300" />
                ) : (
                  <Sun className="w-4 h-4 text-blue-200" />
                )}
                <span className="hidden sm:inline uppercase text-[10px]">{theme}</span>
              </button>

              {/* Hire Workers Quick Action */}
              <Link
                to="/hire-workers"
                className="hidden sm:flex items-center space-x-1 p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
              >
                <Users className="w-4 h-4" />
                <span>Hire Workers</span>
              </Link>

              {/* Gadget Repair Quick Action */}
              <Link
                to="/repair-services"
                className="hidden sm:flex items-center space-x-1 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-sm"
              >
                <Wrench className="w-4 h-4" />
                <span>Repair</span>
              </Link>

              {/* Wishlist Button */}
              <Link
                to="/wishlist"
                className="relative p-2 rounded-lg bg-blue-800 dark:bg-slate-800 text-white hover:bg-blue-600 transition-all flex items-center space-x-1 text-xs font-semibold"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden lg:inline">Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative px-3 py-2 rounded-lg bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-all flex items-center space-x-1.5 text-xs shadow-sm"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Cart</span>
                {totalItemsCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white text-[10px] font-extrabold flex items-center justify-center ml-0.5">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-blue-800 dark:bg-slate-800 text-white"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Quick Search Input Bar */}
        {isMobileSearchOpen && (
          <div className="md:hidden bg-blue-800 dark:bg-slate-850 p-3 border-t border-blue-600">
            <form onSubmit={handleSearchSubmit} className="relative max-w-md mx-auto flex">
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search products &amp; services..."
                autoFocus
                className="w-full bg-white text-slate-900 rounded-l-lg pl-3 pr-8 py-2 text-xs placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-amber-400 text-slate-900 px-4 rounded-r-lg font-bold text-xs"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Secondary Category Navbar */}
        <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 hidden lg:block text-xs font-semibold">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-11">
            <div className="flex items-center space-x-6">
              <NavLink
                to="/catalog"
                onClick={() => setSelectedCategory('ALL')}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center space-x-1"
              >
                <span>All 5,000 Items &amp; Services</span>
              </NavLink>
              <NavLink
                to="/hire-workers"
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <Users className="w-3.5 h-3.5" /> Hire Home Staff
              </NavLink>
              <NavLink
                to="/repair-services"
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1"
              >
                <Wrench className="w-3.5 h-3.5" /> Book Gadget Repair
              </NavLink>
              {CATEGORIES.slice(0, 6).map((cat) => (
                <NavLink
                  key={cat.id}
                  to="/catalog"
                  onClick={() => setSelectedCategory(cat.name)}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {cat.name}
                </NavLink>
              ))}
            </div>
            <div className="text-slate-500 dark:text-slate-400 text-[11px] font-normal flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-600" /> Express Dispatch Guaranteed
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 px-4 py-4 space-y-3 text-xs font-semibold">
            <div className="flex gap-2">
              <Link
                to="/hire-workers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 p-2 bg-emerald-600 text-white rounded-lg text-center font-bold"
              >
                Hire Home Workers
              </Link>
              <Link
                to="/repair-services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 p-2 bg-indigo-600 text-white rounded-lg text-center font-bold"
              >
                Gadget Repair
              </Link>
            </div>
            <div className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Categories</div>
            <Link
              to="/catalog"
              onClick={() => {
                setSelectedCategory('ALL');
                setIsMobileMenuOpen(false);
              }}
              className="block py-1.5 hover:text-blue-600"
            >
              All 5,000 Items &amp; Services
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to="/catalog"
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setIsMobileMenuOpen(false);
                }}
                className="block py-1.5 hover:text-blue-600"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Quick Location Change Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentAddress={location}
        onSaveAddress={handleSaveLocation}
      />

      {/* Slide-over Quick Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

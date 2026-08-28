import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCartOperations } from '../hooks/useCartOperations';
import { useWishlistContext } from '../context/WishlistContext';
import { useFilterContext } from '../context/FilterContext';
import { useThemeContext } from '../context/ThemeContext';
import { CartDrawer } from './CartDrawer';
import { 
  Cpu, 
  Search, 
  ShoppingCart, 
  Heart, 
  Menu, 
  X, 
  Layers, 
  Zap,
  Moon,
  Sun,
  Terminal
} from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');

  const { totalItemsCount } = useCartOperations();
  const { wishlistCount } = useWishlistContext();
  const { setSearchQuery } = useFilterContext();
  const { theme, cycleTheme } = useThemeContext();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      setSearchQuery(navSearch.trim());
      setIsMobileSearchOpen(false);
      navigate('/catalog');
    }
  };

  const getThemeBadge = () => {
    if (theme === 'matrix') {
      return { label: 'MATRIX', icon: Terminal, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' };
    }
    if (theme === 'solar') {
      return { label: 'SOLAR', icon: Sun, color: 'text-amber-500 border-amber-500/40 bg-amber-500/10' };
    }
    return { label: 'CYBER', icon: Moon, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10' };
  };

  const currentThemeBadge = getThemeBadge();
  const ThemeIcon = currentThemeBadge.icon;

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-xl border-b border-cyan-500/20 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-2">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-2.5 group flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-neon flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono font-extrabold text-base sm:text-lg tracking-widest flex items-center gap-1">
                  NEXUS<span className="text-cyan-400">SYNTHESIS</span>
                </span>
                <span className="hidden sm:block text-[10px] font-mono text-cyan-500/80 tracking-wider uppercase">
                  Quantum Cybernetics Vault
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-mono font-medium tracking-wider">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `transition-all hover:text-cyan-300 py-1 ${
                    isActive ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-slate-300'
                  }`
                }
              >
                // HOME
              </NavLink>
              <NavLink
                to="/catalog"
                className={({ isActive }) =>
                  `transition-all hover:text-cyan-300 py-1 flex items-center gap-1 ${
                    isActive ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-slate-300'
                  }`
                }
              >
                <Layers className="w-3.5 h-3.5" />
                // 5K CATALOG
              </NavLink>
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  `transition-all hover:text-cyan-300 py-1 ${
                    isActive ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-slate-300'
                  }`
                }
              >
                // WISHLIST
              </NavLink>
            </nav>

            {/* Desktop Search Bar (Always visible in main view on desktop) */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative max-w-xs w-full">
              <Search className="w-4 h-4 absolute left-3 text-slate-400" />
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search 5,000 products..."
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
              />
            </form>

            {/* Right Action Icons (Visible in Main View across ALL Device Screens) */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Mobile/Tablet Main View Search Icon Button (Visible on ALL Device Screens) */}
              <button
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="md:hidden p-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-cyan-400 hover:text-white transition-all"
                aria-label="Toggle Quick Search"
                title="Search Products"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Theme Switcher Button (Visible in Main View on ALL Device Screens) */}
              <button
                onClick={cycleTheme}
                className={`p-2.5 rounded-xl border flex items-center space-x-1.5 text-xs font-mono font-bold transition-all ${currentThemeBadge.color}`}
                title={`Current Theme: ${currentThemeBadge.label}. Click to Switch Theme.`}
                aria-label="Switch Theme"
              >
                <ThemeIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{currentThemeBadge.label}</span>
              </button>

              {/* Wishlist Icon */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-xl border border-slate-800 bg-slate-900/70 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-all"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold flex items-center justify-center shadow-lg animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] flex items-center space-x-1.5"
                aria-label="Cart"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline text-xs font-mono font-bold">Cart</span>
                {totalItemsCount > 0 && (
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-cyan-400 text-slate-950 font-mono text-[10px] sm:text-[11px] font-extrabold flex items-center justify-center">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Main View Expandable Quick Search Bar */}
        {isMobileSearchOpen && (
          <div className="md:hidden border-t border-slate-800/80 bg-slate-950/95 p-3 animate-float">
            <form onSubmit={handleSearchSubmit} className="relative max-w-md mx-auto">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Type to search 5,000 catalog products..."
                autoFocus
                className="w-full bg-slate-900 border border-cyan-500/50 rounded-xl pl-9 pr-8 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-cyber-card border-b border-slate-800 px-4 py-6 space-y-4 font-mono text-xs">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400 font-semibold py-1.5"
              >
                // HOME
              </Link>
              <Link
                to="/catalog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400 font-semibold py-1.5"
              >
                // 5K CATALOG
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-300 hover:text-cyan-400 font-semibold py-1.5"
              >
                // WISHLIST ({wishlistCount})
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-cyan-400 font-bold py-1.5"
              >
                // VIEW CART ({totalItemsCount})
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Slide-over Quick Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

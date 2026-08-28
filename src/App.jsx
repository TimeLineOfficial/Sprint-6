import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { FilterProvider } from './context/FilterContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';

import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Wishlist } from './pages/Wishlist';
import { OrderSuccess } from './pages/OrderSuccess';
import { NotFound } from './pages/NotFound';

// Helper component to reset scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <FilterProvider>
            <BrowserRouter>
              <ScrollToTop />
              <div className="min-h-screen flex flex-col bg-[#0a0d14] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <ToastContainer />
              </div>
            </BrowserRouter>
          </FilterProvider>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}

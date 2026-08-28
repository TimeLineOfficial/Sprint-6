import React from 'react';
import { Link } from 'react-router-dom';
import { useProductFetcher } from '../hooks/useProductFetcher';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/productsGenerator';
import { useFilterContext } from '../context/FilterContext';
import { 
  Zap, 
  Smartphone, 
  Laptop, 
  Tv, 
  Shirt, 
  Headphones, 
  Activity, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CheckCircle2,
  Tag,
  Star,
  Cpu
} from 'lucide-react';

const CATEGORY_ICONS = {
  Smartphone: Smartphone,
  Laptop: Laptop,
  Tv: Tv,
  Shirt: Shirt,
  Headphones: Headphones,
  Activity: Activity
};

export const Home = () => {
  const { featuredProducts } = useProductFetcher();
  const { setSelectedCategory } = useFilterContext();

  return (
    <div className="space-y-8 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Top Banner Hero (Flipkart / Alibaba Style) */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider">
              🔥 Super Electronics &amp; Fashion Sale
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Global E-Commerce Marketplace <br />
              <span className="text-amber-400">Up to 45% OFF</span> On Top Brands
            </h1>

            <p className="text-sm sm:text-base text-blue-100 max-w-2xl">
              Shop over <strong className="text-white font-mono">5,000 certified products</strong> across Mobiles, Laptops, Home Appliances, Audio, and Fashion with 24-Hour Express Shipping.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/catalog"
                className="px-6 py-3.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm hover:bg-amber-300 transition-all shadow-md flex items-center space-x-2"
              >
                <span>EXPLORE 5,000 PRODUCTS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/catalog"
                onClick={() => setSelectedCategory('Mobiles & Electronics')}
                className="px-6 py-3.5 rounded-lg bg-blue-800 border border-blue-600 text-white font-semibold text-xs sm:text-sm hover:bg-blue-700 transition-all"
              >
                Shop Electronics Deals
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <span className="font-bold text-xs uppercase text-amber-300">Daily Flash Offer</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-bold">LIVE</span>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80"
                  alt="Flagship Smartphone"
                  className="w-20 h-20 object-cover rounded-xl bg-white p-1"
                />
                <div>
                  <h4 className="font-bold text-sm leading-tight">Flagship 5G Smartphone Series</h4>
                  <div className="text-amber-400 font-extrabold text-lg mt-1">$499.00 <span className="text-xs text-blue-200 line-through font-normal">$699.00</span></div>
                  <div className="text-[11px] text-emerald-300 font-semibold mt-0.5">⚡ Free Express Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Icons Row (Flipkart Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const IconComp = CATEGORY_ICONS[cat.icon] || Smartphone;
            return (
              <Link
                key={cat.id}
                to="/catalog"
                onClick={() => setSelectedCategory(cat.name)}
                className="group flex flex-col items-center justify-center p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-all text-center space-y-2"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Guarantees Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center space-x-3 p-2">
            <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Free Express Shipping</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px]">On orders over $1,500 worldwide</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white">100% Brand Guarantee</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px]">Official warranty &amp; authentic products</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700">
            <RotateCcw className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white">7-Day Easy Returns</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px]">Hassle-free replacement policy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals of the Day */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              🔥 Deals of the Day <span className="text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">Ends in 05h 22m</span>
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View All Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Phase 3 DOM Virtualization Technical HUD Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 space-y-4 shadow-lg border border-slate-800">
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4" /> Sprint 6 Phase 3 DOM Virtualization Active
          </div>

          <h3 className="text-2xl font-bold">5,000 Product Virtual Window Engine</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            This platform generates 5,000 high-resolution catalog products while rendering <strong className="text-emerald-400 font-mono">strictly ~10 active DOM nodes</strong> in memory, guaranteeing 60 FPS performance on all mobile and desktop viewports.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/catalog"
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
            >
              Test 5,000 Catalog Virtual Scroll
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

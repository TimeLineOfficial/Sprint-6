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
  Cpu,
  Wind,
  Sparkles,
  Scissors,
  Wrench,
  Calendar,
  Clock
} from 'lucide-react';

const CATEGORY_ICONS = {
  Smartphone: Smartphone,
  Laptop: Laptop,
  Tv: Tv,
  Shirt: Shirt,
  Headphones: Headphones,
  Activity: Activity,
  Wind: Wind,
  Sparkles: Sparkles,
  Zap: Zap,
  Scissors: Scissors,
  Wrench: Wrench
};

export const Home = () => {
  const { featuredProducts } = useProductFetcher();
  const { setSelectedCategory } = useFilterContext();

  const servicesOnly = featuredProducts.filter(p => p.isService);
  const productsOnly = featuredProducts.filter(p => !p.isService);

  return (
    <div className="space-y-8 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Top Banner Hero */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider">
              🔥 E-Commerce &amp; On-Demand Urban Services
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Products &amp; Home Services <br />
              <span className="text-amber-400">At Your Doorstep</span> In 45 Mins
            </h1>

            <p className="text-sm sm:text-base text-blue-100 max-w-2xl">
              Shop over <strong className="text-white font-mono">5,000 certified products</strong> &amp; book certified <strong className="text-amber-300 font-mono">Urban Company Services</strong> (AC Repair, Deep Cleaning, Plumbing, Salon at Home).
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/catalog"
                className="px-6 py-3.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm hover:bg-amber-300 transition-all shadow-md flex items-center space-x-2"
              >
                <span>EXPLORE 5,000 ITEMS &amp; SERVICES</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/catalog"
                onClick={() => setSelectedCategory('AC Service & Repair')}
                className="px-6 py-3.5 rounded-lg bg-blue-800 border border-blue-600 text-white font-semibold text-xs sm:text-sm hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>Book AC &amp; Home Repair</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <span className="font-bold text-xs uppercase text-amber-300">Featured Urban Service</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-bold">30-DAY WARRANTY</span>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=300&q=80"
                  alt="AC Servicing"
                  className="w-20 h-20 object-cover rounded-xl bg-white p-1"
                />
                <div>
                  <h4 className="font-bold text-sm leading-tight">AC Foam Jet Deep Servicing</h4>
                  <div className="text-amber-400 font-extrabold text-lg mt-1">$49.00 <span className="text-xs text-blue-200 line-through font-normal">$89.00</span></div>
                  <div className="text-[11px] text-emerald-300 font-semibold mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Technician Arrival in 45 Mins
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urban Company On-Demand Services Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                Urban Company Style Home Services
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Background-verified experts with 30-day post-service guarantee</p>
            </div>
            <Link to="/catalog" className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1">
              View All Services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.filter(c => c.type === 'service').map(cat => {
              const IconComp = CATEGORY_ICONS[cat.icon] || Wrench;
              return (
                <Link
                  key={cat.id}
                  to="/catalog"
                  onClick={() => setSelectedCategory(cat.name)}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition-all text-center space-y-2 group"
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">{cat.name}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Verified Techs • 30d Warranty</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Icons Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.filter(c => c.type === 'product').map((cat) => {
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
              <div className="font-bold text-slate-900 dark:text-white">Free Express Delivery</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px]">On orders over $1,500 worldwide</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white">30-Day Urban Service Warranty</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px]">100% Free Re-service Guarantee</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-2 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-700">
            <RotateCcw className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Easy Cancellation &amp; Returns</div>
              <div className="text-slate-500 dark:text-slate-400 text-[11px]">Cancel up to 2 hours before slot</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products & Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              🔥 Featured Products &amp; Services
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Technical HUD Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 space-y-4 shadow-lg border border-slate-800">
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4" /> Sprint 6 Phase 3 DOM Virtualization Active
          </div>

          <h3 className="text-2xl font-bold">5,000 Product &amp; Service Virtual Window Engine</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            This platform generates 5,000 high-resolution catalog items &amp; Urban Company services while rendering <strong className="text-emerald-400 font-mono">strictly ~10 active DOM nodes</strong> in memory, guaranteeing 60 FPS performance on all mobile and desktop viewports.
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

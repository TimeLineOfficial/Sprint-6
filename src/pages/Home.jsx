import React from 'react';
import { Link } from 'react-router-dom';
import { useProductFetcher } from '../hooks/useProductFetcher';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/productsGenerator';
import { useFilterContext } from '../context/FilterContext';
import { 
  Zap, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Activity,
  Bot,
  BrainCircuit,
  Eye,
  Atom,
  ShieldAlert
} from 'lucide-react';

const CATEGORY_ICONS = {
  BrainCircuit: BrainCircuit,
  Atom: Atom,
  Zap: Zap,
  Eye: Eye,
  Bot: Bot,
  ShieldAlert: ShieldAlert
};

export const Home = () => {
  const { featuredProducts, totalCount } = useProductFetcher();
  const { setSelectedCategory } = useFilterContext();

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-800/80">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-neon/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>NEXUS SYNTHESIS V1.0 — SPRINT 06 ARCHITECTURE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                CYBERNETIC &amp; <br />
                <span className="bg-gradient-to-r from-cyan-400 via-cyan-200 to-neon bg-clip-text text-transparent text-glow-cyan">
                  QUANTUM GEAR VAULT
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
                Architected with <span className="text-cyan-300 font-mono font-semibold">React Router v6</span>, <span className="text-purple-300 font-mono font-semibold">Global Context API</span>, and <span className="text-emerald-300 font-mono font-semibold">DOM Virtualization</span> to stream 5,000+ cybernetic products at 60 FPS.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/catalog"
                  className="px-7 py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm flex items-center space-x-2 hover:bg-cyan-400 transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:scale-105"
                >
                  <Layers className="w-4 h-4" />
                  <span>EXPLORE 5,000 CATALOG</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/catalog"
                  onClick={() => setSelectedCategory('Neural Implants')}
                  className="px-7 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-sm hover:border-cyan-500 hover:text-white transition-all glass-card"
                >
                  Neural Implants
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 font-mono">
                <div>
                  <div className="text-2xl font-extrabold text-white">5,000+</div>
                  <div className="text-xs text-slate-500">Virtual Dataset</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-cyan-400">60 FPS</div>
                  <div className="text-xs text-slate-500">DOM Windowing</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-emerald-400">0ms</div>
                  <div className="text-xs text-slate-500">Prop-Drill Latency</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Hero Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl p-6 bg-cyber-card/90 border border-cyan-500/30 glass-card shadow-[0_0_50px_rgba(0,240,255,0.15)] space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-xs font-bold text-slate-200">
                      FLAGSHIP NEURAL CORE MK-VII
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] border border-cyan-500/40">
                    QUANTUM TIER
                  </span>
                </div>

                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80"
                    alt="Neural Processor"
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-transparent to-transparent" />
                </div>

                <div className="space-y-3 font-mono text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Processing Latency</span>
                    <span className="text-cyan-400 font-bold">&lt; 0.15 ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sub-Atomic Sync</span>
                    <span className="text-emerald-400 font-bold">128 TeraFlops</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Global Encryption</span>
                    <span className="text-purple-400 font-bold">AES-4096 Quantum</span>
                  </div>
                </div>

                <Link
                  to="/product/PROD-0001"
                  className="w-full py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-mono font-bold text-xs flex items-center justify-center space-x-2 hover:border-cyan-500 hover:text-cyan-300 transition-all"
                >
                  <span>INSPECT NEURAL CORE SPECIFICATIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              // CATEGORY ARCHITECTURE
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              CYBERNETIC GEAR CATEGORIES
            </h2>
          </div>
          <Link
            to="/catalog"
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
          >
            <span>View All 5,000 Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const IconComp = CATEGORY_ICONS[cat.icon] || Cpu;
            return (
              <Link
                key={cat.id}
                to="/catalog"
                onClick={() => setSelectedCategory(cat.name)}
                className="group p-6 rounded-2xl bg-cyber-card/70 border border-slate-800 hover:border-cyan-500/50 glass-card transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col justify-between space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">
                    833 ITEMS
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    High-precision cybernetic modules &amp; quantum hardware.
                  </p>
                </div>

                <div className="flex items-center text-xs font-mono text-cyan-400 font-bold pt-2">
                  <span>FILTER CATEGORY</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
              // FEATURED DEPLOYMENTS
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              HOTTEST HARDWARE DROPS
            </h2>
          </div>
          <Link
            to="/catalog"
            className="hidden sm:flex items-center space-x-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold"
          >
            <span>Open Virtual Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Directive Sprint 6 Performance Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-cyber-card to-slate-900 border border-cyan-500/30 p-8 sm:p-12 glass-card relative overflow-hidden space-y-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono">
              <Activity className="w-3.5 h-3.5" />
              <span>DOM VIRTUALIZATION ENGINE (PHASE 3)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Rendering 5,000 Nodes Without Performance Degradation
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Standard DOM trees crash mobile viewports when rendering thousands of nodes simultaneously. Nexus Synthesis utilizes windowing mechanics to render <span className="text-cyan-400 font-mono font-bold">strictly ~10 visible items</span> at any scroll offset.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/catalog"
              className="px-6 py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold text-xs hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              TEST VIRTUAL SCROLLING (5K ITEMS)
            </Link>
            <Link
              to="/cart"
              className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-mono font-bold text-xs hover:border-cyan-500 transition-all"
            >
              TEST CONTEXT API STORE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

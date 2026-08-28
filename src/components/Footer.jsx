import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, Zap, Globe, Github, Terminal, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-cyber-bg border-t border-slate-800/80 pt-16 pb-12 mt-20 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-mono font-extrabold text-white tracking-widest text-base">
                NEXUS<span className="text-cyan-400">SYNTHESIS</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Architecting high-performance Cybernetic & Quantum Hardware SPA deployments with virtualized DOM node streams.
            </p>
            <div className="flex items-center space-x-3 text-xs font-mono text-cyan-400 pt-2">
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> 60 FPS Engine</span>
              <span>•</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Quantum Encrypted</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              // ROUTE NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">/home</Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-cyan-400 transition-colors">/catalog (5k virtual)</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-cyan-400 transition-colors">/wishlist</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-cyan-400 transition-colors">/cart (context API)</Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-cyan-400 transition-colors">/checkout</Link>
              </li>
            </ul>
          </div>

          {/* Technical Specs */}
          <div>
            <h4 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              // SPRINT 06 DIRECTIVE
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-slate-400">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Phase 1: React Router v6</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Phase 2: Context API Store</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Phase 3: DOM Virtualization</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Phase 3: Custom Hooks Logic</span>
              </li>
            </ul>
          </div>

          {/* GitHub Repo Link */}
          <div>
            <h4 className="font-mono text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              // REPOSITORY DEPLOYMENT
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Source code committed and pushed to Prodesk IT Sprint-6 remote repository.
            </p>
            <a
              href="https://github.com/TimeLineOfficial/Sprint-6/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-400 hover:border-cyan-500 hover:bg-slate-800 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-cyan-500" />
            <span>SPRINT 6 ENGINEERING DIRECTIVE — PRODESK IT TECHNICAL MANAGEMENT</span>
          </div>
          <div>
            © 2026 NEXUS SYNTHESIS. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

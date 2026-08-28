import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ArrowLeft, Layers } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-24 h-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto animate-pulse">
        <Cpu className="w-12 h-12" />
      </div>
      <div className="space-y-2 font-mono">
        <span className="text-xs text-rose-400 tracking-widest uppercase">// 404 ROUTE NOT FOUND</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          Quantum Vector Out of Bounds
        </h1>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          The requested URL path does not exist in the Nexus Synthesis React Router SPA configuration.
        </p>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        <Link
          to="/"
          className="px-6 py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold text-xs flex items-center space-x-2 hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN HOME</span>
        </Link>
        <Link
          to="/catalog"
          className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-mono font-bold text-xs flex items-center space-x-2 hover:border-cyan-500 transition-all"
        >
          <Layers className="w-4 h-4" />
          <span>5K VIRTUAL CATALOG</span>
        </Link>
      </div>
    </div>
  );
};

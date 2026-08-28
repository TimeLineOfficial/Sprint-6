import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Truck, Cpu, ShieldCheck, ArrowRight, PackageCheck, Zap } from 'lucide-react';

export const OrderSuccess = () => {
  const location = useLocation();
  const state = location.state;

  if (!state || !state.orderId) {
    return <Navigate to="/" replace />;
  }

  const { orderId, details } = state;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="bg-cyber-card border border-cyan-500/40 rounded-3xl p-8 sm:p-12 glass-card text-center space-y-6 shadow-[0_0_50px_rgba(0,240,255,0.15)]">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            // AUTHORISATION CONFIRMED &amp; DISPATCHED
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Order #{orderId} Successfully Placed!
          </h1>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Your quantum cybernetic hardware components are currently undergoing sub-atomic verification and express orbital transit.
          </p>
        </div>

        {/* Real-time Order Tracking Status Progress */}
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 max-w-xl mx-auto font-mono text-xs text-left">
          <div className="flex items-center justify-between text-slate-300 font-bold border-b border-slate-800 pb-3">
            <span>REAL-TIME COURIER STATUS</span>
            <span className="text-cyan-400">EST. ARRIVAL: &lt; 24 HOURS</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Order Received &amp; Verified</span>
            </div>
            <div className="flex items-center space-x-3 text-cyan-400">
              <Zap className="w-4 h-4 animate-pulse" />
              <span>Neural Assembly &amp; Sub-Atomic Calibration (Active)</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-500">
              <Truck className="w-4 h-4" />
              <span>Express Orbital Courier Transit</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-500">
              <PackageCheck className="w-4 h-4" />
              <span>Final Delivery to {details?.city || 'Destination'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link
            to="/catalog"
            className="px-6 py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-xs flex items-center space-x-2 hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            <span>CONTINUE SHOPPING 5K CATALOG</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-mono font-bold text-xs hover:border-slate-500 transition-all"
          >
            RETURN HOME
          </Link>
        </div>
      </div>
    </div>
  );
};

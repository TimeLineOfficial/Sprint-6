import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Truck, ShieldCheck, ArrowRight, PackageCheck, Zap } from 'lucide-react';

export const OrderSuccess = () => {
  const location = useLocation();
  const state = location.state;

  if (!state || !state.orderId) {
    return <Navigate to="/" replace />;
  }

  const { orderId, details, paymentMethod } = state;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-md">
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Order Authorised &amp; Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Order #{orderId} Successfully Placed!
          </h1>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Thank you for shopping with GlobalMart. Your items are being packed and will be delivered via Express Courier.
          </p>
        </div>

        {/* Real-time Order Tracking Status Progress */}
        <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-4 max-w-xl mx-auto text-xs text-left">
          <div className="flex items-center justify-between text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-800 pb-3">
            <span>COURIER DELIVERY STATUS</span>
            <span className="text-blue-600 dark:text-blue-400">EST. ARRIVAL: BY TOMORROW</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Order Received &amp; Payment Verified ({paymentMethod?.toUpperCase() || 'CARD'})</span>
            </div>
            <div className="flex items-center space-x-3 text-blue-600 dark:text-blue-400 font-semibold">
              <Zap className="w-4 h-4 animate-pulse" />
              <span>Warehouse Packing &amp; Quality Check (Active)</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-400">
              <Truck className="w-4 h-4" />
              <span>Express Delivery Dispatch</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-400">
              <PackageCheck className="w-4 h-4" />
              <span>Doorstep Delivery to {details?.fullName || details?.city || 'Destination'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            to="/catalog"
            className="px-6 py-3.5 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center space-x-2 hover:bg-blue-700 shadow-sm"
          >
            <span>CONTINUE SHOPPING</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="px-6 py-3.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs hover:bg-slate-300"
          >
            RETURN HOME
          </Link>
        </div>
      </div>
    </div>
  );
};

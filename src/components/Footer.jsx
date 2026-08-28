import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Github, Globe, PhoneCall, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-slate-800 pb-8">
          <div>
            <div className="font-extrabold text-lg text-white italic mb-3">
              GLOBAL<span className="text-amber-400">MART</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Global Marketplace offering authentic products, express shipping, and 100% brand warranty across 5,000 catalog items.
            </p>
          </div>

          <div>
            <div className="font-bold text-white uppercase text-xs tracking-wider mb-3">
              Customer Care
            </div>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/catalog" className="hover:text-white">Help Center &amp; FAQs</Link></li>
              <li><Link to="/cart" className="hover:text-white">Track Order Status</Link></li>
              <li><Link to="/checkout" className="hover:text-white">Return &amp; Refund Policy</Link></li>
              <li><Link to="/wishlist" className="hover:text-white">Wishlist &amp; Saved Items</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase text-xs tracking-wider mb-3">
              Sprint 6 Architecture
            </div>
            <ul className="space-y-2 text-slate-400 font-mono">
              <li>Phase 1: React Router v6</li>
              <li>Phase 2: Global Context API</li>
              <li>Phase 3: DOM Virtualization</li>
              <li>Phase 3: Custom Hooks Logic</li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase text-xs tracking-wider mb-3">
              Repository & Deployment
            </div>
            <a
              href="https://github.com/TimeLineOfficial/Sprint-6/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-slate-800 text-white font-mono hover:bg-slate-700 transition-colors border border-slate-700"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4 font-sans">
          <div>© 2026 GLOBALMART E-Commerce Marketplace. All Rights Reserved.</div>
          <div className="flex space-x-4 text-slate-400">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

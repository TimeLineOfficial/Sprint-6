import React from 'react';
import { useToastContext } from '../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastContext();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        let bgClass = "bg-cyber-card border-cyan-500/40 text-cyan-200";
        let Icon = Info;

        if (toast.type === 'success') {
          bgClass = "bg-emerald-950/90 border-emerald-500/50 text-emerald-200";
          Icon = CheckCircle2;
        } else if (toast.type === 'error') {
          bgClass = "bg-rose-950/90 border-rose-500/50 text-rose-200";
          Icon = AlertCircle;
        } else if (toast.type === 'warning') {
          bgClass = "bg-amber-950/90 border-amber-500/50 text-amber-200";
          Icon = AlertCircle;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl border glass-card shadow-2xl transition-all transform animate-float ${bgClass}`}
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

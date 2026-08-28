import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartOperations } from '../hooks/useCartOperations';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  CreditCard, 
  Lock, 
  CheckCircle2, 
  Truck, 
  Cpu, 
  ArrowRight, 
  DollarSign, 
  Zap,
  Globe
} from 'lucide-react';

export const Checkout = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    clearCart,
    formattedSubtotal,
    formattedTax,
    formattedShipping,
    formattedGrandTotal,
    isCartEmpty
  } = useCartOperations();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'crypto', 'neural'
  const [formData, setFormData] = useState({
    fullName: 'Dr. Alex Mercer',
    email: 'alex.mercer@cyber-synthesis.io',
    address: 'Building 7, Sector 9 Quantum District',
    city: 'Neo-Tokyo',
    postalCode: '100-0001',
    country: 'Cyber Network',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '999'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();

    // Trigger celebratory confetti animation
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    const mockOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    clearCart();
    navigate('/order-success', { state: { orderId: mockOrderId, details: formData } });
  };

  if (isCartEmpty) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">No Items to Checkout</h2>
        <button
          onClick={() => navigate('/catalog')}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Checkout Progress Stepper */}
      <div className="max-w-xl mx-auto flex items-center justify-between font-mono text-xs">
        <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800'}`}>
            1
          </div>
          <span>SHIPPING ADDRESS</span>
        </div>
        <div className="h-0.5 w-12 bg-slate-800" />
        <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800'}`}>
            2
          </div>
          <span>PAYMENT &amp; CONFIRMATION</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Forms */}
        <div className="lg:col-span-7 space-y-6">
          {step === 1 ? (
            <div className="p-6 rounded-2xl bg-cyber-card border border-slate-800 glass-card space-y-6">
              <h2 className="font-mono font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <Truck className="w-4 h-4 text-cyan-400" /> Step 1: Destination Credentials
              </h2>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-400 mb-1">Recipient Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Encrypted Neural Contact Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Physical / Orbital Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">City / Sector</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-xs flex items-center justify-center space-x-2 hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <span>CONTINUE TO PAYMENT METHOD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-cyber-card border border-slate-800 glass-card space-y-6">
              <h2 className="font-mono font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <CreditCard className="w-4 h-4 text-cyan-400" /> Step 2: Payment &amp; Authorisation
              </h2>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-mono font-semibold text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-3 rounded-xl border text-xs font-mono font-semibold text-center transition-all ${
                    paymentMethod === 'crypto'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Quantum Crypto
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('neural')}
                  className={`p-3 rounded-xl border text-xs font-mono font-semibold text-center transition-all ${
                    paymentMethod === 'neural'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Neural Direct Pay
                </button>
              </div>

              {/* Payment Form */}
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-400 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Expiration</label>
                    <input
                      type="text"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">CVC Code</label>
                    <input
                      type="text"
                      name="cardCvc"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl border border-slate-700 text-slate-300 text-xs font-mono"
                >
                  Back
                </button>
                <button
                  onClick={handleCompleteOrder}
                  className="flex-1 py-4 rounded-xl bg-emerald-500 text-slate-950 font-bold font-mono text-xs flex items-center justify-center space-x-2 hover:bg-emerald-400 transition-all shadow-[0_0_25px_rgba(0,255,136,0.4)]"
                >
                  <Lock className="w-4 h-4" />
                  <span>AUTHORIZE &amp; COMPLETE ORDER ({formattedGrandTotal})</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-cyber-card border border-slate-800 glass-card space-y-4">
            <h3 className="font-mono font-bold text-sm text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Order Items ({cartItems.length})
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto custom-scrollbar pr-2">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center space-x-3 truncate">
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg bg-slate-950 flex-shrink-0" />
                    <div className="truncate">
                      <div className="text-slate-200 truncate">{product.name}</div>
                      <div className="text-slate-500">Qty: {quantity}</div>
                    </div>
                  </div>
                  <div className="text-cyan-400 font-bold ml-2">
                    ${(product.price * quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span className="text-slate-200">{formattedSubtotal}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Tax &amp; Express Shipping</span>
                <span className="text-slate-200">{formattedTax}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-slate-800">
                <span>Total Amount</span>
                <span className="text-cyan-400">{formattedGrandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

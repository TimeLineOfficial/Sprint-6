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
  ArrowRight, 
  DollarSign, 
  Globe,
  QrCode,
  History,
  Copy,
  Check,
  Building,
  Smartphone,
  Wallet,
  Banknote,
  Wrench,
  Clock,
  Calendar,
  Sparkles
} from 'lucide-react';

const HISTORY_STORAGE_KEY = 'NEXUS_CHECKOUT_HISTORY_V1';

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

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [copiedCrypto, setCopiedCrypto] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States / India / International',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    upiId: '',
    paypalEmail: '',
    cryptoCoin: 'BTC',
    bankName: 'HDFC Bank',
    bankUserId: ''
  });

  const [fieldHistory, setFieldHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        fullName: [],
        email: [],
        address: [],
        city: [],
        postalCode: []
      };
    } catch {
      return {
        fullName: [],
        email: [],
        address: [],
        city: [],
        postalCode: []
      };
    }
  });

  const saveFieldToHistory = (fieldName, value) => {
    if (!value || !value.trim()) return;
    const cleanValue = value.trim();

    setFieldHistory((prev) => {
      const existing = prev[fieldName] || [];
      const filtered = existing.filter((item) => item.toLowerCase() !== cleanValue.toLowerCase());
      const updated = [cleanValue, ...filtered].slice(0, 4);
      const newHistory = { ...prev, [fieldName]: updated };
      try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
      } catch (e) {
        console.error("Failed to save field history", e);
      }
      return newHistory;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    if (['fullName', 'email', 'address', 'city', 'postalCode'].includes(name)) {
      saveFieldToHistory(name, value);
    }
  };

  const selectSuggestedOption = (fieldName, optionValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: optionValue }));
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();

    ['fullName', 'email', 'address', 'city', 'postalCode'].forEach((key) => {
      saveFieldToHistory(key, formData[key]);
    });

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}

    const mockOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    clearCart();
    navigate('/order-success', { state: { orderId: mockOrderId, details: formData, paymentMethod } });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCrypto(true);
    setTimeout(() => setCopiedCrypto(false), 2000);
  };

  const hasServices = cartItems.some(item => item.product.isService);

  if (isCartEmpty) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">No Items or Services in Cart</h2>
        <button
          onClick={() => navigate('/catalog')}
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-xs"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Checkout Stepper */}
      <div className="max-w-xl mx-auto flex items-center justify-between font-semibold text-xs">
        <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
            1
          </div>
          <span>1. SERVICE &amp; SHIPPING ADDRESS</span>
        </div>
        <div className="h-0.5 w-16 bg-slate-200 dark:bg-slate-700" />
        <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
            2
          </div>
          <span>2. PAYMENT OPTION</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Forms */}
        <div className="lg:col-span-7 space-y-6">
          {step === 1 ? (
            <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <h2 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600" /> Step 1: Doorstep Delivery &amp; Service Address
                </h2>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <History className="w-3 h-3" /> Auto-Save Active
                </span>
              </div>

              {hasServices && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Your cart includes Urban Company Services. Certified technician will arrive at the address below.</span>
                </div>
              )}

              <div className="space-y-4 text-xs">
                {/* Field: Full Name */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Enter recipient full name..."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-600 focus:outline-none"
                  />
                  {fieldHistory.fullName && fieldHistory.fullName.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1"><History className="w-2.5 h-2.5" /> Saved:</span>
                      {fieldHistory.fullName.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectSuggestedOption('fullName', opt)}
                          className="px-2 py-0.5 rounded bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-slate-600 text-[10px] font-medium"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Field: Email */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="your.email@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-600 focus:outline-none"
                  />
                  {fieldHistory.email && fieldHistory.email.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1"><History className="w-2.5 h-2.5" /> Saved:</span>
                      {fieldHistory.email.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectSuggestedOption('email', opt)}
                          className="px-2 py-0.5 rounded bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-slate-600 text-[10px] font-medium"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Field: Address */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="House No, Street Name, Area..."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-600 focus:outline-none"
                  />
                  {fieldHistory.address && fieldHistory.address.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1"><History className="w-2.5 h-2.5" /> Saved:</span>
                      {fieldHistory.address.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectSuggestedOption('address', opt)}
                          className="px-2 py-0.5 rounded bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-slate-600 text-[10px] font-medium"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Field: City & Postal Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">City / State</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      placeholder="e.g. New York"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-600 focus:outline-none"
                    />
                    {fieldHistory.city && fieldHistory.city.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {fieldHistory.city.map((opt, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => selectSuggestedOption('city', opt)}
                            className="px-2 py-0.5 rounded bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-slate-600 text-[10px]"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Postal / Zip Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      placeholder="e.g. 10001"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:border-blue-600 focus:outline-none"
                    />
                    {fieldHistory.postalCode && fieldHistory.postalCode.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {fieldHistory.postalCode.map((opt, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => selectSuggestedOption('postalCode', opt)}
                            className="px-2 py-0.5 rounded bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-slate-600 text-[10px]"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  ['fullName', 'email', 'address', 'city', 'postalCode'].forEach((key) => {
                    saveFieldToHistory(key, formData[key]);
                  });
                  setStep(2);
                }}
                className="w-full py-3.5 rounded-lg bg-blue-600 text-white font-bold text-xs uppercase flex items-center justify-center space-x-2 hover:bg-blue-700 shadow-sm"
              >
                <span>CONFIRM ADDRESS &amp; PROCEED TO PAYMENT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Step 2: Payment Options */
            <div className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
              <h2 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                <Globe className="w-4 h-4 text-blue-600" /> Step 2: Select Payment Method
              </h2>

              {/* Payment Selector Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-blue-50 border-blue-600 text-blue-700 dark:bg-slate-700 dark:text-blue-300'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span>Credit / Debit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-blue-50 border-blue-600 text-blue-700 dark:bg-slate-700 dark:text-blue-300'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                  <span>UPI / GPay / Paytm</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-blue-50 border-blue-600 text-blue-700 dark:bg-slate-700 dark:text-blue-300'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-amber-600" />
                  <span>Pay After Service / COD</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'bg-blue-50 border-blue-600 text-blue-700 dark:bg-slate-700 dark:text-blue-300'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Wallet className="w-5 h-5 text-blue-500" />
                  <span>PayPal Express</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'bg-blue-50 border-blue-600 text-blue-700 dark:bg-slate-700 dark:text-blue-300'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Building className="w-5 h-5 text-purple-600" />
                  <span>Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-3 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'crypto'
                      ? 'bg-blue-50 border-blue-600 text-blue-700 dark:bg-slate-700 dark:text-blue-300'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Zap className="w-5 h-5 text-orange-500" />
                  <span>Bitcoin &amp; Crypto</span>
                </button>
              </div>

              {/* Dynamic Payment Method Details */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="4532 •••• •••• 8890"
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="08/28"
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">CVC Code</label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        placeholder="999"
                        className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                  <div className="font-bold text-emerald-600">Instant UPI Payment (GPay, PhonePe, Paytm)</div>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    placeholder="Enter UPI ID (e.g. mobile@upi)"
                    className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                  />
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-1 text-xs text-amber-900 dark:text-amber-300">
                  <div className="font-bold">Pay After Service / Cash on Delivery</div>
                  <p className="text-[11px]">Pay technician or delivery agent via cash/UPI after service completion.</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  Back
                </button>
                <button
                  onClick={handleCompleteOrder}
                  className="flex-1 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Lock className="w-4 h-4" />
                  <span>AUTHORIZE &amp; PAY ({formattedGrandTotal})</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Price Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 pb-3">
              Order &amp; Service Summary ({cartItems.length} items)
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar pr-1">
              {cartItems.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between text-xs border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div className="flex items-center space-x-3 truncate">
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-contain rounded bg-slate-50 dark:bg-slate-900 p-1 flex-shrink-0" />
                    <div className="truncate">
                      <div className="font-semibold text-slate-900 dark:text-white truncate">{product.name}</div>
                      {product.isService ? (
                        <div className="text-emerald-600 font-medium text-[10px] flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Slot: {product.bookingDay || 'Tomorrow'} at {product.bookingSlot || '11:30 AM'}
                        </div>
                      ) : (
                        <div className="text-slate-500 text-[11px]">Qty: {quantity}</div>
                      )}
                    </div>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white ml-2">
                    ${(product.price * quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formattedSubtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Tax &amp; Service Inspection Fee</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formattedTax}</span>
              </div>
              <div className="flex justify-between text-slate-900 dark:text-white font-extrabold text-sm pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>Total Amount</span>
                <span className="text-blue-600 dark:text-blue-400">{formattedGrandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

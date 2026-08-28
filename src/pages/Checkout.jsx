import React, { useState, useEffect } from 'react';
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
  Globe,
  QrCode,
  History,
  Copy,
  Check,
  Building,
  Smartphone,
  Wallet
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

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'upi', 'paypal', 'crypto', 'netbanking', 'neural'
  const [copiedCrypto, setCopiedCrypto] = useState(false);

  // 1. Start with EMPTY fields (no pre-filled dummy data)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'International / Cyber Sector',
    // Payment Fields
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    upiId: '',
    paypalEmail: '',
    cryptoCoin: 'BTC',
    bankName: 'HDFC Bank',
    bankUserId: '',
    neuralNodeKey: ''
  });

  // 2. Load last 4 saved history options per column from LocalStorage
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
      const updated = [cleanValue, ...filtered].slice(0, 4); // Keep last 4 unique options
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

    // Save all fields to local history
    ['fullName', 'email', 'address', 'city', 'postalCode'].forEach((key) => {
      saveFieldToHistory(key, formData[key]);
    });

    // Trigger celebratory confetti animation
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
          <span>GLOBAL PAYMENT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Forms */}
        <div className="lg:col-span-7 space-y-6">
          {step === 1 ? (
            <div className="p-6 rounded-2xl bg-cyber-card border border-slate-800 glass-card space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="font-mono font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <Truck className="w-4 h-4 text-cyan-400" /> Step 1: Recipient Credentials
                </h2>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <History className="w-3 h-3" /> Auto-Save Enabled
                </span>
              </div>

              <div className="space-y-5 text-xs font-mono">
                {/* Field: Full Name */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Full Name / Recipient</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Enter recipient full name..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                  {/* Last 4 Saved Options Suggestion Chips */}
                  {fieldHistory.fullName && fieldHistory.fullName.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[10px] text-slate-500 flex items-center gap-1"><History className="w-2.5 h-2.5" /> Recent:</span>
                      {fieldHistory.fullName.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectSuggestedOption('fullName', opt)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 border border-slate-700 text-[10px] text-slate-300 transition-all"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Field: Email */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Contact Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="your.email@domain.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                  {/* Last 4 Saved Email Chips */}
                  {fieldHistory.email && fieldHistory.email.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[10px] text-slate-500 flex items-center gap-1"><History className="w-2.5 h-2.5" /> Recent:</span>
                      {fieldHistory.email.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectSuggestedOption('email', opt)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 border border-slate-700 text-[10px] text-slate-300 transition-all"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Field: Address */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Shipping Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="Enter street, building, apartment..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                  />
                  {/* Last 4 Saved Address Chips */}
                  {fieldHistory.address && fieldHistory.address.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[10px] text-slate-500 flex items-center gap-1"><History className="w-2.5 h-2.5" /> Recent:</span>
                      {fieldHistory.address.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectSuggestedOption('address', opt)}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 border border-slate-700 text-[10px] text-slate-300 transition-all"
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
                    <label className="block text-slate-300 font-bold mb-1">City / Sector</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      placeholder="e.g. San Francisco"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    />
                    {fieldHistory.city && fieldHistory.city.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {fieldHistory.city.map((opt, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => selectSuggestedOption('city', opt)}
                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 border border-slate-700 text-[10px] text-slate-300"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Postal / Zip Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      placeholder="e.g. 94105"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                    />
                    {fieldHistory.postalCode && fieldHistory.postalCode.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {fieldHistory.postalCode.map((opt, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => selectSuggestedOption('postalCode', opt)}
                            className="px-2 py-0.5 rounded bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 border border-slate-700 text-[10px] text-slate-300"
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
                className="w-full py-4 rounded-xl bg-cyan-500 text-slate-950 font-bold font-mono text-xs flex items-center justify-center space-x-2 hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <span>CONTINUE TO PAYMENT METHOD</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Step 2: Global International Payment Gateways */
            <div className="p-6 rounded-2xl bg-cyber-card border border-slate-800 glass-card space-y-6">
              <h2 className="font-mono font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                <Globe className="w-4 h-4 text-cyan-400" /> Step 2: Select Global Payment Option
              </h2>

              {/* Payment Gateways Selector Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {/* Option 1: Credit/Debit Cards */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-mono font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  <span>Credit / Debit Card</span>
                </button>

                {/* Option 2: UPI */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-xs font-mono font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-emerald-400" />
                  <span>UPI / GPay / Paytm</span>
                </button>

                {/* Option 3: PayPal */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-xl border text-xs font-mono font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Wallet className="w-5 h-5 text-blue-400" />
                  <span>PayPal Express</span>
                </button>

                {/* Option 4: Bitcoin & Crypto */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  className={`p-3 rounded-xl border text-xs font-mono font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'crypto'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Zap className="w-5 h-5 text-amber-400" />
                  <span>Bitcoin &amp; Crypto</span>
                </button>

                {/* Option 5: Net Banking */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border text-xs font-mono font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Building className="w-5 h-5 text-purple-400" />
                  <span>Net Banking</span>
                </button>

                {/* Option 6: Neural Direct Pay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('neural')}
                  className={`p-3 rounded-xl border text-xs font-mono font-semibold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'neural'
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Cpu className="w-5 h-5 text-rose-400" />
                  <span>Neural Bio-Metric</span>
                </button>
              </div>

              {/* Dynamic Payment Details Forms per Gateway */}

              {/* 1. Credit / Debit Card Form */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="4532 •••• •••• 8890"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="08/28"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">CVC Code</label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        placeholder="999"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. UPI / GPay / Paytm Form */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-2">
                    <span>Instant UPI Payment</span>
                    <span className="text-[10px]">Zero Transaction Fees</span>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Enter VPA / UPI ID (e.g. mobile@upi, gpay, paytm)</label>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      placeholder="username@okicici or 9876543210@paytm"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Scan QR Code via PhonePe / GPay / BHIM:</span>
                    <QrCode className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
              )}

              {/* 3. PayPal Express */}
              {paymentMethod === 'paypal' && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">PayPal Account Email</label>
                    <input
                      type="email"
                      name="paypalEmail"
                      value={formData.paypalEmail}
                      onChange={handleInputChange}
                      placeholder="paypal.user@domain.com"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 text-center font-bold">
                    💳 Redirect to PayPal One-Touch International Authorisation
                  </div>
                </div>
              )}

              {/* 4. Bitcoin & Crypto Deposit */}
              {paymentMethod === 'crypto' && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-400">Select Cryptocurrency</label>
                    <select
                      name="cryptoCoin"
                      value={formData.cryptoCoin}
                      onChange={handleInputChange}
                      className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-amber-400 font-bold"
                    >
                      <option value="BTC">Bitcoin (BTC)</option>
                      <option value="ETH">Ethereum (ETH / ERC-20)</option>
                      <option value="USDT">Tether (USDT TRC-20)</option>
                      <option value="SOL">Solana (SOL)</option>
                    </select>
                  </div>
                  <div>
                    <span className="block text-slate-400 mb-1">Deposit Wallet Address ({formData.cryptoCoin}):</span>
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 rounded-xl p-2 font-mono text-[11px] text-cyan-300">
                      <span className="truncate flex-1">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh')}
                        className="px-2 py-1 rounded bg-slate-800 text-xs text-white hover:bg-slate-700 flex items-center gap-1"
                      >
                        {copiedCrypto ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCrypto ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Net Banking */}
              {paymentMethod === 'netbanking' && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Select Bank</label>
                    <select
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="State Bank of India">State Bank of India (SBI)</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="HSBC International">HSBC International</option>
                      <option value="Chase Bank">Chase Bank (USA)</option>
                      <option value="Barclays">Barclays (UK)</option>
                      <option value="Citi Direct">Citi Direct</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Net Banking User ID / Customer ID</label>
                    <input
                      type="text"
                      name="bankUserId"
                      value={formData.bankUserId}
                      onChange={handleInputChange}
                      placeholder="Enter Customer ID..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>
              )}

              {/* 6. Neural Bio-Metric Pay */}
              {paymentMethod === 'neural' && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs text-center">
                  <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-400 flex items-center justify-center mx-auto animate-pulse">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div className="text-slate-200 font-bold">Zero-Latency Neural Bio-Metric Direct Sync</div>
                  <p className="text-slate-400 text-[11px]">
                    Sub-atomic retinal and synaptic handshake verification active.
                  </p>
                </div>
              )}

              {/* Step Navigation & Action Buttons */}
              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-mono"
                >
                  Back
                </button>
                <button
                  onClick={handleCompleteOrder}
                  className="flex-1 py-4 rounded-xl bg-emerald-500 text-slate-950 font-bold font-mono text-xs flex items-center justify-center space-x-2 hover:bg-emerald-400 transition-all shadow-[0_0_25px_rgba(0,255,136,0.4)]"
                >
                  <Lock className="w-4 h-4" />
                  <span>AUTHORIZE &amp; PAY ({formattedGrandTotal})</span>
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

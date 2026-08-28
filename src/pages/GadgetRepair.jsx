import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartOperations } from '../hooks/useCartOperations';
import { 
  Wrench, 
  Laptop, 
  Smartphone, 
  Tv, 
  Zap, 
  Flame, 
  Building, 
  Mic, 
  Square, 
  Play, 
  Video, 
  Clock, 
  ShieldCheck, 
  Upload, 
  CheckCircle2, 
  Zap as ExpressIcon,
  Plus
} from 'lucide-react';

const REPAIR_CATEGORIES = [
  { id: 'laptop', name: 'Laptops & Computers Repair', icon: Laptop, fee: 29.00 },
  { id: 'smartphone', name: 'Smartphones & Tablets Fix', icon: Smartphone, fee: 19.00 },
  { id: 'tv', name: 'Smart TV & Audio Repair', icon: Tv, fee: 35.00 },
  { id: 'ac', name: 'AC & Cooling Repair', icon: Flame, fee: 39.00 },
  { id: 'kitchen', name: 'Kitchen & Appliance Repair', icon: Wrench, fee: 25.00 },
  { id: 'electrical', name: 'Electrical & Wiring Fix', icon: Zap, fee: 20.00 },
  { id: 'builder', name: 'Carpentry & Builder Works', icon: Building, fee: 45.00 }
];

export const GadgetRepair = () => {
  const navigate = useNavigate();
  const { addToCart } = useCartOperations();

  const [selectedCategory, setSelectedCategory] = useState(REPAIR_CATEGORIES[0]);
  const [productName, setProductName] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [problemDescription, setProblemDescription] = useState('');

  // Audio Voice Recording State Simulation
  const [isRecording, setIsRecording] = useState(false);
  const [hasVoiceNote, setHasVoiceNote] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // Video Upload State Simulation
  const [videoFile, setVideoFile] = useState(null);

  // Dispatch Mode
  const [dispatchType, setDispatchType] = useState('asap'); // 'asap', 'scheduled'
  const [scheduledSlot, setScheduledSlot] = useState('11:30 AM');

  // Simulate Voice Recording timer
  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setRecordingSeconds(0);
      const interval = setInterval(() => {
        setRecordingSeconds(prev => {
          if (prev >= 29) {
            clearInterval(interval);
            setIsRecording(false);
            setHasVoiceNote(true);
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setIsRecording(false);
      setHasVoiceNote(true);
    }
  };

  const handleVideoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0].name);
    }
  };

  const handleBookRepair = (e) => {
    e.preventDefault();

    const dispatchLabel = dispatchType === 'asap' ? 'Express ASAP Dispatch (Within 2 Hours)' : `Scheduled Slot (${scheduledSlot})`;

    addToCart({
      id: `REPAIR-${selectedCategory.id}-${Date.now()}`,
      name: `[Doorstep Repair] ${selectedCategory.name}`,
      brand: productName ? `${productName} (${modelNumber || 'Model N/A'})` : 'Himesh Certified Repair Engineer',
      category: 'Home & Gadget Repair',
      price: selectedCategory.fee,
      originalPrice: selectedCategory.fee * 1.4,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      isService: true,
      inStock: true,
      bookingSlot: dispatchLabel,
      bookingDay: 'Today / Immediate',
      rating: 4.9,
      reviewCount: 520,
      badge: 'Certified Engineer'
    }, 1);

    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 text-white rounded-2xl p-8 shadow-md space-y-3">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Wrench className="w-4 h-4" /> Doorstep Electronics &amp; Home Repair Engine
        </div>
        <h1 className="text-3xl font-extrabold">Gadget, Appliance &amp; Home Builder Repair Services</h1>
        <p className="text-sm text-blue-100 max-w-2xl">
          Specify your product model and issue via Note, 30-sec Voice Recording, or Short Video. Certified engineer dispatched same-day or ASAP within 2 hours!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Category Selector */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Select Repair Category:</h3>
          <div className="space-y-2">
            {REPAIR_CATEGORIES.map(cat => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory.id === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComp className={`w-5 h-5 ${isSelected ? 'text-amber-300' : 'text-blue-600'}`} />
                    <span className="text-xs">{cat.name}</span>
                  </div>
                  <span className="text-xs opacity-90">${cat.fee.toFixed(2)}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Diagnostic Specification Form */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Specify Problem &amp; Attach Media Diagnostic</h3>
              <p className="text-xs text-slate-500">Selected: <strong className="text-blue-600">{selectedCategory.name}</strong></p>
            </div>
            <span className="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 90-Day Repair Warranty
            </span>
          </div>

          <form onSubmit={handleBookRepair} className="space-y-5 text-xs">
            {/* Product & Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Product Name / Brand *</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. MacBook Pro 16 / Samsung Smart TV / Split AC"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Model Number (If available)</label>
                <input
                  type="text"
                  value={modelNumber}
                  onChange={(e) => setModelNumber(e.target.value)}
                  placeholder="e.g. A2485 / QA55Q60A / MS-18CT"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3.5 py-2.5 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Note Description */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Describe the Issue / Problem Note *</label>
              <textarea
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                rows={3}
                placeholder="Describe what is broken or not working (e.g. screen flickering, no power, water leaking, cooling issue)..."
                required
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white"
              />
            </div>

            {/* Voice & Video Media Attachments Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Voice Recording Simulation */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 space-y-3">
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Mic className="w-4 h-4 text-rose-500" /> Record 30s Voice Note</span>
                  <span className="text-[10px] text-slate-400">Audio Diagnostic</span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={handleToggleRecord}
                    className={`p-3 rounded-full text-white font-bold transition-all ${
                      isRecording ? 'bg-rose-600 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>

                  <div className="text-xs font-mono">
                    {isRecording ? (
                      <span className="text-rose-600 font-bold">Recording... {recordingSeconds}s / 30s</span>
                    ) : hasVoiceNote ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Voice Note Saved (30s)</span>
                    ) : (
                      <span className="text-slate-400">Click microphone to record</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Video Attachment Simulation */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 space-y-3">
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Video className="w-4 h-4 text-purple-500" /> Attach Short 30s Video Clip</span>
                  <span className="text-[10px] text-slate-400">Video Diagnostic</span>
                </div>

                <div className="relative">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="p-2.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-center text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4 text-blue-500" />
                    <span>{videoFile ? `Attached: ${videoFile}` : 'Upload 30-sec Video Clip'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Engineer Dispatch Speed */}
            <div className="space-y-2">
              <label className="block font-bold text-slate-700 dark:text-slate-300">Engineer Dispatch Speed:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDispatchType('asap')}
                  className={`p-3.5 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                    dispatchType === 'asap'
                      ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <ExpressIcon className="w-5 h-5" />
                  <div>
                    <div className="text-xs">EXPRESS SAME-DAY DISPATCH</div>
                    <div className="text-[10px] opacity-80">Engineer arrives ASAP within 2 Hours</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDispatchType('scheduled')}
                  className={`p-3.5 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                    dispatchType === 'scheduled'
                      ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  <div>
                    <div className="text-xs">SCHEDULED APPOINTMENT</div>
                    <div className="text-[10px] opacity-80">Select preferred date &amp; time slot</div>
                  </div>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs uppercase shadow-md flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>DISPATCH ENGINEER &amp; BOOK REPAIR (${selectedCategory.fee.toFixed(2)})</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

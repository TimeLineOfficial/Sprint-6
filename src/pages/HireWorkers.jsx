import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartOperations } from '../hooks/useCartOperations';
import { 
  Users, 
  ChefHat, 
  Sparkles, 
  Trees, 
  HeartHandshake, 
  Baby, 
  Car, 
  Shirt, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Star,
  Plus
} from 'lucide-react';

const WORKER_TYPES = [
  {
    id: 'cook',
    title: 'Private Home Cook / Chef',
    desc: 'Expert home cooks for veg/non-veg meals, breakfast & dinner',
    icon: ChefHat,
    price: 35.00,
    rateUnit: 'per meal / day',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cleaner',
    title: 'House Cleaning & Maid',
    desc: 'Daily or occasional broom, mop, vessel washing & dusting',
    icon: Sparkles,
    price: 25.00,
    rateUnit: 'per visit',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'gardener',
    title: 'Gardener & Lawn Specialist',
    desc: 'Plant pruning, soil fertilizing, lawn mowing & pot maintenance',
    icon: Trees,
    price: 30.00,
    rateUnit: 'per session',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb24657?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'elderly_care',
    title: 'Elderly Care Assistant & Nurse',
    desc: 'Compassionate companion for medicine timing, mobility & care',
    icon: HeartHandshake,
    price: 45.00,
    rateUnit: 'per shift',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'babysitter',
    title: 'Certified Nanny & Babysitter',
    desc: 'Child safety, feeding, playtime & homework supervision',
    icon: Baby,
    price: 38.00,
    rateUnit: 'per session',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'driver',
    title: 'Personal Chauffeur & Driver',
    desc: 'On-demand hourly or daily outstation / city personal driver',
    icon: Car,
    price: 40.00,
    rateUnit: 'per 8 hours',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'laundry',
    title: 'Laundry & Ironing Specialist',
    desc: 'Doorstep clothes wash, fold & steam iron service',
    icon: Shirt,
    price: 20.00,
    rateUnit: 'per 15 clothes',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=80'
  }
];

export const HireWorkers = () => {
  const navigate = useNavigate();
  const { addToCart } = useCartOperations();

  const [selectedWorker, setSelectedWorker] = useState(WORKER_TYPES[0]);
  const [frequency, setFrequency] = useState('one_time'); // 'one_time', 'daily', 'occasional', 'monthly'
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Wed', 'Fri']);
  const [startDate, setStartDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('08:30 AM');

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleBookWorker = () => {
    const frequencyLabel = 
      frequency === 'one_time' ? 'One-Time Task' :
      frequency === 'daily' ? 'Daily Recurring' :
      frequency === 'occasional' ? `Occasional (${selectedDays.join(', ')})` : 'Monthly Subscription Contract';

    addToCart({
      id: `WORKER-${selectedWorker.id}-${Date.now()}`,
      name: `[Domestic Staff] ${selectedWorker.title}`,
      brand: 'Himesh Certified Domestic Worker',
      category: 'Home Worker Hire',
      price: selectedWorker.price,
      originalPrice: selectedWorker.price * 1.3,
      image: selectedWorker.image,
      isService: true,
      inStock: true,
      bookingSlot: `${selectedTime} (${frequencyLabel})`,
      bookingDay: `${startDate} onwards`,
      rating: 4.9,
      reviewCount: 380,
      badge: 'Background Verified'
    }, 1);

    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-900 text-white rounded-2xl p-8 shadow-md space-y-3">
        <div className="flex items-center space-x-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
          <Users className="w-4 h-4" /> Hire Certified Domestic Workers
        </div>
        <h1 className="text-3xl font-extrabold">Hire Cooks, Cleaners, Gardeners &amp; Home Staff</h1>
        <p className="text-sm text-emerald-100 max-w-2xl">
          Background-verified staff for one-time tasks, daily visits, weekly schedules, or long-term monthly contracts with 100% replacement guarantee.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Worker Type Selector List */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Select Staff Service:</h3>
          <div className="space-y-3">
            {WORKER_TYPES.map(worker => {
              const IconComp = worker.icon;
              const isSelected = selectedWorker.id === worker.id;
              return (
                <div
                  key={worker.id}
                  onClick={() => setSelectedWorker(worker)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <img src={worker.image} alt={worker.title} className="w-14 h-14 object-cover rounded-lg" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                        <IconComp className="w-4 h-4 text-emerald-600" />
                        <span>{worker.title}</span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{worker.desc}</div>
                      <div className="text-xs font-extrabold text-emerald-600 mt-1">${worker.price.toFixed(2)} <span className="text-[10px] font-normal text-slate-400">/{worker.rateUnit}</span></div>
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'}`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule & Frequency Configurator */}
        <div className="lg:col-span-6 sticky top-24 space-y-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Configure Service Schedule</h3>
            <p className="text-xs text-slate-500">Selected: <strong className="text-emerald-600">{selectedWorker.title}</strong></p>
          </div>

          {/* Frequency Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Service Frequency</label>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              {[
                { id: 'one_time', label: 'One-Time Visit' },
                { id: 'daily', label: 'Daily Basis' },
                { id: 'occasional', label: 'Occasional / Weekly' },
                { id: 'monthly', label: 'Monthly Contract' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFrequency(item.id)}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    frequency === item.id 
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold' 
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Days of Week (for Occasional) */}
          {frequency === 'occasional' && (
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Select Preferred Days of Week:</label>
              <div className="flex flex-wrap gap-1.5">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedDays.includes(day)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Time Slot Picker */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Preferred Shift / Arrival Time:</label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {['07:00 AM', '08:30 AM', '11:00 AM', '02:30 PM', '05:00 PM', '07:30 PM'].map(time => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-2 rounded-lg border font-bold transition-all flex items-center justify-center space-x-1 ${
                    selectedTime === time 
                      ? 'bg-emerald-600 text-white border-emerald-600' 
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>{time}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Security & Verification Banner */}
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
            <div className="font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Background Verified &amp; Police Clearance
            </div>
            <p className="text-[11px]">Free worker replacement within 24 hours if unsatisfied.</p>
          </div>

          <button
            onClick={handleBookWorker}
            className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase shadow-md flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>BOOK WORKER (${selectedWorker.price.toFixed(2)})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

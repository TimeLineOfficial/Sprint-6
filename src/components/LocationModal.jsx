import React, { useState } from 'react';
import { MapPin, X, Check, Globe, Building } from 'lucide-react';

export const LocationModal = ({ isOpen, onClose, currentAddress, onSaveAddress }) => {
  const [address, setAddress] = useState(currentAddress.address || '');
  const [city, setCity] = useState(currentAddress.city || 'New York');
  const [pincode, setPincode] = useState(currentAddress.pincode || '10001');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveAddress({ address, city, pincode });
    onClose();
  };

  const handlePresetSelect = (presetCity, presetPincode) => {
    setCity(presetCity);
    setPincode(presetPincode);
    onSaveAddress({ address, city: presetCity, pincode: presetPincode });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-base">
            <MapPin className="w-5 h-5 text-amber-500" />
            <span>Select Delivery Location</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="space-y-2 text-xs">
          <div className="font-semibold text-slate-500 dark:text-slate-400">Quick Popular Cities:</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { name: 'New York', pincode: '10001' },
              { name: 'Mumbai', pincode: '400001' },
              { name: 'London', pincode: 'W1U 8ED' },
              { name: 'Delhi', pincode: '110001' },
              { name: 'Dubai', pincode: '00000' },
              { name: 'California', pincode: '90210' }
            ].map(preset => (
              <button
                key={preset.name}
                type="button"
                onClick={() => handlePresetSelect(preset.name, preset.pincode)}
                className={`px-3 py-2 rounded-lg border text-left flex flex-col transition-all ${
                  city.toLowerCase() === preset.name.toLowerCase()
                    ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold dark:bg-slate-700 dark:text-blue-300'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                }`}
              >
                <span>{preset.name}</span>
                <span className="text-[10px] text-slate-400">{preset.pincode}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Address Input Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Street / House Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Flat 402, Sunshine Apartments"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">City / Region</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. New York"
                required
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Postal Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="e.g. 10001"
                required
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase shadow-sm"
            >
              Update Location
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

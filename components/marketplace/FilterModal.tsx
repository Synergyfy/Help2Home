'use client';

import { useMarketplaceStore } from '@/store/marketplaceStore';
import { FaXmark } from "react-icons/fa6";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const filters = useMarketplaceStore((state) => state.filters);
  const setLocation = useMarketplaceStore((state) => state.setLocation);
  const setBedrooms = useMarketplaceStore((state) => state.setBedrooms);
  const setBathrooms = useMarketplaceStore((state) => state.setBathrooms);
  const setPriceRange = useMarketplaceStore((state) => state.setPriceRange);
  const resetFilters = useMarketplaceStore((state) => state.resetFilters);

  const bedroomOptions = [1, 2, 3, 4, 5];
  const bathroomOptions = [1, 2, 3, 4, 5];
  const nigerianStates = [
    'Abuja FCT', 'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
    'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
    'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
    'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
    'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div className="fixed inset-0 z-50 flex items-end md:items-start justify-center md:justify-end">
        <div className="w-full md:w-1/2 h-full md:h-screen bg-white rounded-t-3xl md:rounded-l-3xl shadow-2xl overflow-y-auto p-6 md:p-8 animate-slide-up md:animate-slide-right">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Filter Properties</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Close"
            >
              <FaXmark className='w-4 h-4'/>
            </button>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Location</label>
            <select
              value={filters.location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {nigerianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Price Range: ₦{filters.priceRange.min.toLocaleString()} - ₦{filters.priceRange.max.toLocaleString()}
            </label>
            <div className="flex gap-2">
              <input
                type="range"
                min={0}
                max={10000000}
                step={100000}
                value={filters.priceRange.min}
                onChange={(e) => setPriceRange({ ...filters.priceRange, min: Number(e.target.value) })}
                className="w-full h-2 accent-green-500"
              />
              <input
                type="range"
                min={0}
                max={10000000}
                step={100000}
                value={filters.priceRange.max}
                onChange={(e) => setPriceRange({ ...filters.priceRange, max: Number(e.target.value) })}
                className="w-full h-2 accent-green-500"
              />
            </div>
          </div>

          {/* Bedrooms */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Bedrooms</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setBedrooms(null)}
                className={`px-4 py-2 rounded-xl font-medium ${filters.bedrooms === null ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
              >
                Any
              </button>
              {bedroomOptions.map((b) => (
                <button
                  key={b}
                  onClick={() => setBedrooms(b)}
                  className={`px-4 py-2 rounded-xl font-medium ${filters.bedrooms === b ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
                >
                  {b}+
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Bathrooms</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setBathrooms(null)}
                className={`px-4 py-2 rounded-xl font-medium ${filters.bathrooms === null ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
              >
                Any
              </button>
              {bathroomOptions.map((b) => (
                <button
                  key={b}
                  onClick={() => setBathrooms(b)}
                  className={`px-4 py-2 rounded-xl font-medium ${filters.bathrooms === b ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
                >
                  {b}+
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={resetFilters}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-bold hover:bg-gray-50 transition"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes slide-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        .animate-slide-right { animation: slide-right 0.3s ease-out; }
      `}</style>
    </>
  );
}

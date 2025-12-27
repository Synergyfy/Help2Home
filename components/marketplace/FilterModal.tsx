'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaXmark } from 'react-icons/fa6';
import { useMarketplaceStore } from '@/store/marketplaceStore';
import { useLocations } from '@/hooks/useMarketplaceQueries';
import { useDebounce } from '@/hooks/useDebounce';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const {
    filters,
    setLocation,
    setRadius,
    setBedrooms,
    setBathrooms,
    setPriceRange,
    setFurnished,
    setParking,
    setGarden,
    setPool,
    resetFilters,
  } = useMarketplaceStore();

  const [locationInput, setLocationInput] = useState(filters.location);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  // Debounce location input
  const debouncedLocationQuery = useDebounce(locationInput, 300);
  const { data: locations, isLoading: locationsLoading } = useLocations(debouncedLocationQuery);

  // Sync store location with input
  useEffect(() => {
    setLocationInput(filters.location);
  }, [filters.location]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const bedroomOptions = [1, 2, 3, 4, 5];
  const bathroomOptions = [1, 2, 3, 4, 5];
  const radiusOptions = [
    { label: '1 mile', value: 1 },
    { label: '3 miles', value: 3 },
    { label: '5 miles', value: 5 },
    { label: '10 miles', value: 10 },
    { label: '15 miles', value: 15 },
    { label: '20 miles', value: 20 },
  ];

  const handleLocationSelect = (locationName: string) => {
    setLocationInput(locationName);
    setLocation(locationName);
    setShowLocationSuggestions(false);
  };

  const handleApplyFilters = () => {
    if (locationInput !== filters.location) {
      setLocation(locationInput);
    }
    onClose();
  };

  const handleResetFilters = () => {
    resetFilters();
    setLocationInput('');
  };

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
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full md:w-[480px] h-full bg-white md:rounded-l-3xl shadow-2xl overflow-y-auto"
        >
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Advanced Filters</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <FaXmark className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Location with Autocomplete */}
            <div className="mb-6" ref={locationRef}>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Victoria Island, Lagos"
                  value={locationInput}
                  onChange={(e) => {
                    setLocationInput(e.target.value);
                    setShowLocationSuggestions(true);
                  }}
                  onFocus={() => setShowLocationSuggestions(true)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                />
                {locationInput && (
                  <button
                    onClick={() => {
                      setLocationInput('');
                      setLocation('');
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}

                {/* Location Suggestions */}
                {showLocationSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
                    {locationsLoading && (
                      <div className="px-4 py-6 text-center text-gray-500">
                        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                        <p className="mt-2 text-sm">Loading locations...</p>
                      </div>
                    )}

                    {!locationsLoading && locations && locations.length > 0 && (
                      <div className="py-2">
                        {locations.map((location) => (
                          <button
                            key={location.id}
                            onClick={() => handleLocationSelect(location.name)}
                            className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                          >
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">{location.name}</div>
                              <div className="text-xs text-gray-500">
                                {location.propertyCount} {location.propertyCount === 1 ? 'property' : 'properties'}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {!locationsLoading && locations && locations.length === 0 && (
                      <div className="px-4 py-6 text-center text-gray-500">
                        <p className="text-sm">No locations found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Radius */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Search Radius
              </label>
              <div className="grid grid-cols-3 gap-2">
                {radiusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setRadius(option.value)}
                    className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                      filters.radius === option.value
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Price Range
              </label>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Min: ₦{(filters.priceRange.min / 1000000).toFixed(1)}M</span>
                    <span>Max: ₦{(filters.priceRange.max / 1000000).toFixed(1)}M</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={500000000}
                    step={10000000}
                    value={filters.priceRange.min}
                    onChange={(e) => setPriceRange({ ...filters.priceRange, min: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
                <div>
                  <input
                    type="range"
                    min={0}
                    max={500000000}
                    step={10000000}
                    value={filters.priceRange.max}
                    onChange={(e) => setPriceRange({ ...filters.priceRange, max: Number(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Bedrooms
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setBedrooms(null)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    filters.bedrooms === null
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Any
                </button>
                {bedroomOptions.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBedrooms(b)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all ${
                      filters.bedrooms === b
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {b}+
                  </button>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Bathrooms
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setBathrooms(null)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    filters.bathrooms === null
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Any
                </button>
                {bathroomOptions.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBathrooms(b)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all ${
                      filters.bathrooms === b
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {b}+
                  </button>
                ))}
              </div>
            </div>

            {/* Furnishing */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Furnishing
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFurnished(null)}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                    filters.furnished === null
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Any
                </button>
                <button
                  onClick={() => setFurnished(true)}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                    filters.furnished === true
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Furnished
                </button>
                <button
                  onClick={() => setFurnished(false)}
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                    filters.furnished === false
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Unfurnished
                </button>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-3">
                Must have amenities
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.garden === true}
                    onChange={(e) => setGarden(e.target.checked ? true : null)}
                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    Garden
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.parking === true}
                    onChange={(e) => setParking(e.target.checked ? true : null)}
                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    Parking
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.pool === true}
                    onChange={(e) => setPool(e.target.checked ? true : null)}
                    className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    Swimming Pool
                  </span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={handleApplyFilters}
                className="w-full px-6 py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                Apply Filters
              </button>
              <button
                onClick={handleResetFilters}
                className="w-full px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMarketplaceStore } from '@/store/marketplaceStore';
import { useLocations } from '@/hooks/useMarketplaceQueries';
import { useDebounce } from '@/hooks/useDebounce';
import FilterModal from './FilterModal';

export default function AdvancedFilterBar() {
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
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  // Debounce location input
  const debouncedLocationQuery = useDebounce(locationInput, 300);
  const { data: locations } = useLocations(debouncedLocationQuery);

  // Sync store location with input
  useEffect(() => {
    setLocationInput(filters.location);
  }, [filters.location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
      }
      setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const radiusOptions = [
    { label: '+ 1 mile', value: 1 },
    { label: '+ 3 miles', value: 3 },
    { label: '+ 5 miles', value: 5 },
    { label: '+ 10 miles', value: 10 },
    { label: '+ 15 miles', value: 15 },
    { label: '+ 20 miles', value: 20 },
  ];

  const bedroomOptions = [
    { label: 'Any beds', value: null },
    { label: '1+ beds', value: 1 },
    { label: '2+ beds', value: 2 },
    { label: '3+ beds', value: 3 },
    { label: '4+ beds', value: 4 },
    { label: '5+ beds', value: 5 },
  ];

  const priceOptions = [
    { label: '₦10M', value: 10000000 },
    { label: '₦20M', value: 20000000 },
    { label: '₦30M', value: 30000000 },
    { label: '₦50M', value: 50000000 },
    { label: '₦75M', value: 75000000 },
    { label: '₦100M', value: 100000000 },
    { label: '₦150M', value: 150000000 },
    { label: '₦200M', value: 200000000 },
  ];

  const bathroomOptions = [
    { label: 'Any', value: null },
    { label: '1+', value: 1 },
    { label: '2+', value: 2 },
    { label: '3+', value: 3 },
    { label: '4+', value: 4 },
  ];

  const furnishingOptions = [
    { label: 'Any', value: null },
    { label: 'Furnished', value: true },
    { label: 'Unfurnished', value: false },
  ];

  // Count active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.bedrooms !== null) count++;
    if (filters.bathrooms !== null) count++;
    if (filters.priceRange.min > 0 || filters.priceRange.max < 500000000) count++;
    if (filters.furnished !== null) count++;
    if (filters.parking !== null) count++;
    if (filters.garden !== null) count++;
    if (filters.pool !== null) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  const DropdownButton = ({
    label,
    value,
    options,
    onChange,
    icon,
  }: {
    label: string;
    value: string | number;
    options: Array<{ label: string; value: any }>;
    onChange: (val: any) => void;
    icon?: React.ReactNode;
  }) => {
    const isOpen = openDropdown === label;

    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpenDropdown(isOpen ? null : label);
          }}
          className="h-11 px-4 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-all flex items-center gap-2 text-sm font-medium text-gray-700 min-w-[120px] justify-between whitespace-nowrap"
        >
          <span className="flex items-center gap-2">
            {icon}
            {value}
          </span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 min-w-[180px] max-h-[300px] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onChange(option.value);
                    setOpenDropdown(null);
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-purple-50 transition-colors text-sm text-gray-700 border-b border-gray-100 last:border-b-0"
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const handleLocationSelect = (locationName: string) => {
    setLocationInput(locationName);
    setLocation(locationName);
    setShowLocationSuggestions(false);
  };

  const handleLocationSubmit = () => {
    setLocation(locationInput);
    setShowLocationSuggestions(false);
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Mobile: Single Filter Button */}
          <div className="flex md:hidden items-center gap-3">
            <div className="relative flex-1" ref={locationRef}>
              <input
                type="text"
                placeholder="Enter a location"
                value={locationInput}
                onChange={(e) => {
                  setLocationInput(e.target.value);
                  setShowLocationSuggestions(true);
                }}
                onFocus={() => setShowLocationSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLocationSubmit();
                  }
                }}
                className="w-full h-11 pl-4 pr-10 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm text-gray-900"
              />
              {locationInput && (
                <button
                  onClick={() => {
                    setLocationInput('');
                    setLocation('');
                    setShowLocationSuggestions(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Mobile Location Suggestions */}
              {showLocationSuggestions && locations && locations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto"
                >
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleLocationSelect(location.name)}
                      className="w-full px-4 py-2.5 text-left hover:bg-purple-50 transition-colors flex items-center gap-2 border-b border-gray-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{location.name}</div>
                        <div className="text-xs text-gray-500">{location.propertyCount} properties</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilterModal(true)}
              className="h-11 px-5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all flex items-center gap-2 font-medium text-sm whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              Filters
              {activeFiltersCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs bg-red-500 text-white rounded-full font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Desktop: Full Filter Row */}
          <div className="hidden md:flex flex-wrap items-center gap-3">
            {/* Location Input */}
            <div className="relative flex-1 min-w-[200px] max-w-xs" ref={locationRef}>
              <input
                type="text"
                placeholder="Enter a location"
                value={locationInput}
                onChange={(e) => {
                  setLocationInput(e.target.value);
                  setShowLocationSuggestions(true);
                }}
                onFocus={() => setShowLocationSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLocationSubmit();
                  }
                }}
                className="w-full h-11 pl-4 pr-10 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-sm text-gray-900"
              />
              {locationInput && (
                <button
                  onClick={() => {
                    setLocationInput('');
                    setLocation('');
                    setShowLocationSuggestions(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Location Suggestions Dropdown */}
              {showLocationSuggestions && locations && locations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto"
                >
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleLocationSelect(location.name)}
                      className="w-full px-4 py-2.5 text-left hover:bg-purple-50 transition-colors flex items-center gap-2 border-b border-gray-100 last:border-b-0"
                    >
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{location.name}</div>
                        <div className="text-xs text-gray-500">{location.propertyCount} properties</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Radius Dropdown */}
            <DropdownButton
              label="Radius"
              value={`+ ${filters.radius} ${filters.radius === 1 ? 'mile' : 'miles'}`}
              options={radiusOptions}
              onChange={setRadius}
            />

            {/* Bedrooms Dropdown */}
            <DropdownButton
              label="Bedrooms"
              value={filters.bedrooms ? `${filters.bedrooms}+ beds` : 'Any beds'}
              options={bedroomOptions}
              onChange={setBedrooms}
            />

            {/* Price Dropdown */}
            <DropdownButton
              label="Price"
              value={`₦${filters.priceRange.min / 1000000}M min`}
              options={priceOptions}
              onChange={(val) => setPriceRange({ ...filters.priceRange, min: val })}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />

            {/* More Filters Button */}
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="h-11 px-5 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all flex items-center gap-2 font-medium text-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <span className="hidden sm:inline">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs bg-red-500 text-white rounded-full font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* More Filters Panel (Desktop Only) */}
          <AnimatePresence>
            {showMoreFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden md:block overflow-hidden"
              >
                <div className="pt-6 mt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Bathrooms */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Bathrooms</label>
                      <select
                        value={filters.bathrooms ?? ''}
                        onChange={(e) => setBathrooms(e.target.value ? Number(e.target.value) : null)}
                        className="w-full h-11 px-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      >
                        {bathroomOptions.map((option) => (
                          <option key={option.label} value={option.value ?? ''}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Max Price */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price</label>
                      <select
                        value={filters.priceRange.max}
                        onChange={(e) => setPriceRange({ ...filters.priceRange, max: Number(e.target.value) })}
                        className="w-full h-11 px-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      >
                        <option value={500000000}>No max</option>
                        {priceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Furnishing */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Furnishing</label>
                      <select
                        value={filters.furnished === null ? '' : filters.furnished.toString()}
                        onChange={(e) =>
                          setFurnished(e.target.value === '' ? null : e.target.value === 'true')
                        }
                        className="w-full h-11 px-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      >
                        {furnishingOptions.map((option) => (
                          <option key={option.label} value={option.value === null ? '' : option.value.toString()}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Must have</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.garden === true}
                          onChange={(e) => setGarden(e.target.checked ? true : null)}
                          className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">Garden</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.parking === true}
                          onChange={(e) => setParking(e.target.checked ? true : null)}
                          className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">Parking</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.pool === true}
                          onChange={(e) => setPool(e.target.checked ? true : null)}
                          className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900">Pool</span>
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setShowMoreFilters(false)}
                      className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg"
                    >
                      Apply filters
                    </button>
                    <button
                      onClick={() => {
                        resetFilters();
                        setLocationInput('');
                      }}
                      className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold transition-all"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Filter Modal for Mobile */}
      <FilterModal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} />
    </>
  );
}
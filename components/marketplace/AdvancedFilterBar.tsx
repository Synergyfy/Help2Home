'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMarketplaceStore } from '@/store/marketplaceStore';
import { useLocations } from '@/hooks/useMarketplaceQueries';
import { useDebounce } from '@/hooks/useDebounce';

import { HiOutlineMapPin, HiOutlineAdjustmentsHorizontal, HiChevronDown, HiXMark } from "react-icons/hi2";
import { MdOutlineAttachMoney, MdOutlineGridView } from "react-icons/md";
import FilterModal from './FilterModal';

export default function AdvancedFilterBar() {
  const {
    filters,
    setLocation,
    setFilters,
    resetAdvancedFilters, 
  } = useMarketplaceStore();

  const [locationInput, setLocationInput] = useState(filters.location || '');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  const debouncedLocationQuery = useDebounce(locationInput, 300);
  const { data: locations, isLoading } = useLocations(debouncedLocationQuery);

  useEffect(() => {
    setLocationInput(filters.location || '');
  }, [filters.location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- Logic: Clear advanced filters when basic ones are touched ---
  const handleBasicChange = (update: any) => {
    resetAdvancedFilters(); // Wipe modal-specific data
    setFilters(update);
  };

  const handleLocationSelect = (locationName: string) => {
    resetAdvancedFilters(); // Wipe modal-specific data
    setLocationInput(locationName);
    setLocation(locationName);
    setShowLocationSuggestions(false);
  };

  const radiusOptions = [
    { label: 'Exact location', value: 0 },
    { label: '+ 5 miles', value: 5 },
    { label: '+ 10 miles', value: 10 },
    { label: '+ 20 miles', value: 20 },
  ];

  const bedroomOptions = [
    { label: 'Any beds', value: 0 },
    { label: '1+ beds', value: 1 },
    { label: '2+ beds', value: 2 },
    { label: '3+ beds', value: 3 },
    { label: '4+ beds', value: 4 },
  ];

  const priceOptions = [
    { label: 'Any Price', value: 0 },
    { label: '₦500k+', value: 500000 },
    { label: '₦1M+', value: 1000000 },
    { label: '₦5M+', value: 5000000 },
    { label: '₦10M+', value: 10000000 },
    { label: '₦50M+', value: 50000000 },
    { label: '₦100M+', value: 100000000 },
  ];

  const formatPriceLabel = (value: number) => {
    if (!value || value === 0) return 'Any Price';
    if (value >= 1000000) return `₦${value / 1000000}M+`;
    return `₦${(value / 1000).toLocaleString()}k+`;
  };

 // Inside AdvancedFilterBar.tsx
const getActiveFiltersCount = () => {
  let count = 0;
  if (filters.propertyType && filters.propertyType.length > 0) count++;
  if (filters.keywords && filters.keywords.trim() !== "") count++;
  
  // Only count if it's explicitly true (the user toggled the "Verified Only" filter)
  if (filters.isVerified === true) count++; 
  
  return count;
};

  const DropdownButton = ({ label, displayValue, options, onChange, icon: Icon }: any) => {
    const isOpen = openDropdown === label;
    return (
      <div className="relative dropdown-container">
        <button
          type="button"
          onClick={() => setOpenDropdown(isOpen ? null : label)}
          className={`h-11 px-4 bg-white border ${isOpen ? 'border-brand-green ring-1 ring-brand-green' : 'border-gray-300'} rounded-lg hover:border-brand-green transition-all flex items-center gap-2 text-sm font-medium text-gray-700 min-w-[145px] justify-between`}
        >
          <span className="flex items-center gap-2 truncate">
            {Icon && <Icon className="w-4 h-4 text-gray-400" />}
            {displayValue}
          </span>
          <HiChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
              className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-[70] min-w-[200px] py-1"
            >
              {options.map((option: any, index: number) => (
                <button
                  key={index}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange(option.value);
                    setOpenDropdown(null);
                  }}
                  className="w-full px-4 py-2.5 text-left hover:bg-green-50 hover:text-brand-green transition-colors text-sm text-gray-700"
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

  return (
    <>
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            
            <div className="relative flex-1 min-w-[280px]" ref={locationRef}>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <HiOutlineMapPin className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="City, neighborhood, or address..."
                value={locationInput}
                onChange={(e) => {
                  setLocationInput(e.target.value);
                  setShowLocationSuggestions(true);
                }}
                onFocus={() => setShowLocationSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLocationSelect(locationInput);
                    (e.target as HTMLInputElement).blur();
                  }
                }}
                className="w-full h-11 pl-10 pr-10 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green focus:border-brand-green outline-none text-sm transition-all shadow-sm"
              />
              {locationInput && (
                <button 
                  onClick={() => { handleLocationSelect(''); }} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-green transition-colors"
                >
                  <HiXMark className="w-4 h-4" />
                </button>
              )}

              <AnimatePresence>
                {showLocationSuggestions && locationInput.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-[80] max-h-80 overflow-y-auto p-2"
                  >
                    {isLoading ? (
                      <div className="p-4 text-center text-sm text-gray-500">Searching...</div>
                    ) : locations && locations.length > 0 ? (
                      locations.map((loc: any) => (
                        <button 
                          key={loc.id} 
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleLocationSelect(loc.name);
                          }} 
                          className="w-full px-4 py-3 text-left hover:bg-green-50 rounded-lg flex items-center gap-3 transition-colors group"
                        >
                          <div className="p-2 bg-gray-100 group-hover:bg-brand-green/10 rounded-md">
                            <HiOutlineMapPin className="w-4 h-4 text-brand-green" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{loc.name}</div>
                            <div className="text-xs text-gray-500">{loc.propertyCount} properties available</div>
                          </div>
                        </button>
                      ))
                    ) : null}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <DropdownButton
                label="Radius"
                displayValue={filters.radius === 0 ? 'Exact' : `+ ${filters.radius} miles`}
                options={radiusOptions}
                onChange={(val: number) => handleBasicChange({ radius: val })}
              />
              <DropdownButton
                label="Bedrooms"
                displayValue={(filters.bedrooms?.min ?? 0) > 0 ? `${filters.bedrooms?.min}+ beds` : 'Any beds'}
                options={bedroomOptions}
                icon={MdOutlineGridView}
                onChange={(val: number) => handleBasicChange({
                  bedrooms: { ...(filters.bedrooms || { min: 0, max: 0 }), min: val }
                })}
              />
              <DropdownButton
                label="Price"
                displayValue={formatPriceLabel(filters.priceRange.min)}
                options={priceOptions}
                icon={MdOutlineAttachMoney}
                onChange={(val: number) => handleBasicChange({ priceRange: { ...filters.priceRange, min: val } })}
              />
            </div>

            <button
              onClick={() => setShowFilterModal(true)}
              className="h-11 px-5 bg-brand-green hover:bg-opacity-90 text-white rounded-lg transition-all flex items-center gap-2 font-bold text-sm shadow-md"
            >
              <HiOutlineAdjustmentsHorizontal className="w-5 h-5" />
              <span>Filters</span>
              {getActiveFiltersCount() > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-[10px] bg-white text-brand-green rounded-full font-black">
                  {getActiveFiltersCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <FilterModal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} />
    </>
  );
}
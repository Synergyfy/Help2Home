'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useMarketplaceStore, PropertyType } from '@/store/marketplaceStore';
import { useLocations } from '@/hooks/useMarketplaceQueries';
import { useDebounce } from '@/hooks/useDebounce';

import {
  HiOutlineMapPin,
  HiOutlineAdjustmentsHorizontal,
  HiChevronDown,
  HiOutlineHome,
  HiXMark
} from "react-icons/hi2";
import { MdOutlineAttachMoney, MdOutlineGridView } from "react-icons/md";
import FilterModal from './FilterModal';

export default function AdvancedFilterBar() {
  const { filters, setLocation, setFilters, resetAdvancedFilters, toggleCategory } = useMarketplaceStore();
  const isRent = filters.propertyType === 'rent';

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
      }
      if (!(event.target as HTMLElement).closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBasicChange = (update: any) => {
    resetAdvancedFilters?.();
    setFilters(update);
  };

  const handleLocationSelect = (locationName: string) => {
    setLocationInput(locationName);
    setLocation(locationName);
    setShowLocationSuggestions(false);
  };

  const clearLocation = () => {
    setLocationInput('');
    setLocation('');
    setShowLocationSuggestions(false);
  };

  const radiusOptions = [
    { label: 'Exact location', value: 0 },
    { label: '+ 5 miles', value: 5 },
    { label: '+ 10 miles', value: 10 },
    { label: '+ 20 miles', value: 20 },
  ];

  const bedOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  const saleTotalPrices = [0, 5000000, 10000000, 20000000, 50000000, 100000000, 250000000, 500000000, 1000000000];
  const rentPrices = [0, 500000, 1000000, 2000000, 5000000, 10000000, 20000000];

  const activePriceValues = isRent ? rentPrices : saleTotalPrices;
  const propertyTypes = ["Bungalows", "Detached", "Farms/land", "Semi-detached", "Terraced", "Flats"];

  const formatCurrency = (val: number) => {
    if (val === 0) return "No min";
    if (val >= 1000000000) return `₦1B`;
    if (val >= 1000000) return `₦${val / 1000000}M`;
    return `₦${(val / 1000).toLocaleString()}k`;
  };

  const getPriceDisplayLabel = () => {
    const min = filters.priceRange?.min ?? 0;
    if (min === 0) return 'Price';
    return `${formatCurrency(min)}${isRent ? '/yr' : ''}`;
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.propertyType && filters.propertyType.length > 0) count++;
    if (filters.keywords && filters.keywords.trim() !== "") count++;
    if (filters.isVerified === true) count++;
    return count;
  };

  const CustomDropdown = ({ label, displayValue, icon: Icon, children, width = "w-[240px]" }: any) => {
    const isOpen = openDropdown === label;
    return (
      <div className="relative dropdown-container shrink-0">
        <button
          type="button"
          onClick={() => setOpenDropdown(isOpen ? null : label)}
          className={`h-11 px-4 bg-white border ${isOpen ? 'border-brand-green ring-1 ring-brand-green' : 'border-gray-300'} rounded-lg hover:border-brand-green transition-all flex items-center gap-2 text-sm font-medium text-gray-700 justify-between whitespace-nowrap`}
        >
          <span className="flex items-center gap-2 truncate">
            {Icon && <Icon className="w-4 h-4 text-gray-400" />}
            {displayValue}
          </span>
          <HiChevronDown className={`w-4 h-4 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
              className={`absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-70 p-4 ${width}`}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 w-full">
        <div className="w-full px-4 py-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
            
            {/* 0. Property Type Toggle */}
            <div className="flex flex-col gap-1 shrink-0">
              <span className="text-[10px] font-bold text-gray-400 uppercase px-1">Search Mode</span>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                {(['rent', 'buy', 'service-apartment', 'rent-to-own', 'invest'] as PropertyType[]).map((type) => {
                  const isActive = filters.propertyType === type;
                  const colors: Record<PropertyType, string> = {
                    rent: 'bg-brand-green text-white shadow-brand-green/20',
                    buy: 'bg-blue-600 text-white shadow-blue-600/20',
                    'service-apartment': 'bg-indigo-600 text-white shadow-indigo-600/20',
                    'rent-to-own': 'bg-orange-500 text-white shadow-orange-500/20',
                    invest: 'bg-slate-800 text-white shadow-slate-800/20'
                  };

                  return (
                    <button
                      key={type}
                      onClick={() => handleBasicChange({ propertyType: type })}
                      className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase transition-all whitespace-nowrap shadow-sm ${
                        isActive
                          ? `${colors[type]} scale-105`
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200 shadow-none'
                      }`}
                    >
                      {type.split('-').join(' ')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 1. Location Input */}
            <div className="relative flex-1 min-w-0 lg:min-w-[280px]" ref={locationRef}>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <HiOutlineMapPin className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="City, neighborhood..."
                value={locationInput}
                onChange={(e) => { setLocationInput(e.target.value); setShowLocationSuggestions(true); }}
                onFocus={() => setShowLocationSuggestions(true)}
                className="w-full h-11 pl-10 pr-10 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green outline-none text-sm transition-all"
              />
              {locationInput && (
                <button onClick={clearLocation} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                  <HiXMark className="w-4 h-4" />
                </button>
              )}

              <AnimatePresence>
                {showLocationSuggestions && locationInput.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-80 overflow-hidden max-h-64 overflow-y-auto">
                    {isLoading ? <div className="p-4 text-center text-sm text-gray-500">Searching...</div> :
                      locations?.map((loc: any) => (
                        <button key={loc.id} onClick={() => handleLocationSelect(loc.name)} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-3 border-b border-gray-50 last:border-none">
                          <HiOutlineMapPin className="text-brand-green" />
                          <div>
                            <p className="font-semibold text-gray-800">{loc.name}</p>
                            <p className="text-xs text-gray-400">{loc.propertyCount} properties</p>
                          </div>
                        </button>
                      ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-nowrap overflow-x-auto lg:overflow-visible lg:flex-wrap items-center gap-2 no-scrollbar pb-1 lg:pb-0">
              {/* 2. Radius */}
              <CustomDropdown label="Radius" displayValue={filters.radius === 0 ? 'Exact' : `+ ${filters.radius} miles`} width="w-[200px]">
                <div className="space-y-1">
                  {radiusOptions.map((opt) => (
                    <button key={opt.value} onClick={() => { handleBasicChange({ radius: opt.value }); setOpenDropdown(null); }} className={`w-full text-left px-3 py-2 rounded text-sm ${filters.radius === opt.value ? 'bg-brand-green/10 text-brand-green font-semibold' : 'hover:bg-gray-50'}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </CustomDropdown>

              {/* 3. Bedrooms (Separate Dropdown) */}
              <CustomDropdown label="Beds" icon={MdOutlineGridView} displayValue={`${filters.bedrooms?.min ?? 1}+ Beds`} width="w-[260px]">
                <div className="grid grid-cols-2 gap-3">
                  <select value={filters.bedrooms?.min ?? 1} onChange={(e) => handleBasicChange({ bedrooms: { ...filters.bedrooms, min: Number(e.target.value) } })} className="w-full p-2 border border-gray-300 rounded text-sm outline-none">
                    {bedOptions.map(n => <option key={n} value={n}>{n} Min</option>)}
                  </select>
                  <select value={filters.bedrooms?.max ?? 0} onChange={(e) => handleBasicChange({ bedrooms: { ...filters.bedrooms, max: Number(e.target.value) } })} className="w-full p-2 border border-gray-300 rounded text-sm outline-none">
                    <option value={0}>Any Max</option>
                    {bedOptions.map(n => <option key={n} value={n}>{n} Max</option>)}
                  </select>
                </div>
              </CustomDropdown>

              {/* 4. Price */}
              <CustomDropdown label="Price" icon={MdOutlineAttachMoney} displayValue={getPriceDisplayLabel()} width="w-[300px]">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Min</label>
                    <select value={filters.priceRange?.min ?? 0} onChange={(e) => handleBasicChange({ priceRange: { ...filters.priceRange, min: Number(e.target.value) } })} className="w-full p-2 border border-gray-300 rounded text-sm">
                      {activePriceValues.map(p => <option key={p} value={p}>{formatCurrency(p)}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Max</label>
                    <select value={filters.priceRange?.max ?? 0} onChange={(e) => handleBasicChange({ priceRange: { ...filters.priceRange, max: Number(e.target.value) } })} className="w-full p-2 border border-gray-300 rounded text-sm">
                      <option value={0}>Any Max</option>
                      {activePriceValues.filter(p => p > (filters.priceRange?.min ?? 0)).map(p => <option key={p} value={p}>{formatCurrency(p)}</option>)}
                    </select>
                  </div>
                </div>
              </CustomDropdown>

              {/* 5. Property Type */}
              {/* 5. Property Type (Using categories from store) */}
              <CustomDropdown
                label="Type"
                icon={HiOutlineHome}
                displayValue={filters.categories.length > 0 ? `${filters.categories.length} Selected` : 'Type'}
                width="w-[300px]"
              >
                <div className="grid grid-cols-2 gap-2">
                  {propertyTypes.map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer py-1 group">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-brand-green w-4 h-4"
                        // Use .categories which is an actual array in your store
                        checked={filters.categories.includes(type as any)}
                        onChange={() => {
                          // Use the toggleCategory function already built into your store
                          toggleCategory(type as any);
                        }}
                      />
                      <span className="text-xs text-gray-600 group-hover:text-black">{type}</span>
                    </label>
                  ))}
                </div>
              </CustomDropdown>

              {/* 6. Advanced Filter Button */}
              <button onClick={() => setShowFilterModal(true)} className="h-11 px-5 bg-brand-green text-white rounded-lg flex items-center gap-2 font-bold text-sm shadow-md transition-all">
                <HiOutlineAdjustmentsHorizontal className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
                {getActiveFiltersCount() > 0 && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1 text-[10px] bg-white text-brand-green rounded-full font-extrabold">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <FilterModal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} />
    </>
  );
}

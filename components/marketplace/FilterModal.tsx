'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark } from "react-icons/hi2";
import { HiCheckCircle } from "react-icons/hi";
import { useMarketplaceStore, PropertyCategory } from '@/store/marketplaceStore';

export default function FilterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { filters, setFilters, resetAdvancedFilters, toggleCategory } = useMarketplaceStore();

  if (!isOpen) return null;

  const toggleBoolean = (key: string) => {
    setFilters({ [key]: !filters[key] });
  };

  const inclusionSections = [
    { label: 'New-build homes', key: 'newBuild' },
    { label: 'Shared ownership', key: 'sharedOwnership' },
    { label: 'Retirement homes', key: 'retirementHomes' },
    { label: 'Auctions', key: 'auction' }, // Match store key 'auction'
    { label: 'Off-plan', key: 'offPlan' },
  ];

  // Map UI Display labels to your store's PropertyCategory types
  const propertyTypeMapping: { label: string; value: PropertyCategory }[] = [
    { label: 'Detached', value: 'detached-house' },
    { label: 'Semi-detached', value: 'semi-detached' },
    { label: 'Terraced', value: 'terrace-house' },
    { label: 'Flats', value: 'apartment' },
    { label: 'Bungalows', value: 'family-home' }, // Using family-home as a proxy or adjust store type
    { label: 'Townhouse', value: 'townhouse' },
    { label: 'Duplex', value: 'duplex' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[70] flex justify-end pointer-events-none p-4 md:p-6">
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full md:w-1/2 h-full bg-white shadow-2xl rounded-2xl overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white z-20 px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Filter your result</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                  <HiXMark className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 space-y-8 flex-1 overflow-y-auto">

                {/* TRUST & VERIFICATION */}
                <section className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Trust & Verification</h3>
                  <div
                    onClick={() => toggleBoolean('isVerified')}
                    className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition-all ${filters.isVerified ? 'bg-brand-green/5 border-brand-green ring-1 ring-brand-green' : 'bg-gray-50 border-gray-100 hover:border-brand-green'
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 ${filters.isVerified ? 'text-brand-green' : 'text-gray-400'}`}>
                        <HiCheckCircle size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Verified Listings Only</p>
                        <p className="text-[11px] text-gray-500">Only show properties physically verified by our team.</p>
                      </div>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${filters.isVerified ? 'bg-brand-green' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${filters.isVerified ? 'left-6' : 'left-1'}`} />
                    </div>
                  </div>
                </section>

                <hr className="border-gray-100" />

                {/* BASIC REQUIREMENTS */}
                <section className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Basic Requirements</h3>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500">Search Radius</label>
                    <select value={filters.radius} onChange={(e) => setFilters({ radius: Number(e.target.value) })} className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
                      <option value={0}>Exact location</option>
                      {[1, 3, 5, 10, 20].map(m => <option key={m} value={m}>+ {m} miles</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500">Min Bedrooms</label>
                      <select value={filters.bedrooms.min ?? 0} onChange={(e) => setFilters({ bedrooms: { ...filters.bedrooms, min: Number(e.target.value) } })} className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
                        <option value={0}>No min</option>
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500">Max Bedrooms</label>
                      <select value={filters.bedrooms.max ?? 0} onChange={(e) => setFilters({ bedrooms: { ...filters.bedrooms, max: Number(e.target.value) } })} className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
                        <option value={0}>No max</option>
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500">Min Price</label>
                      <select value={filters.priceRange.min} onChange={(e) => setFilters({ priceRange: { ...filters.priceRange, min: Number(e.target.value) } })} className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
                        <option value={0}>No Min</option>
                        <option value={20000}>₦20,000</option>
                        <option value={500000}>₦500,000</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500">Max Price</label>
                      <select value={filters.priceRange.max} onChange={(e) => setFilters({ priceRange: { ...filters.priceRange, max: Number(e.target.value) } })} className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
                        <option value={1000000000}>No Max</option>
                        <option value={10000000}>₦10,000,000</option>
                        <option value={100000000}>₦100,000,000</option>
                      </select>
                    </div>
                  </div>
                </section>

                <hr className="border-gray-100" />

                {/* PROPERTY TYPE (Using 'categories' from store) */}
                <section className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Property Type</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {propertyTypeMapping.map((item) => (
                      <label key={item.value} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.categories?.includes(item.value) ? 'bg-brand-green border-brand-green text-white' : 'border-gray-300 group-hover:border-brand-green'}`}>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={filters.categories?.includes(item.value)}
                            onChange={() => toggleCategory(item.value)}
                          />
                          {filters.categories?.includes(item.value) && <HiCheckCircle size={14} />}
                        </div>
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </label>
                    ))}
                  </div>
                </section>

                <hr className="border-gray-100" />

                {/* ADDED TO SITE */}
                <section className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Added to Site</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { l: 'Anytime', v: 'anytime' },
                      { l: 'Last 24 hours', v: '24h' },
                      { l: 'Last 3 days', v: '3d' },
                      { l: 'Last 7 days', v: '7d' },
                      { l: 'Last 14 days', v: '14d' },
                      { l: 'Last 30 days', v: '30d' }
                    ].map((time) => (
                      <label key={time.v} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="addedToSite"
                          className="w-4 h-4 accent-brand-green"
                          checked={filters.dateAdded === time.v}
                          onChange={() => setFilters({ dateAdded: time.v as any })}
                        />
                        <span className="text-sm text-gray-700">{time.l}</span>
                      </label>
                    ))}
                  </div>
                </section>

                <hr className="border-gray-100" />

                {/* BUYING SCHEMES */}
                <section className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Buying Schemes</h3>
                  {inclusionSections.map((item) => (
                    <div key={item.key} className="flex justify-between items-center py-1">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <div className="flex bg-gray-100 p-1 rounded-lg">
                        {['include', 'exclude', 'show-only'].map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setFilters({ [item.key]: mode })}
                            className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all capitalize ${(filters[item.key] || 'include') === mode ? 'bg-white text-brand-green shadow-sm' : 'text-gray-500 hover:text-gray-700'
                              }`}
                          >
                            {mode.replace('show-', '')}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>

                {/* KEYWORDS */}
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Keywords</h3>
                  <input
                    type="text"
                    value={filters.keywords || ''}
                    onChange={(e) => setFilters({ keywords: e.target.value })}
                    placeholder="e.g. conservatory, 'double garage', -studio"
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none text-sm"
                  />
                </section>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white p-6 border-t border-gray-100 flex items-center gap-4">
                <button onClick={() => resetAdvancedFilters()} className="px-4 py-3 text-sm font-bold text-gray-500 hover:text-red-500 transition-colors">
                  Reset
                </button>
                <button onClick={onClose} className="flex-1 h-12 bg-brand-green hover:bg-opacity-90 text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-green/20 transition-all flex items-center justify-center gap-2">
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
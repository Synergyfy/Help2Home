'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark } from "react-icons/hi2";
import { HiCheckCircle } from "react-icons/hi"; // Added for the icon
import { useMarketplaceStore } from '@/store/marketplaceStore';

export default function FilterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { filters, setFilters, resetAdvancedFilters } = useMarketplaceStore();

  if (!isOpen) return null;

  const toggleBoolean = (key: string) => {
    setFilters({ [key]: !filters[key] });
  };

  const inclusionSections = [
    { label: 'New-build homes', key: 'newBuild' },
    { label: 'Shared ownership', key: 'sharedOwnership' },
    { label: 'Auctions', key: 'auctions' },
    { label: 'Off-plan', key: 'offPlan' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
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
                <button 
                  onClick={onClose} 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                  <HiXMark className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 space-y-8 flex-1 overflow-y-auto">
                
                {/* --- NEW SECTION: TRUST & VERIFICATION --- */}
                <section className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Trust & Verification</h3>
                  <div 
                    onClick={() => toggleBoolean('isVerified')}
                    className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer transition-all ${
                      filters.isVerified 
                        ? 'bg-brand-green/5 border-brand-green ring-1 ring-brand-green' 
                        : 'bg-gray-50 border-gray-100 hover:border-brand-green'
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
                    {/* Toggle Switch UI */}
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${filters.isVerified ? 'bg-brand-green' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${filters.isVerified ? 'left-6' : 'left-1'}`} />
                    </div>
                  </div>
                </section>

                <hr className="border-gray-100" />
                
                {/* 1. BASIC FILTERS SECTION */}
                <section className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Basic Requirements</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500">Search Radius</label>
                      <select 
                        value={filters.radius} 
                        onChange={(e) => setFilters({ radius: Number(e.target.value) })}
                        className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-green"
                      >
                        <option value={0}>Exact location</option>
                        <option value={5}>+ 5 miles</option>
                        <option value={10}>+ 10 miles</option>
                        <option value={20}>+ 20 miles</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-gray-500">Bedrooms (Min)</label>
                      <select 
                        value={filters.bedrooms.min ?? 0} 
                        onChange={(e) => setFilters({ bedrooms: { ...filters.bedrooms, min: Number(e.target.value) } })}
                        className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-green"
                      >
                        <option value={0}>Any beds</option>
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}+ beds</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500">Max Price</label>
                    <select 
                      value={filters.priceRange.max} 
                      onChange={(e) => setFilters({ priceRange: { ...filters.priceRange, max: Number(e.target.value) } })}
                      className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-green"
                    >
                      <option value={1000000000}>No Max</option>
                      <option value={1000000}>₦1,000,000</option>
                      <option value={5000000}>₦5,000,000</option>
                      <option value={10000000}>₦10,000,000</option>
                      <option value={50000000}>₦50,000,000</option>
                      <option value={100000000}>₦100,000,000</option>
                    </select>
                  </div>
                </section>

                <hr className="border-gray-100" />

                {/* 2. INFRASTRUCTURE */}
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Infrastructure & Utilities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'electricity', label: '24/7 Power' },
                      { key: 'waterSupply', label: 'Water Supply' },
                      { key: 'security', label: 'Security' },
                      { key: 'serviced', label: 'Serviced' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => toggleBoolean(item.key)}
                        className={`h-11 px-4 rounded-lg border text-sm font-semibold transition-all ${
                          filters[item.key] 
                          ? 'border-brand-green bg-green-50 text-brand-green ring-1 ring-brand-green' 
                          : 'border-gray-200 text-gray-600 hover:border-brand-green'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </section>

                {/* 3. LISTING STATUS */}
                <section className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Listing Status</h3>
                  {inclusionSections.map((item) => (
                    <div key={item.key} className="flex justify-between items-center py-1">
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                      <div className="flex bg-gray-100 p-1 rounded-lg">
                        {['include', 'exclude', 'only'].map((mode) => (
                          <button
                            key={mode}
                            onClick={() => setFilters({ [item.key]: mode })}
                            className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all capitalize ${
                              (filters[item.key] || 'include') === mode
                              ? 'bg-white text-brand-green shadow-sm'
                              : 'text-gray-500 hover:text-gray-700'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>

                {/* 4. KEYWORDS */}
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Keywords</h3>
                  <input 
                    type="text" 
                    value={filters.keywords || ''}
                    onChange={(e) => setFilters({ keywords: e.target.value })}
                    placeholder="e.g. Duplex, CCTV, C of O"
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green outline-none text-sm transition-all"
                  />
                </section>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white p-6 border-t border-gray-100 flex items-center gap-4">
                <button 
                  onClick={() => resetAdvancedFilters()}
                  className="px-4 py-3 text-sm font-bold text-gray-500 hover:text-red-500 transition-colors"
                >
                  Reset
                </button>
                <button 
                  onClick={onClose}
                  className="flex-1 h-12 bg-brand-green hover:bg-opacity-90 text-white rounded-xl font-bold text-sm shadow-lg shadow-brand-green/20 transition-all flex items-center justify-center gap-2"
                >
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
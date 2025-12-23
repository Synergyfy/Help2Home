'use client';

import React, { useState } from 'react';
import { useMarketplaceStore } from '@/store/marketplaceStore';

export default function AdvancedFilterSidebar() {
    const filters = useMarketplaceStore((state) => state.filters);
    const setLocation = useMarketplaceStore((state) => state.setLocation);
    const setBedrooms = useMarketplaceStore((state) => state.setBedrooms);
    const setBathrooms = useMarketplaceStore((state) => state.setBathrooms);
    const setPriceRange = useMarketplaceStore((state) => state.setPriceRange);
    const resetFilters = useMarketplaceStore((state) => state.resetFilters);

    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const bedroomOptions = [1, 2, 3, 4, 5];
    const bathroomOptions = [1, 2, 3, 4, 5];

    const nigerianStates = [
        'Abuja FCT', 'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
        'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
        'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
        'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
        'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
    ];

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Location Filter */}
            <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Location</label>
                <select
                    value={filters.location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-green focus:border-transparent"
                >
                    <option value="">All Locations</option>
                    {nigerianStates.map((state) => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
            </div>

            {/* Price Range Filter */}
            <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                    Price Range: ₦{filters.priceRange.min.toLocaleString()} - ₦{filters.priceRange.max.toLocaleString()}
                </label>
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                        <input
                            type="range"
                            min="0"
                            max="10000000"
                            step="100000"
                            value={filters.priceRange.min}
                            onChange={(e) => setPriceRange({ ...filters.priceRange, min: Number(e.target.value) })}
                            className="w-full accent-brand-green"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                        <input
                            type="range"
                            min="0"
                            max="10000000"
                            step="100000"
                            value={filters.priceRange.max}
                            onChange={(e) => setPriceRange({ ...filters.priceRange, max: Number(e.target.value) })}
                            className="w-full accent-brand-green"
                        />
                    </div>
                </div>
            </div>

            {/* Bedrooms Filter */}
            <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Bedrooms</label>
                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={() => setBedrooms(null)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${filters.bedrooms === null
                                ? 'bg-brand-green text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Any
                    </button>
                    {bedroomOptions.map((num) => (
                        <button
                            key={num}
                            onClick={() => setBedrooms(num)}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${filters.bedrooms === num
                                    ? 'bg-brand-green text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {num}+
                        </button>
                    ))}
                </div>
            </div>

            {/* Bathrooms Filter */}
            <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Bathrooms</label>
                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={() => setBathrooms(null)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${filters.bathrooms === null
                                ? 'bg-brand-green text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Any
                    </button>
                    {bathroomOptions.map((num) => (
                        <button
                            key={num}
                            onClick={() => setBathrooms(num)}
                            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${filters.bathrooms === num
                                    ? 'bg-brand-green text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {num}+
                        </button>
                    ))}
                </div>
            </div>

            {/* Reset Filters Button */}
            <button
                onClick={resetFilters}
                className="w-full py-3 bg-brand-green text-white font-bold rounded-lg hover:bg-green-800 transition-colors"
            >
                Reset All Filters
            </button>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block sticky top-24">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>
                    <FilterContent />
                </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setShowMobileFilters(true)}
                    className="bg-brand-green text-white px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 hover:bg-green-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    Filters
                </button>
            </div>

            {/* Mobile Filter Modal */}
            {showMobileFilters && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                        onClick={() => setShowMobileFilters(false)}
                    />
                    <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-3xl p-6 z-50 lg:hidden max-h-[85vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="text-gray-500 hover:text-gray-900"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <FilterContent />
                    </div>
                </>
            )}
        </>
    );
}
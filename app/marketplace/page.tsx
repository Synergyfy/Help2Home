'use client'

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocations } from '@/hooks/useMarketplaceQueries';
import { useMarketplaceStore } from '@/store/marketplaceStore';
import { useDebounce } from '@/hooks/useDebounce';
import heroImg from '@/About us assets/heroImg.jpg'

export default function MarketPlaceMain() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'rent' | 'buy' | 'house-prices' | 'valuation'>('rent');
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Zustand store
    const { setPropertyType, setLocation, setFilters } = useMarketplaceStore();

    // Debounce search query for API call
    const debouncedQuery = useDebounce(searchQuery, 300);

    // Fetch locations from TanStack Query
    const { data: locations, isLoading: locationsLoading } = useLocations(debouncedQuery);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (selectedLocation?: string) => {
        const locationToSearch = selectedLocation || searchQuery;

        if (!locationToSearch.trim()) return;

        if (activeTab === 'rent' || activeTab === 'buy') {
            router.push(
                `/marketplace/search?type=${activeTab}&location=${encodeURIComponent(
                    locationToSearch
                )}`
            );
        }
    };



    const handleLocationSelect = (locationName: string) => {
        setSearchQuery(locationName);
        setShowSuggestions(false);
        handleSearch(locationName);
    };

    const handleTabChange = (tab: any) => {
        setActiveTab(tab);
    };


    return (
        <section className="relative overflow-hidden py-8 md:py-12 lg:py-20">
            {/* Background with gradient */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                            Just ask our platform
                        </h1>
                        <p className="text-lg text-gray-600">
                            Find homes to buy or rent and check house prices
                        </p>
                    </div>

                    {/* Main Search Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                        {/* Tabs */}
                        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
                            {['buy', 'rent', 'house-prices', 'valuation'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabChange(tab as any)}
                                    className={`px-6 py-3 font-semibold text-sm transition-all relative ${activeTab === tab
                                        ? 'text-purple-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    {tab === 'house-prices' ? 'House prices' : tab === 'valuation' ? 'Instant valuation' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Search Content */}
                        <AnimatePresence mode="wait">
                            {(activeTab === 'rent' || activeTab === 'buy') && (
                                <motion.div
                                    key="search"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <label htmlFor="location-search" className="block text-sm font-medium text-gray-700 mb-3">
                                        Enter a location
                                    </label>

                                    {/* Search Bar with Autocomplete */}
                                    <div className="relative" ref={searchRef}>
                                        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                                            <div className="flex-1 relative">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                                        <circle cx="12" cy="10" r="3" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    id="location-search"
                                                    placeholder="e.g. Victoria Island, Lagos or Lekki"
                                                    value={searchQuery}
                                                    onChange={(e) => {
                                                        setSearchQuery(e.target.value);
                                                        setShowSuggestions(true);
                                                    }}
                                                    onFocus={() => setShowSuggestions(true)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleSearch();
                                                            setShowSuggestions(false);
                                                        }
                                                    }}
                                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all text-gray-900 placeholder-gray-400"
                                                />
                                                {searchQuery && (
                                                    <button
                                                        onClick={() => {
                                                            setSearchQuery('');
                                                            setShowSuggestions(false);
                                                        }}
                                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleSearch()}
                                                disabled={!searchQuery.trim()}
                                                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95 whitespace-nowrap"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <circle cx="11" cy="11" r="8" />
                                                    <path d="m21 21-4.3-4.3" />
                                                </svg>
                                                Search
                                            </button>
                                        </div>

                                        {/* Autocomplete Dropdown */}
                                        {showSuggestions && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto"
                                            >
                                                {locationsLoading && (
                                                    <div className="px-4 py-6 text-center text-gray-500">
                                                        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                                                        <p className="mt-2 text-sm">Loading locations...</p>
                                                    </div>
                                                )}

                                                {!locationsLoading && locations && locations.length > 0 && (
                                                    <div className="py-2">
                                                        {locations.map((location, index) => (
                                                            <button
                                                                key={location.id}
                                                                onClick={() => handleLocationSelect(location.name)}
                                                                className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors flex items-start gap-3 border-b border-gray-100 last:border-b-0 group"
                                                            >
                                                                <div className="mt-1 text-purple-600 group-hover:text-purple-700">
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="18"
                                                                        height="18"
                                                                        viewBox="0 0 24 24"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        strokeWidth="2"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    >
                                                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                                                        <circle cx="12" cy="10" r="3" />
                                                                    </svg>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="font-medium text-gray-900 group-hover:text-purple-700">
                                                                        {location.name}
                                                                    </div>
                                                                    <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                                                                        <span className="capitalize">{location.type}</span>
                                                                        {location.city && <span>• {location.city}</span>}
                                                                        <span>• {location.propertyCount} properties</span>
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}

                                                {!locationsLoading && locations && locations.length === 0 && (
                                                    <div className="px-4 py-6 text-center text-gray-500">
                                                        <p className="text-sm">No locations found</p>
                                                        <p className="text-xs mt-1">Try a different search term</p>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'house-prices' && (
                                <motion.div
                                    key="house-prices"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Check property values</h3>
                                    <p className="text-gray-600 mb-6">Discover property values and price trends in your area</p>
                                    <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all shadow-lg">
                                        View house prices
                                    </button>
                                </motion.div>
                            )}

                            {activeTab === 'valuation' && (
                                <motion.div
                                    key="valuation"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Want to know your home's value?</h3>
                                    <p className="text-gray-600 mb-6">Get an instant valuation estimate in just a few clicks</p>
                                    <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg">
                                        Get an instant valuation
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
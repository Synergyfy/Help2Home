'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocations } from '@/hooks/useMarketplaceQueries';
import { useMarketplaceStore } from '@/store/marketplaceStore';
import { useDebounce } from '@/hooks/useDebounce';
import { HiMapPin, HiMagnifyingGlass, HiXMark, HiFire } from "react-icons/hi2";

type PropertyType = 'rent' | 'buy';

const TAB_ASSETS: Record<PropertyType, { image: string; title: string }> = {

    rent: {
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
        title: 'cozy'
    },
    buy: {
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
        title: 'perfect'
    }
};

const POPULAR_LOCATIONS = [
    { name: 'Victoria Island, Lagos', count: '1,240' },
    { name: 'Lekki Phase 1, Lagos', count: '850' },
    { name: 'Ikoyi, Lagos', count: '420' },
    { name: 'Maitama, Abuja', count: '310' }
];

export default function MarketPlaceMain() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<PropertyType>('rent');
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const { setFilters } = useMarketplaceStore();
    const debouncedQuery = useDebounce(searchQuery, 300);
    const { data: locations, isLoading: locationsLoading } = useLocations(debouncedQuery);

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

        setFilters({ propertyType: activeTab, location: locationToSearch });
        router.push(`/marketplace/search?type=${activeTab}&location=${encodeURIComponent(locationToSearch)}`);
        setShowSuggestions(false);
    };

    return (
        <section className="relative min-h-[75vh] flex items-center justify-center py-16 px-4 z-10 overflow-hidden">
            {/* Dynamic Background Wrapper */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeTab}
                        src={TAB_ASSETS[activeTab].image}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full object-cover"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-30 w-full max-w-4xl">
                <div className="text-center mb-10">
                    <motion.h1
                        key={activeTab}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4 drop-shadow-lg"
                    >
                        Find your <span className="text-brand-green">{TAB_ASSETS[activeTab].title}</span> home
                    </motion.h1>
                    <p className="text-gray-200 text-lg font-medium">Search across thousands of verified listings</p>
                </div>

                <div className="relative z-40 bg-white shadow-2xl rounded-3xl border border-white/10">
                    <div className="flex border-b border-gray-100 bg-gray-50/80 rounded-t-3xl overflow-hidden">
                        {(Object.keys(TAB_ASSETS) as PropertyType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-5 text-xs md:text-sm font-bold uppercase tracking-wider transition-all relative ${activeTab === tab ? 'text-brand-green bg-white' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab.replace(/-/g, ' ')}
                                {activeTab === tab && (
                                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-green" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 md:p-10">
                        <div className="relative z-50" ref={searchRef}>
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="relative flex-1 w-full">
                                    <HiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-green w-6 h-6" />
                                    <input
                                        type="text"
                                        placeholder="Enter city, neighborhood, or address..."
                                        value={searchQuery}
                                        onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                                        onFocus={() => setShowSuggestions(true)}
                                        className="w-full h-16 pl-12 pr-12 bg-gray-50 border-2 border-transparent focus:border-brand-green/30 focus:bg-white rounded-2xl outline-none text-base font-medium text-gray-900 shadow-inner transition-all"
                                    />
                                    {searchQuery && (
                                        <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                            <HiXMark className="w-6 h-6" />
                                        </button>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleSearch()}
                                    className="w-full md:w-auto h-16 px-10 bg-brand-green hover:bg-green-700 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 uppercase text-sm tracking-widest shadow-lg active:scale-95"
                                >
                                    <HiMagnifyingGlass className="w-5 h-5 stroke-2" />
                                    Search
                                </button>
                            </div>

                            <AnimatePresence>
                                {showSuggestions && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-[110%] left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-100 overflow-hidden"
                                    >
                                        {!searchQuery && (
                                            <div className="p-3">
                                                <div className="px-4 py-3 flex items-center gap-2 text-gray-400 border-b border-gray-50 mb-1">
                                                    <HiFire className="w-4 h-4 text-orange-500" />
                                                    <span className="text-[11px] font-bold uppercase tracking-widest">Popular Near You</span>
                                                </div>
                                                {POPULAR_LOCATIONS.map((loc, idx) => (
                                                    <button
                                                        key={idx}
                                                        onMouseDown={() => { setSearchQuery(loc.name); handleSearch(loc.name); }}
                                                        className="w-full px-4 py-4 text-left hover:bg-gray-50 rounded-xl flex items-center justify-between group transition-colors"
                                                    >
                                                        <span className="text-sm font-semibold text-gray-700 group-hover:text-brand-green">{loc.name}</span>
                                                        <span className="text-xs font-medium text-gray-400">{loc.count} listings</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {searchQuery && (
                                            <div className="p-3 max-h-96 overflow-y-auto">
                                                {locationsLoading ? (
                                                    <div className="p-8 text-center text-sm font-medium text-gray-400 animate-pulse">
                                                        Searching locations...
                                                    </div>
                                                ) : locations && locations.length > 0 ? (
                                                    locations.map((loc: any) => (
                                                        <button
                                                            key={loc.id}
                                                            onMouseDown={() => { setSearchQuery(loc.name); handleSearch(loc.name); }}
                                                            className="w-full px-4 py-4 text-left hover:bg-green-50 rounded-xl flex items-center gap-4 transition-colors group"
                                                        >
                                                            <div className="p-2.5 bg-gray-100 group-hover:bg-brand-green/20 rounded-xl">
                                                                <HiMapPin className="w-5 h-5 text-brand-green" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-bold text-gray-900">{loc.name}</div>
                                                                <div className="text-xs text-gray-500 font-medium">{loc.propertyCount} listings</div>
                                                            </div>
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="p-8 text-center text-sm text-gray-500 font-medium">
                                                        No locations found.
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

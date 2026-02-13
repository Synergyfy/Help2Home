'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocations } from '@/hooks/useMarketplaceQueries';
import { useMarketplaceStore } from '@/store/marketplaceStore';
import { useDebounce } from '@/hooks/useDebounce';
import { HiMapPin, HiMagnifyingGlass, HiXMark, HiFire } from "react-icons/hi2";

type PropertyType = 'rent' | 'buy' | 'service-apartment' | 'rent-to-own' | 'invest';

/* ---------------------------------------------
   URL → TAB MAPPING
--------------------------------------------- */
const URL_TYPE_TO_TAB: Record<string, PropertyType> = {
    rent: 'rent',
    buy: 'buy',
    'service-apartment': 'service-apartment',
    'rent-to-own': 'rent-to-own',
    invest: 'invest'
};

/* ---------------------------------------------
   HERO ASSETS (TAB DEFAULTS)
--------------------------------------------- */
const TAB_ASSETS: Record<PropertyType, { image: string; title: string; subtitle: string }> = {
    rent: {
        image: 'https://images.unsplash.com/photo-1560448204-61dc36dc98c8?q=80&w=2070&auto=format&fit=crop',
        title: 'comfortable',
        subtitle: 'Find the perfect rental that fits your lifestyle.'
    },
    buy: {
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop',
        title: 'dream',
        subtitle: 'Invest in your future with a home of your own.'
    },
    invest: {
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
        title: 'profitable',
        subtitle: 'Maximize your returns with strategic property investments.'
    },
    'service-apartment': {
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop',
        title: 'luxurious',
        subtitle: 'Experience comfort and convenience in our serviced apartments.'
    },
    'rent-to-own': {
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
        title: 'future',
        subtitle: 'A flexible path to owning your dream home.'
    }
};

/* ---------------------------------------------
   CATEGORY HERO OVERRIDES
--------------------------------------------- */
const CATEGORY_ASSETS: Record<string, { image: string; title: string; subtitle: string }> = {
    'residential-properties-to-rent': {
        image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2070&auto=format&fit=crop',
        title: 'residential',
        subtitle: 'Modern living spaces for you and your family.'
    },
    'commercial-properties-to-rent': {
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop',
        title: 'commercial',
        subtitle: 'Strategic locations for your business growth.'
    },
    'student-properties-to-rent': {
        image: 'https://images.unsplash.com/photo-1555854817-5b2260d80637?q=80&w=2070&auto=format&fit=crop',
        title: 'student',
        subtitle: 'Affordable and convenient housing for students.'
    },
    'shared-spaces-to-rent': {
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop',
        title: 'shared',
        subtitle: 'Collaborative and flexible living arrangements.'
    },
    'service-apartment': {
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=2070&auto=format&fit=crop',
        title: 'serviced',
        subtitle: 'Luxury and comfort with full amenities.'
    },
    'rent-to-own': {
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
        title: 'rent-to-own',
        subtitle: 'A flexible path to homeownership.'
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
    const searchParams = useSearchParams();

    const urlType = searchParams.get('type') || 'rent';
    const rawCategory = searchParams.get('category');
    const category: string | undefined = rawCategory ?? undefined;

    const resolvedTab = URL_TYPE_TO_TAB[urlType] ?? 'rent';

    const [activeTab, setActiveTab] = useState<PropertyType>(resolvedTab);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);

    const { setFilters } = useMarketplaceStore();
    const debouncedQuery = useDebounce(searchQuery, 300);
    const { data: locations, isLoading: locationsLoading } = useLocations(debouncedQuery);

    /* ---------------------------------------------
       URL → STATE SYNC
    --------------------------------------------- */
    useEffect(() => {
        setActiveTab(resolvedTab);
    }, [resolvedTab]);

    /* ---------------------------------------------
       CLICK OUTSIDE HANDLER
    --------------------------------------------- */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    /* ---------------------------------------------
       HERO RESOLUTION
    --------------------------------------------- */
    const heroAsset =
        (category && CATEGORY_ASSETS[category]) ||
        TAB_ASSETS[activeTab];

    /* ---------------------------------------------
       SEARCH HANDLER
    --------------------------------------------- */
    const handleSearch = (selectedLocation?: string) => {
        const locationToSearch = selectedLocation || searchQuery;
        if (!locationToSearch.trim()) return;

        setFilters({
            propertyType: activeTab,
            location: locationToSearch,
            category
        });

        router.push(
            `/marketplace/search?type=${activeTab}&location=${encodeURIComponent(locationToSearch)}`
        );

        setShowSuggestions(false);
    };

    return (
        <section className="relative min-h-[75vh] flex items-center justify-center py-16 px-4 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={heroAsset.image}
                        src={heroAsset.image}
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full h-full object-cover"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
            </div>

            {/* Content */}
            <div className="relative z-30 w-full max-w-4xl">
                <div className="text-center mb-10">
                    <motion.h1
                        key={heroAsset.title}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-4"
                    >
                        Discover a <span className="text-brand-green">{heroAsset.title}</span> place to call home
                    </motion.h1>
                    <p className="text-gray-200 text-lg font-medium">
                        {heroAsset.subtitle}
                    </p>
                </div>

                {/* Tabs */}
                <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
                    <div className="flex border-b border-gray-400 bg-gray-50 overflow-x-auto no-scrollbar">
                        {(['rent', 'buy', 'invest'] as PropertyType[]).map(tab => {
                            const isActive = activeTab === tab;
                            const colors: Record<PropertyType, string> = {
                                rent: 'text-brand-green border-brand-green',
                                buy: 'text-blue-600 border-blue-600',
                                'service-apartment': 'text-indigo-600 border-indigo-600',
                                'rent-to-own': 'text-orange-500 border-orange-500',
                                invest: 'text-slate-800 border-slate-800'
                            };

                            return (
                                <button
                                    key={tab}
                                    onClick={() => {
                                        setActiveTab(tab);
                                        router.push(
                                            `/marketplace?type=${tab}${category ? `&category=${category}` : ''}`,
                                            { scroll: false }
                                        );
                                    }}
                                    className={`flex-1 min-w-[120px] py-5 text-[10px] md:text-xs font-bold uppercase transition-all whitespace-nowrap ${
                                        isActive
                                            ? `${colors[tab].split(' ')[0]} bg-white`
                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {tab.split('-').join(' ')}
                                    {isActive && (
                                        <motion.div 
                                            layoutId="activeTab" 
                                            className={`h-1 ${colors[tab].split(' ')[1].replace('text-', 'bg-')} mt-2 mx-4`} 
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Search + Dropdown */}
                    <div className="p-6 md:p-10" ref={searchRef}>
                        <div className="relative">
                            <div className="flex gap-4">
                                <div className="relative flex-1">
                                    <HiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-green w-6 h-6" />
                                    <input
                                        value={searchQuery}
                                        onChange={e => {
                                            setSearchQuery(e.target.value);
                                            setShowSuggestions(true);
                                        }}
                                        onFocus={() => setShowSuggestions(true)}
                                        placeholder="Enter city, neighborhood, or address..."
                                        className="w-full h-16 pl-12 pr-12 rounded-2xl bg-gray-50"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-4 top-1/2 -translate-y-1/2"
                                        >
                                            <HiXMark className="w-6 h-6 text-gray-400" />
                                        </button>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleSearch()}
                                    className="h-16 px-10 bg-brand-green text-white rounded-2xl font-bold"
                                >
                                    <HiMagnifyingGlass />
                                </button>
                            </div>

                            {/* Suggestions */}
                            <AnimatePresence>
                                {showSuggestions && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full mt-3 left-0 right-0 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
                                    >
                                        {!searchQuery && (
                                            <div className="p-3">
                                                <div className="px-4 py-3 flex items-center gap-2 text-gray-400 border-b border-gray-100">
                                                    <HiFire className="text-orange-500" />
                                                    <span className="text-xs font-bold uppercase">Popular Near You</span>
                                                </div>
                                                {POPULAR_LOCATIONS.map((loc, i) => (
                                                    <button
                                                        key={i}
                                                        onMouseDown={() => handleSearch(loc.name)}
                                                        className="w-full px-4 py-4 flex justify-between hover:bg-gray-50"
                                                    >
                                                        <span className="font-semibold">{loc.name}</span>
                                                        <span className="text-xs text-gray-400">{loc.count} listings</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {searchQuery && (
                                            <div className="max-h-80 overflow-y-auto">
                                                {locationsLoading ? (
                                                    <div className="p-6 text-center text-gray-400">
                                                        Searching locations…
                                                    </div>
                                                ) : locations?.length ? (
                                                    locations.map((loc: any) => (
                                                        <button
                                                            key={loc.id}
                                                            onMouseDown={() => handleSearch(loc.name)}
                                                            className="w-full px-4 py-4 flex items-center gap-4 hover:bg-gray-50"
                                                        >
                                                            <HiMapPin className="text-brand-green" />
                                                            <div>
                                                                <div className="font-semibold">{loc.name}</div>
                                                                <div className="text-xs text-gray-400">
                                                                    {loc.propertyCount} listings
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="p-6 text-center text-gray-400">
                                                        No locations found
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

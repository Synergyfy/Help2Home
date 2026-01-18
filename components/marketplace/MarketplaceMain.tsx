'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocations } from '@/hooks/useMarketplaceQueries';
import { useMarketplaceStore } from '@/store/marketplaceStore';
import { useDebounce } from '@/hooks/useDebounce';
import { HiMapPin, HiMagnifyingGlass, HiXMark, HiFire } from "react-icons/hi2";

type PropertyType = 'rent' | 'buy' | 'invest';

/* ---------------------------------------------
   URL → TAB MAPPING
--------------------------------------------- */
const URL_TYPE_TO_TAB: Record<string, PropertyType> = {
    rent: 'rent',
    buy: 'buy',
    'service-apartment': 'rent',
    'rent-to-own': 'buy'
};

/* ---------------------------------------------
   HERO ASSETS (TAB DEFAULTS)
--------------------------------------------- */
const TAB_ASSETS: Record<PropertyType, { image: string; title: string }> = {
    rent: {
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
        title: 'cozy'
    },
    buy: {
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
        title: 'perfect'
    },
    invest: {
        image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=2069&auto=format&fit=crop',
        title: 'profitable'
    }
};

/* ---------------------------------------------
   CATEGORY HERO OVERRIDES
--------------------------------------------- */
const CATEGORY_ASSETS: Record<string, { image: string; title: string }> = {
    'residential-properties-to-rent': {
        image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6',
        title: 'comfortable'
    },
    'commercial-properties-to-rent': {
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
        title: 'strategic'
    },
    'student-properties-to-rent': {
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
        title: 'affordable'
    },
    'shared-spaces-to-rent': {
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb',
        title: 'flexible'
    },
    'service-apartment': {
        image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511',
        title: 'luxury'
    },
    'rent-to-own': {
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
        title: 'future'
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
                        Handpicked listings, real neighborhoods, zero guesswork
                    </p>
                </div>

                {/* Tabs */}
                <div className="bg-white shadow-2xl rounded-3xl ">
                    <div className="flex border-b border-gray-400 bg-gray-50 rounded-t-3xl overflow-hidden">
                        {(Object.keys(TAB_ASSETS) as PropertyType[]).map(tab => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab);
                                    router.push(
                                        `/marketplace?type=${tab}${category ? `&category=${category}` : ''}`,
                                        { scroll: false }
                                    );
                                }}
                                className={`flex-1 py-5 text-sm font-bold uppercase ${
                                    activeTab === tab
                                        ? 'text-brand-green bg-white'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.div className="h-1 bg-brand-green mt-2" />
                                )}
                            </button>
                        ))}
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

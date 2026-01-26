"use client";

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import PropertyCard from '@/components/Map/PropertyCard';
import { initialProperties } from '@/utils/properties';
import { HiOutlineAdjustments, HiOutlineSearch } from 'react-icons/hi';

// Dynamically import Map to avoid SSR issues with Leaflet
const LocationMap = dynamic(() => import('@/components/Map/LocationMap'), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
            Map Loading...
        </div>
    )
});

export default function LocationsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    // Transform initialProperties to match the map component's expected type if needed, 
    // but our PropertyCard component is loose with types, so straightforward passing should work.
    // We just filter based on search query for now.
    const filteredProperties = useMemo(() => {
        if (!searchQuery) return initialProperties;
        const lowerQ = searchQuery.toLowerCase();
        return initialProperties.filter(p =>
            p.title.toLowerCase().includes(lowerQ) ||
            p.location.toLowerCase().includes(lowerQ) ||
            p.city.toLowerCase().includes(lowerQ)
        );
    }, [searchQuery]);

    // Calculate center for map based on first result or default to Lagos
    const mapCenter: [number, number] = useMemo(() => {
        if (filteredProperties.length > 0 && filteredProperties[0].latitude && filteredProperties[0].longitude) {
            return [filteredProperties[0].latitude, filteredProperties[0].longitude];
        }
        return [6.4549, 3.4246]; // Default Ikoyi/Lagos
    }, [filteredProperties]);

    return (
        <div className="h-screen flex flex-col bg-white overflow-hidden">

            <main className="flex-1 flex overflow-hidden relative">
                {/* Left Side: Property List */}
                <div className="w-full md:w-[450px] lg:w-[500px] flex flex-col border-r border-gray-200 bg-white z-10 shrink-0 h-full">
                    {/* Search & Filter Bar */}
                    <div className="p-4 border-b border-gray-100 bg-white">
                        <div className="relative mb-3">
                            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search neighborhood..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-green/20 outline-none"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                {filteredProperties.length} Properties Found
                            </span>
                            <button className="flex items-center gap-2 text-xs font-bold text-gray-900 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50">
                                <HiOutlineAdjustments className="text-sm" />
                                Filters
                            </button>
                        </div>
                    </div>

                    {/* Scrollable List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                        {filteredProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}

                        {filteredProperties.length === 0 && (
                            <div className="text-center py-10 text-gray-400">
                                <p>No properties found in this location.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Map */}
                <div className="hidden md:block flex-1 bg-gray-50 relative h-full">
                    <LocationMap
                        properties={filteredProperties}
                        center={mapCenter}
                        zoom={13}
                    />
                </div>
            </main>
        </div>
    );
}

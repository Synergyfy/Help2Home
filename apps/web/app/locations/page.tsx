"use client";

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import PropertyCard from '@/components/Map/PropertyCard';
import LocationBanner from '@/components/Map/LocationBanner';
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
    const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'denied'>('idle');
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [locationError, setLocationError] = useState<string>('');

    const handleEnableLocation = () => {
        if (!navigator.geolocation) {
            setLocationStatus('error');
            setLocationError("Geolocation is not supported by your browser");
            return;
        }

        setLocationStatus('loading');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setLocationStatus('success');
            },
            (error) => {
                let msg = "Unable to retrieve your location";
                if (error.code === error.PERMISSION_DENIED) {
                    setLocationStatus('denied');
                    msg = "Location permission denied";
                } else {
                    setLocationStatus('error');
                }
                setLocationError(msg);
            }
        );
    };

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

    // Calculate center for map based on user location OR first result OR default to Lagos
    const mapCenter: [number, number] = useMemo(() => {
        if (userLocation) {
            return [userLocation.lat, userLocation.lng];
        }
        if (filteredProperties.length > 0 && filteredProperties[0].latitude && filteredProperties[0].longitude) {
            return [filteredProperties[0].latitude, filteredProperties[0].longitude];
        }
        return [6.4549, 3.4246]; // Default Ikoyi/Lagos
    }, [filteredProperties, userLocation]);

    return (
        <div className="h-screen flex flex-col bg-white overflow-hidden">

            {/* Live Location Banner */}
            <div className="sticky top-0 z-50">
                <LocationBanner
                    status={locationStatus}
                    coords={userLocation}
                    errorMsg={locationError}
                    onEnableLocation={handleEnableLocation}
                />
            </div>

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
                        zoom={userLocation ? 14 : 13}
                    />
                </div>
            </main>
        </div>
    );
}

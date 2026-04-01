"use client";

import { HiOutlineLocationMarker, HiOutlineExclamation } from 'react-icons/hi';
import { BiLoaderAlt } from "react-icons/bi";

interface LocationBannerProps {
    status: 'idle' | 'loading' | 'success' | 'error' | 'denied';
    coords: {
        lat: number;
        lng: number;
    } | null;
    errorMsg?: string;
    onEnableLocation: () => void;
}

export default function LocationBanner({ status, coords, errorMsg, onEnableLocation }: LocationBannerProps) {
    if (status === 'idle') {
        return (
            <div className="bg-brand-blue/5 border-b border-brand-blue/10 p-4">
                <div className="flex items-center justify-between container mx-auto gap-4">
                    <div className="flex items-center gap-2 text-brand-blue">
                        <HiOutlineLocationMarker className="text-xl" />
                        <p className="text-sm font-medium">
                            Enable location to see properties near you
                        </p>
                    </div>
                    <button
                        onClick={onEnableLocation}
                        className="text-xs font-bold text-white bg-brand-blue px-4 py-2 rounded-lg hover:bg-brand-blue/90 transition-colors"
                    >
                        Share Location
                    </button>
                </div>
            </div>
        );
    }

    if (status === 'loading') {
        return (
            <div className="bg-blue-50 border-b border-blue-100 p-3">
                <div className="flex items-center justify-center gap-2 text-blue-600">
                    <BiLoaderAlt className="animate-spin" />
                    <span className="text-xs font-medium">Locating you...</span>
                </div>
            </div>
        );
    }

    if (status === 'error' || status === 'denied') {
        return (
            <div className="bg-red-50 border-b border-red-100 p-3">
                <div className="flex items-center justify-between container mx-auto gap-4">
                    <div className="flex items-center gap-2 text-red-600">
                        <HiOutlineExclamation className="text-lg" />
                        <p className="text-xs font-medium">
                            {errorMsg || "Could not access location. Please check your browser settings."}
                        </p>
                    </div>
                    {status !== 'denied' && (
                        <button
                            onClick={onEnableLocation}
                            className="text-xs font-bold text-red-600 hover:text-red-700 underline"
                        >
                            Retry
                        </button>
                    )}
                </div>
            </div>
        );
    }

    if (status === 'success' && coords) {
        return (
            <div className="bg-green-50 border-b border-green-100 p-3">
                <div className="flex items-center justify-center gap-2 text-green-700">
                    <HiOutlineLocationMarker />
                    <span className="text-xs font-medium">
                        Showing results near your live location: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
                    </span>
                </div>
            </div>
        );
    }

    return null;
}

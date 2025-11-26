'use client';

import React from 'react';
import Image from 'next/image';

export default function TrackingMap() {
    return (
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8 bg-gray-100">
            {/* Map Background - Using a placeholder pattern or static map image */}
            <div className="absolute inset-0 bg-[url('/assets/dashboard/map-placeholder.png')] bg-cover bg-center opacity-80">
                {/* Fallback if image missing */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    Map View
                </div>
            </div>

            {/* Route Overlay (Mock) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                    d="M100,100 Q250,150 400,300 T700,350"
                    fill="none"
                    stroke="#6B46C1"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="drop-shadow-md"
                />

                {/* Start Point */}
                <circle cx="100" cy="100" r="8" fill="white" stroke="#6B46C1" strokeWidth="4" />

                {/* Current Location (Car) */}
                <g transform="translate(390, 290)">
                    <circle cx="10" cy="10" r="16" fill="#00853E" className="animate-pulse" />
                    <circle cx="10" cy="10" r="8" fill="white" />
                </g>

                {/* End Point */}
                <circle cx="700" cy="350" r="8" fill="#FF0000" stroke="white" strokeWidth="2" />
            </svg>

            {/* Location Labels */}
            <div className="absolute top-20 left-20 bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold text-gray-700">
                Warehouse
            </div>
            <div className="absolute bottom-10 right-20 bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold text-gray-700">
                Destination
            </div>
        </div>
    );
}

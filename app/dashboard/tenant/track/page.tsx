'use client';

import React, { useState } from 'react';
import TrackingMap from '@/components/TrackingMap';
import TrackingStatus from '@/components/TrackingStatus';

export default function TrackPackagePage() {
    const [trackingId, setTrackingId] = useState('');
    const [isTracking, setIsTracking] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = () => {
        if (!trackingId.trim()) {
            setError('Please enter a tracking number');
            return;
        }
        // Mock validation - any input works for demo
        setIsTracking(true);
        setError('');
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            {!isTracking ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Enter Your Tracking Number</h2>

                    <div className="w-full max-w-md space-y-4">
                        <input
                            type="text"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                            placeholder="Enter tracking ID"
                            className="w-full px-6 py-4 bg-gray-50 rounded-xl border border-gray-200 focus:border-[#00853E] focus:ring-2 focus:ring-green-100 outline-none transition-all text-center text-lg"
                        />

                        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                        <button
                            onClick={handleTrack}
                            className="bg-[#00853E] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#006c32] transition-colors flex items-center gap-2 mx-auto"
                        >
                            <span>Track Package</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="animate-fade-in">
                    <TrackingMap />
                    <TrackingStatus />

                    <button
                        onClick={() => {
                            setIsTracking(false);
                            setTrackingId('');
                        }}
                        className="mt-8 text-gray-500 hover:text-[#00853E] text-sm font-medium flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Track another package
                    </button>
                </div>
            )}
        </div>
    );
}

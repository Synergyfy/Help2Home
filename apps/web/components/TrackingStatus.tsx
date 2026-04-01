'use client';

import React from 'react';
import Image from 'next/image';

export default function TrackingStatus() {
    return (
        <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex-1 mr-8">
                    <h3 className="text-gray-900 font-medium mb-2">Dispatch Progress</h3>
                    <div className="w-full bg-gray-200 rounded-full h-10 overflow-hidden relative">
                        <div
                            className="bg-[#6B46C1] h-full flex items-center justify-center text-white font-bold text-sm"
                            style={{ width: '75%' }}
                        >
                            75%
                        </div>
                    </div>
                </div>
                <div className="text-center border-l border-gray-100 pl-8">
                    <span className="block text-gray-500 text-sm mb-1">Date</span>
                    <span className="block text-3xl font-bold text-gray-900">30</span>
                    <span className="block text-gray-500 text-sm">March</span>
                </div>
            </div>

            {/* Driver Info Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-green-100 overflow-hidden border-2 border-[#00853E] flex-shrink-0">
                    {/* Placeholder for driver image */}
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500 text-xs">
                        Driver
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Sylvester Achalugo</h3>
                    <p className="text-gray-500 mb-2">Dispatch Rider</p>
                    <div className="flex gap-4">
                        <button className="text-gray-400 hover:text-[#00853E] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </button>
                        <button className="text-gray-400 hover:text-[#00853E] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="w-32 h-20 rounded-lg overflow-hidden bg-gray-100 hidden sm:block">
                    {/* Placeholder for car/map preview */}
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                        Preview
                    </div>
                </div>
            </div>
        </div>
    );
}

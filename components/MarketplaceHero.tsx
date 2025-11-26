'use client';

import React from 'react';
import Image from 'next/image';

export default function MarketplaceHero() {
    return (
        <div className="relative w-full h-[500px] rounded-3xl overflow-hidden mb-12">
            {/* Background Image */}
            <Image
                src="/assets/marketplace assets/Rectangle 129.png"
                alt="Modern luxury home with pool"
                fill
                className="object-cover"
                priority
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                        Find Your Future<br />Dream Home
                    </h1>

                    {/* Search Bar */}
                    <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row gap-2 max-w-3xl">
                        <div className="flex-1 grid grid-cols-3 divide-x divide-gray-200">
                            {/* Location */}
                            <div className="px-4 py-2">
                                <label className="block text-xs text-gray-500 font-medium mb-1">Location</label>
                                <select className="w-full text-sm font-bold text-gray-900 bg-transparent border-none focus:ring-0 p-0 cursor-pointer">
                                    <option>Select Location</option>
                                    <option>Abuja</option>
                                    <option>Lagos</option>
                                    <option>Port Harcourt</option>
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="px-4 py-2">
                                <label className="block text-xs text-gray-500 font-medium mb-1">Price Range</label>
                                <select className="w-full text-sm font-bold text-gray-900 bg-transparent border-none focus:ring-0 p-0 cursor-pointer">
                                    <option>Price Range</option>
                                    <option>₦200k - ₦500k</option>
                                    <option>₦500k - ₦1M</option>
                                    <option>₦1M+</option>
                                </select>
                            </div>

                            {/* Property Type */}
                            <div className="px-4 py-2">
                                <label className="block text-xs text-gray-500 font-medium mb-1">Property Type</label>
                                <select className="w-full text-sm font-bold text-gray-900 bg-transparent border-none focus:ring-0 p-0 cursor-pointer">
                                    <option>Duplex</option>
                                    <option>Flat</option>
                                    <option>Bungalow</option>
                                </select>
                            </div>
                        </div>

                        {/* Search Button */}
                        <button className="bg-[#00853E] text-white px-8 py-3 rounded-md font-bold hover:bg-green-700 transition-colors">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

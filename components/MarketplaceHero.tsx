'use client';

import React from 'react';
import Image from 'next/image';

export default function MarketplaceHero() {
    return (
        <div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] rounded-xl md:rounded-3xl overflow-hidden mb-8 md:mb-12">
            {/* Background Image */}
            <Image
                src="/assets/marketplace assets/Rectangle 129.png"
                alt="Modern luxury home with pool"
                fill
                className="object-cover object-center"
                priority
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-8">
                <div className="max-w-3xl w-full">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight">
                        Find Your Future<br />Dream Home
                    </h1>

                    {/* Search Bar */}
                    <div className="bg-white p-3 sm:p-4 md:p-2 rounded-lg shadow-lg flex flex-col md:flex-row gap-3 md:gap-2 w-full">
                        <div className="flex-1 flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-0 md:divide-x md:divide-gray-200">
                            {/* Location */}
                            <div className="px-0 md:px-4 py-2">
                                <label className="block text-xs text-gray-500 font-medium mb-1">Location</label>
                                <select className="w-full text-sm font-bold text-gray-900 bg-white border border-gray-200 md:border-none rounded md:rounded-none focus:ring-2 focus:ring-green-500 md:focus:ring-0 p-2 md:p-0 cursor-pointer">
                                    <option>Select Location</option>
                                    <option>Abuja</option>
                                    <option>Lagos</option>
                                    <option>Port Harcourt</option>
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="px-0 md:px-4 py-2">
                                <label className="block text-xs text-gray-500 font-medium mb-1">Price Range</label>
                                <select className="w-full text-sm font-bold text-gray-900 bg-white border border-gray-200 md:border-none rounded md:rounded-none focus:ring-2 focus:ring-green-500 md:focus:ring-0 p-2 md:p-0 cursor-pointer">
                                    <option>Price Range</option>
                                    <option>₦200k - ₦500k</option>
                                    <option>₦500k - ₦1M</option>
                                    <option>₦1M+</option>
                                </select>
                            </div>

                            {/* Property Type */}
                            <div className="px-0 md:px-4 py-2">
                                <label className="block text-xs text-gray-500 font-medium mb-1">Property Type</label>
                                <select className="w-full text-sm font-bold text-gray-900 bg-white border border-gray-200 md:border-none rounded md:rounded-none focus:ring-2 focus:ring-green-500 md:focus:ring-0 p-2 md:p-0 cursor-pointer">
                                    <option>Duplex</option>
                                    <option>Flat</option>
                                    <option>Bungalow</option>
                                </select>
                            </div>
                        </div>

                        {/* Search Button */}
                        <button className="bg-[#00853E] text-white px-6 sm:px-8 py-3 rounded-md font-bold hover:bg-green-700 transition-colors w-full md:w-auto">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

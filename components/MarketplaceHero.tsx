'use client';

import React from 'react';
import Image from 'next/image';

export default function MarketplaceHero() {
    return (
        <div className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] overflow-hidden mb-8 md:mb-12">
            {/* Background Image */}
            <Image
                src="/assets/marketplace assets/Rectangle 129.png"
                alt="Modern luxury home with pool"
                fill
                className="object-cover object-center"
                priority
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-20 py-8">
                <div className="max-w-4xl w-full">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-green/20 text-brand-green-light border border-brand-green/30 text-sm font-bold mb-4 backdrop-blur-sm">
                        Verified Listings Only
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
                        Find Your Future<br />
                        <span className="text-brand-green">Dream Home</span>
                    </h1>
                    <p className="text-lg text-gray-200 mb-8 max-w-xl leading-relaxed">
                        Discover thousands of verified properties for rent. From cozy apartments to luxury villas, find the perfect space that fits your lifestyle.
                    </p>

                    {/* Search Bar */}
                    <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 w-full max-w-3xl transform hover:scale-[1.01] transition-transform duration-300">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-0 md:divide-x md:divide-gray-100">
                            {/* Location */}
                            <div className="px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors group cursor-pointer">
                                <label className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-1 group-hover:text-brand-green transition-colors">Location</label>
                                <select className="w-full text-sm font-bold text-gray-900 bg-transparent border-none focus:ring-0 p-0 cursor-pointer appearance-none">
                                    <option>Abuja</option>
                                    <option>Lagos</option>
                                    <option>Port Harcourt</option>
                                </select>
                            </div>

                            {/* Price Range */}
                            <div className="px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors group cursor-pointer">
                                <label className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-1 group-hover:text-brand-green transition-colors">Price Range</label>
                                <select className="w-full text-sm font-bold text-gray-900 bg-transparent border-none focus:ring-0 p-0 cursor-pointer appearance-none">
                                    <option>Any Price</option>
                                    <option>₦200k - ₦500k</option>
                                    <option>₦500k - ₦1M</option>
                                    <option>₦1M+</option>
                                </select>
                            </div>

                            {/* Property Type */}
                            <div className="px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors group cursor-pointer">
                                <label className="block text-xs text-gray-500 font-bold uppercase tracking-wider mb-1 group-hover:text-brand-green transition-colors">Property Type</label>
                                <select className="w-full text-sm font-bold text-gray-900 bg-transparent border-none focus:ring-0 p-0 cursor-pointer appearance-none">
                                    <option>All Types</option>
                                    <option>Duplex</option>
                                    <option>Flat</option>
                                    <option>Bungalow</option>
                                </select>
                            </div>
                        </div>

                        {/* Search Button */}
                        <button className="bg-brand-green text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 md:w-auto w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

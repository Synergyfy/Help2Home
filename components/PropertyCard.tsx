'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PropertyCardProps {
    id: number | string;
    image: string;
    title: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    description: string;
    price: string;
    monthlyPrice?: string;
    featured?: boolean;
    verified?: boolean;
    isNew?: boolean;
}

export default function PropertyCard({
    id,
    image,
    title,
    location,
    bedrooms,
    bathrooms,
    description,
    price,
    monthlyPrice,
    featured = false,
    verified = true,
    isNew = false
}: PropertyCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="group relative">
            <Link href={`/marketplace/${id}`} className="block">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:-translate-y-1">
                    {/* Image Container */}
                    <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-gray-100">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                            {featured && (
                                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    ⭐ Featured
                                </span>
                            )}
                            {isNew && (
                                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                    🆕 New
                                </span>
                            )}
                            {verified && (
                                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Verified
                                </span>
                            )}
                        </div>

                        {/* Favorite Button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsFavorite(!isFavorite);
                            }}
                            className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-lg z-10 group/fav"
                        >
                            <svg
                                className={`w-5 h-5 transition-all duration-200 ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'fill-none text-gray-700 group-hover/fav:text-red-500'}`}
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>

                        {/* Quick View Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                View Details
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#00853E] transition-colors line-clamp-1">
                            {title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {location}
                        </p>

                        {/* Features */}
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1.5">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className="font-medium">{bedrooms} Beds</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                </svg>
                                <span className="font-medium">{bathrooms} Baths</span>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                            {description}
                        </p>

                        {/* Price */}
                        <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                            <div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {price}
                                </div>
                                {monthlyPrice && (
                                    <div className="text-sm text-gray-500 mt-0.5">
                                        or {monthlyPrice}/month
                                    </div>
                                )}
                            </div>
                            <div className="bg-[#00853E] text-white px-4 py-2 rounded-lg text-sm font-semibold group-hover:bg-green-700 transition-colors">
                                View →
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CiStar } from "react-icons/ci";
import { TbNewSection } from "react-icons/tb";
import { HiCheckCircle } from "react-icons/hi";
import { GrStatusGood } from "react-icons/gr";
import { formatNumber } from '@/utils/helpers';

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
    amenities?: (string | { name: string; price: number })[];
    serviceCharge?: number;
    rawPrice?: number;
    isInstallmentAllowed?: boolean;
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
    isNew = false,
    amenities = [],
    serviceCharge = 0,
    rawPrice = 0,
    isInstallmentAllowed = false
}: PropertyCardProps) {
    const [isFavorite, setIsFavorite] = useState(false);

    // Calculate total upfront if rawPrice is provided
    const amenitiesTotal = amenities.reduce((acc, curr) => {
        if (typeof curr === 'object' && curr.price) return acc + curr.price;
        return acc;
    }, 0);

    // Fallback to parsing price string if rawPrice isn't provided
    const basePrice = rawPrice || parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
    const totalUpfront = basePrice + serviceCharge + amenitiesTotal;

    return (
        <div className="group relative h-full">
            <Link href={`/marketplace/${id}`} className="block h-full">
                <div className="bg-white rounded-4xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:-translate-y-2 flex flex-col h-full">
                    {/* Image Container */}
                    <div className="relative h-64 w-full overflow-hidden bg-gray-100 shrink-0">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        />

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                            {featured && (
                                <span className="inline-flex gap-1.5 items-center bg-white/95 backdrop-blur-md text-amber-600 text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg border border-amber-100 uppercase tracking-widest">
                                    <CiStar className='w-3.5 h-3.5' /> Featured
                                </span>
                            )}
                            {isNew && (
                                <span className="inline-flex gap-1.5 items-center bg-white/95 backdrop-blur-md text-blue-600 text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg border border-blue-100 uppercase tracking-widest">
                                    <TbNewSection className='w-3.5 h-3.5' /> New
                                </span>
                            )}
                            {verified && (
                                <span className="inline-flex gap-1.5 items-center bg-brand-green text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg uppercase tracking-widest">
                                    <HiCheckCircle className="w-3.5 h-3.5" /> Verified
                                </span>
                            )}
                        </div>

                        {/* Favorite Button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsFavorite(!isFavorite);
                            }}
                            className="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg z-10 group/fav border border-white/20"
                        >
                            <svg
                                className={`w-5 h-5 transition-all duration-300 ${isFavorite ? 'fill-red-500 text-red-500 scale-110' : 'fill-none text-gray-700 group-hover/fav:text-red-500'}`}
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-7 flex flex-col grow">
                        <div className="flex justify-between items-start mb-2 gap-4">
                            <h3 className="text-xl font-black text-gray-900 leading-tight group-hover:text-brand-green transition-colors line-clamp-1">
                                {title}
                            </h3>
                            <div className="flex flex-col items-end">
                                <div className="text-brand-green font-black text-lg whitespace-nowrap">
                                    {price.startsWith('₦') ? `₦${formatNumber(price)}` : formatNumber(price)}
                                </div>
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                                    Upfront: ₦{formatNumber(totalUpfront)}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm mb-6 flex items-center gap-1.5 font-bold uppercase tracking-wider">
                            <svg className="w-4 h-4 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {location}
                        </p>

                        {/* Features */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                                <span className="text-brand-green font-black text-xs">{bedrooms}</span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Beds</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                                <span className="text-brand-green font-black text-xs">{bathrooms}</span>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Baths</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                            <div className="text-brand-green font-black text-xl">
                                {price.startsWith('₦') ? `₦${formatNumber(price)}` : formatNumber(price)}
                            </div>
                            <div className="bg-brand-green text-white p-3 rounded-2xl shadow-lg shadow-brand-green/20">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

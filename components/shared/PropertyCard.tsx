'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HiOutlineMapPin,
    HiOutlineHeart,
    HiCheckCircle,
    HiOutlineCreditCard
} from 'react-icons/hi2';
import { IoBedOutline, IoWaterOutline } from 'react-icons/io5';
import { formatNumber, formatCurrency } from '@/utils/helpers';
import FadeIn from '@/components/FadeIn';

interface PropertyCardProps {
    property: any;
    index: number;
    showTotalUpfront?: boolean;
    onInvest?: (property: any) => void;
}



export default function PropertyCard({ property, index, showTotalUpfront = true, onInvest }: PropertyCardProps) {
    // Normalize images
    const rawImages = property.images && property.images.length > 0 ? property.images : ['/assets/marketplace assets/home1.png'];
    const image = typeof rawImages[0] === 'string' ? rawImages[0] : rawImages[0].url;

    // Calculate total upfront
    const amenitiesTotal = (property.amenities || []).reduce((acc: number, curr: any) => {
        if (typeof curr === 'object' && curr.price) return acc + curr.price;
        return acc;
    }, 0);
    const totalUpfront = (property.price || 0) + (property.serviceCharge || 0) + amenitiesTotal;

    return (
        <FadeIn delay={index * 0.05} direction="up" className="h-full">
            <div className="group bg-white rounded-4xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-500 h-full flex flex-col relative">
                {/* Image Section */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                    <Image
                        src={image}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                        {property.verified && (
                            <span className="bg-white/90 backdrop-blur-md text-brand-green text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                                <HiCheckCircle size={12} /> Verified
                            </span>
                        )}
                        <span className="bg-brand-green text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            {property.propertyType?.replace('-', ' ') || 'Property'}
                        </span>
                        {property.investmentTerms?.enabled && (
                            <span className="bg-brand-green/10 backdrop-blur-md text-brand-green text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1 border border-brand-green/20">
                                ROI: {property.investmentTerms.roi}%
                            </span>
                        )}
                    </div>

                    {/* Like Button */}
                    <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-md hover:bg-white rounded-full p-2 text-gray-400 hover:text-red-500 transition-all shadow-md z-10 active:scale-90">
                        <HiOutlineHeart size={18} />
                    </button>

                    {/* Location Badge (Bottom) */}
                    <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-full px-2.5 py-1 text-white text-[9px] font-bold border border-white/20">
                            <HiOutlineMapPin className="text-brand-green" />
                            {property.location}{property.city ? `, ${property.city}` : ''}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col grow">
                    {/* Title */}
                    <Link href={`/marketplace/${property.id}`} className="block">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-green transition-colors mb-1 line-clamp-1 leading-tight">
                            {property.title}
                        </h3>
                    </Link>

                    {/* Lister Name */}
                    <Link
                        href={`/marketplace/listers/${encodeURIComponent(property.listerName || 'Verified User')}`}
                        className="text-sm text-brand-green font-medium hover:underline mb-3 block line-clamp-1"
                    >
                        {property.listerName || 'Verified User'}
                    </Link>

                    {/* Specs */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1.5 text-gray-600 font-bold text-[10px] bg-gray-50 px-2.5 py-1.5 rounded-xl border border-gray-100/50">
                            <IoBedOutline size={14} className="text-brand-green" />
                            <span>{property.bedrooms} Beds</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600 font-bold text-[10px] bg-gray-50 px-2.5 py-1.5 rounded-xl border border-gray-100/50">
                            <IoWaterOutline size={14} className="text-brand-green" />
                            <span>{property.bathrooms} Baths</span>
                        </div>
                        {property.isInstallmentAllowed && (
                            <div className="flex items-center gap-1.5 text-brand-green font-bold text-[9px] bg-green-50 px-2.5 py-1.5 rounded-xl border border-green-100/50 uppercase tracking-widest">
                                <HiOutlineCreditCard size={14} />
                                <span>Installments</span>
                            </div>
                        )}
                    </div>

                    {/* Pricing */}
                    <div className="mt-auto space-y-4">
                        <div className="flex flex-col gap-1 pt-4 border-t border-gray-50">
                            <div className="flex justify-between items-baseline">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                                        {property.propertyType === 'invest' 
                                            ? 'Property Value' 
                                            : property.propertyType === 'service-apartment' 
                                                ? `Price per ${property.billingCycle || 'day'}`
                                                : property.propertyType === 'buy' || property.propertyType === 'rent-to-own'
                                                    ? 'Property Price'
                                                    : 'Annual Rent'}
                                    </span>
                                    <span className="text-xl font-black text-brand-green">
                                        {formatCurrency(property.price)}
                                        {property.propertyType === 'rent' && <span className="text-[10px] font-bold text-gray-400 ml-1">/yr</span>}
                                        {property.propertyType === 'service-apartment' && (
                                            <span className="text-[10px] font-bold text-gray-400 ml-1">
                                                /{property.billingCycle === 'day' ? 'day' : property.billingCycle === 'week' ? 'wk' : property.billingCycle === 'month' ? 'mo' : 'day'}
                                            </span>
                                        )}
                                    </span>
                                </div>
                                {showTotalUpfront && (
                                    <div className="flex flex-col items-end">
                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                                            Total Amount
                                        </span>
                                        <span className="text-sm font-black text-gray-900">₦{formatNumber(totalUpfront)}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {property.propertyType === 'invest' ? (
                            <button
                                onClick={() => onInvest?.(property)}
                                className="block w-full text-center bg-gray-900 text-white hover:bg-black py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-gray-200 hover:shadow-gray-400/30"
                            >
                                Invest Now
                            </button>
                        ) : (
                            <Link
                                href={`/marketplace/${property.id}`}
                                className="block w-full text-center bg-brand-green text-white hover:bg-green-700 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-lg shadow-green-100 hover:shadow-brand-green/30"
                            >
                                View Details
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineMapPin, HiOutlineArrowRight } from 'react-icons/hi2';
import { getMockProperties } from '@/utils/properties';
import { formatNumber } from '@/utils/helpers';

export default function FeaturedListings() {
    // Get real properties and filter for featured
    const properties = getMockProperties();
    const featuredProperties = properties.filter(p => p.featured).slice(0, 3);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl -tranbrand-green-y-1/2 tranbrand-green-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl tranbrand-green-y-1/2 -tranbrand-green-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-12 h-1 bg-brand-green rounded-full"></span>
                            <span className="text-sm font-black uppercase tracking-[0.2em] text-brand-green">Premium Selection</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                            Featured <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-green to-green-700">Marketplace</span> Listings
                        </h2>
                    </div>
                    <Link
                        href="/marketplace"
                        className="group flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-brand-green transition-all duration-300 shadow-xl shadow-gray-200 hover:shadow-brand-green/20"
                    >
                        Explore Marketplace
                        <HiOutlineArrowRight className="group-hover:tranbrand-green-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {featuredProperties.map((property, index) => {
                        // Calculate total upfront
                        const amenitiesTotal = (property.amenities || []).reduce((acc: number, curr: any) => {
                            if (typeof curr === 'object' && curr.price) return acc + curr.price;
                            return acc;
                        }, 0);
                        const totalUpfront = property.price + (property.serviceCharge || 0) + amenitiesTotal;

                        return (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500"
                            >
                                <Link href={`/marketplace/${property.id}`} className="block relative h-72 md:h-80 overflow-hidden">
                                    <Image
                                        src={property.images[0] || '/assets/marketplace assets/home1.png'}
                                        alt={property.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                                        {property.verified && (
                                            <span className="bg-white/90 backdrop-blur-md text-brand-green text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                                Verified
                                            </span>
                                        )}
                                        <span className="bg-brand-green text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                            {property.propertyType.replace('-', ' ')}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-white text-xs border border-white/20">
                                            <HiOutlineMapPin className="text-brand-green" />
                                            {property.location}, {property.city}
                                        </div>
                                    </div>
                                </Link>

                                <div className="p-8">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-green transition-colors mb-4 line-clamp-1">
                                        {property.title}
                                    </h3>

                                    <div className="flex items-center gap-4 mb-6 text-gray-400">
                                        <div className="flex items-center gap-2 text-gray-500 font-bold text-sm bg-gray-50 px-3 py-1.5 rounded-xl">
                                            <span className="text-brand-green">{property.bedrooms}</span> Beds
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500 font-bold text-sm bg-gray-50 px-3 py-1.5 rounded-xl">
                                            <span className="text-brand-green">{property.bathrooms}</span> Baths
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1 pt-6 border-t border-gray-50">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Upfront</span>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-black text-brand-green">₦{formatNumber(totalUpfront)}</span>
                                            {property.propertyType === 'rent' && (
                                                <span className="text-xs font-bold text-gray-400">total</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

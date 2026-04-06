'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight } from 'react-icons/hi2';
import { useFeaturedProperties } from '@/hooks/useMarketplaceQueries';
import PropertyCard from '@/components/shared/PropertyCard';

export default function FeaturedListings() {
    const { data, isLoading } = useFeaturedProperties(undefined, 3);
    const featuredProperties = data || [];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

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
                        <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {isLoading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="bg-gray-100 animate-pulse rounded-2xl h-96 w-full"></div>
                        ))
                    ) : (
                        featuredProperties.map((property: any, index: number) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                index={index}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

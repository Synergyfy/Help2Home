'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiOutlineArrowRight, HiOutlineMapPin } from 'react-icons/hi2';

const locations = [
    {
        city: 'Lekki Phase 1',
        region: 'Lagos Island',
        image: 'https://images.unsplash.com/photo-1590059132669-9f7721517f84?q=80&w=800&auto=format&fit=crop',
        averageRent: '₦4.5M',
        count: 142,
        slug: 'lekki',
        tag: 'Modern Living'
    },
    {
        city: 'Victoria Island',
        region: 'Business District',
        image: 'https://images.unsplash.com/photo-1548512163-421712a4f40f?q=80&w=800&auto=format&fit=crop',
        averageRent: '₦6.5M',
        count: 98,
        slug: 'victoria-island',
        tag: 'Corporate Hub'
    },
    {
        city: 'Ikoyi',
        region: 'Elite Residential',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
        averageRent: '₦8.0M',
        count: 64,
        slug: 'ikoyi',
        tag: 'Ultra Luxury'
    },
    {
        city: 'Maitama',
        region: 'Abuja FCT',
        image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop',
        averageRent: '₦7.5M',
        count: 82,
        slug: 'maitama',
        tag: 'Diplomatic Zone'
    },
    {
        city: 'Wuse 2',
        region: 'Abuja Central',
        image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800&auto=format&fit=crop',
        averageRent: '₦5.0M',
        count: 115,
        slug: 'wuse-2',
        tag: 'Lifestyle Central'
    },
    {
        city: 'Eko Atlantic',
        region: 'The Future City',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
        averageRent: '₦12.0M',
        count: 24,
        slug: 'eko-atlantic',
        tag: 'Smart City'
    }
];

export default function LocationsGrid() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-12 h-1 bg-brand-green rounded-full"></span>
                            <span className="text-sm font-black uppercase tracking-[0.2em] text-brand-green">Explore Neighborhoods</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                            Find Your Place In <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-green to-green-700">Premium Cities</span>
                        </h2>
                    </div>
                    <Link 
                        href="/locations" 
                        className="group flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-brand-green transition-all duration-300 shadow-xl shadow-gray-200 hover:shadow-brand-green/20"
                    >
                        View All Neighborhoods
                        <HiOutlineArrowRight className="group-hover:tranbrand-green-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {locations.map((location, index) => (
                        <motion.div
                            key={location.city}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href={`/marketplace?location=${location.slug}`}
                                className="group relative block rounded-[2.5rem] overflow-hidden aspect-4/5 shadow-xl shadow-gray-200/50"
                            >
                                <Image
                                    src={location.image}
                                    alt={location.city}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                />

                                {/* Gradient Overlays */}
                                <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black via-transparent to-transparent z-10"></div>

                                {/* Tag */}
                                <div className="absolute top-8 left-8 z-20">
                                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                                        {location.tag}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="absolute inset-x-0 bottom-0 p-10 z-20">
                                    <p className="text-brand-green font-black text-xs uppercase tracking-[0.3em] mb-3">{location.region}</p>
                                    <h3 className="text-3xl font-black text-white mb-6 group-hover:tranbrand-green-x-2 transition-transform duration-500 flex items-center gap-3">
                                        {location.city}
                                        <HiOutlineArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6" />
                                    </h3>

                                    <div className="flex items-center gap-4 pt-6 border-t border-white/20">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Listings</span>
                                            <span className="text-sm font-bold text-white">{location.count} available</span>
                                        </div>
                                        <div className="w-px h-8 bg-white/20"></div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Average Rent</span>
                                            <span className="text-sm font-bold text-brand-green">{location.averageRent}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

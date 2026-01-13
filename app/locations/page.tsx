'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineMagnifyingGlass, HiOutlineMapPin, HiOutlineArrowRight } from 'react-icons/hi2';
import LocationsGrid from '@/components/LocationsGrid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LocationsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1590059132669-9f7721517f84?q=80&w=2000&auto=format&fit=crop"
                    alt="Lagos Skyline"
                    fill
                    className="object-cover brightness-[0.4]"
                    priority
                />

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-brand-green/20 to-transparent z-10"></div>

                <div className="container mx-auto px-6 relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-brand-green font-black tracking-[0.4em] uppercase text-sm mb-6 block">Premium Neighborhoods</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
                            Discover Your Perfect <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-green to-green-500">Local Sanctuary</span>
                        </h1>
                        <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed mb-12">
                            From the bustling business districts of Victoria Island to the serene luxury of Ikoyi, find a home that matches your lifestyle.
                        </p>

                        {/* Search Bar Placeholder */}
                        <div className="max-w-xl mx-auto relative group">
                            <input
                                type="text"
                                placeholder="Search by area, street, or landmark..."
                                className="w-full h-18 pl-14 pr-32 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none focus:ring-4 focus:ring-brand-green/30 transition-all font-bold"
                            />
                            <HiOutlineMagnifyingGlass className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 w-6 h-6" />
                            <Link href="/marketplace" className="absolute right-3 top-1/2 -translate-y-1/2 bg-brand-green text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-brand-green transition-all shadow-xl shadow-brand-green/20">
                                Explore
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-12 bg-gray-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        <div className="text-center">
                            <p className="text-3xl font-black text-gray-900 mb-1">50+</p>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Neighborhoods</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-black text-brand-green mb-1">2,400+</p>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Listings</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-black text-gray-900 mb-1">24/7</p>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Support Access</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-black text-gray-900 mb-1">100%</p>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verified Properties</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Grid */}
            <LocationsGrid />

            {/* Premium CTA */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="relative rounded-[4rem] bg-gray-900 p-12 md:p-24 overflow-hidden border border-white/5">
                        <Image
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop"
                            alt="Luxury Interior"
                            fill
                            className="object-cover opacity-20 scale-110 blur-sm"
                        />
                        <div className="relative z-10 text-center max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Can&apos;t Find Your <br /> Perfect Neighborhood?</h2>
                            <p className="text-gray-400 text-lg mb-12">Our concierge team is ready to help you discover hidden gems and exclusive listings off the market.</p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link href="/contact" className="bg-brand-green text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-brand-green transition-all shadow-2xl shadow-brand-green/20">
                                    Talk to an Expert
                                </Link>
                                <Link href="/marketplace" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-gray-900 transition-all">
                                    Browse All Listings
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

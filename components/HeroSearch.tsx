'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import HeroImg from '@/About us assets/heroImg.jpg'

const slides = [
    {
        role: 'Tenant',
        headline: (
            <>
                <span className="text-brand-green">Get your home now, pay later</span> — fast, trusted, local
            </>
        ),
        subhead: 'Search verified homes, schedule viewings and pay rent online — all in one place.',
        image: '/assets/Rectangle 38.png',
        cta: 'Search properties'
    },
    {
        role: 'Landlord',
        headline: (
            <>
                Maximize your rental income with <span className="text-brand-green">guaranteed payments</span>
            </>
        ),
        subhead: 'List your property, verify tenants, and receive rent upfront or monthly without stress.',
        image: '/assets/Rectangle 42.png',
        cta: 'List your property'
    },
    {
        role: 'Caretaker',
        headline: (
            <>
                Manage properties efficiently and <span className="text-brand-green">earn commissions</span>
            </>
        ),
        subhead: 'Partner with us to facilitate viewings, manage listings, and grow your real estate business.',
        image: '/assets/Rectangle 42.png',
        cta: 'Join as Agent'
    },
    {
        role: 'Investor',
        headline: (
            <>
                Build your real estate portfolio with <span className="text-brand-green">high returns</span>
            </>
        ),
        subhead: 'Invest in verified properties and earn attractive returns on your capital.',
        image: '/assets/Rectangle 1301.png',
        cta: 'Start Investing'
    }
];

export default function HeroSearch() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative overflow-hidden py-8 md:py-12 lg:py-20">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src={HeroImg}
                    alt="Beautiful house exterior"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Darker overlay for better contrast */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-8 md:mb-12">
                    {/* Text Content */}
                    <div className="flex-1 w-full md:max-w-xl z-10 flex flex-col md:min-h-[500px] relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="inline-block w-fit py-1 px-3 rounded-full bg-brand-green/10 text-brand-green text-sm font-bold mb-3 md:mb-4">
                                    For {slides[currentSlide].role}s
                                </span>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 md:mb-6">
                                    {slides[currentSlide].headline}
                                </h1>
                                <p className="text-white text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
                                    {slides[currentSlide].subhead}
                                </p>
                                <Link href="/marketplace">
                                    <button className="bg-brand-green text-white px-6 md:px-8 py-3 rounded-md font-medium hover:bg-green-600 transition-colors shadow-lg text-base md:text-lg">
                                        {slides[currentSlide].cta}
                                    </button>
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Slide Image */}
                    <div className="flex-1 relative w-full md:max-w-lg mt-8 md:mt-0 z-10">
                        <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentSlide}
                                    src={slides[currentSlide].image}
                                    alt={`${slides[currentSlide].role} - Help2Home`}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.7 }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="relative z-20 max-w-2xl mx-auto mt-8 md:mt-12"
                >
                    <div className="bg-white p-3 rounded-xl shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-2 hover:shadow-3xl transition-shadow duration-300">
                        <div className="flex-1 w-full px-4 border-b md:border-b-0 md:border-r border-gray-200 py-2 md:py-0">
                            <label htmlFor="location-search" className="sr-only">Location</label>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mr-3"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                                <input
                                    type="text"
                                    id="location-search"
                                    placeholder="City, neighbourhood, or landmark"
                                    className="w-full outline-none text-gray-900 placeholder-gray-500 h-10"
                                />
                            </div>
                        </div>

                        <div className="flex w-full md:w-auto gap-2">
                            <button className="flex-1 md:flex-none px-6 py-3 text-gray-600 hover:text-brand-green font-medium text-sm border-r border-gray-200 transition-colors">
                                Filters
                            </button>
                            <Link href="/marketplace" className="flex-1 md:flex-none">
                                <button className="w-full bg-brand-green text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-all font-bold shadow-md flex items-center justify-center gap-2 active:scale-95">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                    Search
                                </button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

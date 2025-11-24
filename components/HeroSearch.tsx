'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
    {
        role: 'Tenant',
        headline: (
            <>
                Find your next home in Nigeria — <span className="text-brand-green">fast, trusted, local</span>
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
        <section className="relative bg-white py-12 md:py-20 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row items-start gap-12 mb-12">

                    {/* Text Content (Left) */}
                    <div className="flex-1 max-w-xl z-10 flex flex-col min-h-[500px] pt-4 relative">
                        {/* Slideshow Wrapper */}
                        <div className="relative w-full h-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute top-0 left-0 w-full flex flex-col justify-start"
                                >
                                    <motion.span
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="inline-block w-fit py-1 px-3 rounded-full bg-brand-green/10 text-brand-green text-sm font-bold mb-4"
                                    >
                                        For {slides[currentSlide].role}s
                                    </motion.span>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 min-h-[120px] flex items-center"
                                    >
                                        <span>{slides[currentSlide].headline}</span>
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-lg text-gray-600 mb-8 leading-relaxed min-h-[84px]"
                                    >
                                        {slides[currentSlide].subhead}
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex flex-col sm:flex-row gap-4"
                                    >
                                        <button className="bg-brand-green text-white px-8 py-3 rounded-md font-medium hover:bg-green-600 transition-colors shadow-lg text-lg transform hover:scale-105 active:scale-95 duration-200">
                                            {slides[currentSlide].cta}
                                        </button>
                                    </motion.div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Slide Indicators */}
                        <div className="flex gap-2 absolute bottom-4 left-0 z-20">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-brand-green w-8' : 'bg-gray-200 w-4 hover:bg-gray-300'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Image Content (Right) */}
                    <div className="flex-1 relative w-full max-w-lg">
                        {/* Abstract Shape Background */}
                        <motion.div
                            animate={{ rotate: [3, 6, 3] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-0 right-0 w-full h-full bg-blue-50 rounded-[3rem] scale-90 -z-10"
                        ></motion.div>

                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
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

                {/* Search Bar - Centered Below */}
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
                            <button className="flex-1 md:flex-none bg-brand-green text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-all font-bold shadow-md flex items-center justify-center gap-2 active:scale-95">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                                Search
                            </button>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Decorative Green Circle Element */}
            <motion.div
                animate={{ y: [0, -20, 0], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 w-24 h-48 bg-brand-green rounded-r-full opacity-20 -translate-x-1/2 translate-y-1/4 blur-2xl"
            ></motion.div>
        </section>
    );
}

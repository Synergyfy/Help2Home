'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from './FadeIn';

const testimonials = [
    {
        id: 1,
        name: "Nnamdi Okafor",
        role: "Tenant in Lagos",
        quote: "The flexibility Help2Home offers is unmatched. Being able to pay my rent monthly has allowed me to save for other investments without the pressure of a bulk payment.",
        image: "/assets/Ellipse 79.png",
        rating: 5
    },
    {
        id: 2,
        name: "Adebayo Adeleke",
        role: "Landlord in Abuja",
        quote: "Since listing my property on Help2Home, I've had zero vacancy periods. The guaranteed rent payments give me peace of mind I never had with traditional renting.",
        image: "/assets/Ellipse 79.png", // Using same placeholder for now
        rating: 5
    },
    {
        id: 3,
        name: "Grace Effiong",
        role: "Tenant in Port Harcourt",
        quote: "Finding a verified apartment was so easy. The virtual viewings saved me time, and the monthly payment plan is a lifesaver for my budget.",
        image: "/assets/Ellipse 79.png", // Using same placeholder for now
        rating: 4
    }
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        const timer = setInterval(nextTestimonial, 6000);
        return () => clearInterval(timer);
    }, []);

    const current = testimonials[currentIndex];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn direction="up">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Trusted by thousands</h2>
                </FadeIn>

                {/* Testimonial Card */}
                <FadeIn direction="up" delay={0.2}>
                    <div className="bg-white rounded-3xl p-8 md:p-12 relative flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-sm max-w-4xl mx-auto mb-20 min-h-[300px]">
                        {/* Navigation Arrows (Absolute) */}
                        <button
                            onClick={prevTestimonial}
                            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-brand-green hover:bg-gray-50 transition-colors z-10 border border-gray-100"
                            aria-label="Previous testimonial"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-brand-green hover:bg-gray-50 transition-colors z-10 border border-gray-100"
                            aria-label="Next testimonial"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>

                        {/* Image */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-brand-green/20 shrink-0 relative">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={current.id}
                                    src={current.image}
                                    alt={current.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full object-cover absolute inset-0"
                                />
                            </AnimatePresence>
                        </div>

                        {/* Content */}
                        <div className="text-center md:text-left flex-1">
                            <div className="flex justify-center md:justify-start mb-4 text-yellow-400 gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={i < current.rating ? "currentColor" : "none"} stroke={i < current.rating ? "none" : "currentColor"}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                ))}
                            </div>
                            <div className="min-h-[80px] flex items-center justify-center md:justify-start mb-6">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={current.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-gray-600 text-lg italic leading-relaxed"
                                    >
                                        "{current.quote}"
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                            <div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={current.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h4 className="font-bold text-gray-900">{current.name}</h4>
                                        <p className="text-gray-500 text-sm">{current.role}</p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* Slide Indicators */}
                <div className="flex justify-center gap-2 mb-16 -mt-10">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all ${index === currentIndex ? 'bg-brand-green w-6' : 'bg-gray-300 w-2 hover:bg-gray-400'
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Partner Logos */}
                <FadeIn direction="up" delay={0.4}>
                    <div className="text-center">
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-8">Our Partners</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Placeholders for Partner Logos */}
                            <div className="text-xl font-bold text-gray-400">BANK ONE</div>
                            <div className="text-xl font-bold text-gray-400">TRUST AGENCY</div>
                            <div className="text-xl font-bold text-gray-400">SECURE PAY</div>
                            <div className="text-xl font-bold text-gray-400">HOME FINDERS</div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

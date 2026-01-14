'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import HeroImg from '@/About us assets/heroImg.jpg';

const testimonials = [
    {
        quote: "Help2Home made finding my perfect apartment incredibly easy. The whole process was smooth!",
        author: "Sarah Johnson",
        role: "Tenant, Lagos",
    },
    {
        quote: "As a landlord, I've been able to manage my properties efficiently and find reliable tenants quickly.",
        author: "Michael Adeyemi",
        role: "Property Owner, Abuja",
    },
];

const GeometricPattern = () => (
    <div className="absolute top-6 left-6 grid grid-cols-4 gap-2 opacity-40">
        {[...Array(16)].map((_, i) => (
            <div key={i} className={`w-6 h-6 rounded-md ${[0, 1, 4, 5, 8, 12].includes(i) ? "bg-brand-green" : "bg-transparent"}`} />
        ))}
    </div>
);

export default function AuthHero() {
    const [current, setCurrent] = useState(0);

    return (
        <div className="relative hidden lg:flex flex-col h-full overflow-hidden bg-brand-green-900">
            <div className="absolute inset-0">
                <Image src={HeroImg} alt="Auth Background" fill className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" priority />
                <div className="absolute inset-0 bg-linear-to-t from-black via-brand-green-950/60 to-brand-green-900/40" />
            </div>

            <GeometricPattern />

            <div className="relative z-10 p-12 mt-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="max-w-md"
                    >
                        <p className="text-white text-2xl font-medium leading-relaxed mb-6 italic">
                            "{testimonials[current].quote}"
                        </p>
                        <p className="text-white font-bold text-lg">{testimonials[current].author}</p>
                        <p className="text-brand-green font-medium">{testimonials[current].role}</p>
                    </motion.div>
                </AnimatePresence>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={() => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-green hover:border-brand-green transition-all"
                    >
                        <FiChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-brand-green hover:border-brand-green transition-all"
                    >
                        <FiChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

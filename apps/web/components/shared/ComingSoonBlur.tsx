'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MdRocketLaunch, MdLock } from 'react-icons/md';

interface ComingSoonBlurProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export default function ComingSoonBlur({ children, title, description }: ComingSoonBlurProps) {
    return (
        <div className="relative w-full h-full min-h-[600px] overflow-hidden">
            {/* The actual content (Blurred) */}
            <div className="filter blur-md pointer-events-none select-none opacity-40">
                {children}
            </div>

            {/* The Overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/10 backdrop-blur-[2px]">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-lg text-center mx-4"
                >
                    <div className="relative mb-6 mx-auto w-20 h-20 bg-brand-green/10 rounded-3xl flex items-center justify-center text-brand-green">
                        <MdRocketLaunch size={40} className="animate-bounce" />
                        <div className="absolute -top-2 -right-2 bg-brand-dark text-white p-2 rounded-xl border-4 border-white shadow-lg">
                            <MdLock size={16} />
                        </div>
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                        {title}
                    </h2>
                    <div className="h-1.5 w-16 bg-brand-green rounded-full mx-auto mb-6" />
                    <p className="text-gray-500 font-medium leading-relaxed mb-8">
                        {description}
                    </p>

                    <div className="flex items-center justify-center gap-3 py-3 px-6 bg-gray-50 rounded-2xl border border-gray-100 italic">
                        <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Feature Under Development</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

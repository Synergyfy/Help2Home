'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MdRocketLaunch, MdConstruction, MdAutoAwesome } from 'react-icons/md';

interface ComingSoonProps {
    title: string;
    description: string;
    icon?: React.ElementType;
}

export default function ComingSoon({ title, description, icon: Icon = MdRocketLaunch }: ComingSoonProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative mb-8"
            >
                {/* Decorative background effects */}
                <div className="absolute inset-0 bg-brand-green/20 blur-3xl rounded-full scale-150 animate-pulse" />

                <div className="relative z-10 w-24 h-24 bg-white rounded-3xl shadow-2xl shadow-brand-green/20 flex items-center justify-center border border-brand-green/10">
                    <Icon className="text-brand-green text-5xl animate-bounce" />
                </div>

                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-brand-green border border-brand-green/5"
                >
                    <MdAutoAwesome className="text-xl" />
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="max-w-md"
            >
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                    {title}
                </h2>
                <div className="h-1.5 w-20 bg-brand-green rounded-full mx-auto mb-6" />
                <p className="text-gray-500 font-medium leading-relaxed">
                    {description}
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
                        <span className="w-2 h-2 bg-brand-green rounded-full animate-ping" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Development Phase 2.0</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

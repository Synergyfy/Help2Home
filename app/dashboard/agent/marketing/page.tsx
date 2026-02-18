'use client';

import React from 'react';
import {
    HiOutlineRocketLaunch,
    HiOutlineChartBar,
    HiOutlineMegaphone,
    HiOutlineSparkles,
    HiOutlineArrowRight
} from '@/components/shared/Icons';
import { motion } from 'framer-motion';

export default function MarketingPage() {
    return (
        <div className="space-y-10 pb-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Marketing Hub</h1>
                <p className="text-gray-500 font-medium italic">Grow your reach and accelerate your sales pipeline.</p>
            </div>

            {/* Coming Soon Hero */}
            <div className="relative overflow-hidden bg-gray-900 rounded-[3rem] p-12 lg:p-20 text-center">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                    <div className="absolute -top-24 -left-24 size-96 bg-brand-green rounded-full blur-[120px]" />
                    <div className="absolute -bottom-24 -right-24 size-96 bg-blue-600 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="size-20 rounded-3xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center text-brand-green mx-auto mb-8 shadow-inner"
                    >
                        <HiOutlineRocketLaunch size={40} />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight"
                    >
                        Something Big is <span className="text-brand-green">Launching Soon.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg font-medium leading-relaxed mb-10"
                    >
                        We&apos;re engineering a suite of professional marketing tools designed specifically for high-performance agents. From automated marketplace boosting to lead retargeting, your growth is about to get a major upgrade.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <button className="px-8 py-4 bg-brand-green text-white rounded-2xl font-black shadow-xl shadow-green-900/40 hover:bg-green-700 transition-all active:scale-95 flex items-center gap-2">
                            Get Early Access
                            <HiOutlineArrowRight size={18} strokeWidth={3} />
                        </button>
                        <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black hover:bg-white/20 transition-all">
                            View Roadmap
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Feature Teasers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm opacity-60">
                    <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
                        <HiOutlineChartBar size={28} />
                    </div>
                    <h3 className="font-black text-gray-900 text-lg mb-2">Performance Insights</h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                        Deep analytics into how many people are viewing your listings and where they come from.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm opacity-60">
                    <div className="size-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-6">
                        <HiOutlineMegaphone size={28} />
                    </div>
                    <h3 className="font-black text-gray-900 text-lg mb-2">Listing Booster</h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                        One-click visibility boost to get your properties featured at the top of marketplace searches.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm opacity-60">
                    <div className="size-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 mb-6">
                        <HiOutlineSparkles size={28} />
                    </div>
                    <h3 className="font-black text-gray-900 text-lg mb-2">AI Descriptions</h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                        Automatically generate high-converting property descriptions based on your photos and details.
                    </p>
                </div>
            </div>
        </div>
    );
}

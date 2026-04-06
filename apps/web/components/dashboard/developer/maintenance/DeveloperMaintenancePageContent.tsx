'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineWrenchScrewdriver, HiOutlineRocketLaunch, HiOutlineBell } from 'react-icons/hi2';

export default function DeveloperMaintenancePageContent() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6 bg-gray-50/30 rounded-[3rem]">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full text-center space-y-8 bg-white p-8 md:p-12 rounded-[3.5rem] shadow-xl border border-gray-100"
            >
                {/* Animated Icon */}
                <div className="relative inline-block">
                    <div className="size-32 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green">
                        <HiOutlineWrenchScrewdriver size={64} className="animate-pulse" />
                    </div>
                    <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{ 
                            repeat: Infinity,
                            duration: 3
                        }}
                        className="absolute -top-2 -right-2 size-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-amber-500 border border-gray-100"
                    >
                        <HiOutlineRocketLaunch size={24} />
                    </motion.div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                        Maintenance Portal <br />
                        <span className="text-brand-green">Coming Soon</span>
                    </h1>
                    <p className="text-lg text-gray-500 font-medium max-w-lg mx-auto">
                        We're building a powerful suite of maintenance management tools specifically for property developers. Track large-scale repairs across your entire portfolio with ease.
                    </p>
                </div>

                {/* Features Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-8">
                    {[
                        { title: 'Bulk Requests', desc: 'Manage repairs across multiple units' },
                        { title: 'Artisan Networks', desc: 'Direct access to verified contractors' },
                        { title: 'Cost Analytics', desc: 'Real-time project budget tracking' }
                    ].map((feature, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-1 text-sm">{feature.title}</h3>
                            <p className="text-[10px] text-gray-500 leading-relaxed font-bold uppercase tracking-wider">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="pt-8">
                    <button className="px-8 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-900/20 flex items-center gap-2 mx-auto">
                        <HiOutlineBell size={20} />
                        Notify Me When Ready
                    </button>
                    <p className="text-[10px] text-gray-400 mt-6 font-black uppercase tracking-widest">
                        Expected Release: Q4 2026
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

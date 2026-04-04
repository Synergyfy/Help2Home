'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCreditCard, HiOutlineRocketLaunch, HiOutlineShieldCheck, HiOutlineSparkles } from 'react-icons/hi2';

export default function CaretakerPaymentsPage() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl">
                {/* Background Decorations */}
                <div className="absolute -top-20 -left-20 size-64 bg-brand-green/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-20 -right-20 size-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] p-8 md:p-16 text-center overflow-hidden"
                >
                    {/* Glass Pattern */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-white/10 pointer-events-none" />

                    <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                        className="inline-flex items-center justify-center size-24 bg-linear-to-br from-brand-green to-emerald-600 rounded-[2rem] text-white shadow-2xl shadow-green-200 mb-8"
                    >
                        <HiOutlineRocketLaunch size={48} className="animate-bounce" style={{ animationDuration: '3s' }} />
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Payments <span className="text-brand-green">Coming Soon</span>
                    </h1>
                    
                    <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-lg mx-auto mb-10">
                        We're building a seamless installment payment system and finance management hub tailored specifically for caretakers.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <FeaturePreview 
                            icon={<HiOutlineCreditCard size={24} />} 
                            title="Installments" 
                            desc="Managed payment plans"
                        />
                        <FeaturePreview 
                            icon={<HiOutlineShieldCheck size={24} />} 
                            title="Secure" 
                            desc="Enterprise-grade safety"
                        />
                        <FeaturePreview 
                            icon={<HiOutlineSparkles size={24} />} 
                            title="Automated" 
                            desc="Smart ledger syncing"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-xl hover:bg-black transition-all active:scale-95">
                            Notify Me
                        </button>
                        <button className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95">
                            Back to Dashboard
                        </button>
                    </div>

                    {/* Progress indicator */}
                    <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Development Progress</span>
                        <div className="flex-1 mx-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '65%' }}
                                transition={{ duration: 2, delay: 0.5 }}
                                className="h-full bg-brand-green"
                            />
                        </div>
                        <span className="text-xs font-bold text-brand-green">65%</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function FeaturePreview({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="p-4 rounded-3xl bg-gray-50/50 border border-gray-100 items-center justify-center">
            <div className="text-brand-green mb-2 flex justify-center">{icon}</div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">{title}</h4>
            <p className="text-[10px] text-gray-500 font-medium leading-tight">{desc}</p>
        </div>
    );
}

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import BankSidebar from '@/components/bank-portal/Sidebar';
import BankTopNav from '@/components/bank-portal/TopNav';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { HiOutlineClock, HiOutlineExclamationTriangle } from 'react-icons/hi2';

export default function BankPortalLayout({ children }: { children: React.ReactNode }) {
    const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
    const [remainingSeconds, setRemainingSeconds] = useState(120);
    const router = useRouter();

    const logout = useCallback(() => {
        router.push('/bank-portal/signin');
    }, [router]);

    useEffect(() => {
        let warningTimer: NodeJS.Timeout;
        let countdownTimer: NodeJS.Timeout;

        const resetTimers = () => {
            setShowTimeoutWarning(false);
            setRemainingSeconds(120);
            clearTimeout(warningTimer);
            clearInterval(countdownTimer);
            
            // 13 minutes until warning (total 15 minutes)
            warningTimer = setTimeout(() => {
                setShowTimeoutWarning(true);
            }, 13 * 60 * 1000);
        };

        const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
        events.forEach(event => document.addEventListener(event, resetTimers));

        resetTimers();

        if (showTimeoutWarning) {
            countdownTimer = setInterval(() => {
                setRemainingSeconds(prev => {
                    if (prev <= 1) {
                        logout();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            events.forEach(event => document.removeEventListener(event, resetTimers));
            clearTimeout(warningTimer);
            clearInterval(countdownTimer);
        };
    }, [showTimeoutWarning, logout]);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <BankSidebar />
            <div className="flex-1 ml-64 flex flex-col">
                <BankTopNav />
                <main className="p-8">
                    {children}
                </main>
            </div>

            <AnimatePresence>
                {showTimeoutWarning && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full p-10 text-center"
                        >
                            <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
                                <HiOutlineClock size={40} className="animate-pulse" />
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Session Expiring</h2>
                            <p className="text-gray-500 font-medium mb-8">
                                For your security, you will be logged out in <span className="text-orange-600 font-bold">{Math.floor(remainingSeconds / 60)}:{(remainingSeconds % 60).toString().padStart(2, '0')}</span> due to inactivity.
                            </p>
                            <div className="flex flex-col gap-3">
                                <button 
                                    onClick={() => setShowTimeoutWarning(false)}
                                    className="w-full py-4 bg-[#003366] text-white rounded-2xl font-semibold text-sm uppercase tracking-widest hover:bg-[#002244] transition-all shadow-xl shadow-blue-900/20"
                                >
                                    Stay Logged In
                                </button>
                                <button 
                                    onClick={logout}
                                    className="w-full py-4 bg-gray-50 text-gray-500 rounded-2xl font-semibold text-sm uppercase tracking-widest hover:bg-gray-100 transition-all"
                                >
                                    Logout Now
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

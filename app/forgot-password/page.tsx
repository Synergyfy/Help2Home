'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import AuthHero from '@/components/auth/AuthHero';

export default function ForgotPassword() {
    const [isSent, setIsSent] = useState(false);

    return (
        <div className="min-h-screen bg-white flex">
            <AuthHero />
            <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
                <div className="max-w-md w-full mx-auto">
                    <Link href="/signin" className="flex items-center gap-2 text-slate-500 hover:text-brand-green font-bold text-sm mb-10 transition-colors">
                        <FiArrowLeft /> Back to sign in
                    </Link>

                    {!isSent ? (
                        <>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Reset Password</h1>
                            <p className="text-slate-500 mb-8">Enter your email and we'll send you a link to reset your password.</p>
                            
                            <form onSubmit={(e) => { e.preventDefault(); setIsSent(true); }} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
                                    <div className="relative group">
                                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-green" />
                                        <input required type="email" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-brand-green outline-none transition-all" placeholder="you@example.com" />
                                    </div>
                                </div>
                                <button className="w-full py-4 bg-brand-green hover:bg-green-600 text-white font-bold rounded-2xl shadow-lg shadow-brand-green/20 transition-all active:scale-95">
                                    Send reset link
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-50 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiCheckCircle size={40} />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h1>
                            <p className="text-slate-500 mb-8">We've sent a password reset link to your email address.</p>
                            <button onClick={() => setIsSent(false)} className="text-brand-green font-bold hover:underline">
                                Didn't receive it? Try again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
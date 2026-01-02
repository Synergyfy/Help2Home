'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import AuthHero from '@/components/auth/AuthHero';

export default function ForgotPassword() {
    const [isSent, setIsSent] = useState(false);

    return (
        // Added overflow-hidden to prevent layout shift
        <div className="min-h-screen bg-white flex overflow-hidden">
            {/* Left Side: Hero Section */}
            <div className="hidden lg:block lg:w-1/2">
                <AuthHero />
            </div>

            {/* Right Side: Form Section */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-12 lg:px-20 py-12">
                <div className="w-full max-w-[440px]">
                    {/* Back Link - Positioned consistently above the heading */}
                    <Link 
                        href="/signin" 
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-green font-semibold text-sm mb-8 transition-colors group"
                    >
                        <FiArrowLeft className="transition-transform group-hover:-translate-x-1" /> 
                        Back to sign in
                    </Link>

                    {!isSent ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h1 className="text-3xl font-bold text-slate-900 mb-3">Reset Password</h1>
                            <p className="text-slate-500 mb-10 text-lg">
                                Enter your email and we'll send you a link to reset your password.
                            </p>
                            
                            <form 
                                onSubmit={(e) => { e.preventDefault(); setIsSent(true); }} 
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-green transition-colors" />
                                        <input 
                                            required 
                                            type="email" 
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-brand-green outline-none transition-all" 
                                            placeholder="name@company.com" 
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full py-4 bg-brand-green hover:bg-green-600 text-white font-bold rounded-2xl shadow-xl shadow-brand-green/20 transition-all active:scale-[0.98]"
                                >
                                    Send reset link
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="text-center animate-in fade-in zoom-in-95 duration-400">
                            <div className="w-20 h-20 bg-green-50 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
                                <FiCheckCircle size={40} />
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h1>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                We've sent a password reset link to your email address. Please check your inbox and spam folder.
                            </p>
                            <button 
                                onClick={() => setIsSent(false)} 
                                className="text-brand-green font-bold hover:text-green-700 transition-colors"
                            >
                                Didn't receive it? <span className="underline">Try again</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiLock, FiMail, FiArrowRight } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import AuthHero from '@/components/auth/AuthHero';

const signInSchema = z.object({
    email: z.string().email('Valid email required'),
    password: z.string().min(8, 'Min 8 characters'),
});

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, isLoading } = useAuth();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
    });

    return (
        <div className="min-h-screen bg-white flex">
            <AuthHero />
            
            <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
                <div className="max-w-md w-full mx-auto">
                    <div className="mb-10">
                        <div className="w-12 h-12 bg-brand-green rounded-xl mb-6 flex items-center justify-center text-white font-bold">H2H</div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Sign in to account</h1>
                        <p className="text-slate-500">Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={handleSubmit((data) => signIn(data.email, data.password))} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
                            <div className="relative group">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-green transition-colors" />
                                <input {...register('email')} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-brand-green outline-none transition-all" placeholder="you@example.com" />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Password</label>
                                <Link href="/forgot-password"  className="text-xs font-bold text-brand-green hover:underline">Forgot password?</Link>
                            </div>
                            <div className="relative group">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-green transition-colors" />
                                <input {...register('password')} type={showPassword ? "text" : "password"} className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-brand-green outline-none transition-all" placeholder="••••••••" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-green">
                                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button disabled={isLoading} className="w-full py-4 bg-brand-green hover:bg-green-600 text-white font-bold rounded-2xl shadow-lg shadow-brand-green/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50">
                            {isLoading ? 'Signing in...' : 'Sign in'} <FiArrowRight />
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-sm text-slate-500">Don't have an account? <Link href="/signup" className="text-brand-green font-bold hover:underline">Create one</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
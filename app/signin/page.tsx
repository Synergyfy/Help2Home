'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiLock, FiMail, FiArrowRight, FiUser, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { FiShield } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import AuthHero from '@/components/auth/AuthHero';

const signInSchema = z.object({
    email: z.string().email('Valid email required'),
    password: z.string().min(6, 'Min 6 characters'),
});

const DEMO_ACCOUNTS = [
    { label: 'Admin', email: 'admin@example.com', icon: FiShield },
    { label: 'Agent', email: 'agent@example.com', icon: FiUser },
    { label: 'Landlord', email: 'landlord@example.com', icon: FiUser },
    { label: 'Caretaker', email: 'caretaker@example.com', icon: FiUser },
    { label: 'Tenant', email: 'tenant@example.com', icon: FiUser },
    { label: 'Investor', email: 'investor@example.com', icon: FiTrendingUp },
    { label: 'Multi-Role', email: 'multi@example.com', icon: FiUsers },
    { label: 'New User', email: 'newuser@example.com', icon: FiUser },
];

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, isLoading } = useAuth();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
    });

    const handleQuickLogin = (email: string) => {
        const demoPassword = 'password123';
        setValue('email', email, { shouldValidate: true });
        setValue('password', demoPassword, { shouldValidate: true });
        signIn(email, demoPassword);
    };

    return (
        <div className="min-h-screen bg-white flex overflow-hidden">
            <div className="hidden lg:block lg:w-1/2">
                <AuthHero />
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 bg-white">
                <div className="max-w-md w-full mx-auto">
                    <div className="mb-10">
                        <div className="w-12 h-12 bg-brand-green rounded-xl mb-6 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-green/20">
                            H2H
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Sign in to account</h1>
                        <p className="text-slate-500">Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={handleSubmit((data) => signIn(data.email, data.password))} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">
                                Email Address
                            </label>
                            <div className="relative group">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-green transition-colors" />
                                <input
                                    {...register('email')}
                                    className={`w-full pl-12 pr-4 py-4 bg-slate-50 border-2 rounded-xl outline-none transition-all ${errors.email ? 'border-red-500' : 'border-transparent focus:bg-white focus:border-brand-green'}`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                                <Link href="/forgot-password" className="text-xs font-bold text-brand-green hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-green transition-colors" />
                                <input
                                    {...register('password')}
                                    type={showPassword ? "text" : "password"}
                                    className={`w-full pl-12 pr-12 py-4 bg-slate-50 border-2 rounded-xl outline-none transition-all ${errors.password ? 'border-red-500' : 'border-transparent focus:bg-white focus:border-brand-green'}`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-green"
                                >
                                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-xs text-red-500 font-medium">{errors.password.message}</p>}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                            className="w-full py-4 bg-brand-green hover:bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-brand-green/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'} <FiArrowRight />
                        </motion.button>
                    </form>

                    {/* Quick Login Section */}
                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">
                            Quick Login (Demo)
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {DEMO_ACCOUNTS.map((account) => (
                                <button
                                    key={account.email}
                                    type="button"
                                    disabled={isLoading}
                                    onClick={() => handleQuickLogin(account.email)}
                                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-brand-green hover:bg-white transition-all group disabled:opacity-50"
                                >
                                    <account.icon className="text-slate-400 group-hover:text-brand-green mb-1" size={16} />
                                    <span className="text-[9px] font-bold text-slate-600 uppercase text-center truncate w-full">
                                        {account.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-sm text-slate-500">
                            Don't have an account? <Link href="/signup" className="text-brand-green font-bold hover:underline">Create one</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
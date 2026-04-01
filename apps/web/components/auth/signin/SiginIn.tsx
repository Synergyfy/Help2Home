'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiLock, FiMail, FiArrowRight, FiUser, FiUsers, FiTrendingUp } from 'react-icons/fi';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiShield } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import AuthHero from '@/components/auth/AuthHero';
import Logo from '@/components/shared/Logo';

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
    { label: 'Developer', email: 'developer@example.com', icon: FiUsers },
    { label: 'Multi-Role', email: 'multi@example.com', icon: FiUsers },
    { label: 'Bank SSO', email: 'sso@bank.com', icon: FiArrowRight, isSSO: true },
];

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const redirect = searchParams.get('redirect');
    const { signIn, isLoading } = useAuth();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
    });

    const handleQuickLogin = (email: string, isSSO?: boolean) => {
        if (isSSO) {
            window.location.href = '/bank-portal/sso/launch?sso_token=mock_handshake_token';
            return;
        }
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
                    <div className="mb-10 flex flex-col items-start">
                        <Logo width={40} height={40} textClassName="text-2xl font-black text-brand-green" className="mb-6" />
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in to account</h1>
                        <p className="text-gray-500">Welcome back! Please enter your details.</p>
                    </div>

                    <form onSubmit={handleSubmit((data) => signIn(data.email, data.password))} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">
                                Email Address
                            </label>
                            <div className="relative group">
                                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors" />
                                <input
                                    {...register('email')}
                                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all ${errors.email ? 'border-red-500' : 'border-transparent focus:bg-white focus:border-brand-green'}`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Password</label>
                                <Link href="/forgot-password" className="text-xs font-bold text-brand-green hover:underline">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors" />
                                <input
                                    {...register('password')}
                                    type={showPassword ? "text" : "password"}
                                    className={`w-full pl-12 pr-12 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all ${errors.password ? 'border-red-500' : 'border-transparent focus:bg-white focus:border-brand-green'}`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-green"
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
                            className="w-full py-4 bg-brand-green hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-900/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'} <FiArrowRight />
                        </motion.button>
                    </form>

                    {/* Quick Login Section */}
                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 text-center">
                            Quick Login (Demo)
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {DEMO_ACCOUNTS.map((account: any) => (
                                <button
                                    key={account.email}
                                    type="button"
                                    disabled={isLoading}
                                    onClick={() => handleQuickLogin(account.email, account.isSSO)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all group disabled:opacity-50 ${
                                        account.isSSO 
                                        ? 'bg-[#003366] border-[#003366] hover:bg-[#002244]' 
                                        : 'bg-gray-50 border-gray-100 hover:border-brand-green hover:bg-white'
                                    }`}
                                >
                                    <account.icon className={`mb-1 ${account.isSSO ? 'text-white' : 'text-gray-400 group-hover:text-brand-green'}`} size={16} />
                                    <span className={`text-[9px] font-bold uppercase text-center truncate w-full ${account.isSSO ? 'text-white' : 'text-gray-600'}`}>
                                        {account.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-sm text-gray-500">
                            Don't have an account? <Link href={redirect ? `/signup?redirect=${encodeURIComponent(redirect)}` : "/signup"} className="text-brand-green font-bold hover:underline">Create one</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

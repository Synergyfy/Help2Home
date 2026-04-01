'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { HiOutlineLockClosed, HiOutlineEnvelope, HiOutlineEye, HiOutlineEyeSlash, HiOutlineShieldCheck } from 'react-icons/hi2';
import Logo from '@/components/shared/Logo';

export default function BankStaffSignin() {
    const router = useRouter();
    const [step, setStep] = useState<'login' | 'otp'>('login');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep('otp');
            toast.info('OTP sent to your registered device');
        }, 1500);
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast.success('Authentication successful');
            router.push('/bank-portal/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center font-semibold text-2xl text-white shadow-lg shadow-orange-500/20">
                            A
                        </div>
                        <h1 className="text-2xl font-semibold text-[#003366] tracking-tight">Access Bank PLC</h1>
                    </div>
                    <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">Partner Portal</h2>
                    <p className="text-gray-500 mt-2 font-medium">Institutional Login for Staff & Partners</p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100 p-10">
                    {step === 'login' ? (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">Email Address</label>
                                    <div className="relative">
                                        <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input 
                                            type="email" 
                                            placeholder="staff@accessbank.com"
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:bg-white focus:border-[#003366] outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 px-1">Password</label>
                                    <div className="relative">
                                        <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input 
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:bg-white focus:border-[#003366] outline-none transition-all"
                                            required
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#003366] transition-colors"
                                        >
                                            {showPassword ? <HiOutlineEyeSlash size={20} /> : <HiOutlineEye size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-5 bg-[#003366] text-white rounded-2xl font-semibold text-sm uppercase tracking-[0.2em] hover:bg-[#002244] transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>Sign In <HiOutlineShieldCheck size={18} /></>
                                )}
                            </button>

                            <div className="text-center">
                                <button type="button" className="text-xs font-semibold text-[#003366] hover:underline uppercase tracking-widest">Forgot Password?</button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-50 text-[#003366] rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <HiOutlineShieldCheck size={32} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">Two-Factor Authentication</h3>
                                <p className="text-sm text-gray-500 mt-2 font-medium leading-relaxed">Please enter the 6-digit verification code sent to your registered device.</p>
                            </div>

                            <div className="flex justify-between gap-2">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <input 
                                        key={i}
                                        type="text" 
                                        maxLength={1}
                                        className="w-12 h-14 text-center bg-gray-50 border border-gray-100 rounded-xl text-xl font-semibold focus:bg-white focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10 outline-none transition-all"
                                        required
                                    />
                                ))}
                            </div>

                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-5 bg-[#003366] text-white rounded-2xl font-semibold text-sm uppercase tracking-[0.2em] hover:bg-[#002244] transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    'Verify & Continue'
                                )}
                            </button>

                            <div className="text-center">
                                <button type="button" onClick={() => setStep('login')} className="text-xs font-semibold text-gray-400 hover:text-gray-600 uppercase tracking-widest">Back to Login</button>
                            </div>
                        </form>
                    )}
                </div>

                <div className="mt-12 flex items-center justify-center gap-8 opacity-40">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Standard Compliance</p>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">PCI-DSS Verified</p>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">ISO 27001</p>
                </div>
            </div>
        </div>
    );
}

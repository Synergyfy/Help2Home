'use client';

import React, { useState } from 'react';
import FadeIn from '@/components/FadeIn';
import {
    HiOutlineShieldCheck,
    HiOutlineBell,
    HiOutlineCreditCard,
    HiOutlineUserCircle,
    HiOutlineKey,
    HiOutlineCheckCircle
} from 'react-icons/hi2';

export default function SettingsPage() {
    const [notifications, setNotifications] = useState({
        newVentures: true,
        payouts: true,
        marketReports: false,
        systemUpdates: true
    });

    return (
        <FadeIn>
            <div className="space-y-10 pb-12">
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">Investor Settings</h1>
                    <p className="text-gray-500 mt-1">Personalize your high-yield investment experience.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Settings Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Section */}
                        <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                                    <HiOutlineUserCircle size={28} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">Investment Profile</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Investor Class</label>
                                    <div className="px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 font-black text-gray-900 italic">Institutional Partner</div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Risk Appetite</label>
                                    <select className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl font-black text-gray-900 outline-none focus:border-brand-green transition-all appearance-none cursor-pointer italic">
                                        <option>Conservative Growth</option>
                                        <option selected>Moderate Yield</option>
                                        <option>Aggressive Expansion</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Primary Currency</label>
                                    <div className="flex gap-2">
                                        {['NGN', 'USD', 'GBP'].map(curr => (
                                            <button key={curr} className={`flex-1 py-3 rounded-xl font-black text-sm border-2 transition-all ${curr === 'NGN' ? 'bg-brand-green border-brand-green text-white shadow-lg shadow-brand-green/20' : 'bg-white border-gray-50 text-gray-400 hover:border-gray-100'}`}>
                                                {curr}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Tax Residency</label>
                                    <div className="px-5 py-4 bg-gray-50 rounded-2xl border border-gray-100 font-black text-gray-900 italic">Nigeria (Lagos)</div>
                                </div>
                            </div>
                        </section>

                        {/* Security Section */}
                        <section className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                                    <HiOutlineKey size={28} />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">Security & Authorization</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 group hover:shadow-md transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-xl bg-white flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-colors">
                                            <HiOutlineShieldCheck size={24} />
                                        </div>
                                        <div>
                                            <p className="font-black text-gray-900 italic">Two-Factor Authentication</p>
                                            <p className="text-xs text-gray-400 font-medium">Secured via Authenticator App</p>
                                        </div>
                                    </div>
                                    <div className="px-4 py-1.5 bg-green-50 text-brand-green text-[10px] font-black uppercase rounded-full border border-green-100">Enabled</div>
                                </div>
                                <button className="w-full py-4 text-center text-blue-600 font-black text-sm italic hover:underline">Change Account Password</button>
                            </div>
                        </section>
                    </div>

                    {/* Side Settings Column */}
                    <div className="space-y-8">
                        {/* Verification Status */}
                        <div className="bg-brand-green p-10 rounded-[2.5rem] text-white shadow-2xl shadow-brand-green/20 relative overflow-hidden group">
                            <HiOutlineShieldCheck className="absolute right-[-20px] bottom-[-20px] size-48 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                            <div className="relative z-10">
                                <h4 className="text-xl font-black italic mb-2 tracking-tight">Verified Investor</h4>
                                <p className="text-white/60 text-xs font-medium leading-relaxed mb-8">Your identity and wealth source documents have been institutional-grade verified.</p>
                                <div className="flex items-center gap-2 text-white font-black italic text-sm">
                                    <HiOutlineCheckCircle className="text-green-300" />
                                    <span>Level 3 Accredited</span>
                                </div>
                            </div>
                        </div>

                        {/* Payout Channels */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <HiOutlineCreditCard className="text-brand-green" size={24} />
                                <h4 className="font-black text-gray-900 tracking-tight">Payout Channels</h4>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-orange-600 flex items-center justify-center text-white text-[10px] font-bold">GTB</div>
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-black text-gray-900">...8892</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">Savings Account</p>
                                        </div>
                                    </div>
                                    <div className="size-2 rounded-full bg-brand-green" />
                                </div>
                                <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-xs font-black text-gray-400 hover:border-brand-green hover:text-brand-green transition-all uppercase tracking-widest">
                                    + Add Payout Channel
                                </button>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10">
                            <div className="flex items-center gap-3 mb-8">
                                <HiOutlineBell className="text-brand-green" size={24} />
                                <h4 className="font-black text-gray-900 tracking-tight">Notifications</h4>
                            </div>
                            <div className="space-y-6">
                                {Object.entries(notifications).map(([key, val]) => (
                                    <div key={key} className="flex items-center justify-between group">
                                        <span className="text-xs font-black text-gray-500 uppercase tracking-widest group-hover:text-gray-900 transition-colors">
                                            {key.replace(/([A-Z])/g, ' $1')}
                                        </span>
                                        <button
                                            onClick={() => setNotifications(prev => ({ ...prev, [key]: !val }))}
                                            className={`w-12 h-6 rounded-full relative transition-all duration-300 ${val ? 'bg-brand-green' : 'bg-gray-200'}`}
                                        >
                                            <div className={`absolute top-1 size-4 bg-white rounded-full shadow-md transition-all duration-300 ${val ? 'right-1' : 'left-1'}`} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-10 border-t border-gray-100 flex justify-end gap-4">
                    <button className="px-10 py-4 text-gray-400 font-black text-sm italic hover:text-gray-900 transition-colors">Discard Changes</button>
                    <button className="px-12 py-5 bg-brand-green text-white font-black rounded-4xl text-sm italic shadow-xl shadow-brand-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                        Commit Global Settings
                    </button>
                </div>
            </div>
        </FadeIn>
    );
}

'use client';

import React from 'react';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import {
    HiOutlineArrowTrendingUp,
    HiOutlineBanknotes,
    HiOutlineChartPie,
    HiOutlineClock,
    HiOutlineDocumentText,
    HiOutlineArrowUpRight,
    HiOutlineCheckCircle
} from 'react-icons/hi2';

const RECENT_INVESTMENTS = [
    { id: 1, name: 'Lekki Phase 1 Penthouses', amount: 5000000, date: '2025-11-15', status: 'Active', roi: '+9.0%' },
    { id: 2, name: 'Student Housing REIT', amount: 1500000, date: '2025-12-01', status: 'Active', roi: '+8.0%' }
];

const UPCOMING_PAYOUTS = [
    { id: 1, property: 'Lekki Phase 1 Penthouses', amount: 450000, date: '2026-02-15' },
    { id: 2, property: 'Victoria Island Business Park', amount: 120000, date: '2026-02-28' }
];

export default function InvestorDashboard() {
    return (
        <FadeIn>
            <div className="space-y-10 pb-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">Investor Dashboard</h1>
                        <p className="text-gray-500 mt-1">Welcome back, Alex. Your portfolio is performing well.</p>
                    </div>
                    <Link
                        href="/dashboard/investor/opportunities"
                        className="flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                    >
                        Browse Opportunities
                        <HiOutlineArrowUpRight size={18} />
                    </Link>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-brand-green p-8 rounded-[2.5rem] text-white shadow-2xl shadow-brand-green/20 relative overflow-hidden group">
                        <div className="absolute right-[-20px] top-[-20px] size-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
                        <div className="relative z-10">
                            <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-4">
                                <HiOutlineChartPie size={24} />
                            </div>
                            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Total Portfolio Value</p>
                            <h3 className="text-4xl font-black italic">₦7,070,000</h3>
                            <div className="flex items-center gap-2 text-green-300 font-bold italic text-sm mt-2">
                                <HiOutlineArrowTrendingUp />
                                <span>+8.7% All Time</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
                        <div className="size-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                            <HiOutlineBanknotes size={24} />
                        </div>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Available to Invest</p>
                        <h4 className="text-3xl font-black text-gray-900 italic">₦450,200</h4>
                    </div>

                    <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm">
                        <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                            <HiOutlineArrowTrendingUp size={24} />
                        </div>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">YTD Return</p>
                        <h4 className="text-3xl font-black text-brand-green italic">+14.2%</h4>
                    </div>
                </div>

                {/* Performance Chart Placeholder */}
                <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Portfolio Performance</h3>
                            <p className="text-sm text-gray-400">Total returns over the last 12 months.</p>
                        </div>
                        <div className="flex bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                            {['1M', '3M', '6M', '1Y', 'ALL'].map(t => (
                                <button key={t} className={`px-4 py-2 text-[10px] font-black rounded-lg transition-all ${t === '1Y' ? 'bg-white text-brand-green shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>{t}</button>
                            ))}
                        </div>
                    </div>

                    {/* Fake Chart Lines */}
                    <div className="h-64 flex items-end justify-between gap-1">
                        {[40, 55, 45, 65, 50, 75, 85, 70, 95, 80, 110, 100].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-brand-green/10 rounded-t-lg hover:bg-brand-green transition-all duration-500 cursor-pointer relative group/bar"
                                    style={{ height: `${h}%` }}
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                                        ₦{(h * 10).toFixed(0)}k
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-gray-300 uppercase">{'JFMAMJJASOND'[i]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Investments */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Recent Investments</h3>
                            <Link href="/dashboard/investor/portfolio" className="text-sm font-bold text-brand-green hover:underline">
                                View All
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {RECENT_INVESTMENTS.map((inv) => (
                                <div key={inv.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-black text-gray-900">{inv.name}</h4>
                                        <span className="text-xs font-black px-2 py-1 bg-green-50 text-green-600 rounded-full uppercase tracking-widest">
                                            {inv.status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 italic">₦{inv.amount.toLocaleString()}</p>
                                            <p className="text-xs text-gray-400">{new Date(inv.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                        <span className="text-brand-green font-black italic">{inv.roi}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Payouts */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Upcoming Payouts</h3>
                            <Link href="/dashboard/investor/reports" className="text-sm font-bold text-brand-green hover:underline">
                                View All
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {UPCOMING_PAYOUTS.map((payout) => (
                                <div key={payout.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                                                <HiOutlineClock size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-gray-900 text-sm">{payout.property}</h4>
                                                <p className="text-xs text-gray-400">{new Date(payout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-black text-gray-900 italic">₦{payout.amount.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-linear-to-br from-gray-900 to-gray-800 p-10 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
                    <div className="absolute right-[-50px] bottom-[-50px] size-96 bg-brand-green/10 rounded-full blur-3xl" />
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black mb-2">Ready to Grow Your Wealth?</h3>
                        <p className="text-white/60 mb-8">Explore institutional-grade investment opportunities curated for you.</p>
                        <div className="flex gap-4">
                            <Link href="/dashboard/investor/opportunities" className="px-8 py-4 bg-brand-green text-white rounded-2xl font-black hover:bg-green-700 transition-all shadow-lg">
                                Browse Opportunities
                            </Link>
                            <Link href="/dashboard/investor/documents" className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black hover:bg-white/20 transition-all">
                                View Documents
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

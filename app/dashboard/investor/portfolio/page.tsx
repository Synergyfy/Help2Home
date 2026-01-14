'use client';

import React from 'react';
import FadeIn from '@/components/FadeIn';
import {
    HiOutlineArrowUpRight,
    HiOutlineBriefcase,
    HiOutlineChartBar,
    HiOutlineClock,
    HiOutlineWallet,
    HiOutlineInformationCircle
} from 'react-icons/hi2';

const PORTFOLIO_ASSETS = [
    {
        id: 1,
        title: "Lekki Phase 1 Penthouses",
        invested: 5000000,
        currentValue: 5450000,
        yield: "+9.0%",
        status: "Active",
        nextPayout: "2026-03-15"
    },
    {
        id: 2,
        title: "Student Housing REIT",
        invested: 1500000,
        currentValue: 1620000,
        yield: "+8.0%",
        status: "Active",
        nextPayout: "2026-02-28"
    }
];

export default function PortfolioPage() {
    return (
        <FadeIn>
            <div className="space-y-10 pb-12">
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Investment Portfolio</h1>
                    <p className="text-gray-500 mt-1">Track your wealth growth and asset performance.</p>
                </div>

                {/* Portfolio Summary Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-2 bg-brand-green p-10 rounded-[2.5rem] text-white shadow-2xl shadow-brand-green/30 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute right-[-20px] top-[-20px] size-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-700" />
                        <div className="relative z-10">
                            <p className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-3">Total Portfolio Value</p>
                            <h2 className="text-6xl font-black italic mb-2 tracking-tighter">₦7,070,000</h2>
                            <div className="flex items-center gap-2 text-green-300 font-black italic">
                                <HiOutlineArrowUpRight />
                                <span>+8.7% All Time</span>
                            </div>
                        </div>
                        <div className="mt-12 flex gap-4 relative z-10">
                            <button className="flex-1 py-4 bg-white text-brand-green rounded-2xl font-black text-sm italic hover:bg-green-50 transition-colors">
                                Compound Earnings
                            </button>
                            <button className="flex-1 py-4 bg-brand-green-hover text-white border border-white/20 rounded-2xl font-black text-sm italic hover:bg-brand-green/80 transition-colors">
                                Add Funds
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:col-span-2">
                        <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all duration-500">
                            <div className="size-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                                <HiOutlineWallet size={32} />
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Available to Invest</p>
                                <h4 className="text-3xl font-black text-gray-900 italic">₦450,200</h4>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm flex items-center gap-6 group hover:shadow-xl transition-all duration-500">
                            <div className="size-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                <HiOutlineBriefcase size={32} />
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Active Payouts</p>
                                <h4 className="text-3xl font-black text-gray-900 italic">₦120,500</h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Chart Placeholder & Asset Allocation */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
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
                        <div className="h-64 flex items-end justify-between gap-1 group/bars">
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
                                    <span className="text-[10px] font-black text-gray-300 uppercase">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm flex flex-col">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight mb-8">Asset Allocation</h3>
                        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                            <div className="relative size-48">
                                <svg className="size-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle className="text-gray-100" strokeWidth="12" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                                    <circle className="text-brand-green" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="75.36" strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                                    <circle className="text-blue-600" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="200.96" strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-black text-gray-900">70%</span>
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Equity</span>
                                </div>
                            </div>
                            <div className="w-full space-y-4 pt-4">
                                <div className="flex justify-between items-center text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="size-3 rounded shadow-sm bg-brand-green" />
                                        <span className="font-bold text-gray-600">Real Estate Equity</span>
                                    </div>
                                    <span className="font-black text-gray-900">70%</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="size-3 rounded shadow-sm bg-blue-600" />
                                        <span className="font-bold text-gray-600">Commercial Debt</span>
                                    </div>
                                    <span className="font-black text-gray-900">20%</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="size-3 rounded shadow-sm bg-gray-200" />
                                        <span className="font-bold text-gray-600">Others</span>
                                    </div>
                                    <span className="font-black text-gray-900">10%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Assets Table */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">Active Holdings</h3>
                        <button className="text-brand-green text-sm font-black italic hover:underline flex items-center gap-2">
                            View Detailed Ledger
                            <HiOutlineInformationCircle />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Asset Name</th>
                                    <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Invested Amount</th>
                                    <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Value</th>
                                    <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Return</th>
                                    <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Next Payout</th>
                                    <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {PORTFOLIO_ASSETS.map((asset) => (
                                    <tr key={asset.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-6 font-black text-gray-900">{asset.title}</td>
                                        <td className="px-8 py-6 font-medium text-gray-500 italic">₦{asset.invested.toLocaleString()}</td>
                                        <td className="px-8 py-6 font-black text-gray-900 italic">₦{asset.currentValue.toLocaleString()}</td>
                                        <td className="px-8 py-6">
                                            <span className="text-brand-green font-black italic">{asset.yield}</span>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-gray-500 font-medium">
                                            <div className="flex items-center gap-2">
                                                <HiOutlineClock className="text-orange-500" />
                                                {asset.nextPayout}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 bg-green-50 text-brand-green text-[9px] font-black uppercase tracking-widest rounded-full border border-green-100">
                                                {asset.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

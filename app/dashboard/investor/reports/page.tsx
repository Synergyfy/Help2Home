'use client';

import React from 'react';
import FadeIn from '@/components/FadeIn';
import {
    HiOutlineDocumentArrowDown,
    HiOutlineDocumentText,
    HiOutlineChartPie,
    HiOutlineArrowTrendingUp,
    HiOutlineBanknotes,
    HiOutlineChevronRight
} from 'react-icons/hi2';

const REPORTS_LIST = [
    { id: 1, name: "Q4 2025 Financial Performance Statement", date: "Jan 12, 2026", type: "PDF", size: "2.4 MB" },
    { id: 2, name: "2025 Annual Tax Summary (Nigeria)", date: "Jan 05, 2026", type: "PDF", size: "1.1 MB" },
    { id: 3, name: "Lekki Penthouses Asset Audit Report", date: "Dec 20, 2025", type: "PDF", size: "4.8 MB" },
    { id: 4, name: "Monthly Portfolio Yield Breakdown - Nov", date: "Dec 02, 2025", type: "PDF", size: "850 KB" }
];

export default function ReportsPage() {
    return (
        <FadeIn>
            <div className="space-y-10 pb-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Reports & Analytics</h1>
                        <p className="text-gray-500 mt-1">Institutional-grade insights into your capital performance.</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-brand-green text-brand-green font-black rounded-2xl text-sm italic hover:bg-brand-green hover:text-white transition-all">
                        <HiOutlineDocumentArrowDown size={20} />
                        Export Full Statement
                    </button>
                </div>

                {/* Key Insight Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-brand-green/30 transition-all duration-500">
                        <div className="size-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors">
                            <HiOutlineBanknotes size={28} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Lifetime Payouts</p>
                            <h4 className="text-3xl font-black text-gray-900 italic">₦2,840,000</h4>
                            <p className="text-xs text-brand-green mt-2 font-bold">+12% vs last year</p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-blue-500/30 transition-all duration-500">
                        <div className="size-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <HiOutlineArrowTrendingUp size={28} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Unrealized Capital Gain</p>
                            <h4 className="text-3xl font-black text-gray-900 italic">₦1,150,000</h4>
                            <p className="text-xs text-blue-600 mt-2 font-bold">Estimated Market Value</p>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-orange-500/30 transition-all duration-500">
                        <div className="size-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <HiOutlineChartPie size={28} />
                        </div>
                        <div>
                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-1">Effective APR</p>
                            <h4 className="text-3xl font-black text-gray-900 italic">14.2%</h4>
                            <p className="text-xs text-orange-600 mt-2 font-bold">Consolidated Weighted Avg</p>
                        </div>
                    </div>
                </div>

                {/* Distribution History Chart Placeholder */}
                <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-10 opacity-5">
                        <HiOutlineArrowTrendingUp size={200} />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight mb-2">Monthly Distribution History</h3>
                        <p className="text-sm text-gray-400 mb-10">Consolidated yield across all active ventures.</p>

                        <div className="h-64 flex items-end justify-between gap-4">
                            {[30, 45, 25, 60, 80, 55, 90, 100, 75, 110, 120, 140].map((h, i) => (
                                <div key={i} className="flex-1 group/bar relative">
                                    <div
                                        className="w-full bg-brand-green/20 rounded-t-xl hover:bg-brand-green transition-all duration-300 cursor-pointer"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                                            ₦{(h * 5).toFixed(0)}k
                                        </div>
                                    </div>
                                    <p className="mt-2 text-[9px] font-black text-gray-300 text-center uppercase">{'JFMAMJJASOND'[i]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Downloadable Reports List */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex items-center gap-4 bg-gray-50/30">
                        <HiOutlineDocumentText className="text-brand-green" size={24} />
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">Statements & Documents</h3>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {REPORTS_LIST.map((report) => (
                            <div key={report.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors group">
                                <div className="flex items-center gap-6">
                                    <div className="size-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-brand-green group-hover:border-brand-green transition-all">
                                        <HiOutlineDocumentText size={28} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-gray-900 mb-0.5 group-hover:text-brand-green transition-colors">{report.name}</h4>
                                        <p className="text-xs text-gray-400 font-medium">Issued on {report.date} • {report.size}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="px-5 py-2.5 bg-gray-50 text-gray-600 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                                        Preview
                                    </button>
                                    <button className="px-5 py-2.5 bg-brand-green/10 text-brand-green text-xs font-black uppercase tracking-widest rounded-xl hover:bg-brand-green hover:text-white transition-all flex items-center gap-2">
                                        Download {report.type}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-8 bg-gray-50/50 text-center">
                        <button className="text-gray-400 text-xs font-black uppercase tracking-widest hover:text-brand-green transition-colors flex items-center gap-2 mx-auto">
                            Load Archives
                            <HiOutlineChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

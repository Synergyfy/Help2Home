'use client';

import React from 'react';
import Link from 'next/link';
import { MdTrendingUp, MdArrowForward, MdAccountBalanceWallet, MdPieChart } from 'react-icons/md';

export default function InvestorDashboard() {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#111811]">Overview</h1>
                    <p className="text-gray-500">Welcome back, Investor. Here&apos;s how your portfolio is performing.</p>
                </div>
                <Link
                    href="/dashboard/investor/invest"
                    className="flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-full font-bold shadow-lg shadow-green-900/20 hover:bg-green-700 transition-all hover:scale-105"
                >
                    <MdTrendingUp size={20} />
                    Explore Opportunities
                </Link>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111811] text-white p-6 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-16 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                            <MdAccountBalanceWallet />
                            <span className="text-xs font-bold uppercase tracking-widest">Total Invested</span>
                        </div>
                        <h2 className="text-3xl font-bold mb-1">₦0.00</h2>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="text-brand-green font-bold">+0%</span>
                            <span>vs last month</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <MdPieChart />
                        <span className="text-xs font-bold uppercase tracking-widest">Active Ventures</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">0</h2>
                    <p className="text-xs text-gray-400">Projects currently funding</p>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                        <MdTrendingUp />
                        <span className="text-xs font-bold uppercase tracking-widest">Projected Returns</span>
                    </div>
                    <h2 className="text-3xl font-bold text-brand-green mb-1">₦0.00</h2>
                    <p className="text-xs text-gray-400">Expected at maturity</p>
                </div>
            </div>

            {/* Recent Activity / Empty State */}
            <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center py-20">
                <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                    <MdTrendingUp size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Start Your Journey</h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-8">
                    You haven&apos;t made any investments yet. Browse our vetted developer projects to find high-yield opportunities.
                </p>
                <Link
                    href="/dashboard/investor/invest"
                    className="text-brand-green font-bold flex items-center justify-center gap-2 hover:underline"
                >
                    View Marketplace <MdArrowForward />
                </Link>
            </div>
        </div>
    );
}

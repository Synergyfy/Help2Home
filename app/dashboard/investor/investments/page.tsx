'use client';

import React from 'react';
import Link from 'next/link';
import { MdTrendingUp, MdArrowForward, MdPieChart, MdAccessTime } from 'react-icons/md';

// Mock Data
const MY_INVESTMENTS = [
    {
        id: 'inv_001',
        projectTitle: 'Lekki Gardens Phase V',
        developer: 'Zenith Developments',
        investedAmount: 5000000,
        currentValue: 5250000,
        roi: 25,
        startDate: '2025-11-15',
        maturityDate: '2027-05-15',
        status: 'active',
        nextPayout: '2026-02-15'
    }
];

export default function MyInvestmentsPage() {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-[#111811] mb-2">My Portfolio</h1>
                    <p className="text-gray-500">Track the performance of your active ventures.</p>
                </div>
                <Link href="/dashboard/investor/invest" className="text-sm font-bold text-brand-green hover:underline">
                    + Invest New Capital
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {MY_INVESTMENTS.length > 0 ? (
                    MY_INVESTMENTS.map((inv) => (
                        <div key={inv.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="size-16 bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green shrink-0">
                                        <MdPieChart size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{inv.projectTitle}</h3>
                                        <p className="text-sm text-gray-500">Managed by {inv.developer}</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full capitalize">
                                                {inv.status}
                                            </span>
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                                                {inv.roi}% Target ROI
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Invested</p>
                                        <p className="text-lg font-bold text-gray-900">₦{(inv.investedAmount / 1000000).toFixed(2)}M</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Current Value</p>
                                        <p className="text-lg font-bold text-brand-green">₦{(inv.currentValue / 1000000).toFixed(2)}M</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Maturity</p>
                                        <p className="text-sm font-bold text-gray-700">{inv.maturityDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Next Payout</p>
                                        <p className="text-sm font-bold text-gray-700">{inv.nextPayout}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex justify-end">
                                <Link
                                    href={`/dashboard/investor/investments/${inv.id}`}
                                    className="flex items-center gap-2 px-6 py-2 bg-[#111811] text-white text-sm font-bold rounded-xl hover:bg-black transition-colors"
                                >
                                    View Schedule & Details <MdArrowForward />
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <MdAccessTime size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">No Active Investments</h3>
                        <p className="text-gray-500 mb-6">Start building your portfolio today.</p>
                        <Link href="/dashboard/investor/invest" className="px-6 py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-green-700 transition-colors">
                            Explore Marketplace
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

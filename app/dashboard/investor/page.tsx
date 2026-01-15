'use client';

import React from 'react';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export default function InvestorDashboard() {
    return (
        <FadeIn>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Investor Dashboard</h1>
                        <p className="text-gray-500">Welcome back, Alex</p>
                    </div>
                    <Link href="/dashboard/investor/opportunities" className="bg-brand-green text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-green/90 transition-colors">
                        Browse Opportunities
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Placeholder Metrics */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Total Portfolio Value</p>
                        <p className="text-2xl font-bold text-gray-900">$0.00</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Available Cash</p>
                        <p className="text-2xl font-bold text-gray-900">$0.00</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">YTD Return</p>
                        <p className="text-2xl font-bold text-green-600">0.0%</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400">
                    Performance Chart Placeholder
                </div>
            </div>
        </FadeIn>
    );
}

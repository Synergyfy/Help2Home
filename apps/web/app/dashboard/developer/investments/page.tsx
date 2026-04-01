'use client';

import React, { useState } from 'react';
import ROICalculator from '@/components/dashboard/developer/investments/ROICalculator';
import InvestmentSettings from '@/components/dashboard/developer/investments/InvestmentSettings';
import { MdAccountBalanceWallet, MdSettings, MdCalculate } from 'react-icons/md';

export default function InvestmentDashboardPage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'settings' | 'calculator'>('overview');

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#111811] mb-2">Investment Hub</h1>
                <p className="text-gray-500">Manage your investment terms and model potential returns.</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === 'overview' ? 'bg-[#111811] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
                >
                    <MdAccountBalanceWallet size={18} />
                    Active Investments
                </button>
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === 'settings' ? 'bg-[#111811] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
                >
                    <MdSettings size={18} />
                    Standard Conditions
                </button>
                <button
                    onClick={() => setActiveTab('calculator')}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeTab === 'calculator' ? 'bg-[#111811] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
                >
                    <MdCalculate size={18} />
                    ROI Toolkit
                </button>
            </div>

            {/* Content Area */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 gap-6">
                        {/* Placeholder for Active Investments List */}
                        <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-200 text-center">
                            <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                <MdAccountBalanceWallet size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No Active Investments</h3>
                            <p className="text-sm text-gray-500">You haven&apos;t accepted any investments on your projects yet.</p>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="max-w-3xl">
                        <InvestmentSettings />
                    </div>
                )}

                {activeTab === 'calculator' && (
                    <div className="max-w-4xl">
                        <ROICalculator />
                    </div>
                )}
            </div>
        </div>
    );
}

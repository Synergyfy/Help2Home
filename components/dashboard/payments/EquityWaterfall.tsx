'use client';

import React from 'react';
import { HiOutlineHome, HiOutlineShieldCheck, HiOutlineArrowTrendingUp } from 'react-icons/hi2';

interface EquityWaterfallProps {
    totalValue: number;
    paidAmount: number;
    equityPercentage: number;
    monthlyInstallment: number;
}

export default function EquityWaterfall({ 
    totalValue, 
    paidAmount, 
    equityPercentage,
    monthlyInstallment
}: EquityWaterfallProps) {
    const platformFee = monthlyInstallment * 0.05;
    const investorROI = monthlyInstallment * 0.15;
    const principalEquity = monthlyInstallment - platformFee - investorROI;

    return (
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="size-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green">
                    <HiOutlineArrowTrendingUp size={28} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Ownership & Equity Growth</h3>
                    <p className="text-sm text-gray-500">Track how your payments build your stake in this home.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Current Equity</p>
                    <p className="text-2xl font-black text-brand-green">{equityPercentage.toFixed(1)}%</p>
                </div>
                <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Amount Paid</p>
                    <p className="text-2xl font-black text-gray-900">₦{paidAmount.toLocaleString()}</p>
                </div>
                <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Home Value</p>
                    <p className="text-2xl font-black text-gray-900">₦{(totalValue / 1000000).toFixed(1)}M</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-end">
                    <div>
                        <h4 className="font-bold text-gray-900">Monthly Payment Waterfall</h4>
                        <p className="text-xs text-gray-500 mt-1 text-left">How your ₦{monthlyInstallment.toLocaleString()} is distributed</p>
                    </div>
                    <span className="text-[10px] font-black text-brand-green bg-green-50 px-2 py-1 rounded-md uppercase tracking-tight">Verified Model</span>
                </div>

                <div className="w-full h-12 flex rounded-2xl overflow-hidden shadow-inner border border-gray-50">
                    <div className="bg-red-500 h-full flex items-center justify-center text-[10px] font-bold text-white px-2" style={{ width: '5%' }} title="Platform Maintenance Fee">
                        5%
                    </div>
                    <div className="bg-blue-600 h-full flex items-center justify-center text-[10px] font-bold text-white px-2" style={{ width: '15%' }} title="Investor Yield">
                        15%
                    </div>
                    <div className="bg-brand-green h-full flex items-center justify-center text-[10px] font-bold text-white px-2" style={{ width: '80%' }} title="Your Equity Growth">
                        80% Equity
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="flex items-start gap-3">
                        <div className="size-3 rounded-full bg-red-500 mt-1 shrink-0" />
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Platform Fee</p>
                            <p className="text-sm font-bold text-gray-900">₦{platformFee.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="size-3 rounded-full bg-blue-600 mt-1 shrink-0" />
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Investor ROI</p>
                            <p className="text-sm font-bold text-gray-900">₦{investorROI.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="size-3 rounded-full bg-brand-green mt-1 shrink-0" />
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Home Equity</p>
                            <p className="text-sm font-bold text-brand-green">₦{principalEquity.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
                <div className="size-10 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                    <HiOutlineHome size={20} />
                </div>
                <p className="text-xs text-blue-800 font-medium leading-relaxed">
                    With your current plan, you will achieve <strong>100% home ownership</strong> in another <strong>18 months</strong>.
                </p>
            </div>
        </div>
    );
}

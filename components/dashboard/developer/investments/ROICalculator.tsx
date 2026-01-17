'use client';

import React, { useState, useEffect } from 'react';
import { MdTrendingUp, MdRefresh, MdInfoOutline } from 'react-icons/md';
import RepaymentTimeline from './RepaymentTimeline';

export default function ROICalculator() {
    const [amount, setAmount] = useState<number>(1000000);
    const [roi, setRoi] = useState<number>(15);
    const [duration, setDuration] = useState<number>(12);
    const [frequency, setFrequency] = useState<string>('annually');

    const [results, setResults] = useState({
        totalProfit: 0,
        totalPayout: 0,
        periodicPayout: 0
    });

    useEffect(() => {
        const profit = amount * (roi / 100);
        const total = amount + profit;

        let payout = 0;
        // Simple calculation logic (flat interest usually for these types of deals)
        if (frequency === 'monthly') payout = profit / duration;
        else if (frequency === 'quarterly') payout = profit / (duration / 3);
        else if (frequency === 'annually') payout = profit / (duration / 12);
        else payout = total; // End of term gets everything

        setResults({
            totalProfit: profit,
            totalPayout: total,
            periodicPayout: frequency === 'end-of-term' ? total : payout
        });

    }, [amount, roi, duration, frequency]);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="size-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <MdTrendingUp size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">ROI Simulator</h3>
                    <p className="text-sm text-gray-500">Model your investment returns based on project terms.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Inputs */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Investment Capital (₦)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full p-4 rounded-xl border border-gray-200 focus:border-brand-green outline-none font-bold text-lg"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">ROI (%)</label>
                            <input
                                type="number"
                                value={roi}
                                onChange={(e) => setRoi(Number(e.target.value))}
                                className="w-full p-4 rounded-xl border border-gray-200 focus:border-brand-green outline-none font-bold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Duration (Months)</label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                                className="w-full p-4 rounded-xl border border-gray-200 focus:border-brand-green outline-none font-bold"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Payout Frequency</label>
                        <select
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value)}
                            className="w-full p-4 rounded-xl border border-gray-200 focus:border-brand-green outline-none font-medium bg-white"
                        >
                            <option value="monthly">Monthly Payouts (Interest Only)</option>
                            <option value="quarterly">Quarterly Payouts (Interest Only)</option>
                            <option value="annually">Annual Payouts (Interest Only)</option>
                            <option value="end-of-term">End of Term (Capital + Interest)</option>
                        </select>
                    </div>
                </div>

                {/* Results Card */}
                <div className="bg-[#111811] text-white rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-brand-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 space-y-6">
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Payout at Maturity</p>
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-green">
                                ₦{results.totalPayout.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-800">
                            <div>
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Net Profit</p>
                                <p className="text-xl font-bold text-white">
                                    +₦{results.totalProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                                    {frequency === 'end-of-term' ? 'Lump Sum' : 'Periodic Payout'}
                                </p>
                                <p className="text-xl font-bold text-white">
                                    ₦{results.periodicPayout.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 relative z-10 p-3 bg-white/5 rounded-lg border border-white/10 text-xs text-gray-400 flex gap-2">
                        <MdInfoOutline size={16} className="shrink-0 mt-0.5" />
                        <p>Figures are estimates based on flat interest calculation. Actual terms may vary per project contract.</p>
                    </div>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Projected Timeline</h4>
                <div className="px-4">
                    <RepaymentTimeline duration={duration} frequency={frequency} />
                </div>
            </div>
        </div>
    );
}

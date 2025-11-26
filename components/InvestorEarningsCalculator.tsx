'use client';

import React, { useState, useEffect } from 'react';
import FadeIn from './FadeIn';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function InvestorEarningsCalculator() {
    // Inputs
    const [investmentAmount, setInvestmentAmount] = useState<number>(500000);
    const [duration, setDuration] = useState<number>(12);
    const [mode, setMode] = useState<'fixed' | 'compound'>('fixed');
    const [monthlyRate, setMonthlyRate] = useState<number>(2.0); // Default 2%
    const [advancedMode, setAdvancedMode] = useState(false);

    // Outputs
    const [monthlyEarnings, setMonthlyEarnings] = useState(0);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalPayout, setTotalPayout] = useState(0);
    const [apr, setApr] = useState(0);
    const [chartData, setChartData] = useState<any[]>([]);

    // Calculations
    useEffect(() => {
        const amount = Math.max(investmentAmount, 100000); // Min 100k
        const dur = duration;
        const rate = monthlyRate / 100;

        let mEarnings = 0;
        let tEarnings = 0;
        let tPayout = 0;
        let effectiveApr = 0;
        const data = [];

        if (mode === 'fixed') {
            // Fixed Earnings (Simple Interest)
            mEarnings = amount * rate;
            tEarnings = mEarnings * dur;
            tPayout = amount + tEarnings;
            effectiveApr = (tEarnings / amount) * (12 / dur) * 100; // Annualized simple interest

            // Chart Data
            for (let i = 0; i <= dur; i++) {
                data.push({
                    month: i,
                    principal: amount,
                    value: amount + (mEarnings * i),
                });
            }
        } else {
            // Compound Earnings
            // Formula: A = P * (1 + r)^t
            tPayout = amount * Math.pow(1 + rate, dur);
            tEarnings = tPayout - amount;
            mEarnings = tEarnings / dur; // Average monthly earnings
            effectiveApr = (Math.pow(1 + rate, 12) - 1) * 100; // Effective Annual Rate

            // Chart Data
            for (let i = 0; i <= dur; i++) {
                data.push({
                    month: i,
                    principal: amount,
                    value: amount * Math.pow(1 + rate, i),
                });
            }
        }

        setMonthlyEarnings(mEarnings);
        setTotalEarnings(tEarnings);
        setTotalPayout(tPayout);
        setApr(effectiveApr);
        setChartData(data);

    }, [investmentAmount, duration, mode, monthlyRate]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <section className="py-20 bg-white" id="calculator">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Investor Earnings <span className="text-brand-green">Calculator</span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            Estimate your potential returns with our interactive calculator.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Input Panel */}
                    <div className="lg:col-span-5 bg-gray-50 p-8 rounded-2xl border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Investment Details</h3>

                        <div className="space-y-6">
                            {/* Investment Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount (₦)</label>
                                <input
                                    type="number"
                                    value={investmentAmount}
                                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all mb-2"
                                />
                                <input
                                    type="range"
                                    min="100000"
                                    max="50000000"
                                    step="50000"
                                    value={investmentAmount}
                                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                />
                                <div className="flex gap-2 mt-2">
                                    {[100000, 500000, 1000000, 5000000].map((amt) => (
                                        <button
                                            key={amt}
                                            onClick={() => setInvestmentAmount(amt)}
                                            className="text-xs bg-white border border-gray-300 px-2 py-1 rounded hover:border-brand-green hover:text-brand-green transition-colors"
                                        >
                                            {formatCurrency(amt)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                                <select
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                                >
                                    {[3, 6, 9, 12, 18, 24].map((m) => (
                                        <option key={m} value={m}>{m} Months {m >= 12 ? `(${m / 12} Year${m / 12 > 1 ? 's' : ''})` : ''}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Mode */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Investment Mode</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="mode"
                                            value="fixed"
                                            checked={mode === 'fixed'}
                                            onChange={() => setMode('fixed')}
                                            className="text-brand-green focus:ring-brand-green"
                                        />
                                        <span className="text-gray-700">Fixed Earnings</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="mode"
                                            value="compound"
                                            checked={mode === 'compound'}
                                            onChange={() => setMode('compound')}
                                            className="text-brand-green focus:ring-brand-green"
                                        />
                                        <span className="text-gray-700">Compound (Reinvest)</span>
                                    </label>
                                </div>
                            </div>

                            {/* Rate (Advanced) */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Monthly Interest Rate
                                        <span className="ml-1 text-gray-400 cursor-help" title="Monthly rate applied to invested funds.">ⓘ</span>
                                    </label>
                                    <button
                                        onClick={() => setAdvancedMode(!advancedMode)}
                                        className="text-xs text-brand-green hover:underline"
                                    >
                                        {advancedMode ? 'Hide' : 'Edit'}
                                    </button>
                                </div>
                                {advancedMode ? (
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={monthlyRate}
                                        onChange={(e) => setMonthlyRate(Number(e.target.value))}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                                    />
                                ) : (
                                    <div className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-100 text-gray-500">
                                        {monthlyRate}%
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Result Panel */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white p-8 rounded-2xl border border-brand-green/20 shadow-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Estimated Monthly Earnings</p>
                                    <p className="text-3xl md:text-4xl font-bold text-brand-green">
                                        {formatCurrency(mode === 'fixed' ? monthlyEarnings : monthlyEarnings)}
                                        {mode === 'compound' && <span className="text-sm font-normal text-gray-500 ml-2">(avg)</span>}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Total Payout</p>
                                    <p className="text-3xl md:text-4xl font-bold text-gray-900">{formatCurrency(totalPayout)}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-gray-100">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Total Earnings</p>
                                    <p className="text-lg font-bold text-gray-900">{formatCurrency(totalEarnings)}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">Effective APR</p>
                                    <p className="text-lg font-bold text-brand-green">{apr.toFixed(2)}%</p>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="h-64 w-full mb-8">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                        <YAxis tick={{ fontSize: 12 }} tickFormatter={(val) => `₦${val / 1000}k`} tickLine={false} axisLine={false} />
                                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                        <Legend />
                                        <Line type="monotone" dataKey="principal" stroke="#e5e7eb" strokeWidth={2} dot={false} name="Principal" />
                                        <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Portfolio Value" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 bg-brand-green text-white px-6 py-4 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-200 text-center">
                                    Start Investing
                                </button>
                                <button className="flex-1 bg-white text-gray-900 border border-gray-200 px-6 py-4 rounded-full font-bold hover:border-brand-green hover:text-brand-green transition-colors text-center">
                                    Save Scenario
                                </button>
                            </div>
                            <p className="text-xs text-center text-gray-400 mt-4">
                                This is an estimate. Actual returns depend on tenant repayments, defaults, and fees.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

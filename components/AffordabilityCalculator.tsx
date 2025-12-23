'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FadeIn from './FadeIn';
import { calculateAffordability, AffordabilityResult } from '../lib/affordability';

// Info Icon Component
const InfoIcon = ({ tooltip }: { tooltip: string }) => (
    <div className="group relative inline-block ml-2 cursor-help">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-brand-green transition-colors">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg w-48 text-center z-10 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            {tooltip}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
        </div>
    </div>
);

// Helpers
const formatNumberWithCommas = (value: number | string) => {
    if (value === '' || value === 0) return '';
    return Number(value).toLocaleString('en-NG');
};
const formatCurrency = (value: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value);
const formatPercent = (value: number) => `${Math.round(value * 100)}%`;

export default function AffordabilityCalculator() {
    const router = useRouter();
    const params = useSearchParams();

    // Get pre-filled amount from query if exists
    const prefilledAmount = params.get('amount') ? Number(params.get('amount')) : '';

    // Inputs
    const [monthlyIncome, setMonthlyIncome] = useState<number | ''>(prefilledAmount);
    const [affordabilityRatio, setAffordabilityRatio] = useState(0.30);
    const [durationMonths, setDurationMonths] = useState(10);
    const [monthlyInterestRate, setMonthlyInterestRate] = useState(0.02);

    // Optional Inputs
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [existingLoanPayments, setExistingLoanPayments] = useState<number | ''>('');
    const [hasExistingLoans, setHasExistingLoans] = useState(false);

    // Results
    const [result, setResult] = useState<AffordabilityResult | null>(null);

    // Recalculate whenever inputs change
    useEffect(() => {
        if (monthlyIncome === '' || monthlyIncome === 0) {
            setResult(null);
            return;
        }

        const res = calculateAffordability({
            monthlyIncome: Number(monthlyIncome),
            affordabilityRatio,
            durationMonths,
            monthlyInterestRate,
            existingLoanPayments: hasExistingLoans ? Number(existingLoanPayments) : 0
        });
        setResult(res);
    }, [monthlyIncome, affordabilityRatio, durationMonths, monthlyInterestRate, existingLoanPayments, hasExistingLoans]);

    const handleSubmit = () => router.push('/signup');

    return (
        <section id="affordability-calculator" className="py-20 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn>
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Check Your Affordability</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Estimate how much rent and loan principal you can afford in under 60 seconds.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
                            {/* Input Section */}
                            <div className="p-8 lg:p-10 lg:w-1/2 space-y-8 bg-gray-50/50">
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">
                                        Monthly Income (₦) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formatNumberWithCommas(monthlyIncome)}
                                        onChange={(e) => {
                                            const numericValue = Number(e.target.value.replace(/,/g, ''));
                                            setMonthlyIncome(isNaN(numericValue) ? '' : numericValue);
                                        }}
                                        placeholder="e.g. 300,000"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all text-lg"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            Affordability Ratio
                                            <InfoIcon tooltip="% of your monthly income you’re comfortable using for rent repayment" />
                                        </label>
                                        <span className="text-brand-green font-bold">{formatPercent(affordabilityRatio)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.25"
                                        max="0.35"
                                        step="0.01"
                                        value={affordabilityRatio}
                                        onChange={(e) => setAffordabilityRatio(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>25% (Conservative)</span>
                                        <span>35% (Aggressive)</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            Repayment Duration
                                            <InfoIcon tooltip="Number of months you want to spread the financed balance" />
                                        </label>
                                        <span className="text-brand-green font-bold">{durationMonths} Months</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        step="1"
                                        value={durationMonths}
                                        onChange={(e) => setDurationMonths(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            Monthly Interest Rate
                                            <InfoIcon tooltip="Estimated monthly interest rate applied to financed balance" />
                                        </label>
                                        <span className="text-brand-green font-bold">{formatPercent(monthlyInterestRate)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0.01"
                                        max="0.05"
                                        step="0.005"
                                        value={monthlyInterestRate}
                                        onChange={(e) => setMonthlyInterestRate(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                    />
                                </div>

                                {/* Advanced Options */}
                                <div className="pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => setShowAdvanced(!showAdvanced)}
                                        className="text-brand-green text-sm font-semibold hover:text-green-700 flex items-center"
                                    >
                                        {showAdvanced ? 'Hide Advanced Options' : 'Refine your result (Optional)'}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`ml-1 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}>
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </button>

                                    {showAdvanced && (
                                        <div className="mt-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div className="flex items-center space-x-3">
                                                <input
                                                    type="checkbox"
                                                    id="hasLoans"
                                                    checked={hasExistingLoans}
                                                    onChange={(e) => setHasExistingLoans(e.target.checked)}
                                                    className="w-4 h-4 text-brand-green border-gray-300 rounded focus:ring-brand-green"
                                                />
                                                <label htmlFor="hasLoans" className="text-sm text-gray-700">Do you have existing loans?</label>
                                            </div>

                                            {hasExistingLoans && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Total Monthly Repayments (₦)
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formatNumberWithCommas(existingLoanPayments)}
                                                        onChange={(e) => {
                                                            const numericValue = Number(e.target.value.replace(/,/g, ''));
                                                            setExistingLoanPayments(isNaN(numericValue) ? '' : numericValue);
                                                        }}
                                                        placeholder="e.g. 20,000"
                                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Results Section */}
                            <div className="lg:w-1/2 bg-brand-green text-white p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-10 -mb-10 pointer-events-none"></div>

                                {!result ? (
                                    <div className="text-center opacity-80">
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                            </svg>
                                        </div>
                                        <p className="text-lg">Enter your monthly income to see your affordability results.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-8 relative z-10">
                                        <div>
                                            <h3 className="text-green-100 text-sm font-medium mb-1 uppercase tracking-wider">Your Affordability Summary</h3>
                                            <div className="h-px w-12 bg-green-400 mb-6"></div>
                                        </div>

                                        {result.qualify ? (
                                            <>
                                                <div>
                                                    <p className="text-green-100 text-sm mb-1">Maximum Monthly Repayment</p>
                                                    <p className="text-4xl font-bold">{formatCurrency(result.maxMonthlyRepayment)}</p>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                                        <p className="text-green-100 text-xs mb-1">Max Loan Amount</p>
                                                        <p className="text-xl font-bold">{formatCurrency(result.loanPrincipal)}</p>
                                                    </div>
                                                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                                        <p className="text-green-100 text-xs mb-1">Max Annual Rent</p>
                                                        <p className="text-xl font-bold">{formatCurrency(result.maxRent)}</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-3 text-sm text-green-50 border-t border-white/10 pt-4">
                                                    <div className="flex justify-between">
                                                        <span>Upfront Payment (50%)</span>
                                                        <span className="font-semibold">{formatCurrency(result.upfrontPayment)}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span>Est. Monthly Payment</span>
                                                        <span className="font-semibold">{formatCurrency(result.maxMonthlyRepayment)}</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs opacity-70">
                                                        <span>Duration: {durationMonths} months</span>
                                                        <span>Rate: {formatPercent(monthlyInterestRate)}</span>
                                                    </div>
                                                </div>

                                                <button onClick={handleSubmit} className="w-full bg-white text-brand-green py-3 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-lg mt-2">
                                                    Proceed to Apply
                                                </button>
                                            </>
                                        ) : (
                                            <div className="bg-red-500/20 p-6 rounded-xl border border-red-500/30">
                                                <div className="flex items-center mb-3">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-red-200">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                                    </svg>
                                                    <h4 className="font-bold text-lg">You may not qualify</h4>
                                                </div>
                                                <ul className="list-disc list-inside text-sm space-y-1 text-red-100">
                                                    {result.reasons.map((reason, idx) => (
                                                        <li key={idx}>{reason}</li>
                                                    ))}
                                                </ul>
                                                <p className="text-xs mt-4 text-white/80">Try increasing your repayment duration or reducing your requested rent amount.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

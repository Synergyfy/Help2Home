'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FadeIn from './FadeIn';
import { HiOutlineInformationCircle, HiOutlineShieldCheck, HiOutlineReceiptPercent, HiOutlineBanknotes } from 'react-icons/hi2';

// Helpers
const formatNumberWithCommas = (value: number | string) => {
    if (value === '' || value === 0) return '';
    return Number(value).toLocaleString('en-NG');
};

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value);
};

export default function RentCalculator() {
    const router = useRouter();
    const params = useSearchParams();

    // Get pre-filled amounts from query if exists
    const prefilledAmount = params.get('amount') ? Number(params.get('amount')) : 2000000;

    // Parse itemized charges
    const itemizedUrlCharges = {
        serviceCharge: Number(params.get('serviceCharge')) || 0,
        legalFees: Number(params.get('legalFees')) || 0,
        tenancyAgreement: Number(params.get('tenancyAgreement')) || 0,
        powerBackup: Number(params.get('powerBackup')) || 0,
        waterSupply: Number(params.get('waterSupply')) || 0,
        securityPatrol: Number(params.get('securityPatrol')) || 0,
        wasteDisposal: Number(params.get('wasteDisposal')) || 0,
    };

    const totalItemized = Object.values(itemizedUrlCharges).reduce((a, b) => a + b, 0);
    const hasItemizedFromUrl = totalItemized > 0;

    // Use prefilled total other charges if itemized is not present, otherwise use totalItemized
    const initialOtherCharges = hasItemizedFromUrl ? totalItemized : (Number(params.get('otherCharges')) || 0);

    // State
    const [rent, setRent] = useState<number | ''>(prefilledAmount);
    const [otherCharges, setOtherCharges] = useState<number | ''>(initialOtherCharges);
    const [downPaymentPercent, setDownPaymentPercent] = useState(50);
    const [months, setMonths] = useState(1);

    // Optional Interest State
    const [isInterestEnabled, setIsInterestEnabled] = useState(false);
    const [interestRate, setInterestRate] = useState(10); // 10% annual flat rate as default

    // Calculated values
    const [results, setResults] = useState({
        downPaymentAmount: 0,
        otherChargesAmount: 0,
        totalUpfront: 0,
        balanceToFinance: 0,
        interestAmount: 0,
        totalRepayable: 0,
        monthlyPayment: 0
    });

    useEffect(() => {
        if (rent === '' || rent === 0) {
            setResults({
                downPaymentAmount: 0,
                otherChargesAmount: 0,
                totalUpfront: 0,
                balanceToFinance: 0,
                interestAmount: 0,
                totalRepayable: 0,
                monthlyPayment: 0
            });
            return;
        }

        const rentAmount = Number(rent);
        const otherAmount = Number(otherCharges) || 0;

        // Calculate downpayment for the rent portion
        const rentDownPayment = (rentAmount * downPaymentPercent) / 100;
        const balance = rentAmount - rentDownPayment;

        // Interest calculation (flat rate based on months)
        const interestAmount = isInterestEnabled
            ? (balance * (interestRate / 100) * (months / 12))
            : 0;

        const totalRepayable = balance + interestAmount;

        // Total upfront = Downpayment on rent + all other charges
        const totalUpfront = rentDownPayment + otherAmount;

        // Monthly payment
        const monthlyPayment = months > 0 ? totalRepayable / months : 0;

        setResults({
            downPaymentAmount: rentDownPayment,
            otherChargesAmount: otherAmount,
            totalUpfront,
            balanceToFinance: balance,
            interestAmount,
            totalRepayable,
            monthlyPayment
        });
    }, [rent, otherCharges, downPaymentPercent, months, isInterestEnabled, interestRate]);

    const handleApply = () => {
        const query = new URLSearchParams({
            amount: rent.toString(),
            otherCharges: otherCharges.toString(),
            downPayment: results.downPaymentAmount.toString(),
            months: months.toString(),
            interest: isInterestEnabled ? interestRate.toString() : '0'
        }).toString();
        router.push(`/signup?${query}`);
    };

    return (
        <section id="calculator" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn>
                    <div className="max-w-5xl mx-auto space-y-8">
                        {/* Header */}
                        <div className="text-center">
                            <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Flexible Rent Calculator</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">
                                Split your rent into manageable monthly payments. {isInterestEnabled ? 'Fast-track your move with partner financing.' : 'No interest, no hidden fees. Just transparent housing finance.'}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Inputs Column */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Annual Rent */}
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                                Annual Asset Value (₦)
                                                <div className="group relative">
                                                    <HiOutlineInformationCircle className="text-gray-400 cursor-help" />
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                                        The total quoted price of the property or annual rent.
                                                    </div>
                                                </div>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={formatNumberWithCommas(rent)}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/,/g, '');
                                                        setRent(val === '' ? '' : Number(val));
                                                    }}
                                                    className="w-full pl-4 pr-12 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-bold text-lg"
                                                    placeholder="0.00"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</span>
                                            </div>
                                        </div>

                                        {/* Other Charges */}
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                                Other Charges (₦)
                                                <div className="group relative">
                                                    <HiOutlineInformationCircle className="text-gray-400 cursor-help" />
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                                        Includes Legal fees, Service charges, and Agency fees. These must be paid upfront.
                                                    </div>
                                                </div>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={formatNumberWithCommas(otherCharges)}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/,/g, '');
                                                        setOtherCharges(val === '' ? '' : Number(val));
                                                    }}
                                                    className="w-full pl-4 pr-12 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-brand-green focus:bg-white outline-none transition-all font-bold text-lg"
                                                    placeholder="0.00"
                                                    readOnly={hasItemizedFromUrl}
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</span>
                                            </div>
                                            {hasItemizedFromUrl && <p className="text-[10px] text-brand-green font-bold uppercase ml-1 tracking-tighter">Locked: Using itemized charges from property</p>}
                                        </div>
                                    </div>

                                    {/* Itemized Breakdown if available */}
                                    {hasItemizedFromUrl && (
                                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                                            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Itemized Other Charges Breakdown</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                                {Object.entries(itemizedUrlCharges).map(([key, val]) => val > 0 && (
                                                    <div key={key} className="flex justify-between items-center py-1 border-b border-gray-200/50 last:border-0">
                                                        <span className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                                        <span className="text-xs font-bold text-gray-700">₦{formatNumberWithCommas(val)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Sliders */}
                                    <div className="space-y-10 pt-4">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-end">
                                                <label className="text-sm font-bold text-gray-700">Down Payment Percentage</label>
                                                <span className="text-2xl font-black text-brand-green">{downPaymentPercent}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="30"
                                                max="100"
                                                step="5"
                                                value={downPaymentPercent}
                                                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                                                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                            />
                                            <div className="flex justify-between text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                                                <span>Min 30%</span>
                                                <span>Full Pay 100%</span>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex justify-between items-end">
                                                <div className="space-y-1">
                                                    <label className="text-sm font-bold text-gray-700">Repayment Period</label>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl font-black text-brand-green">{months} {months === 1 ? 'Month' : 'Months'}</span>

                                                        {/* Interest Toggle */}
                                                        <button
                                                            onClick={() => setIsInterestEnabled(!isInterestEnabled)}
                                                            className={`flex items-center gap-2 px-3 py-1 rounded-full border-2 transition-all ${isInterestEnabled
                                                                ? 'border-brand-green bg-green-50 text-brand-green shadow-sm'
                                                                : 'border-gray-200 text-gray-400 grayscale'
                                                                }`}
                                                        >
                                                            <div className={`size-2 rounded-full ${isInterestEnabled ? 'bg-brand-green animate-pulse' : 'bg-gray-300'}`}></div>
                                                            <span className="text-[10px] font-black uppercase tracking-tight">Interest Enabled</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <input
                                                type="range"
                                                min="1"
                                                max="12"
                                                value={months}
                                                onChange={(e) => setMonths(Number(e.target.value))}
                                                className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                            />
                                            <div className="flex justify-between text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                                                <span>1 Month</span>
                                                <span>12 Months</span>
                                            </div>
                                        </div>

                                        {/* Optional Interest Rate Slider */}
                                        {isInterestEnabled && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 p-6 bg-gray-50 rounded-2xl border border-brand-green/10">
                                                <div className="flex justify-between items-end">
                                                    <div className="flex items-center gap-2">
                                                        <HiOutlineReceiptPercent className="text-brand-green" size={20} />
                                                        <label className="text-sm font-bold text-gray-700">Dynamic Interest Rate (APR)</label>
                                                    </div>
                                                    <span className="text-2xl font-black text-brand-green">{interestRate}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="5"
                                                    max="25"
                                                    step="1"
                                                    value={interestRate}
                                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                                />
                                                <p className="text-[10px] text-gray-500 italic">This rate is determined by our partner banks based on your credit profile.</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Explanatory Card */}
                                    <div className={`p-6 border rounded-2xl flex gap-4 transition-all duration-500 ${isInterestEnabled ? 'bg-orange-50/50 border-orange-100' : 'bg-brand-green/5 border-brand-green/10'}`}>
                                        <div className={`shrink-0 size-12 rounded-xl flex items-center justify-center text-white shadow-lg ${isInterestEnabled ? 'bg-orange-500 shadow-orange-500/20' : 'bg-brand-green shadow-brand-green/20'}`}>
                                            {isInterestEnabled ? <HiOutlineBanknotes size={28} /> : <HiOutlineShieldCheck size={28} />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">{isInterestEnabled ? 'Partner Financing' : '0% Interest Financing'}</h4>
                                            <p className="text-sm text-gray-500 leading-relaxed">
                                                {isInterestEnabled
                                                    ? 'We partner with leading banks to provide you with instant rent loans. Pay a small monthly interest to secure your dream home today.'
                                                    : 'We believe in ethical financing. Your total repayable amount is exactly the same as the rent. Only "Other Charges" are collected upfront.'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Column */}
                            <div className="bg-brand-green rounded-3xl p-8 md:p-10 text-white shadow-2xl shadow-brand-green/30 flex flex-col">
                                <div className="flex-1 space-y-8">
                                    <div>
                                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Monthly Installment</p>
                                        <div className="text-5xl font-black">
                                            {formatCurrency(results.monthlyPayment)}
                                        </div>
                                        <p className="text-white/60 text-xs mt-2 italic">For next {months} months</p>
                                    </div>

                                    <div className="space-y-4 pt-8 border-t border-white/10">
                                        <div className="flex justify-between items-center group">
                                            <span className="text-sm text-white/70">Downpayment ({downPaymentPercent}%)</span>
                                            <span className="font-bold">{formatCurrency(results.downPaymentAmount)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-white/70">Total Other Charges</span>
                                            <span className="font-bold">{formatCurrency(results.otherChargesAmount)}</span>
                                        </div>
                                        {isInterestEnabled && (
                                            <div className="flex justify-between items-center text-green-200">
                                                <span className="text-sm">Financing Interest</span>
                                                <span className="font-bold">+ {formatCurrency(results.interestAmount)}</span>
                                            </div>
                                        )}
                                        <div className="pt-4 border-t border-white/20">
                                            <div className="flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black uppercase tracking-widest text-white/50">Required Upfront</span>
                                                    <span className="text-lg font-black">Total Payment</span>
                                                </div>
                                                <span className="text-3xl font-black">{formatCurrency(results.totalUpfront)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={handleApply}
                                        className="w-full bg-white text-brand-green py-5 rounded-2xl font-black text-lg hover:shadow-xl hover:scale-[1.02] transition-all active:scale-95 mt-4"
                                    >
                                        Get Started Now
                                    </button>

                                    <p className="text-[10px] text-center text-white/40 font-bold uppercase tracking-tighter">
                                        Terms and conditions apply. Subject to verification.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

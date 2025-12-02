'use client';

import { useState, useEffect } from 'react';
import FadeIn from './FadeIn';

// Partner banks with their interest rates
const PARTNER_BANKS = [
    { name: 'First Bank of Nigeria', rate: 4.5 },
    { name: 'Zenith Bank', rate: 4.8 },
    { name: 'GTBank (Guaranty Trust Bank)', rate: 4.7 },
    { name: 'Access Bank', rate: 5.0 },
    { name: 'UBA (United Bank for Africa)', rate: 4.9 },
    { name: 'Stanbic IBTC Bank', rate: 4.6 },
    { name: 'Fidelity Bank', rate: 5.2 },
    { name: 'Union Bank', rate: 5.1 },
    { name: 'Wema Bank', rate: 5.3 },
    { name: 'Sterling Bank', rate: 4.8 },
];

export default function RentCalculator() {
    // Default values - updated per requirements
    const [rent, setRent] = useState(2000000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(50); // Start at 50%
    const [months, setMonths] = useState(1); // Start at 1 month
    const [selectedBankIndex, setSelectedBankIndex] = useState(0); // Default to first bank

    // Calculated values
    const [results, setResults] = useState({
        downPayment: 0,
        principal: 0,
        interestAmount: 0,
        totalRepayable: 0,
        monthlyPayment: 0
    });

    useEffect(() => {
        const downPayment = (rent * downPaymentPercent) / 100;
        const principal = rent - downPayment;

        // Get interest rate from selected bank
        const interestRate = PARTNER_BANKS[selectedBankIndex].rate;

        // Calculate monthly interest on principal
        const interestAmount = (principal * (interestRate / 100)) * months;

        // Total repayable = principal + interest
        const totalRepayable = principal + interestAmount;
        const monthlyPayment = totalRepayable / months;

        setResults({
            downPayment,
            principal,
            interestAmount,
            totalRepayable,
            monthlyPayment
        });
    }, [rent, downPaymentPercent, months, selectedBankIndex]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value);
    };

    return (
        <section id="calculator" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn>
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Tenant Rent Calculator</h2>
                            <p className="text-gray-600 text-center mb-10">Estimate your monthly payments. Final terms subject to approval.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Inputs */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Annual Rent (₦)</label>
                                        <input
                                            type="number"
                                            value={rent}
                                            onChange={(e) => setRent(Number(e.target.value))}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Down Payment ({downPaymentPercent}%)</label>
                                        <input
                                            type="range"
                                            min="50"
                                            max="100"
                                            value={downPaymentPercent}
                                            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>50%</span>
                                            <span>100%</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Repayment Period ({months} {months === 1 ? 'Month' : 'Months'})</label>
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={months}
                                            onChange={(e) => setMonths(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>1 Month</span>
                                            <span>10 Months</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Partner Bank</label>
                                        <select
                                            value={selectedBankIndex}
                                            onChange={(e) => setSelectedBankIndex(Number(e.target.value))}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                                        >
                                            {PARTNER_BANKS.map((bank, index) => (
                                                <option key={index} value={index}>
                                                    {bank.name} - {bank.rate}% interest
                                                </option>
                                            ))}
                                        </select>
                                        <p className="text-xs text-gray-500 mt-1">Interest rate varies by partner bank</p>
                                    </div>
                                </div>

                                {/* Results */}
                                <div className="bg-green-50 rounded-xl p-8 flex flex-col justify-center space-y-6">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Monthly Repayment</p>
                                        <div className="text-4xl font-bold text-brand-green">
                                            {formatCurrency(results.monthlyPayment)}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">For {months} {months === 1 ? 'month' : 'months'}</p>
                                    </div>

                                    <div className="space-y-3 pt-6 border-t border-green-100">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Down Payment ({downPaymentPercent}%)</span>
                                            <span className="font-medium text-gray-900">{formatCurrency(results.downPayment)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Amount Financed</span>
                                            <span className="font-medium text-gray-900">{formatCurrency(results.principal)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Interest ({PARTNER_BANKS[selectedBankIndex].rate}%)</span>
                                            <span className="font-medium text-gray-900">{formatCurrency(results.interestAmount)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm font-bold pt-2 border-t border-green-100">
                                            <span className="text-gray-900">Total Repayable</span>
                                            <span className="text-brand-green">{formatCurrency(results.totalRepayable)}</span>
                                        </div>
                                    </div>

                                    <button className="w-full bg-brand-green text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-200 mt-4">
                                        Proceed to Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

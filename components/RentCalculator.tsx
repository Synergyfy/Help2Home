'use client';

import { useState, useEffect } from 'react';
import FadeIn from './FadeIn';

export default function RentCalculator() {
    // Default values
    const [rent, setRent] = useState(2000000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(50);
    const [months, setMonths] = useState(6);
    const [interestRate, setInterestRate] = useState(5); // Flat rate
    const [serviceChargePercent, setServiceChargePercent] = useState(1);

    // Calculated values
    const [results, setResults] = useState({
        downPayment: 0,
        principal: 0,
        interestAmount: 0,
        serviceChargeAmount: 0,
        totalRepayable: 0,
        monthlyPayment: 0
    });

    useEffect(() => {
        const downPayment = (rent * downPaymentPercent) / 100;
        const principal = rent - downPayment;

        // Flat interest on principal
        // Note: PRD says "Total Interest = depends on the number of months chosen from the slider as it varies from 1 month (3%) to 10 months (30%) repayment"
        // But also says "Interest (default 3% monthly) = 3% of principal = ₦30,000 ( 3% x 6months repayment = 18%)"
        // And "Interest rate (flat) — default 5.0% (flat rate applied on the outstanding balance)"
        // I will follow the "default 5.0% (flat rate)" instruction from the detailed specs 3.5, 
        // but the example calculation uses 3% monthly. 
        // Let's stick to the 3.5 spec defaults: 5% flat interest, 1% service charge.
        // Wait, the example calculation in 3.5 says: "Interest (default 3% monthly) = 3% of principal... Total Interest = ... 18%".
        // This contradicts "Interest rate (flat) — default 5.0%".
        // I will implement a monthly rate logic to match the example more closely if needed, 
        // but for now I'll use the inputs provided. 
        // Let's use the input `interestRate` as a FLAT rate for the period for simplicity as per "Interest rate (flat)" description,
        // UNLESS the user wants the monthly logic. 
        // Actually, "Interest rate (flat) — default 5.0% (flat rate applied on the outstanding balance). Field editable; show tooltip 'Total interest applied on balance over the full repayment period'."
        // This suggests the 5% IS the total interest for the period.
        // However, the example calculation is much higher (18%).
        // I will stick to the editable fields. If the default is 5%, I use 5%.

        const interestAmount = (principal * interestRate) / 100;
        const serviceChargeAmount = (rent * serviceChargePercent) / 100; // Usually on base rent or principal? Spec says "% of rent".

        const totalRepayable = principal + interestAmount + serviceChargeAmount;
        const monthlyPayment = totalRepayable / months;

        setResults({
            downPayment,
            principal,
            interestAmount,
            serviceChargeAmount,
            totalRepayable,
            monthlyPayment
        });
    }, [rent, downPaymentPercent, months, interestRate, serviceChargePercent]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(value);
    };

    return (
        <section id="calculator" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn>
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Rent Repayment Calculator</h2>
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
                                            min="10"
                                            max="100"
                                            value={downPaymentPercent}
                                            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>10%</span>
                                            <span>100%</span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Repayment Period ({months} Months)</label>
                                        <input
                                            type="range"
                                            min="3"
                                            max="10"
                                            value={months}
                                            onChange={(e) => setMonths(Number(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                        />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>3 Months</span>
                                            <span>10 Months</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Interest Rate (Flat %)</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={interestRate}
                                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                                                />
                                                <span className="absolute right-3 top-2 text-gray-400 text-sm">%</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1">Service Charge (%)</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={serviceChargePercent}
                                                    onChange={(e) => setServiceChargePercent(Number(e.target.value))}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                                                />
                                                <span className="absolute right-3 top-2 text-gray-400 text-sm">%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Results */}
                                <div className="bg-green-50 rounded-xl p-8 flex flex-col justify-center space-y-6">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Monthly Repayment</p>
                                        <div className="text-4xl font-bold text-brand-green">
                                            {formatCurrency(results.monthlyPayment)}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">For {months} months</p>
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
                                            <span className="text-gray-600">Interest ({interestRate}%)</span>
                                            <span className="font-medium text-gray-900">{formatCurrency(results.interestAmount)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Service Charge ({serviceChargePercent}%)</span>
                                            <span className="font-medium text-gray-900">{formatCurrency(results.serviceChargeAmount)}</span>
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

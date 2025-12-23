'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FadeIn from './FadeIn';

interface Fee {
    id: string;
    name: string;
    amount: number;
}

export default function LandlordEarningsCalculator() {
    // Inputs
    const [annualRent, setAnnualRent] = useState<string>('1200000');
    const [downPaymentPercent, setDownPaymentPercent] = useState<number>(50);
    const [duration, setDuration] = useState<number>(10);
    const [interestRate, setInterestRate] = useState<number>(3);
    const [fees, setFees] = useState<Fee[]>([]);
    const [newFeeName, setNewFeeName] = useState('');
    const [newFeeAmount, setNewFeeAmount] = useState<string>('0');

    // Outputs
    const [downPaymentAmount, setDownPaymentAmount] = useState(0);
    const [installmentPrincipal, setInstallmentPrincipal] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalInstallmentPaid, setTotalInstallmentPaid] = useState(0);
    const [totalEarningsInstallment, setTotalEarningsInstallment] = useState(0);
    const [totalEarningsUpfront, setTotalEarningsUpfront] = useState(0);
    const [extraEarnings, setExtraEarnings] = useState(0);
    const [extraEarningsPercent, setExtraEarningsPercent] = useState(0);
    const [totalFees, setTotalFees] = useState(0);

    const router = useRouter();

    // Helper: parse string to number safely
    const parseNumber = (val: string) => {
        const num = Number(val.replace(/,/g, ''));
        return isNaN(num) ? 0 : num;
    };

    // Format numbers as currency
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(val);

    // Format input for display with commas
    const formatInput = (val: string) => {
        const num = parseNumber(val);
        return num === 0 ? '' : num.toLocaleString();
    };

    const handleSubmit = () => {
        router.push('/signup')
    }

    // Recalculate whenever inputs change
    useEffect(() => {
        const rent = Math.max(parseNumber(annualRent), 50000);
        const dpPercent = Math.min(Math.max(downPaymentPercent, 30), 70);
        const dur = Math.min(Math.max(duration, 1), 10);
        const rate = Math.min(Math.max(interestRate, 0), 5);

        const dpAmount = rent * (dpPercent / 100);
        setDownPaymentAmount(dpAmount);

        const principal = rent - dpAmount;
        setInstallmentPrincipal(principal);

        // Monthly interest added to principal
        const monthlyPrincipal = principal / dur;
        const monthlyInterest = principal * (rate / 100);
        const monthly = monthlyPrincipal + monthlyInterest;
        setMonthlyPayment(monthly);

        const totalInstallment = monthly * dur;
        setTotalInstallmentPaid(totalInstallment);

        const totalInstallmentEarnings = dpAmount + totalInstallment;
        setTotalEarningsInstallment(totalInstallmentEarnings);

        setTotalEarningsUpfront(rent);

        const extra = totalInstallmentEarnings - rent;
        setExtraEarnings(extra);
        setExtraEarningsPercent((extra / rent) * 100);

        const feesSum = fees.reduce((acc, fee) => acc + fee.amount, 0);
        setTotalFees(feesSum);
    }, [annualRent, downPaymentPercent, duration, interestRate, fees]);

    // Add a new fee
    const addFee = () => {
        const amount = parseNumber(newFeeAmount);
        if (newFeeName && amount > 0) {
            setFees([...fees, { id: Date.now().toString(), name: newFeeName, amount }]);
            setNewFeeName('');
            setNewFeeAmount('0');
        }
    };

    // Remove a fee
    const removeFee = (id: string) => {
        setFees(fees.filter(f => f.id !== id));
    };

    const handleAnnualRentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/,/g, '').replace(/[^0-9]/g, '');
        if (!rawValue) {
            setAnnualRent('');
            return;
        }
        const num = parseInt(rawValue, 10);
        setAnnualRent(num.toLocaleString());
    };


    return (
        <section className="py-20 bg-white" id="calculator">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Landlord Earnings <span className="text-brand-green">Calculator</span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            See how much more you can earn by allowing tenants to pay in installments.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Input Section */}
                    <div className="lg:col-span-5 bg-gray-50 p-8 rounded-2xl border border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Property Details</h3>
                        <div className="space-y-6">
                            {/* Annual Rent */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Rent (₦)</label>
                                <input
                                    type="text"
                                    value={annualRent}
                                    onChange={handleAnnualRentChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent transition-all"
                                />

                            </div>

                            {/* Down Payment */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700">Tenant Down Payment</label>
                                    <span className="text-sm font-bold text-brand-green">{downPaymentPercent}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="30"
                                    max="70"
                                    value={downPaymentPercent}
                                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                />
                            </div>

                            {/* Duration */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700">Installment Duration</label>
                                    <span className="text-sm font-bold text-brand-green">{duration} Months</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                />
                            </div>

                            {/* Interest Rate */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700">Monthly Interest Rate</label>
                                    <span className="text-sm font-bold text-brand-green">{interestRate}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="2"
                                    max="5"
                                    step="0.5"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
                                />
                            </div>

                            {/* Fees */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Other Fees (Paid Upfront)</label>
                                <div className="space-y-3 mb-3">
                                    {fees.map((fee) => (
                                        <div key={fee.id} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-200 text-sm">
                                            <span>{fee.name}</span>
                                            <div className="flex items-center gap-3">
                                                <span className="font-medium">{formatCurrency(fee.amount)}</span>
                                                <button onClick={() => removeFee(fee.id)} className="text-red-500 hover:text-red-700">&times;</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Fee Name (e.g. Legal)"
                                        value={newFeeName}
                                        onChange={(e) => setNewFeeName(e.target.value)}
                                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Amount"
                                        value={newFeeAmount}
                                        onChange={(e) => setNewFeeAmount(e.target.value.replace(/[^0-9,]/g, ''))}
                                        onBlur={() => setNewFeeAmount(formatInput(newFeeAmount))}
                                        className="w-24 px-3 py-2 rounded-lg border border-gray-300 text-sm"
                                    />
                                    <button
                                        onClick={addFee}
                                        className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-800"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Option A & B */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Upfront */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h4 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Option A: Upfront Payment</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Down Payment Received:</span>
                                        <span className="font-medium text-gray-900">{formatCurrency(downPaymentAmount)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Other Fees Received:</span>
                                        <span className="font-medium text-gray-900">{formatCurrency(totalFees)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 pt-2 border-t border-dashed">
                                        <span>Total Received Now:</span>
                                        <span className="font-bold text-gray-900">{formatCurrency(downPaymentAmount + totalFees)}</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Total Earnings from Rent:</span>
                                            <span className="text-xl font-bold text-gray-900">{formatCurrency(totalEarningsUpfront)}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1 text-right">No extra earnings</p>
                                    </div>
                                </div>
                            </div>

                            {/* Installment */}
                            <div className="bg-white p-6 rounded-2xl border border-brand-green/30 shadow-md relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-bl-lg">Recommended</div>
                                <h4 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Option B: Installment Model</h4>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Down Payment Received:</span>
                                        <span className="font-medium text-gray-900">{formatCurrency(downPaymentAmount)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Monthly Installment:</span>
                                        <span className="font-medium text-gray-900">{formatCurrency(monthlyPayment)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Duration:</span>
                                        <span className="font-medium text-gray-900">{duration} Months</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Total Earnings from Rent:</span>
                                            <span className="text-xl font-bold text-brand-green">{formatCurrency(totalEarningsInstallment)}</span>
                                        </div>
                                        <p className="text-xs text-brand-green/80 mt-1 text-right">Includes interest earnings</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Extra Earnings */}
                        <div className="bg-brand-green/10 p-8 rounded-2xl border border-brand-green/20 text-center">
                            <h3 className="text-gray-900 font-medium mb-2">Extra Money You Earn by Choosing Monthly Payments</h3>
                            <div className="text-4xl md:text-5xl font-bold text-brand-green mb-2">{formatCurrency(extraEarnings)}</div>
                            <div className="inline-block bg-white text-brand-green px-3 py-1 rounded-full text-sm font-bold shadow-sm mb-4">+{extraEarningsPercent.toFixed(1)}% Gain</div>
                            <p className="text-gray-600 max-w-lg mx-auto">
                                Landlords who choose monthly payments earn more because tenants pay interest on the remaining balance.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={handleSubmit} className="bg-brand-green text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition-colors shadow-lg shadow-green-200">
                                Register Your Property
                            </button>
                            <button className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-bold hover:border-brand-green hover:text-brand-green transition-colors">
                                Talk to Help2Home Agent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

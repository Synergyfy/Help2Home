'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import FadeIn from '@/components/FadeIn';
import {
    HiOutlineArrowLeft,
    HiOutlineShieldCheck,
    HiOutlineDocumentCheck,
    HiOutlineCurrencyDollar,
    HiOutlineClock,
    HiOutlineCheckCircle
} from 'react-icons/hi2';

// Mock Data
const RENTAL_OPPORTUNITIES = [
    {
        id: 'rent_001',
        propertyLocation: 'Surulere, Lagos',
        expectedROI: 12.5,
        repaymentDuration: 24,
        amountRequired: 25000000,
    },
    {
        id: 'rent_002',
        propertyLocation: 'Ikeja Gra, Lagos',
        expectedROI: 14.0,
        repaymentDuration: 36,
        amountRequired: 40000000,
    }
];

export default function InvestRentalPage() {
    const { id } = useParams();
    const router = useRouter();
    const opportunity = RENTAL_OPPORTUNITIES.find(o => o.id === id) || RENTAL_OPPORTUNITIES[0];

    const amount = opportunity.amountRequired;
    const [agreed, setAgreed] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const expectedEarnings = (amount * (opportunity.expectedROI / 100) * (opportunity.repaymentDuration / 12)).toFixed(2);
    const monthlyEarnings = (parseFloat(expectedEarnings) / opportunity.repaymentDuration).toFixed(2);

    const handleConfirm = () => {
        setIsConfirming(true);
        // Simulate API call
        setTimeout(() => {
            setIsConfirming(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <FadeIn>
                <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-8">
                    <div className="flex justify-center">
                        <div className="p-6 bg-green-100 rounded-full">
                            <HiOutlineCheckCircle className="text-green-600 size-24" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">Investment Confirmed!</h1>
                        <p className="text-gray-500 font-medium">
                            You have successfully invested ₦{amount.toLocaleString()} in the rental financing for {opportunity.propertyLocation}.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link
                            href="/dashboard/investor/portfolio"
                            className="w-full py-4 bg-gray-900 text-white font-semibold rounded-2xl text-sm  hover:bg-black transition-all"
                        >
                            View Portfolio
                        </Link>
                        <Link
                            href="/dashboard/investor/opportunities"
                            className="w-full py-4 bg-gray-100 text-gray-900 font-semibold rounded-2xl text-sm  hover:bg-gray-200 transition-all"
                        >
                            Explore More
                        </Link>
                    </div>
                </div>
            </FadeIn>
        );
    }

    return (
        <FadeIn>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
                {/* Back Button & Header */}
                <div className="space-y-4">
                    <Link
                        href={`/dashboard/investor/opportunities/rental/${id}`}
                        className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest gap-2"
                    >
                        <HiOutlineArrowLeft size={16} />
                        Back to Application
                    </Link>
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Rental Financing Investment</h1>
                        <p className="text-gray-500 mt-1 uppercase text-xs font-semibold tracking-[0.2em]">{opportunity.propertyLocation}</p>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-10">
                    
                    {/* 1. Investment Amount */}
                    <div className="p-8 bg-blue-600 rounded-[2rem] text-white shadow-xl shadow-blue-600/20 relative overflow-hidden group">
                        <HiOutlineCurrencyDollar className="absolute right-[-10px] bottom-[-10px] size-32 text-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                        <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">Total Financing Required</p>
                        <h3 className="text-5xl font-semibold tracking-tighter">₦{amount.toLocaleString()}</h3>
                        <p className="text-white/80 text-sm mt-4 font-medium max-w-sm">
                            As a single-investor opportunity, you will fund the full rental amount for this verified tenant.
                        </p>
                    </div>

                    {/* 2. Projections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
                            <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest mb-1">Expected Monthly</p>
                            <p className="text-xl font-semibold text-blue-900 ">₦{Number(monthlyEarnings).toLocaleString()}</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Total Returns</p>
                            <p className="text-xl font-semibold text-gray-900 ">₦{Number(expectedEarnings).toLocaleString()}</p>
                        </div>
                        <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Duration</p>
                            <p className="text-xl font-semibold text-gray-900 ">{opportunity.repaymentDuration} Months</p>
                        </div>
                    </div>

                    {/* 3. Agreement */}
                    <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-white rounded-lg border border-gray-200">
                                <HiOutlineDocumentCheck size={20} className="text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-tight">Rental Financing Agreement</h3>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed mt-1">
                                    By proceeding, you agree to fund the tenant's rental installments under the Help2Home Auto-Repayment model. 
                                    Funds will be auto-deducted from the tenant's verified account and distributed according to the waterfall schedule.
                                </p>
                            </div>
                        </div>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                checked={agreed} 
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="w-5 h-5 rounded-md border-2 border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer" 
                            />
                            <span className="text-xs font-semibold text-gray-900 uppercase tracking-widest group-hover:text-blue-600 transition-colors">I accept the investment terms & risk disclosures</span>
                        </label>
                    </div>

                    {/* 4. Action */}
                    <button 
                        disabled={!agreed || amount <= 0 || isConfirming}
                        onClick={handleConfirm}
                        className={`w-full py-6 rounded-[2rem] text-sm font-semibold uppercase tracking-[0.2em]  flex items-center justify-center gap-2 transition-all ${
                            agreed && amount > 0 && !isConfirming
                            ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 hover:bg-blue-700'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        {isConfirming ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing Investment...
                            </span>
                        ) : (
                            <>
                                Confirm Investment
                                <HiOutlineShieldCheck size={18} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </FadeIn>
    );
}

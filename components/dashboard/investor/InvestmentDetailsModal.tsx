'use client';

import React, { useState } from 'react';
import { MdClose, MdCheckCircle, MdTrendingUp, MdSchedule, MdSecurity } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import RepaymentTimeline from '@/components/dashboard/developer/investments/RepaymentTimeline';

interface InvestmentDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    property: any; // Using any for now to be flexible with property object structure
}

export default function InvestmentDetailsModal({ isOpen, onClose, property }: InvestmentDetailsModalProps) {
    const [step, setStep] = useState<'details' | 'confirm' | 'success'>('details');
    const [amount, setAmount] = useState<number>(property?.investmentTerms?.minInvestment || 1000000);
    const [agreed, setAgreed] = useState(false);

    if (!isOpen || !property) return null;

    const terms = property.investmentTerms || {};
    const roi = terms.roi || 20;
    const duration = terms.duration || 12;

    const projectedReturn = amount + (amount * (roi / 100));

    const handleInvest = () => {
        // Mock API call
        setTimeout(() => {
            setStep('success');
            toast.success(`Successfully invested ₦${amount.toLocaleString()}!`);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4"
                    >
                        <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl pointer-events-auto flex flex-col">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 line-clamp-1">{property.title}</h2>
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        Listed by <span className="font-medium text-brand-green">Zenith Developments</span>
                                    </p>
                                </div>
                                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <MdClose size={24} className="text-gray-500" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8 space-y-8">
                                {step === 'details' && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-right duration-300">
                                        {/* Key Stats */}
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="p-4 bg-green-50 rounded-2xl border border-green-100 text-center">
                                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">ROI</p>
                                                <p className="text-xl md:text-2xl font-bold text-brand-green">{terms.expectedReturn || `${roi}%`}</p>
                                            </div>
                                            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Duration</p>
                                                <p className="text-xl md:text-2xl font-bold text-blue-600">{terms.timeline || `${duration} M`}</p>
                                            </div>
                                            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-center">
                                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Risk</p>
                                                <p className="text-xl md:text-2xl font-bold text-purple-600 capitalize">{terms.riskLevel || 'Medium'}</p>
                                            </div>
                                        </div>

                                        {/* Investment Calculator Input */}
                                        <div>
                                            <label className="block text-sm font-bold text-gray-900 mb-3">How much do you want to invest?</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</span>
                                                <input
                                                    type="number"
                                                    value={amount}
                                                    onChange={(e) => setAmount(Number(e.target.value))}
                                                    min={terms.minInvestment || 100000}
                                                    className="w-full pl-10 pr-4 py-4 text-xl font-bold rounded-xl border border-gray-200 focus:border-brand-green outline-none transition-all"
                                                />
                                            </div>
                                            <div className="mt-3 flex justify-between text-xs font-bold text-gray-500">
                                                <span>Min: ₦{(terms.minInvestment || 100000).toLocaleString()}</span>
                                                <span className="text-brand-green">Projected Return: ₦{projectedReturn.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        {/* Timeline */}
                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                            <h4 className="text-sm font-bold text-gray-900 mb-6 flex items-center gap-2">
                                                <MdSchedule className="text-gray-400" />
                                                Repayment Schedule
                                            </h4>
                                            <RepaymentTimeline duration={duration} frequency={terms.roiFrequency || 'annually'} />
                                        </div>

                                        <button
                                            onClick={() => setStep('confirm')}
                                            className="w-full py-4 bg-brand-green text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-900/10 flex items-center justify-center gap-2"
                                        >
                                            Review Investment <MdTrendingUp />
                                        </button>
                                    </div>
                                )}

                                {step === 'confirm' && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
                                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex gap-3">
                                            <MdSecurity className="text-yellow-600 shrink-0 mt-1" size={20} />
                                            <div>
                                                <h4 className="text-sm font-bold text-yellow-800">Secure Transaction</h4>
                                                <p className="text-xs text-yellow-700 mt-1">Funds are held in escrow until the developer meets the verification criteria for this tranche.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between py-3 border-b border-gray-100">
                                                <span className="text-gray-500">Principal Amount</span>
                                                <span className="font-bold text-gray-900">₦{amount.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between py-3 border-b border-gray-100">
                                                <span className="text-gray-500">Interest Rate</span>
                                                <span className="font-bold text-brand-green">{roi}%</span>
                                            </div>
                                            <div className="flex justify-between py-3 border-b border-gray-100">
                                                <span className="text-gray-500">Maturity Date</span>
                                                <span className="font-bold text-gray-900">{new Date(new Date().setMonth(new Date().getMonth() + duration)).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between py-3 border-b border-gray-100">
                                                <span className="text-gray-500">Total Payout</span>
                                                <span className="font-extrabold text-xl text-brand-green">₦{projectedReturn.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={agreed}
                                                onChange={(e) => setAgreed(e.target.checked)}
                                                className="mt-1 w-4 h-4 text-brand-green rounded border-gray-300 focus:ring-brand-green"
                                            />
                                            <span className="text-xs text-gray-600">
                                                I agree to the <b className="text-gray-900">Investment Terms & Conditions</b> and understand that capital is at risk. I confirm this is my decision.
                                            </span>
                                        </label>

                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setStep('details')}
                                                className="flex-1 py-3 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                Back
                                            </button>
                                            <button
                                                onClick={handleInvest}
                                                disabled={!agreed}
                                                className="flex-2 py-3 bg-[#111811] text-white font-bold rounded-xl hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Confirm Investment
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {step === 'success' && (
                                    <div className="text-center py-8 animate-in zoom-in duration-300">
                                        <div className="size-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <MdCheckCircle size={48} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Investment Confirmed!</h3>
                                        <p className="text-gray-500 max-w-sm mx-auto mb-8">
                                            You have successfully invested ₦{amount.toLocaleString()} in {property.title}. You can track this in your portfolio.
                                        </p>
                                        <button
                                            onClick={onClose}
                                            className="px-8 py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
                                        >
                                            Go to My Portfolio
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

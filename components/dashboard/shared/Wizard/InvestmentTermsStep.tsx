'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { PropertySchema } from '@/lib/validations/propertySchema';
import { MdMonetizationOn, MdTrendingUp, MdInfo } from 'react-icons/md';

interface InvestmentTermsStepProps {
    navigation?: {
        onNext: () => void;
        onBack: () => void;
        isPending: boolean;
        isFirstStep: boolean;
        isLastStep: boolean;
        submitLabel: string;
    };
}

export default function InvestmentTermsStep({ navigation }: InvestmentTermsStepProps) {
    const { register, watch, setValue, formState: { errors } } = useFormContext<PropertySchema>();

    // Watch enabled state to toggle fields
    const isInvestmentEnabled = watch("investmentTerms.enabled");

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg shrink-0">
                    <MdMonetizationOn size={24} />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">Open for Investment?</h3>
                    <p className="text-gray-600 text-sm mb-3">Enable this if you are seeking investors for this project. This will display investment metrics prominently.</p>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${isInvestmentEnabled ? 'bg-brand-green' : 'bg-gray-300'}`}>
                            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${isInvestmentEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            {...register("investmentTerms.enabled")}
                        />
                        <span className="font-bold text-sm text-gray-700">{isInvestmentEnabled ? 'Investment Enabled' : 'Not Looking for Investors'}</span>
                    </label>
                </div>
            </div>

            {isInvestmentEnabled && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Investment</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</span>
                                <input
                                    type="number"
                                    {...register("investmentTerms.minInvestment")}
                                    placeholder="0.00"
                                    className="w-full p-4 pl-10 rounded-xl border-2 border-gray-100 focus:border-brand-green outline-none font-medium"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Maximum Investment (Cap)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</span>
                                <input
                                    type="number"
                                    {...register("investmentTerms.maxInvestment")}
                                    placeholder="0.00"
                                    className="w-full p-4 pl-10 rounded-xl border-2 border-gray-100 focus:border-brand-green outline-none font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Expected ROI (%)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    {...register("investmentTerms.roi")}
                                    placeholder="e.g. 15"
                                    className="w-full p-4 pr-12 rounded-xl border-2 border-gray-100 focus:border-brand-green outline-none font-medium"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">%</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Payout Frequency</label>
                            <select
                                {...register("investmentTerms.roiFrequency")}
                                className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-brand-green outline-none bg-white font-medium"
                            >
                                <option value="annually">Annually</option>
                                <option value="quarterly">Quarterly</option>
                                <option value="monthly">Monthly</option>
                                <option value="end-of-term">End of Term (Maturity)</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Investment Duration (Months)</label>
                        <input
                            type="number"
                            {...register("investmentTerms.duration")}
                            placeholder="e.g. 12 or 24"
                            className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-brand-green outline-none font-medium"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Repayment Plan Description</label>
                        <textarea
                            {...register("investmentTerms.repaymentSchedule")}
                            placeholder="Explain how investors will be paid back (e.g. from rental income, sales proceeds, etc.)"
                            className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-brand-green outline-none font-medium h-32 resize-none"
                        />
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-xl flex gap-3 items-start text-yellow-800 text-sm">
                        <MdInfo className="mt-0.5 shrink-0" size={18} />
                        <p>
                            <strong>Important:</strong> All investment terms are subject to verification by our legal team before the project can publicly accept funds.
                        </p>

                    </div>
                </div>
            )}

            {/* IN-PAGE NAVIGATION BUTTONS */}
            {navigation && (
                <div className="flex items-center justify-between pt-12 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={navigation.onBack}
                        disabled={navigation.isFirstStep}
                        className={`px-8 py-4 rounded-2xl font-black text-sm transition-all active:scale-95 ${
                            navigation.isFirstStep 
                            ? 'opacity-0 pointer-events-none' 
                            : 'text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100'
                        }`}
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        onClick={navigation.onNext}
                        disabled={navigation.isPending}
                        className="px-12 py-4 bg-brand-green text-white rounded-2xl font-black text-sm hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 active:scale-95 disabled:opacity-50"
                    >
                        {navigation.isPending ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            navigation.isLastStep ? navigation.submitLabel : 'Continue'
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}

'use client';

import React from 'react';
import { 
    HiOutlineShieldCheck, 
    HiOutlineCreditCard, 
    HiOutlineChartBar,
    HiOutlineInformationCircle
} from 'react-icons/hi2';

interface MarketplaceConsentProps {
    hasMarketplaceConsent: boolean;
    hasDirectDebitAuth: boolean;
    onConsentChange: (field: string, value: boolean) => void;
}

export default function MarketplaceConsent({ 
    hasMarketplaceConsent, 
    hasDirectDebitAuth, 
    onConsentChange 
}: MarketplaceConsentProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 space-y-8">
            <div className="flex items-center gap-4 mb-2">
                <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <HiOutlineChartBar size={28} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Marketplace & Repayment</h3>
                    <p className="text-sm text-gray-500">Enable investor backing and automated repayments.</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Marketplace Consent */}
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-all">
                    <div className="flex items-start gap-4">
                        <div className="pt-1">
                            <input
                                type="checkbox"
                                id="marketplaceConsent"
                                checked={hasMarketplaceConsent}
                                onChange={(e) => onConsentChange('hasMarketplaceConsent', e.target.checked)}
                                className="size-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="marketplaceConsent" className="block font-bold text-gray-900 cursor-pointer">
                                List my application on the Help2Home Marketplace
                            </label>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                By enabling this, your application (anonymized) will be shown to verified investors who can fund your rent. 
                                <span className="font-semibold text-blue-600 ml-1 flex items-center gap-1">
                                    <HiOutlineShieldCheck size={14} /> Identity is always protected.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Direct Debit Authorization */}
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-brand-green/20 transition-all">
                    <div className="flex items-start gap-4">
                        <div className="pt-1">
                            <input
                                type="checkbox"
                                id="directDebitAuth"
                                checked={hasDirectDebitAuth}
                                onChange={(e) => onConsentChange('hasDirectDebitAuth', e.target.checked)}
                                className="size-5 rounded border-gray-300 text-brand-green focus:ring-brand-green cursor-pointer"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="directDebitAuth" className="block font-bold text-gray-900 cursor-pointer flex items-center gap-2">
                                Authorize Direct Debit Mandate
                                <span className="text-[10px] bg-brand-green/10 text-brand-green px-2 py-0.5 rounded-full uppercase tracking-tighter">Required for Funding</span>
                            </label>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                You agree to set up an automated monthly deduction for your rent installments. This ensures your rent is always paid on time and builds your credit score.
                            </p>
                            
                            {hasDirectDebitAuth && (
                                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <button 
                                        type="button"
                                        className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                                    >
                                        <HiOutlineCreditCard size={20} className="text-gray-400" />
                                        Link Repayment Account
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                <HiOutlineInformationCircle size={20} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[10px] text-blue-800 leading-relaxed font-medium">
                    Investors are more likely to fund applications with a 100% completed profile and an authorized direct debit mandate.
                </p>
            </div>
        </div>
    );
}

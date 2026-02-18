'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BankDetailsModal from '@/components/dashboard/landlord/payments/BankDetailsModal';
import { MOCK_PAYOUT_SETTINGS, PayoutSettings } from '@/lib/mockPaymentData';

export default function PayoutSettingsPage() {
    const [settings, setSettings] = useState<PayoutSettings>(MOCK_PAYOUT_SETTINGS);
    const [isBankModalOpen, setIsBankModalOpen] = useState(false);
    const [isSecurityPromptOpen, setIsSecurityPromptOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<string | null>(null);

    const handleFrequencyChange = (freq: 'Instant' | 'Weekly' | 'Monthly') => {
        setPendingAction(`Change payout frequency to ${freq}`);
        setIsSecurityPromptOpen(true);
    };

    const handleSecurityConfirm = () => {
        // Simulate security check success
        if (pendingAction?.includes('frequency')) {
            const newFreq = pendingAction.split('to ')[1] as PayoutSettings['frequency'];
            setSettings({ ...settings, frequency: newFreq });
        }
        setIsSecurityPromptOpen(false);
        setPendingAction(null);
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-8">
                <Link href="/dashboard/landlord/payments" className="text-gray-500 hover:text-gray-700 text-sm mb-2 inline-block">
                    ← Back to Payments
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Payout Settings</h1>
                <p className="text-gray-500">Manage how and when you receive your money.</p>
                <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Sensitive changes require re-authentication
                </div>
            </div>

            <div className="space-y-8">
                {/* Bank Accounts */}
                <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Bank Accounts</h2>
                            <p className="text-gray-500 text-sm mt-1">Manage your connected accounts for payouts.</p>
                        </div>
                        <button
                            onClick={() => setIsBankModalOpen(true)}
                            className="px-4 py-2 bg-[#00853E] text-white rounded-lg hover:bg-green-700 font-medium transition-colors text-sm flex items-center gap-2 shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Account
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {settings.bankAccounts.map(account => (
                            <div key={account.id} className={`relative p-6 rounded-2xl border-2 transition-all duration-200 group ${account.isPrimary ? 'border-[#00853E] bg-green-50/30' : 'border-gray-100 hover:border-gray-300 bg-white'
                                }`}>
                                {account.isPrimary && (
                                    <div className="absolute top-4 right-4">
                                        <span className="px-2.5 py-1 bg-[#00853E] text-white text-xs rounded-full font-medium shadow-sm">Primary</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-sm ${account.bankName.includes('GT') ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        {account.bankName.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 text-lg">{account.bankName}</div>
                                        <div className="text-sm text-gray-500 font-mono">•••• {account.bvnLast4}</div>
                                    </div>
                                </div>

                                <div className="space-y-1 mb-6">
                                    <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Account Holder</div>
                                    <div className="font-medium text-gray-900">{account.accountName}</div>
                                </div>

                                <div className="flex gap-3 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {!account.isPrimary && (
                                        <button className="text-sm text-[#00853E] font-medium hover:underline">Set as Primary</button>
                                    )}
                                    <button className="text-sm text-red-600 font-medium hover:underline ml-auto">Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Payout Frequency */}
                <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-gray-900">Payout Frequency</h2>
                        <p className="text-gray-500 text-sm mt-1">Choose how often you want to receive your funds.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                id: 'Instant',
                                label: 'Instant Payout',
                                desc: 'Get funds immediately',
                                fee: '1% Fee',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )
                            },
                            {
                                id: 'Weekly',
                                label: 'Weekly',
                                desc: 'Every Friday',
                                fee: 'Free',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )
                            },
                            {
                                id: 'Monthly',
                                label: 'Monthly',
                                desc: '1st of the month',
                                fee: 'Free',
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            }
                        ].map((option) => (
                            <label key={option.id} className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${settings.frequency === option.id
                                ? 'border-[#00853E] bg-green-50/30 ring-1 ring-[#00853E]'
                                : 'border-gray-100 hover:border-gray-300 bg-white'
                                }`}>
                                <input
                                    type="radio"
                                    name="frequency"
                                    className="hidden"
                                    checked={settings.frequency === option.id}
                                    onChange={() => handleFrequencyChange(option.id as any)}
                                />
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${settings.frequency === option.id ? 'bg-[#00853E] text-white' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    {option.icon}
                                </div>
                                <div className="font-bold text-gray-900 text-lg mb-1">{option.label}</div>
                                <div className="text-sm text-gray-500 mb-4">{option.desc}</div>
                                <div className={`inline-block px-2 py-1 rounded text-xs font-bold ${option.fee === 'Free' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {option.fee}
                                </div>

                                {settings.frequency === option.id && (
                                    <div className="absolute top-4 right-4 text-[#00853E]">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </label>
                        ))}
                    </div>
                </section>

                {/* Fees Review */}
                <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Fee Structure</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Platform Commission</div>
                            <div className="text-xl font-bold text-gray-900">5%</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Processing Fee</div>
                            <div className="text-xl font-bold text-gray-900">1.5% + ₦100</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Instant Payout Fee</div>
                            <div className="text-xl font-bold text-gray-900">1%</div>
                        </div>
                    </div>
                </section>
            </div>

            <BankDetailsModal
                isOpen={isBankModalOpen}
                onClose={() => setIsBankModalOpen(false)}
                onSave={(details) => {
                    // Mock save
                    console.log('Saved', details);
                }}
            />

            {/* Security Prompt Mock */}
            {isSecurityPromptOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSecurityPromptOpen(false)}></div>
                    <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Security Check</h3>
                        <p className="text-gray-600 text-sm mb-6">
                            Please enter your PIN to confirm: <br />
                            <span className="font-medium text-gray-900">{pendingAction}</span>
                        </p>
                        <input
                            type="password"
                            className="w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                            placeholder="••••"
                            maxLength={4}
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsSecurityPromptOpen(false)}
                                className="flex-1 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSecurityConfirm}
                                className="flex-1 py-2 bg-[#00853E] text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

'use client';

import React from 'react';
import { BankAccount, PaymentMethod } from './types';

interface PaymentsSectionProps {
    bankAccounts: BankAccount[];
    paymentMethods: PaymentMethod[];
    onUnlinkBank: (id: string) => void;
    onRemoveCard: (id: string) => void;
}

export default function PaymentsSection({ bankAccounts, paymentMethods, onUnlinkBank, onRemoveCard }: PaymentsSectionProps) {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Payments & Bank Accounts</h2>
                <p className="text-sm text-gray-500">Manage your linked accounts and payment methods.</p>
            </div>

            {/* Linked Bank Accounts */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">Linked Bank Accounts</h3>
                    <button className="text-sm font-medium text-[#00853E] hover:underline">
                        + Add Bank Account
                    </button>
                </div>

                <div className="space-y-4">
                    {bankAccounts.map((account) => (
                        <div key={account.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg bg-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{account.bankName}</p>
                                    <p className="text-sm text-gray-500">{account.accountNumberMasked}</p>
                                </div>
                                {account.isPrimary && (
                                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Primary</span>
                                )}
                            </div>
                            <button
                                onClick={() => onUnlinkBank(account.id)}
                                className="text-sm text-red-600 hover:text-red-800 font-medium"
                            >
                                Unlink
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">Saved Payment Methods</h3>
                    <button className="text-sm font-medium text-[#00853E] hover:underline">
                        + Add New Card
                    </button>
                </div>

                <div className="space-y-4">
                    {paymentMethods.map((method) => (
                        <div key={method.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg bg-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 capitalize">{method.brand} ending in {method.last4}</p>
                                    <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                                </div>
                                {method.isDefault && (
                                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">Default</span>
                                )}
                            </div>
                            <button
                                onClick={() => onRemoveCard(method.id)}
                                className="text-sm text-red-600 hover:text-red-800 font-medium"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

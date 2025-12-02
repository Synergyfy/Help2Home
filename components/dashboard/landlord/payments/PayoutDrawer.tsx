'use client';

import React from 'react';
import { PayoutTransaction } from '@/lib/mockPaymentData';

interface PayoutDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    payout: PayoutTransaction | null;
}

export default function PayoutDrawer({ isOpen, onClose, payout }: PayoutDrawerProps) {
    if (!isOpen || !payout) return null;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString('en-NG', {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900">Payout Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Summary */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center">
                        <p className="text-sm text-gray-500 mb-1">Amount Sent</p>
                        <div className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(payout.amount)}</div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${payout.status === 'Success' ? 'bg-green-100 text-green-800' :
                                payout.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                    'bg-red-100 text-red-800'
                            }`}>
                            {payout.status}
                        </span>
                    </div>

                    {/* Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Payout Info</h3>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500">Date Initiated</span>
                            <span className="text-gray-900 font-medium text-right">{formatDate(payout.date)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500">Reference ID</span>
                            <span className="text-gray-900 font-medium font-mono">{payout.referenceId}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500">Method</span>
                            <span className="text-gray-900 font-medium">{payout.method}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500">Destination</span>
                            <div className="text-right">
                                <div className="text-gray-900 font-medium">{payout.destinationAccount.bankName}</div>
                                <div className="text-xs text-gray-500">{payout.destinationAccount.accountNumber}</div>
                            </div>
                        </div>
                    </div>

                    {/* Deductions if any */}
                    {payout.deductions.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Deductions</h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                {payout.deductions.map((d, i) => (
                                    <div key={i} className="flex justify-between text-sm text-red-600">
                                        <span>{d.label}</span>
                                        <span>-{formatCurrency(d.amount)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Included Payments */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Included Payments</h3>
                        <div className="text-sm text-gray-500">
                            This payout includes {payout.includedPayments.length} rent payment(s).
                        </div>
                        {/* In a real app, list the payments here */}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                    <button className="w-full py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                        Download Ledger (CSV)
                    </button>
                </div>
            </div>
        </div>
    );
}

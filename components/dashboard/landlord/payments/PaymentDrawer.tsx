'use client';

import React from 'react';
import { PaymentTransaction } from '@/lib/mockPaymentData';

interface PaymentDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    payment: PaymentTransaction | null;
}

export default function PaymentDrawer({ isOpen, onClose, payment }: PaymentDrawerProps) {
    if (!isOpen || !payment) return null;

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
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Summary Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center">
                        <p className="text-sm text-gray-500 mb-1">Total Paid</p>
                        <div className="text-3xl font-bold text-gray-900 mb-2">{formatCurrency(payment.amount)}</div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${payment.status === 'Cleared' ? 'bg-green-100 text-green-800' :
                                payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                            }`}>
                            {payment.status}
                        </span>
                    </div>

                    {/* Details List */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Transaction Info</h3>

                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500">Date</span>
                            <span className="text-gray-900 font-medium text-right">{formatDate(payment.date)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500">Reference ID</span>
                            <span className="text-gray-900 font-medium font-mono">{payment.referenceId}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500">Payment Method</span>
                            <span className="text-gray-900 font-medium">{payment.method}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500">Tenant</span>
                            <div className="text-right">
                                <div className="text-gray-900 font-medium">{payment.tenant.name}</div>
                                <div className="text-xs text-gray-500">{payment.tenant.email}</div>
                            </div>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500">Property</span>
                            <span className="text-gray-900 font-medium text-right max-w-[200px] truncate">{payment.property.name}</span>
                        </div>
                    </div>

                    {/* Financial Breakdown */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Financial Breakdown</h3>

                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Gross Amount</span>
                                <span className="text-gray-900 font-medium">{formatCurrency(payment.amount)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-red-600">
                                <span>Platform Fee</span>
                                <span>-{formatCurrency(payment.fees.platformFee)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-red-600">
                                <span>Processing Fee</span>
                                <span>-{formatCurrency(payment.fees.processingFee)}</span>
                            </div>
                            {payment.fees.commission && (
                                <div className="flex justify-between text-sm text-red-600">
                                    <span>Commission</span>
                                    <span>-{formatCurrency(payment.fees.commission)}</span>
                                </div>
                            )}
                            <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                                <span className="text-gray-900 font-bold">Net Payout</span>
                                <span className="text-[#00853E] font-bold text-lg">{formatCurrency(payment.netAmount)}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Payout Status: <span className="font-medium text-blue-700">{payment.payoutStatus}</span></span>
                        </div>
                    </div>

                    {/* Contract Link */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">Associated Contract</h3>
                        <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer transition-colors">
                            <div>
                                <div className="font-medium text-gray-900">{payment.contract.name}</div>
                                <div className="text-xs text-gray-500">{payment.contract.startDate} — {payment.contract.endDate}</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-3">
                    <button className="w-full py-2.5 bg-[#00853E] text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex justify-center items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Receipt (PDF)
                    </button>
                    <button className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors">
                        Print Receipt
                    </button>
                </div>
            </div>
        </div>
    );
}

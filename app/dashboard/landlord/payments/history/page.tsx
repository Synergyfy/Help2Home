'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PayoutDrawer from '@/components/dashboard/landlord/payments/PayoutDrawer';
import { MOCK_PAYOUTS, PayoutTransaction } from '@/lib/mockPaymentData';

export default function PayoutHistoryPage() {
    const [selectedPayout, setSelectedPayout] = useState<PayoutTransaction | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handlePayoutClick = (payout: PayoutTransaction) => {
        setSelectedPayout(payout);
        setIsDrawerOpen(true);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="pb-20">
            <div className="mb-8">
                <Link href="/dashboard/landlord/payments" className="text-gray-500 hover:text-gray-700 text-sm mb-2 inline-block">
                    ← Back to Payments
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Payout History</h1>
                        <p className="text-gray-500">View your past withdrawals and settlements.</p>
                    </div>
                    <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors shadow-sm flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Total Payouts (YTD)</div>
                    <div className="text-2xl font-bold text-gray-900">₦4,250,000</div>
                    <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 8.586 14.586 5H12z" clipRule="evenodd" />
                        </svg>
                        +12% vs last year
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Last Payout</div>
                    <div className="text-2xl font-bold text-gray-900">₦850,000</div>
                    <div className="text-xs text-gray-400 mt-1">Processed on Oct 28, 2024</div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">Next Scheduled</div>
                    <div className="text-2xl font-bold text-gray-900">Nov 04, 2024</div>
                    <div className="text-xs text-gray-400 mt-1">Weekly Schedule</div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-5 font-semibold text-gray-600 uppercase tracking-wider text-xs">Date Initiated</th>
                                <th className="px-6 py-5 font-semibold text-gray-600 uppercase tracking-wider text-xs">Reference ID</th>
                                <th className="px-6 py-5 font-semibold text-gray-600 uppercase tracking-wider text-xs">Amount</th>
                                <th className="px-6 py-5 font-semibold text-gray-600 uppercase tracking-wider text-xs">Destination</th>
                                <th className="px-6 py-5 font-semibold text-gray-600 uppercase tracking-wider text-xs">Status</th>
                                <th className="px-6 py-5 font-semibold text-gray-600 uppercase tracking-wider text-xs"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {MOCK_PAYOUTS.map((payout) => (
                                <tr
                                    key={payout.id}
                                    onClick={() => handlePayoutClick(payout)}
                                    className="hover:bg-green-50/30 cursor-pointer transition-all duration-200 group"
                                >
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{formatDate(payout.date)}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">{new Date(payout.date).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}</div>
                                    </td>
                                    <td className="px-6 py-5 font-mono text-xs text-gray-500">
                                        {payout.referenceId}
                                    </td>
                                    <td className="px-6 py-5 font-bold text-gray-900">
                                        {formatCurrency(payout.amount)}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                                {payout.destinationAccount.bankName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{payout.destinationAccount.bankName}</div>
                                                <div className="text-xs text-gray-400">•••• {payout.destinationAccount.accountNumber.slice(-4)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${payout.status === 'Success' ? 'bg-green-50 text-green-700 border-green-100' :
                                                payout.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    'bg-red-50 text-red-700 border-red-100'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${payout.status === 'Success' ? 'bg-green-500' :
                                                    payout.status === 'Processing' ? 'bg-blue-500' :
                                                        'bg-red-500'
                                                }`}></span>
                                            {payout.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 group-hover:text-[#00853E] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Mock */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <span className="text-sm text-gray-500">Showing <span className="font-medium text-gray-900">{MOCK_PAYOUTS.length}</span> results</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm" disabled>Previous</button>
                        <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm" disabled>Next</button>
                    </div>
                </div>
            </div>

            <PayoutDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                payout={selectedPayout}
            />
        </div>
    );
}

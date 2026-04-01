'use client';

import React from 'react';
import { PaymentTransaction } from '@/lib/mockPaymentData';

interface PaymentsTableProps {
    payments: PaymentTransaction[];
    onPaymentClick: (payment: PaymentTransaction) => void;
}

export default function PaymentsTable({ payments, onPaymentClick }: PaymentsTableProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(amount);
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50/50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-5 font-semibold text-gray-600 uppercase tracking-wider text-xs">Date Paid</th>
                            <th className="px-6 py-5 font-semibold text-gray-600 uppercase tracking-wider text-xs">Property</th>
                            <th className="px-6 py-5 font-semibold text-gray-600 uppercase tracking-wider text-xs">Tenant</th>
                            <th className="px-6 py-5 font-semibold text-gray-600 uppercase tracking-wider text-xs">Amount</th>
                            <th className="px-6 py-5 font-semibold text-gray-600 uppercase tracking-wider text-xs">Method</th>
                            <th className="px-6 py-5 font-semibold text-gray-600 uppercase tracking-wider text-xs">Status</th>
                            <th className="px-6 py-5 font-semibold text-gray-600 uppercase tracking-wider text-xs"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {payments.length > 0 ? (
                            payments.map((payment) => (
                                <tr
                                    key={payment.id}
                                    onClick={() => onPaymentClick(payment)}
                                    className="hover:bg-green-50/30 cursor-pointer transition-all duration-200 group"
                                >
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{formatDate(payment.date)}</div>
                                        <div className="text-xs text-gray-400 mt-0.5">{new Date(payment.date).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="font-medium text-gray-900">{payment.property.name}</div>
                                        <div className="text-xs text-gray-500 truncate max-w-[180px] mt-0.5">{payment.property.address}</div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 border border-gray-200 shadow-sm">
                                                {payment.tenant.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{payment.tenant.name}</div>
                                                <div className="text-xs text-gray-400">{payment.tenant.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 font-bold text-gray-900">
                                        {formatCurrency(payment.amount)}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            {payment.method === 'Bank Transfer' && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                                </svg>
                                            )}
                                            {payment.method === 'Debit Card' && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                </svg>
                                            )}
                                            {payment.method}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${payment.status === 'Cleared' ? 'bg-green-50 text-green-700 border-green-100' :
                                                payment.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                                    'bg-red-50 text-red-700 border-red-100'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${payment.status === 'Cleared' ? 'bg-green-500' :
                                                    payment.status === 'Pending' ? 'bg-yellow-500' :
                                                        'bg-red-500'
                                                }`}></span>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 group-hover:text-[#00853E] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="px-6 py-16 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <p className="font-medium text-gray-900">No payments found</p>
                                        <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search query.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Mock */}
            <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
                <span className="text-sm text-gray-500">Showing <span className="font-medium text-gray-900">{payments.length}</span> results</span>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm" disabled>Previous</button>
                    <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm" disabled>Next</button>
                </div>
            </div>
        </div>
    );
}

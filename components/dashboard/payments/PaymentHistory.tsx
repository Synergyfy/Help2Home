'use client';

import React from 'react';
import { PaymentHistoryItem } from './types';

interface PaymentHistoryProps {
    history: PaymentHistoryItem[];
    onDownloadReceipt: (id: string) => void;
}

export default function PaymentHistory({ history, onDownloadReceipt }: PaymentHistoryProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Payment History</h2>

            {history.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p>No payments made yet. Payments will appear here once you start your repayment journey.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center
                                    ${item.status === 'Success' ? 'bg-green-100 text-green-600' :
                                        item.status === 'Failed' ? 'bg-red-100 text-red-600' :
                                            'bg-yellow-100 text-yellow-600'}`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {item.status === 'Success' ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        ) : item.status === 'Failed' ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        )}
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{item.type}</p>
                                    <p className="text-sm text-gray-500">{item.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900">₦{item.amount.toLocaleString()}</p>
                                <button
                                    onClick={() => onDownloadReceipt(item.id)}
                                    className="text-xs text-[#6D28D9] font-medium hover:underline mt-1 flex items-center justify-end gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Receipt
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

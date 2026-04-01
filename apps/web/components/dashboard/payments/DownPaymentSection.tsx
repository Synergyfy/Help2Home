'use client';

import React from 'react';
import { DownPaymentDetails } from './types';

interface DownPaymentSectionProps {
    details: DownPaymentDetails;
    onPay: () => void;
    onViewApplication: () => void;
}

export default function DownPaymentSection({ details, onPay, onViewApplication }: DownPaymentSectionProps) {
    if (details.isPaid) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Down Payment Required</h2>
                    <p className="text-gray-500 text-sm mt-1">Please complete your down payment to finalize your application.</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">Amount Due</p>
                    <p className="text-2xl font-bold text-[#6D28D9]">₦{details.amount.toLocaleString()}</p>
                    <p className="text-xs text-red-500 font-medium">Due by {details.dueDate}</p>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Payment Breakdown</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Property Rent Amount</span>
                        <span className="font-medium">₦{details.rentAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Required Down Payment ({details.percentage}%)</span>
                        <span className="font-medium">₦{(details.rentAmount * (details.percentage / 100)).toLocaleString()}</span>
                    </div>
                    {details.serviceFees > 0 && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Service Fees</span>
                            <span className="font-medium">₦{details.serviceFees.toLocaleString()}</span>
                        </div>
                    )}
                    <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
                        <span>Total Due</span>
                        <span>₦{details.amount.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onPay}
                    className="flex-1 bg-[#6D28D9] text-white py-3 px-4 rounded-lg font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-100"
                >
                    Pay Down Payment
                </button>
                <button
                    onClick={onViewApplication}
                    className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                    View Application
                </button>
            </div>
        </div>
    );
}

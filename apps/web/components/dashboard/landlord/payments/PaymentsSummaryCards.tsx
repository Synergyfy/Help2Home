'use client';

import React from 'react';
import { formatNumber } from '@/utils/helpers';
import { PaymentTransaction } from '@/lib/api/payments';

interface PaymentsSummaryCardsProps {
    payments: PaymentTransaction[];
}

export default function PaymentsSummaryCards({ payments }: PaymentsSummaryCardsProps) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const revenueThisMonth = payments
        .filter(p => (p.status === 'Completed' || p.status === 'Cleared') && new Date(p.date) >= startOfMonth)
        .reduce((sum, p) => sum + Number(p.amount), 0);

    const revenueLastMonth = payments
        .filter(p => (p.status === 'Completed' || p.status === 'Cleared') && new Date(p.date) >= startOfLastMonth && new Date(p.date) < startOfMonth)
        .reduce((sum, p) => sum + Number(p.amount), 0);
        
    let trend = 0;
    if (revenueLastMonth > 0) {
        trend = Math.round(((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100);
    } else if (revenueThisMonth > 0) {
        trend = 100;
    }

    const pendingPayments = payments.filter(p => p.status === 'Pending');
    const pendingTotal = pendingPayments.reduce((sum, p) => sum + Number(p.amount), 0);

    const failedPayments = payments.filter(p => p.status === 'Failed');
    const failedTotal = failedPayments.reduce((sum, p) => sum + Number(p.amount), 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Revenue */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="relative z-10">
                    <p className="text-sm font-medium text-gray-500 mb-1">Total Revenue (This Month)</p>
                    <h3 className="text-3xl font-bold text-gray-900">₦{formatNumber(revenueThisMonth)}</h3>
                    <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {trend >= 0 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                            </svg>
                        )}
                        <span>{trend >= 0 ? '+' : ''}{trend}% vs last month</span>
                    </div>
                </div>
            </div>

            {/* Pending Payments */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="relative z-10">
                    <p className="text-sm font-medium text-gray-500 mb-1">Pending Payments</p>
                    <h3 className="text-3xl font-bold text-gray-900">₦{formatNumber(pendingTotal)}</h3>
                    <div className="flex items-center gap-1 mt-2 text-sm text-yellow-600 font-medium">
                        <span>{pendingPayments.length} transaction{pendingPayments.length !== 1 ? 's' : ''} pending</span>
                    </div>
                </div>
            </div>

            {/* Failed/Overdue */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div className="relative z-10">
                    <p className="text-sm font-medium text-gray-500 mb-1">Failed / Overdue</p>
                    <h3 className="text-3xl font-bold text-gray-900">₦{formatNumber(failedTotal)}</h3>
                    <div className="flex items-center gap-1 mt-2 text-sm text-red-600 font-medium">
                        <span>{failedPayments.length} transaction{failedPayments.length !== 1 ? 's' : ''} failed</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


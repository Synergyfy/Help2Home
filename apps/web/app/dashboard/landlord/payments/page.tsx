'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import PaymentsTable from '@/components/dashboard/landlord/payments/PaymentsTable';
import PaymentsFilterBar from '@/components/dashboard/landlord/payments/PaymentsFilterBar';
import PaymentDrawer from '@/components/dashboard/landlord/payments/PaymentDrawer';
import PaymentsSummaryCards from '@/components/dashboard/landlord/payments/PaymentsSummaryCards';
import { PaymentTransaction } from '@/lib/api/payments';
import { useLandlordPayments } from '@/hooks/useLandlordPayments';

export default function PaymentsPage() {
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPayment, setSelectedPayment] = useState<PaymentTransaction | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    
    const { payments, isLoadingPayments, isErrorPayments } = useLandlordPayments();

    const filteredPayments = payments.filter(payment => {
        const matchesStatus = statusFilter === 'All' || payment.status === statusFilter;
        const matchesSearch =
            (payment.tenantName?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
            (payment.propertyName?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
            (payment.transactionId?.toLowerCase().includes(searchQuery.toLowerCase()) || '');
        return matchesStatus && matchesSearch;
    });

    const handlePaymentClick = (payment: PaymentTransaction) => {
        setSelectedPayment(payment);
        setIsDrawerOpen(true);
    };

    return (
        <div className="pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Payments Received</h1>
                    <p className="text-gray-500">Track all rent payments collected through Help2Home.</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/dashboard/landlord/payments/settings"
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors shadow-sm"
                    >
                        Payout Settings
                    </Link>
                    <Link
                        href="/dashboard/landlord/payments/history"
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors shadow-sm"
                    >
                        Payout History
                    </Link>
                </div>
            </div>

            <PaymentsSummaryCards payments={payments} />

            <PaymentsFilterBar
                statusFilter={statusFilter}
                onStatusFilterChange={setStatusFilter}
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
            />

            {isLoadingPayments ? (
                <div className="p-12 text-center text-gray-500 font-bold animate-pulse">Loading payments...</div>
            ) : isErrorPayments ? (
                <div className="p-12 text-center text-red-500 font-bold">Failed to load payments.</div>
            ) : (
                <PaymentsTable
                    payments={filteredPayments}
                    onPaymentClick={handlePaymentClick}
                />
            )}

            <PaymentDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                payment={selectedPayment}
            />
        </div>
    );
}

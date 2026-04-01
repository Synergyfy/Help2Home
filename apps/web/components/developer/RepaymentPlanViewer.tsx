'use client';

import React from 'react';
import type { RepaymentSchedule } from '@/types/developer';
import { formatCurrency } from '@/types/developer';
import {
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineXCircle,
    HiOutlineDocumentArrowDown
} from 'react-icons/hi2';

interface RepaymentPlanViewerProps {
    schedule: RepaymentSchedule;
    compact?: boolean;
}

const STATUS_CONFIG = {
    pending: { icon: HiOutlineClock, color: 'text-gray-400', bg: 'bg-gray-50' },
    paid: { icon: HiOutlineCheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    overdue: { icon: HiOutlineXCircle, color: 'text-red-600', bg: 'bg-red-50' }
};

export default function RepaymentPlanViewer({ schedule, compact = false }: RepaymentPlanViewerProps) {
    const totalPrincipal = schedule.schedule.reduce((sum, item) => sum + item.principal, 0);
    const totalInterest = schedule.schedule.reduce((sum, item) => sum + item.interest, 0);

    if (compact) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-black text-gray-900">Repayment Schedule</h3>
                    <span className="text-xs font-bold text-gray-500">
                        {schedule.schedule.length} Payments
                    </span>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Investment Amount</span>
                        <span className="font-black text-gray-900">
                            {formatCurrency(schedule.investmentAmount)}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Returns</span>
                        <span className="font-black text-brand-green">
                            {formatCurrency(schedule.totalRepaymentAmount)}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm pt-3 border-t border-gray-100">
                        <span className="text-gray-600">Total Profit</span>
                        <span className="font-black text-green-600">
                            +{formatCurrency(schedule.totalRepaymentAmount - schedule.investmentAmount)}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-8 border-b border-gray-100 bg-linear-to-r from-brand-green to-green-700 text-white">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black">Repayment Schedule</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-bold text-sm transition-all">
                        <HiOutlineDocumentArrowDown className="size-5" />
                        Export PDF
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">
                            Investment Amount
                        </p>
                        <p className="text-2xl font-black italic">
                            {formatCurrency(schedule.investmentAmount)}
                        </p>
                    </div>
                    <div>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">
                            Total Expected Returns
                        </p>
                        <p className="text-2xl font-black italic">
                            {formatCurrency(schedule.totalRepaymentAmount)}
                        </p>
                    </div>
                    <div>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">
                            Total Profit
                        </p>
                        <p className="text-2xl font-black italic text-green-200">
                            +{formatCurrency(totalInterest)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Timeline Visualization */}
            <div className="p-8 bg-gray-50/50">
                <h3 className="font-black text-gray-900 mb-6">Payment Timeline</h3>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

                    <div className="space-y-6">
                        {schedule.schedule.map((payment, index) => {
                            const StatusIcon = STATUS_CONFIG[payment.status].icon;
                            const isFirst = index === 0;
                            const isLast = index === schedule.schedule.length - 1;

                            return (
                                <div key={payment.id} className="relative pl-16">
                                    {/* Timeline dot */}
                                    <div className={`absolute left-0 size-12 rounded-full ${STATUS_CONFIG[payment.status].bg} flex items-center justify-center z-10`}>
                                        <StatusIcon className={`size-6 ${STATUS_CONFIG[payment.status].color}`} />
                                    </div>

                                    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                                    Payment {index + 1} of {schedule.schedule.length}
                                                </p>
                                                <p className="text-sm font-bold text-gray-900">
                                                    {new Date(payment.dueDate).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <span className={`text-xs font-black px-3 py-1.5 ${STATUS_CONFIG[payment.status].bg} ${STATUS_CONFIG[payment.status].color} rounded-full uppercase tracking-wider`}>
                                                {payment.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Total Payment</p>
                                                <p className="text-lg font-black text-gray-900 italic">
                                                    {formatCurrency(payment.amount)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Principal</p>
                                                <p className="text-lg font-black text-gray-600 italic">
                                                    {formatCurrency(payment.principal)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Interest</p>
                                                <p className="text-lg font-black text-brand-green italic">
                                                    {formatCurrency(payment.interest)}
                                                </p>
                                            </div>
                                        </div>

                                        {payment.paidDate && (
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <p className="text-xs text-gray-500">
                                                    Paid on {new Date(payment.paidDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Summary */}
            <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                <h3 className="font-black text-gray-900 mb-6">Payment Breakdown Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">
                            Total Principal Returned
                        </p>
                        <p className="text-3xl font-black text-gray-900 italic">
                            {formatCurrency(totalPrincipal)}
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 p-6">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">
                            Total Interest Earned
                        </p>
                        <p className="text-3xl font-black text-brand-green italic">
                            {formatCurrency(totalInterest)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

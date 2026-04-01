'use client';

import React from 'react';
import Link from 'next/link';
import { MdArrowBack, MdDownload, MdSummarize } from 'react-icons/md';
import RepaymentScheduleTable from '@/components/dashboard/investor/RepaymentScheduleTable';

// Mock Data matching ID 'inv_001'
const INVESTMENT_DETAIL = {
    id: 'inv_001',
    projectTitle: 'Lekki Gardens Phase V',
    developer: 'Zenith Developments',
    investedAmount: 5000000,
    roi: 25,
    startDate: '2025-11-15',
    maturityDate: '2027-05-15',
    schedule: [
        { id: 's1', dueDate: '2025-11-15', amount: 5000000, description: 'Initial Capital Investment', status: 'paid', paidDate: '2025-11-15' },
        { id: 's2', dueDate: '2026-02-15', amount: 312500, description: 'Quarterly Interest Payout (Q1)', status: 'paid', paidDate: '2026-02-15' },
        { id: 's3', dueDate: '2026-05-15', amount: 312500, description: 'Quarterly Interest Payout (Q2)', status: 'pending' },
        { id: 's4', dueDate: '2026-08-15', amount: 312500, description: 'Quarterly Interest Payout (Q3)', status: 'pending' },
        { id: 's5', dueDate: '2026-11-15', amount: 312500, description: 'Quarterly Interest Payout (Q4)', status: 'pending' },
        { id: 's6', dueDate: '2027-02-15', amount: 312500, description: 'Quarterly Interest Payout (Q5)', status: 'pending' },
        { id: 's7', dueDate: '2027-05-15', amount: 5312500, description: 'Final Payout (Capital + Q6 Interest)', status: 'pending' },
    ]
};

export default function InvestmentDetailPage({ params }: { params: { id: string } }) {
    // In real app, fetch data using params.id
    const data = INVESTMENT_DETAIL;

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <Link
                href="/dashboard/investor/investments"
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-semibold mb-6 transition-colors"
            >
                <MdArrowBack /> Back to Portfolio
            </Link>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-[#111811]">{data.projectTitle}</h1>
                    <p className="text-gray-500">Contract ID: #{data.id} • Managed by {data.developer}</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                    <MdDownload size={20} /> Download Contract
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Total Principal</p>
                    <p className="text-2xl font-semibold text-gray-900">₦{data.investedAmount.toLocaleString()}</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Maturity Date</p>
                    <p className="text-2xl font-semibold text-gray-900">{data.maturityDate}</p>
                </div>
                <div className="p-6 bg-green-50 rounded-2xl border border-green-100 shadow-sm">
                    <p className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-1">Total ROI</p>
                    <p className="text-2xl font-semibold text-green-700">{data.roi}%</p>
                </div>
            </div>

            {/* Schedule Section */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                        <MdSummarize className="text-brand-green" />
                        Repayment Schedule
                    </h3>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        {data.schedule.filter(s => s.status === 'paid').length} of {data.schedule.length} Completed
                    </span>
                </div>

                <RepaymentScheduleTable schedule={data.schedule as any} />
            </div>
        </div>
    );
}

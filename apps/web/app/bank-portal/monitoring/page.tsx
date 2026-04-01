'use client';

import React from 'react';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { HiOutlineExclamationTriangle, HiOutlineCheckCircle } from 'react-icons/hi2';

export default function BankMonitoringPage() {
    const activeLoans = [
        { id: 'LN-5501', tenant: 'Oluwaseun Adeyemi', amount: '₦3.5M', nextDue: '2026-03-01', status: 'Current' },
        { id: 'LN-4402', tenant: 'Chioma Okoro', amount: '₦1.2M', nextDue: '2026-02-25', status: 'Upcoming' },
        { id: 'LN-3303', tenant: 'Ibrahim Musa', amount: '₦2.8M', nextDue: '2026-02-10', status: 'Overdue' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Loan Monitoring</h1>
                <p className="text-gray-500 font-medium">Track repayment performance and active loan health.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-green-500">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Healthy Loans</p>
                    <p className="text-3xl font-semibold text-gray-900">92%</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-orange-500">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Upcoming Dues</p>
                    <p className="text-3xl font-semibold text-gray-900">14</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-red-500">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">At Risk (30d+)</p>
                    <p className="text-3xl font-semibold text-gray-900">3</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                        <tr>
                            <th className="px-6 py-5">Loan ID</th>
                            <th className="px-6 py-5">Tenant</th>
                            <th className="px-6 py-5">Amount</th>
                            <th className="px-6 py-5">Next Due Date</th>
                            <th className="px-6 py-5">Status</th>
                            <th className="px-6 py-5 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {activeLoans.map((loan) => (
                            <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-5 font-semibold text-gray-900">{loan.id}</td>
                                <td className="px-6 py-5 font-semibold text-gray-900">{loan.tenant}</td>
                                <td className="px-6 py-5 font-semibold text-gray-900">{loan.amount}</td>
                                <td className="px-6 py-5 text-gray-500">{loan.nextDue}</td>
                                <td className="px-6 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-tight ${
                                        loan.status === 'Current' ? 'bg-green-100 text-green-600' :
                                        loan.status === 'Upcoming' ? 'bg-blue-100 text-blue-600' :
                                        'bg-red-100 text-red-600'
                                    }`}>
                                        {loan.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <button className="text-sm font-semibold text-[#003366] hover:underline">Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

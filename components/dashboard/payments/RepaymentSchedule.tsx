'use client';

import React from 'react';
import { Installment } from './types';

interface RepaymentScheduleProps {
    schedule: Installment[];
    onPayInstallment: (id: string) => void;
}

export default function RepaymentSchedule({ schedule, onPayInstallment }: RepaymentScheduleProps) {
    const totalLoan = schedule.reduce((acc, curr) => acc + curr.principal, 0);
    const amountPaid = schedule.filter(i => i.status === 'Paid').reduce((acc, curr) => acc + curr.totalDue, 0);
    const amountRemaining = schedule.filter(i => i.status !== 'Paid').reduce((acc, curr) => acc + curr.totalDue, 0);
    const nextDue = schedule.find(i => i.status !== 'Paid');

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Repayment Schedule</h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-xs text-blue-600 font-medium uppercase">Total Loan</p>
                        <p className="text-lg font-bold text-blue-900">₦{totalLoan.toLocaleString()}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-xs text-green-600 font-medium uppercase">Amount Paid</p>
                        <p className="text-lg font-bold text-green-900">₦{amountPaid.toLocaleString()}</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                        <p className="text-xs text-orange-600 font-medium uppercase">Remaining</p>
                        <p className="text-lg font-bold text-orange-900">₦{amountRemaining.toLocaleString()}</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-xs text-purple-600 font-medium uppercase">Next Due</p>
                        <p className="text-lg font-bold text-purple-900">
                            {nextDue ? `₦${nextDue.totalDue.toLocaleString()}` : 'Completed'}
                        </p>
                        {nextDue && <p className="text-xs text-purple-700">{nextDue.dueDate}</p>}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Due Date</th>
                            <th className="px-6 py-3">Principal</th>
                            <th className="px-6 py-3">Interest</th>
                            <th className="px-6 py-3">Total Due</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {schedule.map((item) => (
                            <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${item.status === 'Overdue' ? 'bg-red-50 hover:bg-red-100' : ''}`}>
                                <td className="px-6 py-4 font-medium">{item.installmentNumber}</td>
                                <td className="px-6 py-4">{item.dueDate}</td>
                                <td className="px-6 py-4">₦{item.principal.toLocaleString()}</td>
                                <td className="px-6 py-4">₦{item.interest.toLocaleString()}</td>
                                <td className="px-6 py-4 font-bold">
                                    ₦{item.totalDue.toLocaleString()}
                                    {item.penalty ? <span className="text-xs text-red-500 block">+₦{item.penalty} penalty</span> : null}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        ${item.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                            item.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {item.status !== 'Paid' && (
                                        <button
                                            onClick={() => onPayInstallment(item.id)}
                                            className="text-[#6D28D9] font-medium hover:text-purple-800 hover:underline"
                                        >
                                            Pay Now
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

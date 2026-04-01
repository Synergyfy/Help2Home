'use client';

import React from 'react';
import { MdCheckCircle, MdPending, MdWarning } from 'react-icons/md';

interface ScheduleItem {
    id: string;
    dueDate: string;
    amount: number;
    description: string;
    status: 'paid' | 'pending' | 'overdue';
    paidDate?: string;
}

interface RepaymentScheduleTableProps {
    schedule: ScheduleItem[];
}

export default function RepaymentScheduleTable({ schedule }: RepaymentScheduleTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-wider">
                        <th className="p-4">Due Date</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Paid On</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {schedule.map((item) => (
                        <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="p-4 font-medium text-gray-900">{item.dueDate}</td>
                            <td className="p-4 text-gray-600">{item.description}</td>
                            <td className="p-4 font-bold text-gray-900">₦{item.amount.toLocaleString()}</td>
                            <td className="p-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize
                                    ${item.status === 'paid' ? 'bg-green-100 text-green-700' :
                                        item.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                                            'bg-red-50 text-red-600'}
                                `}>
                                    {item.status === 'paid' && <MdCheckCircle />}
                                    {item.status === 'pending' && <MdPending />}
                                    {item.status === 'overdue' && <MdWarning />}
                                    {item.status}
                                </span>
                            </td>
                            <td className="p-4 text-gray-500">{item.paidDate || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

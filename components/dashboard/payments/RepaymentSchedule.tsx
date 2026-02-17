'use client';

import React from 'react';
import { Installment } from './types';
import { IoAlertCircleOutline, IoCheckmarkCircleOutline, IoCalendarOutline, IoCardOutline } from 'react-icons/io5';

interface RepaymentScheduleProps {
    schedule: Installment[];
    onPayInstallment: (id: string) => void;
}

export default function RepaymentSchedule({ schedule, onPayInstallment }: RepaymentScheduleProps) {
    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Paid':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'Overdue':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'Upcoming':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="p-8 border-b border-gray-100 bg-gray-50/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black text-gray-900">Repayment Schedule</h2>
                        <p className="text-sm text-gray-500 font-medium">Detailed breakdown of your rent financing installments.</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-xs">
                        <IoCalendarOutline size={16} className="text-brand-green" />
                        <span>Monthly Cycle</span>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Installment</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Due Date</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Amount</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {schedule.map((item) => (
                            <tr key={item.id} className="group hover:bg-gray-50/50 transition-all">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                                            item.status === 'Paid' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                                        }`}>
                                            {item.installmentNumber}
                                        </div>
                                        <span className="font-bold text-gray-900 text-sm">Month {item.installmentNumber}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-sm font-medium text-gray-600">{item.dueDate}</span>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-gray-900">₦{item.totalDue.toLocaleString()}</span>
                                        <span className="text-[10px] text-gray-400 font-medium italic">
                                            (₦{item.principal.toLocaleString()} + ₦{item.interest.toLocaleString()} int.)
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${getStatusStyles(item.status)}`}>
                                        {item.status === 'Paid' ? <IoCheckmarkCircleOutline size={12} /> : 
                                         item.status === 'Overdue' ? <IoAlertCircleOutline size={12} /> : 
                                         <IoTimeOutline className="w-3 h-3" />}
                                        {item.status}
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    {item.status !== 'Paid' ? (
                                        <button
                                            onClick={() => onPayInstallment(item.id)}
                                            className="inline-flex items-center gap-2 bg-white border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white px-5 py-2 rounded-xl font-black text-xs transition-all shadow-sm active:scale-95 group-hover:shadow-lg group-hover:shadow-green-100"
                                        >
                                            <IoCardOutline size={14} />
                                            Pay Now
                                        </button>
                                    ) : (
                                        <span className="text-xs font-bold text-green-500 flex items-center justify-end gap-1">
                                            <IoCheckmarkCircleOutline size={16} />
                                            Settled
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="p-6 bg-gray-50/50 border-t border-gray-100 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
                    Need to modify your repayment plan? <button className="text-brand-green hover:underline">Contact your relationship manager</button>
                </p>
            </div>
        </div>
    );
}

// Helper icons placeholder if needed
function IoTimeOutline(props: any) {
    return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" {...props}>
            <path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48zm96 240h-96a16 16 0 01-16-16V128a16 16 0 0132 0v128h80a16 16 0 010 32z"></path>
        </svg>
    );
}


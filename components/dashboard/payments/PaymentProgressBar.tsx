'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IoCheckmarkCircle, IoTimeOutline, IoWalletOutline } from 'react-icons/io5';
import { Installment } from './types';

interface PaymentProgressBarProps {
    schedule: Installment[];
}

export default function PaymentProgressBar({ schedule }: PaymentProgressBarProps) {
    const totalMonths = schedule.length;
    const paidMonths = schedule.filter(i => i.status === 'Paid').length;
    const remainingMonths = totalMonths - paidMonths;
    const percentage = totalMonths > 0 ? (paidMonths / totalMonths) * 100 : 0;

    const totalPaidAmount = schedule
        .filter(i => i.status === 'Paid')
        .reduce((sum, i) => sum + i.totalDue, 0);
    
    const totalRemainingAmount = schedule
        .filter(i => i.status !== 'Paid')
        .reduce((sum, i) => sum + i.totalDue, 0);

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8 overflow-hidden relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div>
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Repayment Progress</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-gray-900">{paidMonths}</span>
                        <span className="text-xl font-bold text-gray-400">/ {totalMonths} Months Paid</span>
                    </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                    <div className="bg-green-50 px-4 py-2 rounded-2xl border border-green-100 flex items-center gap-2">
                        <IoWalletOutline className="text-brand-green" size={18} />
                        <div>
                            <p className="text-[10px] font-black text-green-600 uppercase tracking-tighter">Total Paid</p>
                            <p className="text-sm font-black text-gray-900">₦{totalPaidAmount.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="bg-amber-50 px-4 py-2 rounded-2xl border border-amber-100 flex items-center gap-2">
                        <IoTimeOutline className="text-amber-600" size={18} />
                        <div>
                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-tighter">Outstanding</p>
                            <p className="text-sm font-black text-gray-900">₦{totalRemainingAmount.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative pt-1">
                <div className="flex mb-4 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-black inline-block py-1 px-3 uppercase rounded-full bg-brand-green text-white shadow-lg shadow-green-100">
                            {percentage.toFixed(0)}% Completed
                        </span>
                        {percentage === 100 && (
                            <span className="flex items-center gap-1 text-xs font-bold text-brand-green">
                                <IoCheckmarkCircle /> All settled
                            </span>
                        )}
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                            {remainingMonths} months left
                        </span>
                    </div>
                </div>
                
                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-100 p-1">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-green rounded-full relative"
                    >
                        <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                    </motion.div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-xs font-bold text-gray-900">{percentage < 100 ? 'Active Loan' : 'Completed'}</p>
                </div>
                <div className="text-center p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Next Pay</p>
                    <p className="text-xs font-bold text-gray-900">{schedule.find(i => i.status === 'Upcoming')?.dueDate || 'None'}</p>
                </div>
                <div className="text-center p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Interest</p>
                    <p className="text-xs font-bold text-gray-900">15% Flat</p>
                </div>
                <div className="text-center p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Frequency</p>
                    <p className="text-xs font-bold text-gray-900">Monthly</p>
                </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />
        </div>
    );
}

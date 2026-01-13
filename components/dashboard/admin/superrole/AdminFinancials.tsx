'use client'

import React from 'react';
import { FiDollarSign, FiArrowUpRight, FiArrowDownLeft, FiClock, FiCheck, FiX } from 'react-icons/fi';
import { useAdminStore } from '@/store/adminStore';
import { toast } from 'react-toastify';

export default function AdminFinancials() {
    const { platformStats } = useAdminStore();

    // Mock payout requests
    const pendingPayouts = [
        { id: 'PAY_001', recipient: 'Acme Property Management', amount: '₦2,450,000', method: 'Bank Transfer', requestedAt: '1 hour ago' },
        { id: 'PAY_002', recipient: 'John Landlord', amount: '₦850,000', method: 'Flutterwave', requestedAt: '3 hours ago' },
        { id: 'PAY_003', recipient: 'Sarah Host', amount: '₦1,200,000', method: 'Bank Transfer', requestedAt: 'Yesterday' },
    ];

    const handleAction = (id: string, action: 'approved' | 'rejected') => {
        toast.info(`Payout ${id} ${action}`);
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-900 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-emerald-800 rounded-lg">
                            <FiDollarSign className="text-emerald-400" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Platform Rev</span>
                    </div>
                    <div className="text-3xl font-black">{platformStats.revenueTotal}</div>
                    <p className="text-emerald-300 text-xs mt-1">Total volume processed</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-brand-green-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <FiArrowUpRight className="text-blue-500" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green-400">Commission</span>
                    </div>
                    <div className="text-2xl font-black text-brand-green-900">₦12.8M</div>
                    <p className="text-brand-green-500 text-xs mt-1">Platform earnings @ 10% avg</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-brand-green-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-amber-50 rounded-lg">
                            <FiClock className="text-amber-500" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-green-400">Pending Out</span>
                    </div>
                    <div className="text-2xl font-black text-brand-green-900">₦4.5M</div>
                    <p className="text-brand-green-500 text-xs mt-1">Awaiting admin clearance</p>
                </div>
            </div>

            <section className="bg-white rounded-2xl border border-brand-green-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-brand-green-100 flex items-center justify-between bg-brand-green-50/50">
                    <h3 className="font-bold flex items-center gap-2 text-brand-green-900">
                        <FiArrowDownLeft className="text-emerald-500" /> Payout Clearance Queue
                    </h3>
                </div>
                <div className="divide-y divide-brand-green-100">
                    {pendingPayouts.map((payout) => (
                        <div key={payout.id} className="p-6 hover:bg-brand-green-50 transition-colors flex items-center justify-between">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-brand-green-100 rounded-xl text-brand-green-600">
                                    <FiDollarSign size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-green-900">{payout.recipient}</h4>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs text-brand-green-500">{payout.method}</span>
                                        <span className="size-1 bg-brand-green-300 rounded-full" />
                                        <span className="text-xs text-brand-green-400 font-mono uppercase">{payout.id}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <div className="text-lg font-black text-emerald-600">{payout.amount}</div>
                                    <div className="text-[10px] text-brand-green-400 font-black uppercase tracking-wider">{payout.requestedAt}</div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAction(payout.id, 'rejected')}
                                        className="p-2 bg-brand-green-100 text-brand-green-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all"
                                    >
                                        <FiX />
                                    </button>
                                    <button
                                        onClick={() => handleAction(payout.id, 'approved')}
                                        className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-lg transition-all shadow-sm"
                                    >
                                        <FiCheck />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

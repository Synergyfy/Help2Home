'use client';

import React from 'react';
import { HiOutlineUserGroup, HiPlus, HiOutlineCheckBadge, HiOutlineXCircle } from 'react-icons/hi2';

export default function BankAccountsPage() {
    const mockAccounts = [
        { id: 'ACC-8821', owner: 'Oluwaseun Adeyemi', type: 'Savings', status: 'Verified', balance: '₦450,000' },
        { id: 'ACC-4492', owner: 'Chioma Okoro', type: 'Current', status: 'Pending', balance: '₦1,200,000' },
        { id: 'ACC-1103', owner: 'Ibrahim Musa', type: 'Savings', status: 'Verified', balance: '₦890,000' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Account Management</h1>
                    <p className="text-gray-500 font-medium">Link and verify tenant bank accounts for repayments.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-[#003366] text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">
                    <HiPlus /> Link New Account
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                        <tr>
                            <th className="px-6 py-5">Account Number</th>
                            <th className="px-6 py-5">Account Holder</th>
                            <th className="px-6 py-5">Type</th>
                            <th className="px-6 py-5">Available Balance</th>
                            <th className="px-6 py-5">Status</th>
                            <th className="px-6 py-5 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {mockAccounts.map((acc) => (
                            <tr key={acc.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-5 font-semibold text-gray-900">{acc.id}</td>
                                <td className="px-6 py-5 font-semibold text-gray-900">{acc.owner}</td>
                                <td className="px-6 py-5 text-gray-500">{acc.type}</td>
                                <td className="px-6 py-5 font-semibold text-gray-900">{acc.balance}</td>
                                <td className="px-6 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-tight ${
                                        acc.status === 'Verified' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                    }`}>
                                        {acc.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <button className="text-sm font-semibold text-[#003366] hover:underline">Manage</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

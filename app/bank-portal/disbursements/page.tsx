'use client';

import React from 'react';
import { MOCK_BANK_APPLICATIONS } from '@/lib/mockBankData';
import { HiOutlineBanknotes, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi2';

export default function BankDisbursementsPage() {
    // Filter apps that are approved but not yet disbursed (simulated)
    const pendingDisbursements = MOCK_BANK_APPLICATIONS.filter(app => app.status === 'Approved');

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Disbursement Queue</h1>
                <p className="text-gray-500 font-medium">Review and authorize payments to landlords.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Pending Approval</p>
                    <p className="text-3xl font-semibold text-gray-900">₦12.5M</p>
                    <p className="text-xs text-orange-500 font-semibold mt-2">4 payments waiting</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Disbursed (24h)</p>
                    <p className="text-3xl font-semibold text-gray-900">₦8.2M</p>
                    <p className="text-xs text-green-500 font-semibold mt-2">3 payments completed</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">Next Cycle</p>
                    <p className="text-3xl font-semibold text-gray-900">Tomorrow</p>
                    <p className="text-xs text-blue-500 font-semibold mt-2">10:00 AM WAT</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                        <tr>
                            <th className="px-6 py-5">Application</th>
                            <th className="px-6 py-5">Beneficiary (Landlord)</th>
                            <th className="px-6 py-5">Account Details</th>
                            <th className="px-6 py-5">Amount</th>
                            <th className="px-6 py-5">Status</th>
                            <th className="px-6 py-5 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {pendingDisbursements.map((app) => (
                            <tr key={app.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-5 font-semibold text-gray-900">{app.id}</td>
                                <td className="px-6 py-5 font-semibold text-gray-900">John Property Owner</td>
                                <td className="px-6 py-5">
                                    <p className="font-medium text-gray-900">Access Bank</p>
                                    <p className="text-xs text-gray-500">0123456789</p>
                                </td>
                                <td className="px-6 py-5 font-semibold text-gray-900 text-lg">₦{app.requestedAmount.toLocaleString()}</td>
                                <td className="px-6 py-5">
                                    <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] font-semibold uppercase tracking-tight">
                                        Pending Transfer
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <button className="px-6 py-2 bg-[#003366] text-white text-xs font-semibold rounded-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10">
                                        Authorize Transfer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {pendingDisbursements.length === 0 && (
                    <div className="p-20 text-center text-gray-400">
                        <HiOutlineBanknotes size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="font-semibold">No disbursements pending at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

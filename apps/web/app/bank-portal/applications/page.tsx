'use client';

import React, { useState } from 'react';
import { MOCK_BANK_APPLICATIONS } from '@/lib/mockBankData';
import { HiOutlineAdjustmentsHorizontal, HiOutlineFunnel, HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import Link from 'next/link';

export default function BankApplicationsPage() {
    const [filter, setFilter] = useState('All');

    const filteredApplications = filter === 'All' 
        ? MOCK_BANK_APPLICATIONS 
        : MOCK_BANK_APPLICATIONS.filter(app => app.status === filter);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Loan Applications</h1>
                    <p className="text-gray-500 font-medium">Manage and review all incoming loan requests.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                        <HiOutlineFunnel /> Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                        <HiOutlineAdjustmentsHorizontal /> Sort
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm w-fit">
                {['All', 'New', 'In review', 'Approved', 'Disbursed'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                            filter === tab 
                            ? 'bg-[#003366] text-white shadow-lg shadow-blue-900/10' 
                            : 'text-gray-500 hover:text-[#003366] hover:bg-gray-50'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
                <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search by ID, Tenant Name, or Property..."
                    className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-[#003366]/10 outline-none transition-all shadow-sm"
                />
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                            <tr>
                                <th className="px-6 py-5">Application ID</th>
                                <th className="px-6 py-5">Tenant</th>
                                <th className="px-6 py-5">Property</th>
                                <th className="px-6 py-5">Requested</th>
                                <th className="px-6 py-5">Credit Score</th>
                                <th className="px-6 py-5">Officer</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredApplications.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-5 font-semibold text-gray-900 group-hover:text-[#003366] transition-colors">
                                        {app.id}
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-semibold text-gray-900">{app.tenantName}</p>
                                        <p className="text-xs text-gray-400">{app.tenantDetails.email}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-medium text-gray-900 truncate max-w-[200px]">{app.propertyTitle}</p>
                                        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-tighter">{app.propertyAddress}</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="font-semibold text-gray-900 text-lg">₦{app.requestedAmount.toLocaleString()}</p>
                                        <p className="text-xs text-gray-500">{app.termMonths} Months</p>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${app.creditScore > 700 ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                            <span className="font-semibold text-gray-900">{app.creditScore}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 font-medium text-gray-600">
                                        {app.assignedOfficer}
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-tight ${
                                            app.status === 'New' ? 'bg-blue-100 text-blue-600' :
                                            app.status === 'In review' ? 'bg-orange-100 text-orange-600' :
                                            app.status === 'Approved' ? 'bg-green-100 text-green-600' :
                                            'bg-purple-100 text-purple-600'
                                        }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <Link 
                                            href={`/bank-portal/applications/${app.id}`}
                                            className="inline-flex items-center justify-center px-4 py-2 bg-[#003366] text-white text-xs font-semibold rounded-lg hover:bg-blue-800 transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredApplications.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                             <HiOutlineFunnel size={32} />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">No applications found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

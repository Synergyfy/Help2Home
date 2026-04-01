'use client';

import React from 'react';
import { MOCK_BANK_STATS, MOCK_BANK_APPLICATIONS } from '@/lib/mockBankData';
import { HiOutlineArrowTrendingUp, HiOutlineDocumentMagnifyingGlass, HiOutlineCheckCircle, HiOutlineClock, HiOutlineCurrencyDollar } from 'react-icons/hi2';
import Link from 'next/link';

export default function BankDashboard() {
    const stats = [
        { label: 'Total Outstanding', value: `₦${(MOCK_BANK_STATS.totalOutstanding / 1000000).toFixed(1)}M`, icon: HiOutlineCurrencyDollar, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'New Apps (24h)', value: MOCK_BANK_STATS.newApplications24h, icon: HiOutlineDocumentMagnifyingGlass, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'Approvals Today', value: MOCK_BANK_STATS.approvalsToday, icon: HiOutlineCheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'Delinquency Rate', value: `${MOCK_BANK_STATS.delinquencyRate}%`, icon: HiOutlineArrowTrendingUp, color: 'text-red-600', bg: 'bg-red-50' },
        { label: 'Disbursed (Month)', value: `₦${(MOCK_BANK_STATS.disbursedThisMonth / 1000000).toFixed(1)}M`, icon: HiOutlineClock, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 font-medium">Welcome back. Here is what's happening today.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">Download Report</button>
                    <button className="px-4 py-2 bg-[#003366] text-white rounded-xl text-sm font-semibold hover:bg-[#002244] transition-all shadow-lg shadow-blue-900/20">Manage Webhooks</button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-sm font-semibold text-gray-500 mb-1">{stat.label}</p>
                        <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Applications */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
                        <Link href="/bank-portal/applications" className="text-sm font-semibold text-[#003366] hover:underline">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                                <tr>
                                    <th className="px-6 py-4">Tenant</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Credit Score</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {MOCK_BANK_APPLICATIONS.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-900">{app.tenantName}</p>
                                            <p className="text-xs text-gray-500">{app.id}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-900">₦{app.requestedAmount.toLocaleString()}</p>
                                            <p className="text-xs text-gray-500">{app.termMonths} Months</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${app.creditScore > 700 ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                                <span className="font-semibold">{app.creditScore}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-tight ${
                                                app.status === 'New' ? 'bg-blue-100 text-blue-600' :
                                                app.status === 'In review' ? 'bg-orange-100 text-orange-600' :
                                                'bg-green-100 text-green-600'
                                            }`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/bank-portal/applications/${app.id}`} className="text-sm font-semibold text-[#003366] hover:text-blue-800">Review</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Portfolio Mix Placeholder */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Portfolio Distribution</h2>
                    <div className="aspect-square bg-gray-50 rounded-full flex items-center justify-center border-8 border-white shadow-inner relative">
                         {/* Simple CSS-only donut chart mock */}
                        <div className="text-center">
                            <p className="text-4xl font-semibold text-gray-900">₦125M</p>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Total Value</p>
                        </div>
                    </div>
                    <div className="mt-8 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-600">Residential Rent</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">65%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-600">Commercial</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">20%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-600">Off-plan</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">15%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

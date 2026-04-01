'use client';

import React from 'react';
import { HiOutlinePresentationChartLine, HiOutlineDownload } from 'react-icons/hi';
import { IconType } from 'react-icons';

interface ReportCategory {
    name: string;
    description: string;
    icon: IconType;
}

export default function BankReportsPage() {
    const reportCategories: ReportCategory[] = [
        { name: 'Portfolio Performance', description: 'Overview of loan growth and ROI.', icon: HiOutlinePresentationChartLine },
        { name: 'Delinquency Report', description: 'Detailed breakdown of overdue payments.', icon: HiOutlinePresentationChartLine },
        { name: 'Origination Funnel', description: 'Conversion rates from app to disbursement.', icon: HiOutlinePresentationChartLine },
        { name: 'Institutional Audit', description: 'Log of all staff actions and system events.', icon: HiOutlinePresentationChartLine },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Analytics & Reports</h1>
                    <p className="text-gray-500 font-medium">Generate and export institutional performance data.</p>
                </div>
                <div className="flex gap-3">
                    <input type="date" className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#003366]/10" />
                    <button className="px-6 py-2 bg-[#003366] text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition-all">Generate Custom</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportCategories.map((report) => (
                    <div key={report.name} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-start justify-between">
                            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#003366] group-hover:text-white transition-all">
                                <report.icon size={28} />
                            </div>
                            <button className="p-3 text-gray-400 hover:text-[#003366] hover:bg-gray-50 rounded-xl transition-all">
                                <HiOutlineDownload size={24} />
                            </button>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{report.name}</h3>
                        <p className="text-sm text-gray-500 font-medium mb-6 leading-relaxed">{report.description}</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-black transition-all">View Interactive</button>
                            <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-all">Export CSV</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

'use client'

import React from 'react';
import { useAdminStore } from '@/store/adminStore';
import { FiClock, FiShield, FiUser, FiActivity, FiSearch } from 'react-icons/fi';

export default function AdminAuditLogs() {
    const { auditLogs } = useAdminStore();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-brand-green-900">System Audit Logs</h2>
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-green-400" />
                    <input
                        type="text"
                        placeholder="Filter by admin or action..."
                        className="pl-10 pr-4 py-2 bg-white border border-brand-green-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-64 shadow-sm"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-brand-green-200 shadow-sm overflow-hidden text-left">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-green-50 border-b border-brand-green-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black text-brand-green-400 uppercase tracking-widest">Action</th>
                            <th className="px-6 py-4 text-[10px] font-black text-brand-green-400 uppercase tracking-widest">Administrator</th>
                            <th className="px-6 py-4 text-[10px] font-black text-brand-green-400 uppercase tracking-widest">Target</th>
                            <th className="px-6 py-4 text-[10px] font-black text-brand-green-400 uppercase tracking-widest">Details</th>
                            <th className="px-6 py-4 text-[10px] font-black text-brand-green-400 uppercase tracking-widest">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-green-100">
                        {auditLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-brand-green-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <FiShield className="text-emerald-500 shrink-0" />
                                        <span className="text-sm font-bold text-brand-green-900">{log.action}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="size-6 bg-brand-green-100 rounded-full flex items-center justify-center text-[10px] font-bold text-brand-green-600">
                                            {log.admin.charAt(0)}
                                        </div>
                                        <span className="text-sm text-brand-green-600">{log.admin}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-mono text-brand-green-500 bg-brand-green-100 px-2 py-1 rounded">
                                        {log.target}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-brand-green-500">{log.details}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-brand-green-400">
                                        <FiClock size={12} />
                                        <span className="text-[10px] font-bold uppercase">{log.timestamp}</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
                <FiActivity className="text-emerald-600" />
                <p className="text-xs text-emerald-800 font-medium whitespace-nowrap overflow-hidden">
                    <span className="font-bold">Live Stream Active:</span> Monitoring immutable system logs for centralized compliance tracking.
                </p>
            </div>
        </div>
    );
}

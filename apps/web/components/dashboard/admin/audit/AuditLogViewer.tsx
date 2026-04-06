'use client';

import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { useAdminAudit } from '@/hooks/useAdminAudit';
import { toast } from 'react-toastify';

export default function AuditLogViewer() {
    const { logs, isLoading, isError } = useAdminAudit();
    const [filters, setFilters] = useState({
        actor: '',
        action: '',
        resource: ''
    });

    const filteredLogs = useMemo(() => {
        return (logs || []).filter(log =>
            (log.performedByName || '').toLowerCase().includes(filters.actor.toLowerCase()) &&
            (log.action || '').toLowerCase().includes(filters.action.toLowerCase()) &&
            (log.entityType || '').toLowerCase().includes(filters.resource.toLowerCase())
        );
    }, [logs, filters]);

    const formatDetails = (meta: any) => {
        if (!meta) return 'No details available';
        if (typeof meta === 'string') return meta;
        try {
            return JSON.stringify(meta);
        } catch (e) {
            return 'Detail parsing error';
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px] bg-white rounded-xl border border-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00853E]"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-10 text-center bg-red-50 text-red-600 rounded-xl border border-red-100">
                Failed to load audit logs. Please try again later.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Audit Logs</h2>
                    <button 
                        onClick={() => toast.info("Exporting audit logs is not yet available.")}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export CSV
                    </button>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Actor</label>
                        <input
                            type="text"
                            placeholder="Filter by user..."
                            value={filters.actor}
                            onChange={(e) => setFilters(prev => ({ ...prev, actor: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Action</label>
                        <input
                            type="text"
                            placeholder="Filter by action..."
                            value={filters.action}
                            onChange={(e) => setFilters(prev => ({ ...prev, action: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Resource</label>
                        <input
                            type="text"
                            placeholder="Filter by resource..."
                            value={filters.resource}
                            onChange={(e) => setFilters(prev => ({ ...prev, resource: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-xs">
                        <tr>
                            <th className="px-6 py-3">Timestamp</th>
                            <th className="px-6 py-3">Actor</th>
                            <th className="px-6 py-3">Action</th>
                            <th className="px-6 py-3">Resource</th>
                            <th className="px-6 py-3">Details</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredLogs.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-gray-400 italic">
                                    No audit logs found.
                                </td>
                            </tr>
                        ) : filteredLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-3 text-gray-500 whitespace-nowrap">
                                    {format(new Date(log.createdAt), 'MMM d, HH:mm:ss')}
                                </td>
                                <td className="px-6 py-3 font-medium text-gray-900">
                                    {log.performedByName || 'System'}
                                </td>
                                <td className="px-6 py-3">
                                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-mono text-gray-700">
                                        {log.action}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-gray-600">
                                    {log.entityType || '-'}
                                </td>
                                <td className="px-6 py-3 text-gray-500 truncate max-w-xs" title={formatDetails(log.meta)}>
                                    {formatDetails(log.meta)}
                                </td>
                                <td className="px-6 py-3">
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Success
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


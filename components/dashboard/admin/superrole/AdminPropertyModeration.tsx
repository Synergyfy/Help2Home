'use client'

import React from 'react';
import { useAdminStore } from '@/store/adminStore';
import { FiCheck, FiX, FiFlag, FiExternalLink, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function AdminPropertyModeration() {
    const { moderationQueue, approveProperty, rejectProperty, flagProperty } = useAdminStore();

    const handleApprove = (id: string) => {
        approveProperty(id);
        toast.success(`Property #${id} approved successfully`);
    };

    const handleReject = (id: string) => {
        const reason = window.prompt('Enter rejection reason:');
        if (reason) {
            rejectProperty(id, reason);
            toast.error(`Property #${id} rejected`);
        }
    };

    const handleFlag = (id: string) => {
        flagProperty(id);
        toast.info(`Property #${id} flagged for review`);
    };

    if (moderationQueue.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-brand-green-200 p-12 text-center shadow-sm">
                <FiCheck className="mx-auto text-emerald-500 mb-4" size={48} />
                <h3 className="text-lg font-bold text-brand-green-900">Queue is Clear</h3>
                <p className="text-brand-green-500 mt-2">No new properties currently awaiting moderation.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-brand-green-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-green-50 border-b border-brand-green-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black text-brand-green-400 uppercase tracking-widest">Property</th>
                            <th className="px-6 py-4 text-[10px] font-black text-brand-green-400 uppercase tracking-widest">Landlord</th>
                            <th className="px-6 py-4 text-[10px] font-black text-brand-green-400 uppercase tracking-widest">Type / Price</th>
                            <th className="px-6 py-4 text-[10px] font-black text-brand-green-400 uppercase tracking-widest">Submitted</th>
                            <th className="px-6 py-4 text-[10px] font-black text-brand-green-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-green-100">
                        {moderationQueue.map((prop) => (
                            <tr key={prop.id} className="hover:bg-brand-green-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-brand-green-900 group-hover:text-emerald-600 transition-colors">{prop.title}</span>
                                        <span className="text-[10px] font-mono text-brand-green-400 uppercase">{prop.id}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-brand-green-600">{prop.landlord}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-brand-green-700">{prop.type}</span>
                                        <span className="text-xs text-emerald-600 font-medium">{prop.price}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs text-brand-green-500">{prop.submittedAt}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => handleFlag(prop.id)}
                                            className={`p-2 rounded-lg transition-all ${prop.status === 'flagged' ? 'bg-amber-100 text-amber-600' : 'bg-brand-green-100 text-brand-green-500 hover:bg-amber-50 hover:text-amber-600'}`}
                                            title="Flag Listing"
                                        >
                                            <FiFlag size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleReject(prop.id)}
                                            className="p-2 bg-brand-green-100 text-brand-green-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"
                                            title="Reject"
                                        >
                                            <FiX size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleApprove(prop.id)}
                                            className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-lg transition-all shadow-sm"
                                            title="Approve Listing"
                                        >
                                            <FiCheck size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between text-[10px] font-black text-brand-green-400 uppercase tracking-widest px-4">
                <span>Displaying {moderationQueue.length} listings</span>
                <span className="flex items-center gap-2">
                    Bulk Action <FiExternalLink />
                </span>
            </div>
        </div>
    );
}

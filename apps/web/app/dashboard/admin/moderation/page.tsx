"use client";

import React from 'react';
import Link from 'next/link';
import { MdOutlinePanorama } from 'react-icons/md';
import { useAdminModeration } from '@/hooks/useAdminModeration';
import { formatDistanceToNow } from 'date-fns';

export default function AdminModerationPage() {
    const { items, isLoading, isError, approve, reject, isApproving, isRejecting } = useAdminModeration();

    if (isLoading) return <div className="p-12 text-center text-gray-500 font-bold animate-pulse">Loading moderation queue...</div>;
    if (isError) return <div className="p-12 text-center text-red-500 font-bold">Failed to load moderation items.</div>;

    return (
        <main className="flex-1 py-8 px-4 lg:px-8 w-full max-w-[1600px] mx-auto bg-[#f9fafb]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-brand-green-900 text-3xl font-extrabold tracking-tight">Content Moderation</h1>
                    <p className="text-gray-500 text-sm mt-1">Review and approve new property submissions.</p>
                </div>
                <div className="bg-brand-green/10 text-brand-green px-4 py-2 rounded-full text-sm font-bold">
                    {items.length} Pending Items
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                    <h3 className="text-gray-900 text-lg font-bold">Queue</h3>
                </div>
                <div className="divide-y divide-gray-50">
                    {items.map((item) => (
                        <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50/50 transition-colors group">
                            <Link href={`/dashboard/admin/moderation/${item.id}`} className="w-full sm:w-32 h-32 sm:h-24 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden relative">
                                <MdOutlinePanorama size={32} />
                            </Link>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="text-gray-900 font-bold text-lg truncate group-hover:text-brand-green transition-colors">{item.title}</h4>
                                    <span className="px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wider bg-amber-100 text-amber-700">Pending Review</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4 font-medium flex items-center gap-2">
                                    <span>{item.location}</span>
                                    <span>•</span>
                                    <span className="text-gray-900 font-bold">₦{item.price?.toLocaleString()}</span>
                                    <span>•</span>
                                    <span>{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</span>
                                </p>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => approve(item.id)}
                                        disabled={isApproving || isRejecting}
                                        className="px-6 py-2 bg-brand-green text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-900/10 disabled:opacity-50"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => reject(item.id)}
                                        disabled={isApproving || isRejecting}
                                        className="px-6 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-bold hover:bg-red-50 transition-all disabled:opacity-50"
                                    >
                                        Reject
                                    </button>
                                    <Link href={`/dashboard/admin/moderation/${item.id}`} className="ml-auto text-gray-400 hover:text-gray-600 text-sm font-bold flex items-center gap-1">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className="p-20 text-center space-y-4">
                            <div className="size-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 mx-auto">
                                <MdOutlinePanorama size={32} />
                            </div>
                            <p className="text-gray-500 font-medium">Your moderation queue is empty. All clear!</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
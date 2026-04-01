'use client';

import React from 'react';

interface NotificationFilterBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    filterType: string;
    onFilterTypeChange: (type: string) => void;
    filterStatus: string;
    onFilterStatusChange: (status: string) => void;
}

export default function NotificationFilterBar({
    searchQuery,
    onSearchChange,
    filterType,
    onFilterTypeChange,
    filterStatus,
    onFilterStatusChange
}: NotificationFilterBarProps) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:w-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-transparent outline-none transition-all"
                />
            </div>

            <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                <select
                    value={filterStatus}
                    onChange={(e) => onFilterStatusChange(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-[#00853E] focus:border-transparent outline-none cursor-pointer"
                >
                    <option value="All">All Status</option>
                    <option value="Unread">Unread</option>
                    <option value="Read">Read</option>
                </select>

                <select
                    value={filterType}
                    onChange={(e) => onFilterTypeChange(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-[#00853E] focus:border-transparent outline-none cursor-pointer"
                >
                    <option value="All">All Types</option>
                    <option value="New Application">Applications</option>
                    <option value="Payment Received">Payments</option>
                    <option value="Payout Processed">Payouts</option>
                    <option value="Maintenance Request">Maintenance</option>
                    <option value="System Alert">Alerts</option>
                </select>
            </div>
        </div>
    );
}

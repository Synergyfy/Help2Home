'use client';

import React from 'react';
import { NotificationType } from './types';

interface NotificationFiltersProps {
    activeFilter: NotificationType | 'all' | 'unread';
    onFilterChange: (filter: NotificationType | 'all' | 'unread') => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onMarkAllRead: () => void;
    onClearAll: () => void;
}

export default function NotificationFilters({
    activeFilter,
    onFilterChange,
    searchQuery,
    onSearchChange,
    onMarkAllRead,
    onClearAll
}: NotificationFiltersProps) {
    const filters: { id: NotificationType | 'all' | 'unread'; label: string }[] = [
        { id: 'all', label: 'All' },
        { id: 'unread', label: 'Unread' },
        { id: 'payment', label: 'Payments' },
        { id: 'message', label: 'Messages' },
        { id: 'verification', label: 'Verification' },
        { id: 'system', label: 'System' }
    ];

    return (
        <div className="space-y-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-72">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search notifications..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -tranbrand-green-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <button
                        onClick={onMarkAllRead}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex-1 md:flex-none whitespace-nowrap"
                    >
                        Mark all as read
                    </button>
                    <button
                        onClick={onClearAll}
                        className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-gray-300 rounded-lg hover:bg-red-50 flex-1 md:flex-none whitespace-nowrap"
                    >
                        Clear all
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                <div className="flex gap-2">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => onFilterChange(filter.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === filter.id
                                    ? 'bg-[#00853E] text-white'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

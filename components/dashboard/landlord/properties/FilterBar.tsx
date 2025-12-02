'use client';

import React from 'react';

interface FilterBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    statusFilter: string;
    onStatusFilterChange: (status: string) => void;
    viewMode: 'grid' | 'table';
    onViewModeChange: (mode: 'grid' | 'table') => void;
}

export default function FilterBar({
    searchQuery,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    viewMode,
    onViewModeChange
}: FilterBarProps) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto flex-1">
                <div className="relative flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder="Search by title, city or ID..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <select
                    value={statusFilter}
                    onChange={(e) => onStatusFilterChange(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00853E] focus:border-transparent bg-white"
                >
                    <option value="All">All Status</option>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Paused">Paused</option>
                    <option value="Under Review">Under Review</option>
                </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                    onClick={() => onViewModeChange('grid')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-[#00853E]' : 'text-gray-500 hover:text-gray-700'}`}
                    aria-label="Grid View"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                </button>
                <button
                    onClick={() => onViewModeChange('table')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'table' ? 'bg-white shadow text-[#00853E]' : 'text-gray-500 hover:text-gray-700'}`}
                    aria-label="Table View"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

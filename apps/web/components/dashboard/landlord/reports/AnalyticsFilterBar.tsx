'use client';

import React from 'react';

interface AnalyticsFilterBarProps {
    dateRange: string;
    onDateRangeChange: (range: string) => void;
    propertyFilter: string;
    onPropertyFilterChange: (property: string) => void;
    onExport: () => void;
}

export default function AnalyticsFilterBar({
    dateRange,
    onDateRangeChange,
    propertyFilter,
    onPropertyFilterChange,
    onExport
}: AnalyticsFilterBarProps) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                {/* Date Range Selector */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Date Range:</label>
                    <select
                        value={dateRange}
                        onChange={(e) => onDateRangeChange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00853E] focus:border-transparent bg-white text-sm"
                    >
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="90d">Last 90 Days</option>
                        <option value="ytd">Year to Date</option>
                        <option value="1y">Last 12 Months</option>
                    </select>
                </div>

                {/* Property Filter */}
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Property:</label>
                    <select
                        value={propertyFilter}
                        onChange={(e) => onPropertyFilterChange(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00853E] focus:border-transparent bg-white text-sm"
                    >
                        <option value="all">All Properties</option>
                        <option value="prop-1">Lekki Phase 1</option>
                        <option value="prop-2">Yaba Heights</option>
                        <option value="prop-3">Ikeja GRA</option>
                    </select>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full md:w-auto">
                <button
                    onClick={onExport}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm w-full md:w-auto justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Export Report
                </button>
            </div>
        </div>
    );
}

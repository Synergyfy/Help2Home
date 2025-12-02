'use client';

import React from 'react';

interface KPITileProps {
    label: string;
    value: string | number;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    tooltip?: string;
}

export default function KPITile({ label, value, trend, trendValue, tooltip }: KPITileProps) {
    const getTrendColor = () => {
        if (trend === 'up') return 'text-green-600 bg-green-50';
        if (trend === 'down') return 'text-red-600 bg-red-50';
        return 'text-gray-600 bg-gray-50';
    };

    const getTrendIcon = () => {
        if (trend === 'up') return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        );
        if (trend === 'down') return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
        );
        return null;
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group">
            <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-500 font-medium">{label}</span>
                {tooltip && (
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="absolute bottom-full right-0 mb-2 w-48 bg-gray-800 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {tooltip}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-gray-900">{value}</span>
            </div>

            {trend && trendValue && (
                <div className="mt-2 flex items-center gap-1">
                    <span className={`flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded ${getTrendColor()}`}>
                        {getTrendIcon()}
                        {trendValue}
                    </span>
                    <span className="text-xs text-gray-400">vs last period</span>
                </div>
            )}
        </div>
    );
}

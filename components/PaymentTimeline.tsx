'use client';

import React from 'react';

interface TimelineItem {
    id: number;
    month: string;
    day: string;
    status: 'completed' | 'current' | 'upcoming';
}

interface PaymentTimelineProps {
    title: string;
    companyName: string;
    items: TimelineItem[];
    completedCount: number;
    totalCount: number;
}

export default function PaymentTimeline({
    title,
    companyName,
    items,
    completedCount,
    totalCount
}: PaymentTimelineProps) {
    return (
        <div className="bg-white rounded-xl p-4 md:p-8 shadow-sm border border-gray-100 mb-8">
            <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <p className="text-gray-500">{companyName}</p>
            </div>

            <div className="relative mb-12 overflow-x-auto pb-4">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>

                <div className="relative z-10 flex justify-between items-center min-w-[600px] md:min-w-0">
                    {items.map((item) => (
                        <div key={item.id} className="flex flex-col items-center">
                            <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-3 transition-colors
                                    ${item.status === 'completed' ? 'bg-brand-green text-white' :
                                        item.status === 'current' ? 'bg-brand-green text-white' :
                                            'bg-[#6B46C1] text-white'}`}
                            >
                                {item.id}
                            </div>
                            <div className="text-center">
                                <span className={`block text-sm font-medium ${item.status === 'upcoming' ? 'text-[#6B46C1]' : 'text-brand-green'}`}>
                                    {item.month}
                                </span>
                                <span className={`block text-xl font-bold ${item.status === 'upcoming' ? 'text-[#6B46C1]' : 'text-brand-green'}`}>
                                    {item.day}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full border-2 border-brand-green flex items-center justify-center">
                            <div className="w-3 h-3 bg-brand-green rounded-full"></div>
                        </div>
                        <span className="text-gray-600 text-sm">
                            {completedCount}/{totalCount} Milestones Completed
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                            <div className="w-3 h-3 bg-transparent rounded-full"></div>
                        </div>
                        <span className="text-gray-600 text-sm">
                            {totalCount - completedCount}/{totalCount} Milestones Outstanding
                        </span>
                    </div>
                </div>

                <button className="w-full md:w-auto bg-brand-green text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#006c32] transition-colors">
                    Continue Payment
                </button>
            </div>
        </div>
    );
}

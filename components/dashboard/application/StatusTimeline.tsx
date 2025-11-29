import React from 'react';
import { TimelineStep } from './types';

interface StatusTimelineProps {
    timeline: TimelineStep[];
}

export default function StatusTimeline({ timeline }: StatusTimelineProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Application Timeline</h3>

            <div className="relative">
                {/* Vertical Line (Desktop & Mobile) - Simplified to vertical for better responsiveness in this card */}
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-200"></div>

                <div className="space-y-8">
                    {timeline.map((step, index) => {
                        const isCompleted = step.status === 'Completed';
                        const isCurrent = step.status === 'In Progress';
                        const isPending = step.status === 'Pending';
                        const isRejected = step.status === 'Rejected';

                        let iconBg = 'bg-gray-100 text-gray-400 border-gray-200';
                        if (isCompleted) iconBg = 'bg-green-100 text-green-600 border-green-200';
                        if (isCurrent) iconBg = 'bg-purple-100 text-[#6D28D9] border-purple-200 ring-4 ring-purple-50';
                        if (isRejected) iconBg = 'bg-red-100 text-red-600 border-red-200';

                        return (
                            <div key={step.id} className="relative flex gap-4">
                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10 ${iconBg} bg-white`}>
                                    {isCompleted ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : isRejected ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <span className="text-sm font-bold">{index + 1}</span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 pt-1">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                        <h4 className={`font-bold ${isCurrent ? 'text-[#6D28D9]' : 'text-gray-900'}`}>
                                            {step.title}
                                        </h4>
                                        {step.timestamp && (
                                            <span className="text-xs text-gray-500 whitespace-nowrap">{step.timestamp}</span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 mt-1 mb-2">
                                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                                            {step.responsibleParty}
                                        </span>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${isCompleted ? 'bg-green-100 text-green-700' :
                                                isCurrent ? 'bg-purple-100 text-[#6D28D9]' :
                                                    isRejected ? 'bg-red-100 text-red-700' :
                                                        'bg-gray-100 text-gray-500'
                                            }`}>
                                            {step.status}
                                        </span>
                                    </div>

                                    {step.notes && (
                                        <p className="text-sm text-gray-600 mb-2">{step.notes}</p>
                                    )}

                                    {step.actionLabel && (
                                        <button
                                            onClick={step.onAction}
                                            className="mt-1 px-4 py-2 bg-[#6D28D9] text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                                        >
                                            {step.actionLabel}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

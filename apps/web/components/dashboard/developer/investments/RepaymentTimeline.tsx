'use client';

import React from 'react';
import { MdFlag, MdCheckCircle, MdSchedule } from 'react-icons/md';

interface RepaymentTimelineProps {
    duration: number; // in months
    frequency: string; // monthly, quarterly, annually, end-of-term
    startDate?: Date;
}

export default function RepaymentTimeline({ duration, frequency, startDate = new Date() }: RepaymentTimelineProps) {
    // Generate simplified milestones based on frequency
    const getMilestones = () => {
        const milestones = [];
        const start = new Date(startDate);

        milestones.push({
            label: 'Investment Start',
            date: start.toLocaleDateString(),
            type: 'start'
        });

        // Simplified logic: just show first few and last payouts for visualization
        // In a real app, this would generate actual dates based on frequency
        let payoutCount = 0;
        let label = '';

        switch (frequency) {
            case 'monthly': payoutCount = duration; label = 'Monthly Payout'; break;
            case 'quarterly': payoutCount = Math.floor(duration / 3); label = 'Quarterly Payout'; break;
            case 'annually': payoutCount = Math.floor(duration / 12); label = 'Annual Payout'; break;
            case 'end-of-term': payoutCount = 1; label = 'Maturity Payout'; break;
            default: payoutCount = 1; label = 'Payout';
        }

        if (frequency !== 'end-of-term' && payoutCount > 0) {
            milestones.push({
                label: `First ${label}`,
                date: `Month ${frequency === 'monthly' ? 1 : frequency === 'quarterly' ? 3 : 12}`,
                type: 'payout'
            });

            if (payoutCount > 2) {
                milestones.push({
                    label: '...',
                    date: 'Recurring',
                    type: 'gap'
                });
            }
        }

        milestones.push({
            label: 'Maturity & Capital Return',
            date: `Month ${duration}`,
            type: 'end'
        });

        return milestones;
    };

    const milestones = getMilestones();

    return (
        <div className="relative">
            {/* Horizontal Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full z-0"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-6 md:gap-0">
                {milestones.map((m, i) => (
                    <div key={i} className="flex md:flex-col items-center gap-4 md:gap-2 group w-full md:w-auto">
                        {/* Mobile Vertical Line Connector (Pseudo-element logic simpler with border on container in mobile, but here using absolute for desktop) */}
                        <div className={`
                            size-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm shrink-0
                            ${m.type === 'start' ? 'bg-brand-green text-white' :
                                m.type === 'end' ? 'bg-gray-900 text-white' :
                                    m.type === 'gap' ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600'}
                        `}>
                            {m.type === 'start' && <MdFlag size={14} />}
                            {m.type === 'end' && <MdCheckCircle size={14} />}
                            {m.type === 'payout' && <MdSchedule size={14} />}
                            {m.type === 'gap' && <span className="text-xs font-bold tracking-widest">...</span>}
                        </div>

                        <div className="flex flex-col md:items-center text-left md:text-center">
                            <span className="text-xs font-bold text-gray-900">{m.label}</span>
                            <span className="text-[10px] text-gray-500 font-medium">{m.date}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile Vertical Line */}
            <div className="md:hidden absolute top-4 bottom-4 left-4 w-0.5 bg-gray-200 -z-10"></div>
        </div>
    );
}

'use client';

import React from 'react';
import PaymentTimeline from '@/components/PaymentTimeline';

export default function PaymentsPage() {
    const gamepadMilestones = [
        { id: 1, month: 'Jan', day: '01', status: 'completed' as const },
        { id: 2, month: 'Feb', day: '03', status: 'completed' as const },
        { id: 3, month: 'Mar', day: '01', status: 'current' as const },
        { id: 4, month: 'Apr', day: '01', status: 'upcoming' as const },
        { id: 5, month: 'May', day: '01', status: 'upcoming' as const },
        { id: 6, month: 'Jun', day: '01', status: 'upcoming' as const },
    ];

    const tvMilestones = [
        { id: 1, month: 'Jan', day: '01', status: 'completed' as const },
        { id: 2, month: 'Feb', day: '03', status: 'completed' as const },
        { id: 3, month: 'Mar', day: '01', status: 'current' as const },
        { id: 4, month: 'Apr', day: '03', status: 'upcoming' as const },
        { id: 5, month: 'May', day: '02', status: 'upcoming' as const },
        { id: 6, month: 'Jun', day: '05', status: 'upcoming' as const },
    ];

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <PaymentTimeline
                title="Havic HV G-92 Gamepad"
                companyName="Name of the company"
                items={gamepadMilestones}
                completedCount={3}
                totalCount={6}
            />

            <PaymentTimeline
                title="Samsung LCD TV 12”"
                companyName="Name of the company"
                items={tvMilestones}
                completedCount={2}
                totalCount={6}
            />

            {/* Verified Customer Promo */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center max-w-2xl mx-auto">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Become a Verified Customer</h3>
                <p className="text-gray-600 mb-6">
                    Click here and become a verified customer giving you the opportunity to benefit from our Pay4Me
                </p>
                <button className="bg-[#6B46C1] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#553c9a] transition-colors">
                    Request For Pay4Me
                </button>
            </div>
        </div>
    );
}

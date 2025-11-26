'use client';

import React from 'react';
import EmptyState from '@/components/EmptyState';

export default function HistoryPage() {
    return (
        <div className="h-full">
            <EmptyState
                title="No history found"
                description="Your transaction history will appear here."
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[#00853E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
                actionLabel="Refresh"
                onAction={() => console.log('Refresh clicked')}
            />
        </div>
    );
}

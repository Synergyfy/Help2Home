'use client';

import React from 'react';
import EmptyState from '@/components/EmptyState';

export default function LandlordDashboardPage() {
    return (
        <div className="h-full">
            <EmptyState
                title="Welcome to your Dashboard"
                description="Manage your properties, tenants, and payments all in one place."
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-[#00853E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                }
                actionLabel="Add Property"
                onAction={() => console.log('Add Property clicked')}
            />
        </div>
    );
}

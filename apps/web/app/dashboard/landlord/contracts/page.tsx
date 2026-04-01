'use client';

import React from 'react';
import Link from 'next/link';
import ContractList from '@/components/dashboard/landlord/contracts/ContractList';

export default function ContractsListPage() {
    return (
        <div className="pb-20">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Contracts</h1>
                    <p className="text-gray-500">Manage tenancy agreements, track signatures, and view archives.</p>
                </div>
                <Link
                    href="/dashboard/landlord/contracts/new"
                    className="px-4 py-2 bg-[#00853E] text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Generate Contract
                </Link>
            </div>

            <ContractList />
        </div>
    );
}

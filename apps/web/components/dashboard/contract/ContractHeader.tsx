import React from 'react';
import Link from 'next/link';

interface ContractHeaderProps {
    applicationId: string;
    contractTitle: string;
    propertyTitle: string;
}

export default function ContractHeader({ applicationId, contractTitle, propertyTitle }: ContractHeaderProps) {
    return (
        <div className="mb-8">
            <Link
                href={`/dashboard/tenant/applications/${applicationId}`}
                className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-4"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to application
            </Link>

            <div>
                <h1 className="text-2xl font-bold text-gray-900">Contract — {contractTitle}</h1>
                <p className="text-gray-600 mt-1">
                    Application #{applicationId} • <span className="font-medium text-gray-900">{propertyTitle}</span>
                </p>
            </div>
        </div>
    );
}

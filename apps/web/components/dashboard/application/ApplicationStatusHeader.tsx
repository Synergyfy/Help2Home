import React from 'react';
import Link from 'next/link';

interface ApplicationStatusHeaderProps {
    applicationId: string;
    propertyName: string;
    propertyAddress: string;
}

export default function ApplicationStatusHeader({ applicationId, propertyName, propertyAddress }: ApplicationStatusHeaderProps) {
    return (
        <div className="mb-8">
            <Link href="/dashboard/tenant/applications" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Applications
            </Link>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Application #{applicationId}</h1>
                    <p className="text-gray-600 mt-1">
                        <span className="font-medium text-gray-900">{propertyName}</span> — {propertyAddress}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Download Summary
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Message Support
                    </button>
                </div>
            </div>
        </div>
    );
}

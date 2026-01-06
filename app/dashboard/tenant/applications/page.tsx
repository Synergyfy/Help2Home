'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useApplications } from '@/hooks/useApplications';

export default function ApplicationsListPage() {
    const { applications, isLoading } = useApplications();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6D28D9]"></div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 font-sans min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
                        <p className="text-gray-600 mt-1">Track your rent applications and view contracts.</p>
                    </div>
                    <Link
                        href="/dashboard/tenant/apply"
                        className="px-4 py-2 bg-[#6D28D9] text-white font-bold rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        New Application
                    </Link>
                </div>

                <div className="space-y-4">
                    {applications.map((app) => (
                        <Link
                            key={app.id}
                            href={`/dashboard/tenant/applications/${app.id}`}
                            className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-full sm:w-32 h-32 relative rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                    <Image
                                        src={app.propertyImage}
                                        alt={app.propertyTitle}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">{app.propertyTitle}</h3>
                                                <p className="text-sm text-gray-500">{app.propertyAddress}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === 'Under Review' || app.status === 'Pending' ? 'bg-purple-100 text-[#6D28D9]' :
                                                app.status === 'Draft' ? 'bg-gray-100 text-gray-600' :
                                                    app.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                        'bg-green-100 text-green-700'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-2">Application ID: {app.id} • Submitted: {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'Not submitted'}</p>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-gray-500">Progress</span>
                                            <span className="font-medium text-gray-700">{app.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                                            <div
                                                className="bg-[#6D28D9] rounded-full h-1.5 transition-all duration-500"
                                                style={{ width: `${app.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {applications.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed">
                            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900">No applications yet</h3>
                            <p className="text-gray-500 mt-1 mb-6">Start your journey to your new home today.</p>
                            <Link
                                href="/dashboard/tenant/apply"
                                className="px-6 py-2 bg-[#6D28D9] text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Apply for Rent
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

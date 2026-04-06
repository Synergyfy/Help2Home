'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ContractPage() {
    const params = useParams();
    const router = useRouter();
    const applicationId = params.id as string;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 font-sans">
            <div className="max-w-lg w-full text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">Digital Contract Signing</h1>
                <p className="text-gray-500 mb-2 text-sm font-medium uppercase tracking-widest text-emerald-600">Coming Soon</p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Our secure digital contract signing feature is under development. 
                    You will soon be able to review, sign, and track your tenancy agreement electronically — right here.
                </p>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-8 text-left">
                    <p className="text-sm text-emerald-800 font-medium mb-2">What's coming:</p>
                    <ul className="text-sm text-emerald-700 space-y-1">
                        <li>✓ View your full tenancy agreement</li>
                        <li>✓ Sign electronically with OTP verification</li>
                        <li>✓ Track all signers in real-time</li>
                        <li>✓ Full audit trail and document history</li>
                    </ul>
                </div>
                <button
                    onClick={() => router.push(`/dashboard/tenant/applications/${applicationId}`)}
                    className="bg-emerald-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                    Back to Application
                </button>
            </div>
        </div>
    );
}

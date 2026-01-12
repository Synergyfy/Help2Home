'use client';

import React from 'react';
import Link from 'next/link';
import { HiCheckCircle } from 'react-icons/hi2';
import { useUserStore } from '@/store/userStore';
import { ROLE_ACTIONS } from '@/config/propertyConfig';

export default function SuccessStep() {
    const { activeRole } = useUserStore();
    const roleKey = activeRole || 'landlord';
    const config = ROLE_ACTIONS[roleKey] || ROLE_ACTIONS['landlord'];

    return (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in duration-300">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <HiCheckCircle className="text-brand-green text-6xl" />
            </div>

            <h2 className="text-3xl font-bold text-[#111811] mb-4">
                {activeRole === 'caretaker' ? 'Request Sent!' : 'Success!'}
            </h2>

            <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
                {config.successMessage}
            </p>

            <div className="flex items-center gap-4">
                <Link
                    href={`/dashboard/${activeRole}/properties`}
                    className="px-8 py-3 bg-brand-green text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-brand-green/20"
                >
                    View Properties
                </Link>
                <Link
                    href={`/dashboard/${activeRole}`}
                    className="px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all"
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}

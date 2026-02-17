'use client';

import React from 'react';
import PropertyWizard from '@/components/dashboard/shared/Wizard/PropertyWizard';
import { STEP_CONFIG } from '@/config/propertyConfig';
import { FiArrowLeft } from '@/components/shared/Icons';
import Link from 'next/link';

export default function AdminListingPage() {
    return (
        <div className="min-h-screen bg-brand-green-50 pb-20">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Link href="/dashboard/admin/superrole" className="p-2 bg-white rounded-lg border border-brand-green-200 hover:bg-brand-green-50 transition-colors">
                                <FiArrowLeft className="text-brand-green-600" />
                            </Link>
                            <span className="text-[10px] font-black text-brand-green-400 uppercase tracking-widest">Admin Actions</span>
                        </div>
                        <h1 className="text-3xl font-black text-brand-green-900">Create New Listing</h1>
                        <p className="text-brand-green-500">Add a verified property directly to the marketplace as an administrator.</p>
                    </div>

                    <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-200">
                        Institutional Listing Mode
                    </div>
                </div>

                <div className="bg-white rounded-3xl border border-brand-green-200 shadow-xl shadow-brand-green-200/50 overflow-hidden">
                    <PropertyWizard
                        roleKey="landlord"
                        availableStepsKeys={STEP_CONFIG.landlord}
                    />
                </div>
            </div>
        </div>
    );
}

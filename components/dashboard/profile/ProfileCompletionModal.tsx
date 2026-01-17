'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { IoAlertCircle, IoCheckmarkCircle } from 'react-icons/io5';

export default function ProfileCompletionModal() {
    const router = useRouter();
    const { profile, roleData, verified, activeRole, hasHydrated } = useUserStore();
    const [isOpen, setIsOpen] = useState(false);

    const tenantProfile = roleData.tenant;

    const checks = [
        { label: 'Basic Information', done: !!(profile.firstName && profile.lastName && profile.dob && profile.gender) },
        { label: 'Employment Details', done: !!(tenantProfile?.employmentStatus && tenantProfile?.employmentStatus !== 'Unemployed' ? tenantProfile?.employerName : true) },
        { label: 'Next of Kin', done: !!(tenantProfile?.nextOfKin?.name && tenantProfile?.nextOfKin?.phone) },
        { label: 'Guarantor Details', done: !!(tenantProfile?.guarantor?.name && tenantProfile?.guarantor?.phone) },
        { label: 'BVN Verification', done: !!tenantProfile?.isBvnVerified }
    ];

    const isComplete = checks.every(c => c.done);

    useEffect(() => {
        if (hasHydrated && activeRole === 'tenant' && !isComplete) {
            // Check if we are already on the profile page
            if (window.location.pathname !== '/dashboard/tenant/profile') {
                setIsOpen(true);
            }
        } else {
            setIsOpen(false);
        }
    }, [hasHydrated, activeRole, isComplete]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4 backdrop-blur-md">
            <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-10">
                    <div className="w-20 h-20 bg-amber-50 rounded-3xl flex items-center justify-center mb-8 text-amber-500 mx-auto">
                        <IoAlertCircle size={48} />
                    </div>

                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-gray-900 mb-3">Complete Your Profile</h2>
                        <p className="text-gray-500 leading-relaxed font-medium">
                            To access all features and apply for rent financing, you need to complete your tenant profile.
                        </p>
                    </div>

                    <div className="space-y-4 mb-10">
                        {checks.map((check, i) => (
                            <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${check.done ? 'bg-green-50/50 border-green-100 text-green-700' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                                <span className="font-bold">{check.label}</span>
                                {check.done ? <IoCheckmarkCircle className="text-green-500" size={24} /> : <div className="w-6 h-6 rounded-full border-2 border-gray-200" />}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            setIsOpen(false);
                            router.push('/dashboard/tenant/profile');
                        }}
                        className="w-full py-5 bg-brand-green text-white font-black rounded-2xl shadow-xl shadow-green-100 hover:bg-green-700 transition-all hover:scale-[1.02] active:scale-[0.98] text-lg"
                    >
                        Go to Profile Settings
                    </button>
                </div>
            </div>
        </div>
    );
}

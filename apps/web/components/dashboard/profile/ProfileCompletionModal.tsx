'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { IoAlertCircle, IoCheckmarkCircle } from 'react-icons/io5';

export default function ProfileCompletionModal() {
    const router = useRouter();
    const { profile, roleData, verified, activeRole, hasHydrated } = useUserStore();
    const [isOpen, setIsOpen] = useState(false);

    const getChecks = () => {
        const baseChecks = [
            { label: 'Basic Information', done: !!(profile.firstName && profile.lastName && profile.dob && profile.gender) },
        ];

        switch (activeRole) {
            case 'tenant':
                return [
                    ...baseChecks,
                    { label: 'Employment Details', done: !!(roleData.tenant?.employmentStatus && roleData.tenant?.employmentStatus !== 'Unemployed' ? roleData.tenant?.employerName : true) },
                    { label: 'Next of Kin', done: !!(roleData.tenant?.nextOfKin?.name && roleData.tenant?.nextOfKin?.phone) },
                    { label: 'Guarantor Details', done: !!(roleData.tenant?.guarantors && roleData.tenant.guarantors.length > 0) },
                    { label: 'BVN Verification', done: !!roleData.tenant?.isBvnVerified }
                ];
            case 'landlord':
                return [
                    ...baseChecks,
                    { label: 'Bank Details', done: !!roleData.landlord?.isBankVerified },
                    { label: 'Identity Verification', done: !!roleData.landlord?.isIdentityVerified },
                    { label: 'Profile Completion', done: !!roleData.landlord?.isBasicVerified }
                ];
            case 'developer':
                return [
                    ...baseChecks,
                    { label: 'Business Registration', done: !!roleData.developer?.isBusinessVerified },
                    { label: 'Portfolio Details', done: !!(roleData.developer?.portfolio && roleData.developer.portfolio.length > 0) },
                    { label: 'Identity Verification', done: !!roleData.developer?.isIdentityVerified }
                ];
            case 'investor':
                return [
                    ...baseChecks,
                    { label: 'Investment Profile', done: !!roleData.investor?.isBasicVerified },
                    { label: 'Bank Details', done: !!roleData.investor?.isBankVerified },
                    { label: 'Identity Verification', done: !!roleData.investor?.isIdentityVerified }
                ];
            case 'agent':
            case 'caretaker':
                return [
                    ...baseChecks,
                    { label: 'Professional Profile', done: !!(roleData as any)[activeRole as string]?.isBasicVerified },
                    { label: 'Identity Verification', done: !!(roleData as any)[activeRole as string]?.isIdentityVerified }
                ];
            default:
                return baseChecks;
        }
    };

    const checks = getChecks();
    const isComplete = checks.every(c => c.done);

    useEffect(() => {
        if (hasHydrated && activeRole && !isComplete) {
            // Check if we are already on the profile page
            if (window.location.pathname !== `/dashboard/${activeRole}/profile`) {
                setIsOpen(true);
            }
        } else {
            setIsOpen(false);
        }
    }, [hasHydrated, activeRole, isComplete]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-999 flex items-center justify-center p-4 backdrop-blur-md">
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

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                router.push(`/dashboard/${activeRole}/profile`);
                            }}
                            className="w-full py-5 bg-brand-green text-white font-black rounded-2xl shadow-xl shadow-green-100 hover:bg-green-700 transition-all hover:scale-[1.02] active:scale-[0.98] text-lg"
                        >
                            Go to Profile Settings
                        </button>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-full py-4 text-gray-500 font-bold hover:text-gray-800 transition-colors text-base"
                        >
                            Skip for now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

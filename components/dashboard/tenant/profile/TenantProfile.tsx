'use client';

import React, { useState } from 'react';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import ProfileOverview from '@/components/dashboard/profile/ProfileOverview';
import VerificationStatusBar from '@/components/dashboard/profile/VerificationStatusBar';
import PersonalDetailsCard from '@/components/dashboard/profile/PersonalDetailsCard';
import EmploymentInfoCard from '@/components/dashboard/profile/EmploymentInfoCard';
import GuarantorCard from '@/components/dashboard/profile/GuarantorCard';
import DocumentsUploadArea from '@/components/dashboard/profile/DocumentsUploadArea';
import HelpTipsCard from '@/components/dashboard/profile/HelpTipsCard';
import TenantPreferencesTab from './TenantPreferencesTab';
import { ProfileData, EmploymentData, DocumentItem } from '@/components/dashboard/profile/types';

export default function TenantProfile() {
    const [showVerification, setShowVerification] = useState(false);
    const { data: profileQuery, isLoading } = useProfile('tenant');
    const { mutate: updateProfile } = useUpdateProfile('tenant');

    const profile = profileQuery?.data || {};

    // Mock documents state
    const [documents] = useState<DocumentItem[]>([
        { id: '1', type: 'NIN', name: 'National Identity Number (NIN)', status: 'Pending' },
        { id: '2', type: 'BVN', name: 'Bank Verification Number (BVN)', status: 'Pending' },
        { id: '3', type: 'Government ID', name: 'Government ID', status: 'Pending' },
        { id: '4', type: 'Payslip', name: 'Payslips (3 months)', status: 'Pending' },
        { id: '5', type: 'Proof of Address', name: 'Proof of Address', status: 'Pending' }
    ]);

    const verificationSteps = [
        { id: 1, title: 'Personal Details', status: 'Verified' as const },
        { id: 2, title: 'Employment Info', status: 'In Review' as const },
        { id: 3, title: 'Guarantor', status: 'Pending' as const },
        { id: 4, title: 'Documents', status: 'Pending' as const }
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
            </div>
        );
    }

    // Map API data to Card props
    const personalData: ProfileData = {
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        dob: profile.dob || '',
        gender: profile.gender || '',
        maritalStatus: profile.maritalStatus || '',
        address: profile.address || '',
        state: profile.state || '',
        image: profile.image || '/assets/dashboard/profile-placeholder.png'
    };

    const employmentData: EmploymentData = {
        status: profile.employmentStatus || '',
        employerName: profile.employerName || '',
        jobTitle: profile.jobTitle || '',
        salary: profile.monthlySalary || '',
        type: profile.employmentType || '',
        startDate: profile.startDate || '',
        contact: profile.employerContact || ''
    };

    const handleProfileSave = (data: ProfileData) => {
        updateProfile(data);
    };

    const handleEmploymentSave = (data: EmploymentData) => {
        updateProfile({
            employmentStatus: data.status,
            employerName: data.employerName,
            jobTitle: data.jobTitle,
            monthlySalary: data.salary,
            employmentType: data.type,
            startDate: data.startDate,
            employerContact: data.contact
        });
    };

    if (!showVerification) {
        return <ProfileOverview onStartVerification={() => setShowVerification(true)} />;
    }

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <button
                onClick={() => setShowVerification(false)}
                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Profile
            </button>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Identity Verification & Preferences</h1>
                <p className="text-gray-600 mt-2">Complete your profile to unlock all features and start applying for properties.</p>
            </div>

            <VerificationStatusBar currentStep={1} steps={verificationSteps} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* New Preferences Section */}
                    <TenantPreferencesTab profile={profile} />

                    <PersonalDetailsCard
                        data={personalData}
                        onSave={handleProfileSave}
                    />

                    <EmploymentInfoCard
                        data={employmentData}
                        onSave={handleEmploymentSave}
                    />

                    <GuarantorCard
                        guarantors={[]}
                        onAdd={() => { }}
                        onRemove={() => { }}
                    />

                    <DocumentsUploadArea
                        documents={documents}
                        onUpload={() => { }}
                        onRemove={() => { }}
                    />
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-8">
                        <HelpTipsCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

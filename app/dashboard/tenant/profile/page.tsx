'use client';

import React, { useState } from 'react';
import ProfileOverview from '@/components/dashboard/profile/ProfileOverview';
import VerificationStatusBar from '@/components/dashboard/profile/VerificationStatusBar';
import PersonalDetailsCard from '@/components/dashboard/profile/PersonalDetailsCard';
import EmploymentInfoCard from '@/components/dashboard/profile/EmploymentInfoCard';
import GuarantorCard from '@/components/dashboard/profile/GuarantorCard';
import DocumentsUploadArea from '@/components/dashboard/profile/DocumentsUploadArea';
import HelpTipsCard from '@/components/dashboard/profile/HelpTipsCard';
import { ProfileData, EmploymentData, Guarantor, DocumentItem } from '@/components/dashboard/profile/types';

export default function ProfilePage() {
    const [showVerification, setShowVerification] = useState(false);

    // --- State for Verification View ---
    const [profileData, setProfileData] = useState<ProfileData>({
        firstName: 'Mercy',
        lastName: 'Okoli',
        email: 'mercyokoli@gmail.com',
        phone: '08128860774',
        dob: '1995-05-12',
        gender: 'Female',
        maritalStatus: 'Single',
        address: 'Plot 52, Sanni Abacha Street, Zone B, Karu. Abuja',
        state: 'Federal Capital Territory Abuja.',
        image: '/assets/dashboard/profile-placeholder.png'
    });

    const [employmentData, setEmploymentData] = useState<EmploymentData>({
        status: 'Employed',
        employerName: 'Tech Solutions Ltd',
        jobTitle: 'Software Engineer',
        salary: '350,000',
        type: 'Permanent',
        startDate: '2022-03-01',
        contact: 'hr@techsolutions.com'
    });

    const [guarantors, setGuarantors] = useState<Guarantor[]>([]);

    const [documents, setDocuments] = useState<DocumentItem[]>([
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

    const [currentStep, setCurrentStep] = useState(1);

    // Handlers
    const handleProfileSave = (data: ProfileData) => {
        setProfileData(data);
    };

    const handleEmploymentSave = (data: EmploymentData) => {
        setEmploymentData(data);
    };

    const handleAddGuarantor = (guarantor: Omit<Guarantor, 'id' | 'status'>) => {
        const newGuarantor: Guarantor = {
            ...guarantor,
            id: Date.now().toString(),
            status: 'Contacted'
        };
        setGuarantors(prev => [...prev, newGuarantor]);
    };

    const handleRemoveGuarantor = (id: string) => {
        setGuarantors(prev => prev.filter(g => g.id !== id));
    };

    const handleDocumentUpload = (id: string, file: File) => {
        setDocuments(prev => prev.map(doc =>
            doc.id === id ? { ...doc, status: 'In Review' as const } : doc
        ));
    };

    const handleDocumentRemove = (id: string) => {
        setDocuments(prev => prev.map(doc =>
            doc.id === id ? { ...doc, status: 'Pending' as const } : doc
        ));
    };

    if (!showVerification) {
        return <ProfileOverview onStartVerification={() => setShowVerification(true)} />;
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* Back Button */}
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
                <h1 className="text-3xl font-bold text-gray-900">Identity Verification</h1>
                <p className="text-gray-600 mt-2">Complete your profile to unlock all features and start applying for properties.</p>
            </div>

            <VerificationStatusBar currentStep={currentStep} steps={verificationSteps} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2 space-y-6">
                    <PersonalDetailsCard
                        data={profileData}
                        onSave={handleProfileSave}
                    />

                    <EmploymentInfoCard
                        data={employmentData}
                        onSave={handleEmploymentSave}
                    />

                    <GuarantorCard
                        guarantors={guarantors}
                        onAdd={handleAddGuarantor}
                        onRemove={handleRemoveGuarantor}
                    />

                    <DocumentsUploadArea
                        documents={documents}
                        onUpload={handleDocumentUpload}
                        onRemove={handleDocumentRemove}
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

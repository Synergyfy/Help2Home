'use client';

import React, { useState, useEffect } from 'react';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import ProfileOverview from '@/components/dashboard/profile/ProfileOverview';
import PersonalDetailsCard from '@/components/dashboard/profile/PersonalDetailsCard';
import EmploymentInfoCard from '@/components/dashboard/profile/EmploymentInfoCard';
import NextOfKinCard from '@/components/dashboard/profile/NextOfKinCard';
import GuarantorCard from '@/components/dashboard/profile/GuarantorCard';
import VerificationTab from '@/components/dashboard/landlord/profile/VerificationTab';
import HelpTipsCard from '@/components/dashboard/profile/HelpTipsCard';
import TenantPreferencesTab from './TenantPreferencesTab';
import { ProfileData, EmploymentData, Guarantor } from '@/components/dashboard/profile/types';
import { useUserStore } from '@/store/userStore';
import {
    IoPersonOutline,
    IoBriefcaseOutline,
    IoPeopleOutline,
    IoShieldCheckmarkOutline,
    IoDocumentTextOutline,
    IoCheckmarkCircle,
    IoInformationCircleOutline
} from 'react-icons/io5';

type TabType = 'overview' | 'basic' | 'work' | 'nok' | 'guarantor' | 'documents' | 'preferences';

export default function TenantProfile() {
    const [activeTab, setActiveTab] = useState<TabType>('overview');
    const { data: profileQuery, isLoading } = useProfile('tenant');
    const { mutate: updateProfileApi } = useUpdateProfile('tenant');
    const { profile: storeProfile, roleData, updateRoleProfileData } = useUserStore();

    const apiProfile = profileQuery?.data || {};
    const profile = { ...apiProfile, ...storeProfile };
    const tenantProfile = roleData.tenant;

    // Monitoring Verification Status
    const verificationStatus = {
        basic: !!(profile.firstName && profile.lastName && profile.dob),
        work: !!(tenantProfile?.employmentStatus && (tenantProfile.employmentStatus !== 'Unemployed' ? tenantProfile.employerName : true)),
        nok: !!(tenantProfile?.nextOfKin?.name),
        guarantor: !!(tenantProfile?.guarantors && tenantProfile.guarantors.length > 0),
        documents: false // Placeholder for doc check
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
            </div>
        );
    }

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
        status: tenantProfile?.employmentStatus || '',
        employerName: tenantProfile?.employerName || '',
        companyName: tenantProfile?.companyName || '',
        organizationId: tenantProfile?.organizationId || '',
        jobTitle: tenantProfile?.jobTitle || '',
        salary: tenantProfile?.monthlySalary || '',
        type: tenantProfile?.employmentType || '',
        startDate: tenantProfile?.startDate || '',
        contact: tenantProfile?.employerContact || ''
    };

    const handleProfileSave = (data: ProfileData) => {
        updateProfileApi(data);
        useUserStore.getState().updateProfile(data);
    };

    const handleEmploymentSave = (data: EmploymentData) => {
        // Handled within component
    };

    const handleGuarantorAdd = (newG: Omit<Guarantor, 'id' | 'status'>) => {
        const guarantors = tenantProfile?.guarantors || [];
        const guarantorWithId: Guarantor = {
            ...newG,
            id: Math.random().toString(36).substr(2, 9),
            status: 'Contacted'
        };
        updateRoleProfileData('tenant', { guarantors: [...guarantors, guarantorWithId] });
    };

    const handleGuarantorRemove = (id: string) => {
        const guarantors = tenantProfile?.guarantors || [];
        updateRoleProfileData('tenant', { guarantors: guarantors.filter(g => g.id !== id) });
    };

    const tabs: { id: TabType; label: string; icon: any; verified: boolean }[] = [
        { id: 'overview', label: 'Overview', icon: IoInformationCircleOutline, verified: true },
        { id: 'basic', label: 'Basic Info', icon: IoPersonOutline, verified: verificationStatus.basic },
        { id: 'documents', label: 'Documents', icon: IoDocumentTextOutline, verified: verificationStatus.documents },
        { id: 'work', label: 'Work Info', icon: IoBriefcaseOutline, verified: verificationStatus.work },
        { id: 'nok', label: 'Next of Kin', icon: IoPeopleOutline, verified: verificationStatus.nok },
        { id: 'guarantor', label: 'Guarantor', icon: IoShieldCheckmarkOutline, verified: verificationStatus.guarantor },
    ];

    return (
        <div className="max-w-7xl mx-auto pb-20 px-4 md:px-0">
            {/* Header */}
            <div className="mb-10 text-center md:text-left">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Profile & Verification</h1>
                <p className="text-gray-500 mt-2 font-medium text-lg italic">Complete each section to maintain a 100% verification score.</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-100 mb-10 overflow-x-auto no-scrollbar pb-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-8 py-5 text-sm font-black border-b-4 transition-all whitespace-nowrap group ${activeTab === tab.id
                            ? 'border-brand-green text-brand-green bg-green-50/30'
                            : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50/50'
                            }`}
                    >
                        <tab.icon size={20} className={activeTab === tab.id ? 'text-brand-green' : 'text-gray-300 group-hover:text-gray-400'} />
                        {tab.label}
                        {tab.verified && tab.id !== 'overview' && (
                            <IoCheckmarkCircle className="text-green-500 ml-1" />
                        )}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <div className="transition-all duration-300 ease-in-out">
                        {activeTab === 'overview' && (
                            <ProfileOverview onStartVerification={() => setActiveTab('basic')} />
                        )}

                        {activeTab === 'basic' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <PersonalDetailsCard
                                    data={personalData}
                                    onSave={handleProfileSave}
                                />
                                <TenantPreferencesTab profile={profile} />
                            </div>
                        )}

                        {activeTab === 'work' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <EmploymentInfoCard
                                    data={employmentData}
                                    onSave={handleEmploymentSave}
                                />
                            </div>
                        )}

                        {activeTab === 'nok' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <NextOfKinCard />
                            </div>
                        )}

                        {activeTab === 'guarantor' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <GuarantorCard
                                    guarantors={tenantProfile?.guarantors || []}
                                    onAdd={handleGuarantorAdd}
                                    onRemove={handleGuarantorRemove}
                                />
                            </div>
                        )}

                        {activeTab === 'documents' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <VerificationTab role="tenant" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Tips */}
                <div className="hidden lg:block lg:col-span-1">
                    <div className="sticky top-28 space-y-6">
                        <div className="bg-brand-green text-white p-8 rounded-3xl shadow-2xl shadow-green-100">
                            <h3 className="text-xl font-black mb-3">Verification Score</h3>
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-black inline-block py-1 px-2 uppercase rounded-full bg-white/20">
                                            High Approval Chance
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-black">
                                            {Object.values(verificationStatus).filter(Boolean).length * 20}%
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-full bg-white/20">
                                    <div
                                        style={{ width: `${Object.values(verificationStatus).filter(Boolean).length * 20}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white rounded-full transition-all duration-1000"
                                    ></div>
                                </div>
                            </div>
                            <p className="text-sm font-medium opacity-90 leading-relaxed">
                                Users with 100% verification score get approved for rent financing 5x faster.
                            </p>
                        </div>
                        <HelpTipsCard />
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import CaretakerInfoTab from './CaretakerInfoTab';
import VerificationTab from '@/components/dashboard/landlord/profile/VerificationTab';
import PrivacySecurityTab from '@/components/dashboard/landlord/profile/PrivacySecurityTab';
import { MOCK_DOCUMENTS } from '@/lib/mockLandlordData'; // Reusing for now
import ProfileSummaryCard from '@/components/dashboard/landlord/profile/ProfileSummaryCard';
import {
    IoPersonOutline,
    IoDocumentTextOutline,
    IoShieldCheckmarkOutline,
} from 'react-icons/io5';

export default function CaretakerProfile() {
    const [activeTab, setActiveTab] = useState<'info' | 'verification' | 'security'>('info');
    const { data, isLoading } = useProfile('caretaker');

    const tabs = [
        { id: 'info', label: 'Caretaker Details', icon: IoPersonOutline },
        { id: 'verification', label: 'ID & Verification', icon: IoDocumentTextOutline },
        { id: 'security', label: 'Privacy & Security', icon: IoShieldCheckmarkOutline },
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
            </div>
        );
    }

    const profileData = data?.data || {};

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Caretaker Profile</h1>
                <p className="text-gray-500 text-sm font-medium">Manage your skills, services, and profile visibility.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div>
                    <ProfileSummaryCard profile={profileData} />
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2">
                    {/* Tabs Navigation */}
                    <div className="flex border-b border-gray-100 mb-8 overflow-x-auto no-scrollbar pb-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2.5 px-6 py-4 text-sm font-semibold border-b-4 transition-all whitespace-nowrap group ${activeTab === tab.id
                                    ? 'border-brand-green text-brand-green bg-green-50/30'
                                    : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50/50'
                                    }`}
                            >
                                <tab.icon size={18} className={activeTab === tab.id ? 'text-brand-green' : 'text-gray-300 group-hover:text-gray-400'} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {activeTab === 'info' && <CaretakerInfoTab profile={profileData} />}
                        {activeTab === 'verification' && <VerificationTab role="caretaker" />}
                        {activeTab === 'security' && <PrivacySecurityTab />}
                    </div>
                </div>
            </div>
        </div>
    );
}

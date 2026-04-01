'use client';

import { useState } from 'react';
import ProfileSummaryCard from '../../landlord/profile/ProfileSummaryCard';
import BusinessInfoTab from './BusinessInfoTab';
import VerificationTab from '../../landlord/profile/VerificationTab';
import PrivacySecurityTab from '../../landlord/profile/PrivacySecurityTab';
import { MOCK_PROFILE, MOCK_DOCUMENTS } from '@/lib/mockLandlordData';
import { useProfile } from '@/hooks/useProfile';

export default function DeveloperProfile() {
    const [activeTab, setActiveTab] = useState<'info' | 'verification' | 'security'>('info');
    const { data, isLoading } = useProfile('developer');

    const tabs = [
        { id: 'info', label: 'Business Info' },
        { id: 'verification', label: 'Company Verification' },
        { id: 'security', label: 'Privacy & Security' },
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
            </div>
        );
    }

    const profileData = data?.data || MOCK_PROFILE;

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Developer Profile</h1>
                <p className="text-gray-500 text-sm">Manage your company details and verification status.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div>
                    <ProfileSummaryCard profile={profileData} />
                </div>

                {/* Right Column */}
                <div className="lg:col-span-2">
                    {/* Tabs Navigation */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-1 mb-6 flex overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-brand-green text-white shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {activeTab === 'info' && <BusinessInfoTab profile={profileData} />}
                        {activeTab === 'verification' && <VerificationTab role="developer" />}
                        {activeTab === 'security' && <PrivacySecurityTab />}
                    </div>
                </div>
            </div>
        </div>
    );
}

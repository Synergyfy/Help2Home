'use client';

import { useState } from 'react';
import ProfileSummaryCard from './ProfileSummaryCard';
import BasicInfoTab from './BasicInfoTab';
import VerificationTab from './VerificationTab';
import BankPayoutsTab from './BankPayoutsTab';
import PrivacySecurityTab from './PrivacySecurityTab';
import { MOCK_PROFILE, MOCK_DOCUMENTS, MOCK_BANK_ACCOUNTS } from '@/lib/mockLandlordData';
import { useProfile } from '@/hooks/useProfile';

export default function LandlordProfile() {
    const [activeTab, setActiveTab] = useState<'info' | 'verification' | 'bank' | 'security'>('info');
    const { data, isLoading } = useProfile('landlord');

    const tabs = [
        { id: 'info', label: 'Basic Info' },
        { id: 'verification', label: 'Verification Documents' },
        { id: 'bank', label: 'Bank & Payouts' },
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
                <h1 className="text-2xl font-bold text-gray-900">Profile & Verification</h1>
                <p className="text-gray-500 text-sm">Manage your personal details and verification status.</p>
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
                        {activeTab === 'info' && <BasicInfoTab profile={profileData} />}
                        {activeTab === 'verification' && <VerificationTab role="landlord" />}
                        {activeTab === 'bank' && <BankPayoutsTab accounts={MOCK_BANK_ACCOUNTS} />}
                        {activeTab === 'security' && <PrivacySecurityTab />}
                    </div>
                </div>
            </div>
        </div>
    );
}

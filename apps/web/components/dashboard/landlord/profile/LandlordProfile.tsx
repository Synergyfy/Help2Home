'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProfileSummaryCard from './ProfileSummaryCard';
import BasicInfoTab from './BasicInfoTab';
import VerificationTab from './VerificationTab';
import BankPayoutsTab from './BankPayoutsTab';
import PrivacySecurityTab from './PrivacySecurityTab';
import { useProfile } from '@/hooks/useProfile';
import {
    IoPersonOutline,
    IoDocumentTextOutline,
    IoCardOutline,
    IoShieldCheckmarkOutline,
} from 'react-icons/io5';

type TabId = 'info' | 'verification' | 'bank' | 'security';

export default function LandlordProfile() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<TabId>('info');
    const { data, isLoading } = useProfile('landlord');

    useEffect(() => {
        const tab = searchParams.get('tab') as TabId;
        if (tab && ['info', 'verification', 'bank', 'security'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [searchParams]);

    const tabs = [
        { id: 'info', label: 'Basic Info', icon: IoPersonOutline },
        { id: 'verification', label: 'Documents', icon: IoDocumentTextOutline },
        { id: 'bank', label: 'Bank & Payouts', icon: IoCardOutline },
        { id: 'security', label: 'Privacy & Security', icon: IoShieldCheckmarkOutline },
    ];

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
            </div>
        );
    }

    if (!data?.data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
                <p className="text-gray-500 mb-6">We could not load your profile data.</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green/90"
                >
                  Retry
                </button>
            </div>
        );
    }

    // The backend wraps the response in `{ data: { ... } }`, and axios wraps THAT in `{ data: ... }`
    // So data.data is `{ data: { ... } }`. We need to extract the inner object.
    const rawData = data.data?.data || data.data || {};
    
    // Map backend generic data to UI expected formats
    const profileData = {
        ...rawData,
        displayName: `${rawData.firstName || ''} ${rawData.lastName || ''}`.trim() || 'Landlord',
        verificationStatus: rawData.verified ? 'verified' : 'pending',
        verificationDate: rawData.verified ? new Date().toLocaleDateString() : '',
        role: 'landlord',
        avatarUrl: rawData.avatar,
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Profile & Verification</h1>
                <p className="text-gray-500 text-sm font-medium">Complete each section to maintain a verified professional status.</p>
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
                                onClick={() => setActiveTab(tab.id as 'info' | 'verification' | 'bank' | 'security')}
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
                        {activeTab === 'info' && <BasicInfoTab profile={profileData} />}
                        {activeTab === 'verification' && <VerificationTab role="landlord" />}
                        {activeTab === 'bank' && <BankPayoutsTab accounts={profileData.bankAccounts || []} />}
                        {activeTab === 'security' && <PrivacySecurityTab />}
                    </div>
                </div>
            </div>
        </div>
    );
}

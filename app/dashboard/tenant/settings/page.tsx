'use client';

import React, { useState, useEffect } from 'react';
import SettingsSidebar, { SettingsTab } from '@/components/dashboard/settings/SettingsSidebar';
import AccountSection from '@/components/dashboard/settings/AccountSection';
import SecuritySection from '@/components/dashboard/settings/SecuritySection';
import NotificationPreferences from '@/components/dashboard/settings/NotificationPreferences';
import PaymentsSection from '@/components/dashboard/settings/PaymentsSection';
import SessionsSection from '@/components/dashboard/settings/SessionsSection';
import { UserProfile, SecuritySettings, NotificationPreference, BankAccount, PaymentMethod, Session, NotificationType } from '@/components/dashboard/settings/types';
import { getSettingsData, updateProfile, updatePassword, toggleTwoFactor, updateNotificationPreference, unlinkBankAccount, removePaymentMethod, terminateSession } from '@/utils/mockSettingsApi';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<SettingsTab>('account');
    const [isLoading, setIsLoading] = useState(true);

    // State
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [security, setSecurity] = useState<SecuritySettings | null>(null);
    const [preferences, setPreferences] = useState<NotificationPreference[]>([]);
    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
    const [sessions, setSessions] = useState<Session[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getSettingsData();
                setProfile(data.profile);
                setSecurity(data.security);
                setPreferences(data.preferences);
                setBankAccounts(data.bankAccounts);
                setPaymentMethods(data.paymentMethods);
                setSessions(data.sessions);
            } catch (error) {
                console.error("Failed to load settings", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const handleUpdateProfile = async (data: Partial<UserProfile>) => {
        const updated = await updateProfile(data);
        setProfile(updated);
    };

    const handleUpdatePassword = async (current: string, newPass: string) => {
        await updatePassword(current, newPass);
        if (security) {
            setSecurity({ ...security, lastPasswordChange: new Date().toLocaleDateString() });
        }
    };

    const handleToggleTwoFactor = async (enabled: boolean) => {
        const result = await toggleTwoFactor(enabled);
        if (security) {
            setSecurity({ ...security, twoFactorEnabled: result });
        }
    };

    const handleUpdatePreference = async (type: NotificationType, channel: 'email' | 'sms' | 'push', enabled: boolean) => {
        const updated = await updateNotificationPreference(type, channel, enabled);
        setPreferences(updated);
    };

    const handleUnlinkBank = async (id: string) => {
        if (confirm("Are you sure you want to unlink this bank account?")) {
            const updated = await unlinkBankAccount(id);
            setBankAccounts(updated);
        }
    };

    const handleRemoveCard = async (id: string) => {
        if (confirm("Are you sure you want to remove this card?")) {
            const updated = await removePaymentMethod(id);
            setPaymentMethods(updated);
        }
    };

    const handleTerminateSession = async (id: string) => {
        const updated = await terminateSession(id);
        setSessions(updated);
    };

    const handleAddBank = async (data: { bankName: string; accountNumber: string; accountHolder: string }) => {
        // In a real app, this would call an API
        const newAccount: BankAccount = {
            id: `bank_${Date.now()}`,
            bankName: data.bankName,
            accountNumberMasked: `**** ${data.accountNumber.slice(-4)}`,
            isPrimary: bankAccounts.length === 0,
            isVerified: true,
            dateLinked: new Date().toLocaleDateString()
        };
        setBankAccounts([...bankAccounts, newAccount]);
    };

    const handleSetPrimaryBank = async (id: string) => {
        setBankAccounts(prev => prev.map(acc => ({
            ...acc,
            isPrimary: acc.id === id
        })));
    };

    const handleSetDefaultCard = async (id: string) => {
        setPaymentMethods(prev => prev.map(card => ({
            ...card,
            isDefault: card.id === id
        })));
    };

    const handleAddCard = async (data: { last4: string; expiry: string; cardholderName: string; brand: 'visa' | 'mastercard' | 'verve' }) => {
        const newCard: PaymentMethod = {
            id: `card_${Date.now()}`,
            type: 'card',
            last4: data.last4,
            expiry: data.expiry,
            cardholderName: data.cardholderName,
            isDefault: paymentMethods.length === 0,
            brand: data.brand
        };
        setPaymentMethods([...paymentMethods, newCard]);
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading settings...</div>;
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-24">
                        <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    {activeTab === 'account' && profile && (
                        <AccountSection
                            profile={profile}
                            onUpdateProfile={handleUpdateProfile}
                        />
                    )}
                    {activeTab === 'security' && security && (
                        <SecuritySection
                            settings={security}
                            onUpdatePassword={handleUpdatePassword}
                            onToggleTwoFactor={handleToggleTwoFactor}
                            onChangeEmail={async (email) => {
                                alert(`Email change request sent to ${email}`);
                                handleUpdateProfile({ email });
                            }}
                        />
                    )}
                    {activeTab === 'notifications' && (
                        <NotificationPreferences
                            preferences={preferences}
                            onUpdatePreference={handleUpdatePreference}
                        />
                    )}
                    {activeTab === 'payments' && (
                        <PaymentsSection
                            bankAccounts={bankAccounts}
                            paymentMethods={paymentMethods}
                            onUnlinkBank={handleUnlinkBank}
                            onRemoveCard={handleRemoveCard}
                            onAddBank={handleAddBank}
                            onSetPrimaryBank={handleSetPrimaryBank}
                            onAddCard={handleAddCard}
                            onSetDefaultCard={handleSetDefaultCard}
                        />
                    )}
                    {activeTab === 'sessions' && (
                        <SessionsSection
                            sessions={sessions}
                            onTerminateSession={handleTerminateSession}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

'use client';

import React from 'react';
import {
    FiUser,
    FiLock,
    FiBell,
    FiCreditCard,
    FiCheckCircle,
    FiUsers
} from 'react-icons/fi';
import SettingCard from '@/components/dashboard/settings/SettingCard';

export default function SettingsPage() {
    return (
        <div className="max-w-6xl mx-auto pb-20">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
                <p className="text-gray-500 mt-2">Manage your account preferences, security, and notification settings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SettingCard
                    title="Basic Information"
                    description="Update your personal details, business name, and profile photo."
                    icon={FiUser}
                    href="/dashboard/landlord/profile"
                />

                <SettingCard
                    title="Security & Privacy"
                    description="Manage your password, enable two-factor authentication, and monitor active sessions."
                    icon={FiLock}
                    href="/dashboard/landlord/settings/security"
                    badge="Important"
                    badgeColor="bg-amber-100 text-amber-700"
                />

                <SettingCard
                    title="Notification Settings"
                    description="Configure how you want to be notified about payments, applications, and maintenance."
                    icon={FiBell}
                    href="/dashboard/landlord/settings/notifications"
                />

                <SettingCard
                    title="Payout & Bank Settings"
                    description="Manage your bank accounts and choose your preferred payout frequency."
                    icon={FiCreditCard}
                    href="/dashboard/landlord/payments/settings"
                />

                <SettingCard
                    title="Verification"
                    description="Verify your identity and property ownership documents to establish trust."
                    icon={FiCheckCircle}
                    href="/dashboard/landlord/profile?tab=verification"
                />

                <SettingCard
                    title="Team & Permissions"
                    description="Invite and manage caretakers or staff members to help manage your properties."
                    icon={FiUsers}
                    href="/dashboard/landlord/team"
                />
            </div>

            {/* Help & Support Section */}
            <div className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Need help with your settings?</h2>
                        <p className="text-gray-500 mt-1">Our support team is available 24/7 to assist you with any account issues.</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                            Documentation
                        </button>
                        <button className="px-6 py-2.5 bg-brand-green text-white rounded-xl font-medium hover:bg-green-700 transition-colors">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

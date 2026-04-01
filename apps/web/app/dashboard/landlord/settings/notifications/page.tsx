'use client';

import React from 'react';
import Link from 'next/link';
import NotificationSettingsForm from '@/components/dashboard/landlord/notifications/NotificationSettingsForm';

export default function NotificationSettingsPage() {
    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-8">
                <Link href="/dashboard/landlord/notifications" className="text-gray-500 hover:text-gray-700 text-sm mb-2 inline-block">
                    ← Back to Notifications
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>
                <p className="text-gray-500">Manage how and when you receive alerts.</p>
            </div>

            <NotificationSettingsForm />
        </div>
    );
}

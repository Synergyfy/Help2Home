'use client';

import React from 'react';
import { NotificationPreference, NotificationType } from './types';

interface NotificationPreferencesProps {
    preferences: NotificationPreference[];
    onUpdatePreference: (type: NotificationType, channel: 'email' | 'sms' | 'push', enabled: boolean) => void;
}

const TYPE_LABELS: Record<NotificationType, string> = {
    payment_due: 'Payment Due Reminders',
    payment_confirmation: 'Payment Confirmations',
    application_status: 'Application Status Updates',
    contract_action: 'Contract Actions',
    message: 'Messages from Landlord/Agent',
    marketing: 'Promotional Emails & News'
};

export default function NotificationPreferences({ preferences, onUpdatePreference }: NotificationPreferencesProps) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
                <p className="text-sm text-gray-500">Choose how and when we contact you.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-500">
                    <div className="col-span-1">Notification Type</div>
                    <div className="text-center">Email</div>
                    <div className="text-center">SMS</div>
                    <div className="text-center">Push</div>
                </div>

                <div className="divide-y divide-gray-100">
                    {preferences.map((pref) => (
                        <div key={pref.type} className="grid grid-cols-4 gap-4 p-4 items-center">
                            <div className="col-span-1 font-medium text-gray-900">
                                {TYPE_LABELS[pref.type]}
                            </div>

                            <div className="flex justify-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={pref.channels.email}
                                        onChange={(e) => onUpdatePreference(pref.type, 'email', e.target.checked)}
                                    />
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:tranbrand-green-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00853E]"></div>
                                </label>
                            </div>

                            <div className="flex justify-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={pref.channels.sms}
                                        onChange={(e) => onUpdatePreference(pref.type, 'sms', e.target.checked)}
                                    />
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:tranbrand-green-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00853E]"></div>
                                </label>
                            </div>

                            <div className="flex justify-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={pref.channels.push}
                                        onChange={(e) => onUpdatePreference(pref.type, 'push', e.target.checked)}
                                    />
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:tranbrand-green-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00853E]"></div>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

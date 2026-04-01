'use client';

import React from 'react';
import { ReminderSettings as ReminderSettingsType } from './types';

interface ReminderSettingsProps {
    settings: ReminderSettingsType;
    onToggle: (type: 'sms' | 'email') => void;
}

export default function ReminderSettings({ settings, onToggle }: ReminderSettingsProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Reminder Settings</h2>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-gray-900">SMS Reminders</p>
                        <p className="text-sm text-gray-500">Get text alerts before due dates</p>
                    </div>
                    <button
                        onClick={() => onToggle('sms')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:ring-offset-2 ${settings.smsEnabled ? 'bg-[#6D28D9]' : 'bg-gray-200'}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.smsEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-gray-900">Email Reminders</p>
                        <p className="text-sm text-gray-500">Receive detailed payment breakdowns</p>
                    </div>
                    <button
                        onClick={() => onToggle('email')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:ring-offset-2 ${settings.emailEnabled ? 'bg-[#6D28D9]' : 'bg-gray-200'}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.emailEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
            </div>

            {settings.nextReminderDate && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                        Next reminder scheduled for: <span className="font-semibold text-gray-900">{settings.nextReminderDate}</span>
                    </p>
                </div>
            )}
        </div>
    );
}

'use client';

import React, { useState } from 'react';
import { NotificationPreference, NotificationType } from './types';
import { IoCloseOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';

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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSmsToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

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
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00853E]"></div>
                                </label>
                            </div>

                            <div className="flex justify-center">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={pref.channels.sms}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsModalOpen(true);
                                        }}
                                        onChange={() => {}} // Dummy to avoid console warning
                                    />
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00853E]"></div>
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
                                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00853E]"></div>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Coming Soon Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2rem] shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in duration-300">
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-brand-green mx-auto mb-6">
                                <IoChatbubbleEllipsesOutline size={32} />
                            </div>
                            
                            <h3 className="text-xl font-black text-gray-900 mb-2">SMS Notifications</h3>
                            <p className="text-gray-500 font-medium leading-relaxed mb-8">
                                We're currently finalizing our SMS integration. This feature will be available in a future update!
                            </p>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full py-4 bg-brand-green text-white font-black rounded-2xl shadow-lg shadow-green-100 hover:bg-green-700 transition-all active:scale-[0.98]"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

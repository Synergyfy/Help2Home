'use client';

import React, { useState } from 'react';
import { MOCK_NOTIFICATION_SETTINGS, UserNotificationSettings, NotificationType } from '@/lib/mockNotificationData';

export default function NotificationSettingsForm() {
    const [settings, setSettings] = useState<UserNotificationSettings>(MOCK_NOTIFICATION_SETTINGS);
    const [isSaving, setIsSaving] = useState(false);

    const handleChannelToggle = (type: NotificationType, channel: 'inApp' | 'email' | 'sms') => {
        setSettings(prev => ({
            ...prev,
            preferences: prev.preferences.map(pref =>
                pref.type === type
                    ? { ...pref, channels: { ...pref.channels, [channel]: !pref.channels[channel] } }
                    : pref
            )
        }));
    };

    const handleGlobalToggle = () => {
        setSettings(prev => ({ ...prev, globalEnabled: !prev.globalEnabled }));
    };

    const handleDNDToggle = () => {
        setSettings(prev => ({
            ...prev,
            doNotDisturb: { ...prev.doNotDisturb, enabled: !prev.doNotDisturb.enabled }
        }));
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            alert('Settings saved successfully!');
        }, 1000);
    };

    return (
        <div className="space-y-8">
            {/* Global Settings */}
            <section className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Global Notifications</h2>
                        <p className="text-sm text-gray-500">Enable or disable all notifications.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings.globalEnabled}
                            onChange={handleGlobalToggle}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00853E]"></div>
                    </label>
                </div>

                <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-medium text-gray-900">Do Not Disturb</h3>
                            <p className="text-sm text-gray-500">Pause notifications during specific hours.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.doNotDisturb.enabled}
                                onChange={handleDNDToggle}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00853E]"></div>
                        </label>
                    </div>

                    {settings.doNotDisturb.enabled && (
                        <div className="flex items-center gap-4 pl-4 border-l-2 border-gray-100">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Start Time</label>
                                <input
                                    type="time"
                                    value={settings.doNotDisturb.startTime}
                                    onChange={(e) => setSettings(prev => ({ ...prev, doNotDisturb: { ...prev.doNotDisturb, startTime: e.target.value } }))}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                />
                            </div>
                            <span className="text-gray-400 mt-5">to</span>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">End Time</label>
                                <input
                                    type="time"
                                    value={settings.doNotDisturb.endTime}
                                    onChange={(e) => setSettings(prev => ({ ...prev, doNotDisturb: { ...prev.doNotDisturb, endTime: e.target.value } }))}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Per-Event Settings */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900">Notification Preferences</h2>
                    <p className="text-sm text-gray-500">Customize how you receive alerts for each event.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-900">Event Type</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 text-center w-24">In-App</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 text-center w-24">Email</th>
                                <th className="px-6 py-4 font-semibold text-gray-900 text-center w-24">SMS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {settings.preferences.map((pref) => (
                                <tr key={pref.type} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{pref.type}</td>
                                    <td className="px-6 py-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={pref.channels.inApp}
                                            onChange={() => handleChannelToggle(pref.type, 'inApp')}
                                            className="w-4 h-4 text-[#00853E] border-gray-300 rounded focus:ring-[#00853E]"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={pref.channels.email}
                                            onChange={() => handleChannelToggle(pref.type, 'email')}
                                            className="w-4 h-4 text-[#00853E] border-gray-300 rounded focus:ring-[#00853E]"
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={pref.channels.sms}
                                            onChange={() => handleChannelToggle(pref.type, 'sms')}
                                            className="w-4 h-4 text-[#00853E] border-gray-300 rounded focus:ring-[#00853E]"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-2 bg-[#00853E] text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
                >
                    {isSaving ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </button>
            </div>
        </div>
    );
}

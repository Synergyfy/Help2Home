'use client';

import React, { useState } from 'react';
import SessionManager from '@/components/dashboard/settings/SessionManager';
import ReAuthModal from '@/components/dashboard/common/ReAuthModal';

export default function SecuritySettingsPage() {
    const [isReAuthOpen, setIsReAuthOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
    const [mfaEnabled, setMfaEnabled] = useState(false);

    const handleToggleMFA = () => {
        setPendingAction(() => () => {
            setMfaEnabled(prev => !prev);
        });
        setIsReAuthOpen(true);
    };

    const handleConfirmReAuth = () => {
        setIsReAuthOpen(false);
        if (pendingAction) {
            pendingAction();
            setPendingAction(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
                <p className="text-gray-500">Manage your password, 2FA, and active sessions.</p>
            </div>

            <div className="space-y-8">
                {/* Password Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900">Password</h2>
                        <p className="text-sm text-gray-500">Update your password to keep your account secure.</p>
                    </div>
                    <div className="p-6">
                        <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                            Change Password
                        </button>
                    </div>
                </div>

                {/* MFA Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Two-Factor Authentication (2FA)</h2>
                            <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                        </div>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                            <input
                                type="checkbox"
                                name="toggle"
                                id="toggle"
                                checked={mfaEnabled}
                                onChange={handleToggleMFA}
                                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-full checked:border-[#00853E]"
                                style={{ right: mfaEnabled ? '0' : 'auto', left: mfaEnabled ? 'auto' : '0' }}
                            />
                            <label
                                htmlFor="toggle"
                                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${mfaEnabled ? 'bg-[#00853E]' : 'bg-gray-300'}`}
                            ></label>
                        </div>
                    </div>
                    <div className="p-6 bg-gray-50">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">Why use 2FA?</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sessions Section */}
                <SessionManager />
            </div>

            <ReAuthModal
                isOpen={isReAuthOpen}
                onClose={() => setIsReAuthOpen(false)}
                onConfirm={handleConfirmReAuth}
                actionName={mfaEnabled ? "disable 2FA" : "enable 2FA"}
            />
        </div>
    );
}

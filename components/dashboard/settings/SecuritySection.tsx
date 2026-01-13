'use client';

import React, { useState } from 'react';
import { SecuritySettings } from './types';

interface SecuritySectionProps {
    settings: SecuritySettings;
    onUpdatePassword: (current: string, newPass: string) => Promise<void>;
    onToggleTwoFactor: (enabled: boolean) => Promise<void>;
    onChangeEmail: (newEmail: string) => Promise<void>;
}

export default function SecuritySection({ settings, onUpdatePassword, onToggleTwoFactor, onChangeEmail }: SecuritySectionProps) {
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSavingPassword, setIsSavingPassword] = useState(false);

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match.");
            return;
        }
        setIsSavingPassword(true);
        try {
            await onUpdatePassword(currentPassword, newPassword);
            setShowPasswordForm(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            alert("Password updated successfully.");
        } catch (error) {
            alert("Failed to update password.");
        } finally {
            setIsSavingPassword(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
                <p className="text-sm text-gray-500">Manage your password and security preferences.</p>
            </div>

            {/* Password Change */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-bold text-gray-900">Password</h3>
                        <p className="text-sm text-gray-500">Last changed: {settings.lastPasswordChange}</p>
                    </div>
                    {!showPasswordForm && (
                        <button
                            onClick={() => setShowPasswordForm(true)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                        >
                            Change Password
                        </button>
                    )}
                </div>

                {showPasswordForm && (
                    <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md animate-fade-in">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                                required
                                minLength={8}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none"
                                required
                            />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={isSavingPassword}
                                className="px-4 py-2 bg-[#00853E] text-white font-medium rounded-lg hover:bg-[#006b32] disabled:opacity-50"
                            >
                                {isSavingPassword ? 'Updating...' : 'Update Password'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowPasswordForm(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-900"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-gray-900">Two-Factor Authentication (2FA)</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={settings.twoFactorEnabled}
                            onChange={(e) => onToggleTwoFactor(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:tranbrand-green-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00853E]"></div>
                    </label>
                </div>
            </div>

            {/* Contact Info Change */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900">Email Address</p>
                            <p className="text-sm text-gray-500">Used for login and notifications</p>
                        </div>
                        <button
                            onClick={() => {
                                const email = prompt("Enter new email address:");
                                if (email) onChangeEmail(email);
                            }}
                            className="text-[#00853E] font-medium hover:underline"
                        >
                            Change
                        </button>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900">Phone Number</p>
                            <p className="text-sm text-gray-500">Used for SMS notifications and 2FA</p>
                        </div>
                        <button
                            onClick={() => alert("Phone change flow would open here")}
                            className="text-[#00853E] font-medium hover:underline"
                        >
                            Change
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

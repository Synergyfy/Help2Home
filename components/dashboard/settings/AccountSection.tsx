'use client';

import React, { useState } from 'react';
import { UserProfile } from './types';

interface AccountSectionProps {
    profile: UserProfile;
    onUpdateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

export default function AccountSection({ profile, onUpdateProfile }: AccountSectionProps) {
    const [displayName, setDisplayName] = useState(profile.displayName);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onUpdateProfile({ displayName });
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update profile", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Account Information</h2>
                <p className="text-sm text-gray-500">Manage your personal details.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={profile.fullName}
                            disabled
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                        />
                        <p className="mt-1 text-xs text-gray-400">Contact support to change your legal name.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors ${isEditing
                                        ? 'border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] bg-white'
                                        : 'border-gray-200 bg-gray-50 text-gray-700'
                                    }`}
                            />
                            {isEditing ? (
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-[#00853E] text-white font-medium rounded-lg hover:bg-[#006b32] disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save'}
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={profile.email}
                            disabled
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                        />
                        <p className="mt-1 text-xs text-gray-400">Go to Security settings to change email.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            value={profile.phone}
                            disabled
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                        />
                        <p className="mt-1 text-xs text-gray-400">Go to Security settings to change phone.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input
                            type="text"
                            value={profile.dateOfBirth}
                            disabled
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@/components/providers/UserContext';
import { useUserStore } from '@/store/userStore';

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
    const { user: contextUser, updateUser, getDefaultAvatar } = useUser();
    const { profile, fullName, email: storeEmail, updateProfile, setUser } = useUserStore();

    const [formData, setFormData] = useState({
        firstName: contextUser?.firstName || profile.firstName || fullName?.split(' ')[0] || '',
        lastName: contextUser?.lastName || profile.lastName || fullName?.split(' ')[1] || '',
        email: contextUser?.email || storeEmail || '',
        gender: (contextUser?.gender || profile.gender?.toLowerCase() || 'other') as 'male' | 'female' | 'other'
    });
    const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.image || null);

    // Sync if profile changes in store
    useEffect(() => {
        if (isOpen) {
            setFormData({
                firstName: contextUser?.firstName || profile.firstName || fullName?.split(' ')[0] || '',
                lastName: contextUser?.lastName || profile.lastName || fullName?.split(' ')[1] || '',
                email: contextUser?.email || storeEmail || '',
                gender: (contextUser?.gender || profile.gender?.toLowerCase() || 'other') as 'male' | 'female' | 'other'
            });
            setAvatarPreview(profile.image || null);
        }
    }, [isOpen, profile, contextUser]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // setAvatarFile(file); // Removed unused call
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Update context
        updateUser({
            ...formData,
            avatarUrl: avatarPreview || contextUser?.avatarUrl
        });

        // Update store
        updateProfile({
            firstName: formData.firstName,
            lastName: formData.lastName,
            gender: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1),
            image: avatarPreview || profile.image
        });

        setUser({
            fullName: `${formData.firstName} ${formData.lastName}`
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                                    <img
                                        src={avatarPreview || getDefaultAvatar()}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <label className="absolute bottom-0 right-0 bg-[#6D28D9] text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Click camera icon to change photo</p>
                        </div>

                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9] outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9] outline-none transition-all"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed"
                                disabled
                            />
                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6D28D9] focus:border-[#6D28D9] outline-none transition-all bg-white"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Prefer not to say</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-6 py-3 bg-[#6D28D9] text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

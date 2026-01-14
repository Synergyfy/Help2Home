'use client';

import React, { useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { useNotificationStore } from '@/store/notificationStore';
import ProfileOnboardingView from '@/components/dashboard/profile/ProfileOnboardingView';
import SecurityVerification from '@/components/dashboard/profile/SecurityVerification';
import { HiOutlineUser, HiOutlinePencilSquare, HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope, HiOutlinePhoto } from 'react-icons/hi2';
import FadeIn from '@/components/FadeIn';
import { toast } from 'react-toastify';

export default function UnifiedProfilePage() {
    const { profile, updateProfile, activeRole } = useUserStore();
    const { addNotification } = useNotificationStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(profile);

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
        addNotification({
            title: 'Profile Updated',
            message: 'Your personal information has been successfully updated.',
            type: 'success'
        });
        toast.success('Profile updated successfully!');
    };

    return (
        <FadeIn>
            <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 pb-20">
                {/* Header Section with Profile Card */}
                <div className="relative">
                    <div className="h-48 bg-linear-to-r from-brand-green to-green-700 rounded-3xl overflow-hidden shadow-lg">
                        <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                            <HiOutlineUser size={300} className="text-white" />
                        </div>
                    </div>

                    <div className="px-6 -mt-12">
                        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center md:items-end gap-8">
                            <div className="relative group">
                                <div className="size-32 md:size-40 rounded-3xl border-4 border-white overflow-hidden shadow-2xl bg-gray-100">
                                    <img
                                        src={profile.image || '/assets/dashboard/profile-placeholder.png'}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                        <HiOutlinePhoto size={32} className="text-white" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 size-10 rounded-xl bg-brand-green border-4 border-white flex items-center justify-center text-white shadow-lg">
                                    <HiOutlineCheckCircle size={20} />
                                </div>
                            </div>

                            <div className="flex-1 text-center md:text-left space-y-2">
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                                        {profile.firstName} {profile.lastName}
                                    </h1>
                                    <span className="px-3 py-1 bg-brand-green/10 text-brand-green text-[10px] font-black uppercase tracking-widest rounded-lg border border-brand-green/20 w-fit mx-auto md:mx-0">
                                        {activeRole}
                                    </span>
                                </div>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-bold text-gray-500">
                                    <span className="flex items-center gap-1.5"><HiOutlineEnvelope className="text-brand-green" /> daniel@example.com</span>
                                    <span className="flex items-center gap-1.5"><HiOutlinePhone className="text-brand-green" /> +234 812 345 6789</span>
                                    <span className="flex items-center gap-1.5"><HiOutlineMapPin className="text-brand-green" /> {profile.state || 'Lagos, Nigeria'}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg ${isEditing ? 'bg-gray-100 text-gray-600' : 'bg-brand-green text-white hover:bg-green-700 shadow-brand-green/20'
                                    }`}
                            >
                                <HiOutlinePencilSquare size={20} />
                                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Form & Onboarding Data */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Basic Info Form */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                                {isEditing && (
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-brand-green text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-green-700 transition-all"
                                    >
                                        Save Changes
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <ProfileInput
                                    label="First Name"
                                    value={formData.firstName}
                                    disabled={!isEditing}
                                    onChange={(v) => setFormData({ ...formData, firstName: v })}
                                />
                                <ProfileInput
                                    label="Last Name"
                                    value={formData.lastName}
                                    disabled={!isEditing}
                                    onChange={(v) => setFormData({ ...formData, lastName: v })}
                                />
                                <ProfileInput
                                    label="Gender"
                                    value={formData.gender}
                                    disabled={!isEditing}
                                    onChange={(v) => setFormData({ ...formData, gender: v })}
                                />
                                <ProfileInput
                                    label="Marital Status"
                                    value={formData.maritalStatus}
                                    disabled={!isEditing}
                                    onChange={(v) => setFormData({ ...formData, maritalStatus: v })}
                                />
                                <div className="md:col-span-2">
                                    <ProfileInput
                                        label="Address"
                                        value={formData.address}
                                        disabled={!isEditing}
                                        onChange={(v) => setFormData({ ...formData, address: v })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Role-Specific Onboarding Details */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <ProfileOnboardingView />
                        </div>
                    </div>

                    {/* Right Column: Verification & Security */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-8">Trust & Safety</h3>
                            <SecurityVerification />
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

function ProfileInput({ label, value, disabled, onChange }: { label: string, value: string, disabled: boolean, onChange: (v: string) => void }) {
    return (
        <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</label>
            <input
                type="text"
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                className={`w-full h-12 px-5 rounded-2xl border-2 transition-all font-bold ${disabled
                        ? 'bg-gray-50 border-transparent text-gray-500'
                        : 'bg-white border-gray-100 focus:border-brand-green text-gray-900 outline-none shadow-sm'
                    }`}
            />
        </div>
    );
}

function HiOutlineCheckCircle({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`size-${size / 4}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
    )
}

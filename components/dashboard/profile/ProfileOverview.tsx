'use client';

import React, { useState } from 'react';
import { useUser } from '@/components/providers/UserContext';
import EditProfileModal from './EditProfileModal';

interface ProfileOverviewProps {
    onStartVerification: () => void;
}

export default function ProfileOverview({ onStartVerification }: ProfileOverviewProps) {
    const { user, getDefaultAvatar } = useUser();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!user) return null;

    return (
        <>
            <div className="max-w-5xl mx-auto">
                {/* Profile Header Card */}
                <div className="bg-gradient-to-r from-[#6D28D9] to-purple-600 rounded-xl shadow-lg p-8 mb-6 text-white">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                <img
                                    src={getDefaultAvatar()}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button
                                onClick={() => setIsEditModalOpen(true)}
                                className="absolute bottom-0 right-0 bg-white text-[#6D28D9] p-2.5 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                                title="Edit Profile"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                                <div>
                                    <h1 className="text-3xl font-bold mb-1">{user.firstName} {user.lastName}</h1>
                                    <p className="text-purple-100">{user.email}</p>
                                </div>
                                {user.isVerified ? (
                                    <span className="mt-2 md:mt-0 inline-flex items-center px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-full shadow-md">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Verified Account
                                    </span>
                                ) : (
                                    <span className="mt-2 md:mt-0 inline-flex items-center px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded-full shadow-md">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        Not Verified
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                    <p className="text-purple-200 text-xs uppercase mb-1">Role</p>
                                    <p className="font-semibold capitalize">{user.role}</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                    <p className="text-purple-200 text-xs uppercase mb-1">Member Since</p>
                                    <p className="font-semibold">Jan 2026</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 col-span-2 md:col-span-1">
                                    <p className="text-purple-200 text-xs uppercase mb-1">Gender</p>
                                    <p className="font-semibold capitalize">{user.gender === 'other' ? 'Not specified' : user.gender}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {!user.isVerified && (
                        <div className="mt-6 pt-6 border-t border-white/20">
                            <button
                                onClick={onStartVerification}
                                className="w-full md:w-auto px-8 py-3 bg-white text-[#6D28D9] font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Complete Identity Verification
                            </button>
                        </div>
                    )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500 font-medium">Active Applications</p>
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">2</p>
                        <p className="text-xs text-gray-500 mt-1">In progress</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500 font-medium">Saved Properties</p>
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">5</p>
                        <p className="text-xs text-gray-500 mt-1">Favorites</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500 font-medium">Profile Completion</p>
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{user.isVerified ? '100' : '45'}%</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${user.isVerified ? 100 : 45}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">Browse Properties</p>
                                <p className="text-sm text-gray-500">Find your next home</p>
                            </div>
                        </button>

                        <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">View Applications</p>
                                <p className="text-sm text-gray-500">Track your progress</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Help Card */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 p-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-blue-900 mb-2">Need Help?</h3>
                            <p className="text-sm text-blue-800 mb-4">
                                Our support team is here to help you with any questions about your profile, applications, or the platform.
                            </p>
                            <button className="text-sm font-medium text-blue-700 hover:text-blue-900 flex items-center gap-1">
                                Contact Support
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            />
        </>
    );
}

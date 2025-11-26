'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import VerificationBadge from '@/components/VerificationBadge';
import EditProfileModal from '@/components/EditProfileModal';

export default function ProfilePage() {
    const [userData, setUserData] = useState({
        firstName: 'Mercy',
        lastName: 'Okoli',
        email: 'mercyokoli@gmail.com',
        phone: '08128860774',
        address: 'Plot 52, Sanni Abacha Street, Zone B, Karu. Abuja',
        state: 'Federal Capital Territory Abuja.',
        image: '/assets/dashboard/profile-placeholder.png',
        gender: ''
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Load data from localStorage on mount
    const loadData = () => {
        const firstName = localStorage.getItem('user_firstName') || 'Mercy';
        const lastName = localStorage.getItem('user_lastName') || 'Okoli';
        const email = localStorage.getItem('user_email') || 'mercyokoli@gmail.com';
        const phone = localStorage.getItem('user_phone') || '08128860774';
        const address = localStorage.getItem('user_address') || 'Plot 52, Sanni Abacha Street, Zone B, Karu. Abuja';
        const state = localStorage.getItem('user_state') || 'Federal Capital Territory Abuja.';
        const gender = localStorage.getItem('user_gender') || '';

        // Determine default image based on gender if no custom image is set
        let defaultImage = '/assets/dashboard/profile-placeholder.png';
        if (gender === 'male') defaultImage = '/assets/profile man.png';
        else if (gender === 'female') defaultImage = '/assets/Profile woman.png';

        const image = localStorage.getItem('user_profile_image') || defaultImage;

        setUserData({
            firstName,
            lastName,
            email,
            phone,
            address,
            state,
            image,
            gender
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSave = () => {
        loadData(); // Reload data from localStorage
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="min-h-screen bg-white p-8">
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSave}
                initialData={userData}
            />

            {showSuccess && (
                <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 flex items-center shadow-lg animate-fade-in-down">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Profile updated successfully!</span>
                </div>
            )}

            <div className="max-w-6xl mx-auto space-y-8">
                {/* Profile Card - Full Width */}
                <div className="bg-gray-50 rounded-lg p-12 relative">
                    {/* Edit Icon */}
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="absolute top-8 right-8 p-2 hover:bg-gray-200 rounded-lg transition-colors z-10"
                        title="Edit Profile"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Profile Picture */}
                        <div className="relative">
                            <div className="w-40 h-40 rounded-full border-[3px] border-[#00853E] p-1">
                                <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 relative">
                                    <Image
                                        src={userData.image}
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 flex flex-col md:flex-row items-center justify-between w-full md:w-auto">
                            <div className="text-center md:text-left w-full">
                                <h1 className="text-3xl font-bold text-gray-900">
                                    {userData.firstName} {userData.lastName}
                                </h1>
                                <div className="mt-2 text-gray-600 text-lg">
                                    {userData.email}
                                </div>
                            </div>

                            {/* Verified Badge */}
                            <div className="mt-4 md:mt-0 md:mr-24">
                                <VerificationBadge />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column - Details */}
                    <div className="space-y-8">
                        {/* Phone Number */}
                        <div>
                            <label className="block text-gray-700 mb-2 text-lg">
                                Phone Number
                            </label>
                            <div className="w-full px-4 py-4 border border-gray-200 bg-gray-50 rounded-lg text-gray-800 text-lg">
                                {userData.phone}
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-gray-700 mb-2 text-lg">
                                Address
                            </label>
                            <div className="w-full px-4 py-4 border border-gray-200 bg-gray-50 rounded-lg text-gray-800 text-lg">
                                {userData.address}
                            </div>
                        </div>

                        {/* State */}
                        <div>
                            <label className="block text-gray-700 mb-2 text-lg">
                                State
                            </label>
                            <div className="w-full px-4 py-4 border border-gray-200 bg-gray-50 rounded-lg text-gray-800 text-lg">
                                {userData.state}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4 pt-8">
                            <button className="w-full md:w-auto px-10 py-4 bg-[#6D28D9] text-white font-medium rounded-lg hover:bg-[#5b21b6] transition-colors text-lg">
                                Become An Investor
                            </button>
                            <br className="hidden md:block" />
                            <div className="h-4 md:hidden"></div>
                            <button className="w-full md:w-auto px-10 py-4 border border-[#6D28D9] text-[#6D28D9] font-medium rounded-lg hover:bg-purple-50 transition-colors text-lg">
                                Become A Verified Client
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Statistics */}
                    <div className="lg:pl-12">
                        <div className="bg-[#6D28D9] rounded-xl p-12 text-white shadow-lg w-full max-w-md mx-auto lg:ml-auto h-fit">
                            <div className="space-y-10">
                                {/* Completed Payments */}
                                <div className="text-center pb-10 border-b border-white/20">
                                    <div className="text-8xl font-bold mb-4">15</div>
                                    <div className="text-white/90 text-lg">Completed Payments</div>
                                </div>

                                {/* Outstanding Payments */}
                                <div className="text-center pt-2">
                                    <div className="text-8xl font-bold mb-4">02</div>
                                    <div className="text-white/90 text-lg">Outstanding Payments</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

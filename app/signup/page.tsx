'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { useUserStore } from '@/store/userStore';
import { MdHome, MdApartment, MdAttachMoney, MdCheck } from 'react-icons/md';
import { FaXmark } from 'react-icons/fa6';

export default function SignUpPage() {
    const router = useRouter();
    const setRole = useUserStore((state) => state.setRole); 
    const [showModal, setShowModal] = useState(false);
    const [tempRoles, setTempRoles] = useState<string[]>([]);

    const handleRoleSelect = (role: string) => {
        if (role === 'landlord') {
            setTempRoles([]); // reset temp selection
            setShowModal(true);
        } else {
            setRole([role as any]); // replace previous selection
            router.push('/signup/create-account');
        }
    };

    const toggleTempRole = (role: string) => {
        setTempRoles((prev) =>
            prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
        );
    };

    const handleModalConfirm = () => {
        setRole(tempRoles as any[]); // replace previous roles
        setShowModal(false);
        router.push('/signup/create-account');
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-20">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn>
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Join <span className="text-brand-green">Help2Home</span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Choose how you want to get started. Whether you're looking for a home, listing a property, or investing, we have the right account for you.
                        </p>
                    </div>

                    {/* Role Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Tenant Card */}
                        <button
                            onClick={() => handleRoleSelect('tenant')}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-left group hover:scale-105"
                        >
                            <div className="bg-brand-green text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MdHome className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">I'm a Tenant</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Find verified homes, pay rent monthly, and enjoy a stress-free renting experience.
                            </p>
                        </button>

                        {/* Landlord / Agent Card */}
                        <button
                            onClick={() => handleRoleSelect('landlord')}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-left group hover:scale-105"
                        >
                            <div className="bg-brand-green text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MdApartment className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">I'm a Landlord / Agent</h3>
                            <p className="text-gray-600 leading-relaxed">
                                List your properties, verify tenants, and receive rent payments upfront.
                            </p>
                        </button>

                        {/* Investor Card */}
                        <button
                            onClick={() => handleRoleSelect('investor')}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-left group hover:scale-105"
                        >
                            <div className="bg-brand-green text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MdAttachMoney className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">I'm an Investor</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Fund rental deals and earn attractive returns on your investment.
                            </p>
                        </button>
                    </div>

                    {/* Already have account */}
                    <div className="text-center mt-12 text-gray-600">
                        Already have an account?{' '}
                        <Link href="/signin" className="text-brand-green font-bold hover:underline">
                            Sign In
                        </Link>
                    </div>

                    {/* Modal for Landlord / Agent Selection */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                            <FadeIn>
                                <div className="bg-white p-8 rounded-xl w-full max-w-md md:max-w-2xl lg:max-w-3xl space-y-4 relative shadow-lg">
                                    <button
                                        className="absolute top-3 right-3 text-gray-500 text-xl font-bold hover:text-gray-900"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <FaXmark className='w-6 h-6' />
                                    </button>
                                    <h2 className="text-2xl font-bold text-gray-900">Select your role</h2>
                                    <p className="text-gray-700 text-lg">Choose all that apply:</p>
                                    <div className="flex flex-col md:flex-row gap-4 mt-6">
                                        <button
                                            className={`flex-1 flex items-center justify-between px-6 py-4 rounded-lg bg-brand-green text-white font-medium border border-green-700 ${tempRoles.includes('landlord') ? 'opacity-90' : ''
                                                }`}
                                            onClick={() => toggleTempRole('landlord')}
                                        >
                                            <span className="flex items-center gap-2">
                                                <MdApartment /> Landlord
                                            </span>
                                            {tempRoles.includes('landlord') && <MdCheck />}
                                        </button>
                                        <button
                                            className={`flex-1 flex items-center justify-between px-6 py-4 rounded-lg bg-brand-green text-white font-medium border border-green-700 ${tempRoles.includes('agent') ? 'opacity-90' : ''
                                                }`}
                                            onClick={() => toggleTempRole('agent')}
                                        >
                                            <span className="flex items-center gap-2">
                                                <MdApartment /> Agent
                                            </span>
                                            {tempRoles.includes('agent') && <MdCheck />}
                                        </button>
                                    </div>
                                    <button
                                        className="mt-6 w-full py-4 bg-brand-green text-white rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={handleModalConfirm}
                                        disabled={tempRoles.length === 0}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </FadeIn>
                        </div>
                    )}
                </FadeIn>
            </div>
        </main>
    );
}

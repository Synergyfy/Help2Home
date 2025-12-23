'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { useUserStore } from '@/store/userStore';
import { MdHome, MdApartment, MdAttachMoney } from 'react-icons/md';

export default function SignUpPage() {
    const router = useRouter();
    const setRole = useUserStore((state) => state.setRole);

    const handleRoleSelect = (role: string) => {
        setRole(role);
        router.push('/signup/create-account');
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-20">
            <div className="container mx-auto px-6 md:px-12">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Join <span className="text-brand-green">Help2Home</span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Choose how you want to get started. Whether you're looking for a home, listing a property, or investing, we have the right account for you.
                        </p>
                    </div>

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
                            <div className="bg-purple-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
                            <div className="bg-blue-600 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <MdAttachMoney className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">I'm an Investor</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Fund rental deals and earn attractive returns on your investment.
                            </p>
                        </button>
                    </div>

                    <div className="text-center mt-12 text-gray-600">
                        Already have an account?{' '}
                        <Link href="/signin" className="text-brand-green font-bold hover:underline">
                            Sign In
                        </Link>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}

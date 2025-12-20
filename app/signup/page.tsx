'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { useUserStore } from '@/store/userStore';

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
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">I'm a Tenant</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Find verified homes, pay rent monthly, and enjoy a stress-free renting experience.
                            </p>
                        </button>

                        {/* Landlord/Agent Card */}
                        <button
                            onClick={() => handleRoleSelect('landlord')}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-left group hover:scale-105"
                        >
                            <div className="bg-brand-purple text-white w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
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
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
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
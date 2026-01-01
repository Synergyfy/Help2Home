'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FadeIn from '@/components/FadeIn';

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate API call to fetch user profile and roles
        setTimeout(() => {
            setIsLoading(false);

            // Determine user type based on email for demo purposes
            const isAgent = email.includes('agent');
            const isLandlord = email.includes('landlord');
            const isInvestor = email.includes('investor');
            
            const mockUser = {
                firstName: email.split('@')[0],
                // Assign role based on email keyword
                roles: isAgent ? ['agent'] : isLandlord ? ['landlord'] : isInvestor ? ['investor'] : ['tenant'],
                onboardingStatus: {
                    tenant: true,
                    landlord: isLandlord,
                    investor: isInvestor,
                    agent: isAgent,
                    caretaker: false
                }
            };

            const primaryRole = mockUser.roles[0];
            const isPrimaryOnboarded = mockUser.onboardingStatus[primaryRole as keyof typeof mockUser.onboardingStatus];

            // 1. Persist Session Data
            localStorage.setItem('user_role', primaryRole);
            localStorage.setItem('user_firstName', mockUser.firstName);
            localStorage.setItem('user_onboarding_map', JSON.stringify(mockUser.onboardingStatus));

            // 2. Redirect Logic
            if (!isPrimaryOnboarded) {
                // If the selected role hasn't been set up, go to onboarding
                router.push('/onboarding');
            } else {
                // Navigate to the role-specific dashboard
                router.push(`/dashboard/${primaryRole}`);
            }
        }, 1000);
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <FadeIn>
                <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                    <Link href="/" className="text-3xl font-bold text-brand-green">
                        Help2Home
                    </Link>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green sm:text-sm"
                                    placeholder="agent@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green sm:text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-green hover:bg-brand-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500 font-medium">Demo Accounts</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                {['tenant', 'landlord', 'investor', 'agent'].map((role) => (
                                    <button
                                        key={role}
                                        onClick={() => { setEmail(`${role}@example.com`); setPassword('password'); }}
                                        className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-xs font-bold text-gray-600 hover:bg-gray-50 active:scale-95 transition-all capitalize"
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </main>
    );
}
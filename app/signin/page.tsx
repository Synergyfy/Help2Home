'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { useAuth } from '@/hooks/useAuth';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const { signIn, isLoading } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signIn(email);
    };

    const demoEmails = [
        'tenant@example.com', 'landlord@example.com', 'agent@example.com', 
        'investor@example.com', 'caretaker@example.com', 'multi@example.com', 'newuser@example.com'
    ];

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <FadeIn>
                <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                    <Link href="/" className="text-3xl font-bold text-brand-green">Help2Home</Link>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green sm:text-sm"
                                    placeholder="agent@example.com"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-green hover:bg-brand-green/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? 'Authenticating...' : 'Sign in'}
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500 font-medium">Demo Accounts</span>
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-2">
                                {demoEmails.map((demo) => (
                                    <button
                                        key={demo}
                                        onClick={() => setEmail(demo)}
                                        className="py-2 px-2 border border-gray-200 rounded-md text-[10px] font-bold text-gray-600 hover:bg-gray-50 uppercase"
                                    >
                                        {demo.split('@')[0]}
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
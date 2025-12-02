'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FadeIn from '@/components/FadeIn';

export default function LandlordSignUpPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'landlord', // landlord or agent
        portfolioSize: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Landlord Sign Up:', formData);

        // Save user data to localStorage
        localStorage.setItem('user_firstName', formData.firstName);
        localStorage.setItem('user_lastName', formData.lastName);
        localStorage.setItem('user_email', formData.email);
        localStorage.setItem('user_role', 'landlord');
        localStorage.setItem('user_session', 'true');

        // Dispatch auth change event
        window.dispatchEvent(new Event('auth-change'));

        // Redirect to Landlord Dashboard
        router.push('/dashboard/landlord');
    };

    return (
        <main className="min-h-screen bg-gray-50 py-20">
            <div className="container mx-auto px-6 md:px-12 max-w-2xl">
                <FadeIn>
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        <div className="text-center mb-10">
                            <Link href="/signup" className="text-sm text-gray-500 hover:text-[#00853E] mb-4 inline-block">
                                ← Back to Role Selection
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Partner with Help2Home
                            </h1>
                            <p className="text-gray-600">
                                List properties, verify tenants, and secure your rental income.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                        required
                                    >
                                        <option value="landlord">Landlord</option>
                                        <option value="agent">Real Estate Agent</option>
                                        <option value="property_manager">Property Manager</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Size</label>
                                    <select
                                        name="portfolioSize"
                                        value={formData.portfolioSize}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select...</option>
                                        <option value="1">1 Property</option>
                                        <option value="2-5">2-5 Properties</option>
                                        <option value="6-20">6-20 Properties</option>
                                        <option value="20+">20+ Properties</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-start gap-3 mt-4">
                                <input type="checkbox" required className="mt-1 w-4 h-4 text-[#00853E] border-gray-300 rounded focus:ring-[#00853E]" />
                                <p className="text-sm text-gray-600">
                                    I agree to the <Link href="/terms" className="text-[#00853E] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#00853E] hover:underline">Privacy Policy</Link>.
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#00853E] text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg mt-6"
                            >
                                Create Partner Account
                            </button>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}

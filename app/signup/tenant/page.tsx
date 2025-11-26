'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FadeIn from '@/components/FadeIn';

export default function TenantSignUpPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        state: '',
        password: '',
        confirmPassword: '',
        employmentStatus: '',
        monthlyIncome: '',
        gender: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Tenant Sign Up:', formData);

        // Save user data to localStorage for dashboard display
        localStorage.setItem('user_firstName', formData.firstName);
        localStorage.setItem('user_lastName', formData.lastName);
        localStorage.setItem('user_email', formData.email);
        localStorage.setItem('user_phone', formData.phone);
        localStorage.setItem('user_address', formData.address);
        localStorage.setItem('user_state', formData.state);
        localStorage.setItem('user_gender', formData.gender);
        localStorage.setItem('user_session', 'true');

        // Dispatch auth change event
        window.dispatchEvent(new Event('auth-change'));

        // Simulate successful sign up and redirect
        // Simulate successful sign up and redirect
        router.push('/dashboard/tenant/profile');
    };

    return (
        <main className="min-h-screen bg-gray-50 py-20">
            <div className="container mx-auto px-6 md:px-12 max-w-2xl">
                <FadeIn>
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                        <div className="text-center mb-10">
                            <Link href="/signup" className="text-sm text-gray-500 hover:text-brand-green mb-4 inline-block">
                                ← Back to Role Selection
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Create Tenant Account
                            </h1>
                            <p className="text-gray-600">
                                Start your journey to stress-free renting.
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
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
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
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
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
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
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
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                                    required
                                >
                                    <option value="">Select Gender...</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status</label>
                                    <select
                                        name="employmentStatus"
                                        value={formData.employmentStatus}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select...</option>
                                        <option value="employed">Employed</option>
                                        <option value="self-employed">Self-Employed</option>
                                        <option value="student">Student</option>
                                        <option value="unemployed">Unemployed</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income Range</label>
                                    <select
                                        name="monthlyIncome"
                                        value={formData.monthlyIncome}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select...</option>
                                        <option value="0-100k">₦0 - ₦100,000</option>
                                        <option value="100k-300k">₦100,000 - ₦300,000</option>
                                        <option value="300k-500k">₦300,000 - ₦500,000</option>
                                        <option value="500k+">₦500,000+</option>
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
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
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
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-start gap-3 mt-4">
                                <input type="checkbox" required className="mt-1 w-4 h-4 text-brand-green border-gray-300 rounded focus:ring-brand-green" />
                                <p className="text-sm text-gray-600">
                                    I agree to the <Link href="/terms" className="text-brand-green hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-brand-green hover:underline">Privacy Policy</Link>.
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-brand-green text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg mt-6"
                            >
                                Create Account
                            </button>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </main>
    );
}

'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { useUserStore } from '@/store/userStore';

export default function CreateAccountPage() {
  const router = useRouter();
  const params = useSearchParams();
  const setUser = useUserStore((state) => state.setUser);

  const allowedRoles = ['tenant', 'landlord', 'agent', 'property_manager', 'investor'];
  let roleParam = params.get('role');
  if (!roleParam || !allowedRoles.includes(roleParam)) roleParam = 'tenant';

  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert('Passwords do not match');

    // Save user info in Zustand
    setUser({ email: form.email, role: roleParam, verified: false });

    // Simulate OTP
    localStorage.setItem('email_otp', '123456');

    router.push('/signup/verify');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl">
        <FadeIn>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-10">
              <Link
                href="/signup"
                className="text-sm text-gray-500 hover:text-brand-green mb-4 inline-block"
              >
                ← Back to Role Selection
              </Link>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create your account
              </h1>

              <p className="text-gray-600 capitalize">
                Signing up as a {roleParam}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-green text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition shadow-lg mt-6"
              >
                Continue
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}

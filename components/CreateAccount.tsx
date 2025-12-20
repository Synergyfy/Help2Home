'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FadeIn from '@/components/FadeIn';
import { useUserStore } from '@/store/userStore';
import {toast} from 'react-toastify'

// Zod validation schema
const createAccountSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type CreateAccountForm = z.infer<typeof createAccountSchema>;

export default function CreateAccountPage() {
  const router = useRouter();
  const params = useSearchParams();
  const setUser = useUserStore((state) => state.setUser);

  const allowedRoles = ['tenant', 'landlord', 'agent', 'property_manager', 'investor'];
  let roleParam = params.get('role');
  if (!roleParam || !allowedRoles.includes(roleParam)) roleParam = 'tenant';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateAccountForm>({
    resolver: zodResolver(createAccountSchema),
  });

  const onSubmit = async (data: CreateAccountForm) => {
    try {
      // simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Save user info in Zustand
      setUser({ email: data.email, role: roleParam, verified: false });

      // Simulate OTP
      localStorage.setItem('email_otp', '123456');

      router.push('/signup/verify');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
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

              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>

              <p className="text-gray-600 capitalize">Signing up as a {roleParam}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    {...register('password')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
  

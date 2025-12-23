'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FadeIn from '@/components/FadeIn';
import { useUserStore } from '@/store/userStore';
import { toast } from 'react-toastify';

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

export default function CreateAccountClient() {
  const router = useRouter();

  // Read role and hasHydrated safely from Zustand
  const role = useUserStore((state) => state.role);
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const setUser = useUserStore((state) => state.setUser);

  // Guard: redirect if no role after hydration
  useEffect(() => {
    if (!hasHydrated) return; // wait until Zustand has loaded from localStorage
    if (!role) {
      router.replace('/signup');
    }
  }, [role, hasHydrated, router]);

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

      // update Zustand store
      setUser({
        email: data.email,
        verified: false,
      });

      // store OTP for demo
      localStorage.setItem('email_otp', '123456');

      toast.success('Account created successfully! Please verify your email.', {
        position: 'top-right',
        autoClose: 3000,
      });

      router.push('/signup/verify');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create your account
              </h1>
              <p className="text-gray-600 capitalize">
                Signing up as {role || '...'}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register('password')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    {...register('confirmPassword')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-green text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="text-brand-green hover:underline font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}

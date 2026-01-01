'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiLock, FiMail, FiArrowRight } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { useAuth } from '@/hooks/useAuth';
import OnboardingLayout from '@/components/onboarding/OnboardingLayout';

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = (data: SignInValues) => {
    signIn(data.email, data.password);
  };

  const demoEmails = [
    'tenant', 'landlord', 'agent', 'investor', 'caretaker', 'multi'
  ];

  const handleDemoClick = (role: string) => {
    setValue('email', `${role}@example.com`, { shouldValidate: true });
    setValue('password', 'password123', { shouldValidate: true });
  };

  return (
    <OnboardingLayout currentStep={0} totalSteps={1}>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex flex-col h-full justify-center max-w-md mx-auto w-full px-4"
      >
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">
            Welcome back to Help2Home
          </p>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
            Sign in to account
          </h1>
          <p className="text-gray-600 font-medium">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
              Email address
            </label>
            <div className="relative group">
              <FiMail 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors" 
                size={20} 
              />
              <input
                {...register('email')}
                type="email"
                className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-gray-100'} bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-500 font-bold flex items-center gap-1">
                <span>•</span> {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-bold text-brand-green hover:underline decoration-brand-green underline-offset-4"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <FiLock 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors" 
                size={20} 
              />
              <input
                {...register('password')}
                type={showPassword ? "text" : "password"}
                className={`w-full pl-12 pr-12 py-4 rounded-xl border-2 ${errors.password ? 'border-red-500' : 'border-gray-100'} bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-green transition-colors"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-500 font-bold flex items-center gap-1">
                <span>•</span> {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Authenticating...' : 'Sign in'}
            {!isLoading && <FiArrowRight size={20} />}
          </button>
        </form>

        {/* Demo Accounts Grid */}
        <div className="mt-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              <span className="px-4 bg-white">Quick Demo Access</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-2">
            {demoEmails.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleDemoClick(role)}
                className="py-3 px-1 border-2 border-gray-50 bg-white rounded-xl text-[10px] font-bold text-gray-500 hover:border-brand-green/30 hover:text-brand-green hover:bg-brand-green/5 transition-all uppercase tracking-wider active:scale-95"
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500 font-medium">
          Don't have an account?{' '}
          <Link href="/register" className="text-gray-900 font-bold hover:underline decoration-brand-green underline-offset-4">
            Create one for free
          </Link>
        </p>
      </motion.div>
    </OnboardingLayout>
  );
}
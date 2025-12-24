'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import BackgroundPanel from '@/components/lib/BackgroundPanel';
import { useUserStore } from '@/store/userStore';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import InfoIcon from '@/components/lib/InfoIcon';

// Zod validation schema
const createAccountSchema = z
  .object({
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type CreateAccountForm = z.infer<typeof createAccountSchema>;

// Role info definitions
const roleInfoMap: Record<
  string,
  { explanation: string; benefits: string; image: string }
> = {
  tenant: {
    explanation: "Discover your dream home effortlessly, with verified listings and personalized recommendations that make searching a breeze.",
    benefits: "Browse thousands of hand-picked houses and apartments. Experience a seamless rental journey from start to finish.",
    image: "https://images.unsplash.com/photo-1580584129870-0c5be2f58249?w=900",
  },
  landlord: {
    explanation: "Maximize your property's visibility and manage tenants with confidence, all in one smooth platform.",
    benefits: "List your property, track tenant activities, and enjoy effortless management to keep your investments thriving.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900",
  },
  agent: {
    explanation: "Ensure tenants have an impeccable experience while keeping property owners informed and satisfied.",
    benefits: "Coordinate repairs, communicate instantly, and streamline property management like never before.",
    image: "https://images.unsplash.com/photo-1590650046265-0d75d6e2533f?w=900",
  },
  investor: {
    explanation: "Unlock lucrative real estate investment opportunities with insights that drive smarter decisions.",
    benefits: "Track ROI, explore high-potential properties, and manage investments with ease.",
    image: "https://images.unsplash.com/photo-1581091215367-6f07e9b97302?w=900",
  },
  caretaker: {
    explanation: "Manage properties and tenants efficiently as a caretaker.",
    benefits: "Coordinate maintenance, track tenant issues, and streamline daily tasks.",
    image: "https://images.unsplash.com/photo-1590650046265-0d75d6e2533f?w=900",
  },
};

export default function CreateAccountClient() {
  const router = useRouter();
  const roles = useUserStore((state) => state.role); // array of roles
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const setUser = useUserStore((state) => state.setUser);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateAccountForm>({
    resolver: zodResolver(createAccountSchema),
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  // Auto-swipe effect for desktop
  useEffect(() => {
    if (!roles || roles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
      setDisplayText('');
      setCharIndex(0);
    }, 7000); // 7 seconds per role
    return () => clearInterval(interval);
  }, [roles]);

  // Typewriter effect for explanation per current slide
  useEffect(() => {
    if (!roles || roles.length === 0) return;
    const currentRole = roles[currentIndex];
    const explanation = roleInfoMap[currentRole]?.explanation;
    if (!explanation) return;

    if (charIndex < explanation.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + explanation[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentIndex, roles]);

  // Redirect if no role after hydration
  useEffect(() => {
    if (!hasHydrated) return;
    if (!roles || roles.length === 0) router.replace('/signup');
  }, [roles, hasHydrated, router]);

  const onSubmit = async (data: CreateAccountForm) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setUser({ email: data.email, verified: false });
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

  if (!hasHydrated) return <div className="min-h-screen bg-gray-50" />;

  if (!roles || roles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">No role selected. Redirecting...</p>
      </div>
    );
  }

  // Combine all selected roles for mobile tooltip
  const combinedMobileInfo = roles.reduce(
    (acc, r) => {
      const info = roleInfoMap[r];
      if (!info) return acc;
      acc.explanation.push(info.explanation);
      acc.benefits.push(info.benefits);
      return acc;
    },
    { explanation: [] as string[], benefits: [] as string[] }
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Desktop Panel */}
        <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {roles.map((role, index) => {
              const info = roleInfoMap[role];
              if (!info) return null;
              return (
                currentIndex === index && (
                  <motion.div
                    key={role}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                  >
                    <BackgroundPanel
                      backgroundImage={info.image}
                      containerClassName="w-full h-full"
                      overlayClassName="absolute inset-0 bg-black/40"
                      contentClassName="absolute inset-0 flex flex-col justify-center items-center text-center p-8"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <h2 className="text-white text-4xl font-bold mb-4 drop-shadow-lg">
                          Welcome to Help2Home
                        </h2>
                        <p className="text-gray-200 text-lg drop-shadow-md max-w-xs mb-2">
                          {displayText}
                        </p>
                        <p className="text-gray-200 text-base drop-shadow-sm max-w-xs">
                          {info.benefits}
                        </p>
                      </motion.div>
                    </BackgroundPanel>
                  </motion.div>
                )
              );
            })}
          </AnimatePresence>
        </div>

        {/* Form Column */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12">
          <FadeIn>
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 space-y-6">
              {/* Header */}
              <div className="text-center mb-6">
                <Link href="/signup" className="text-sm text-gray-500 hover:text-brand-green mb-2 inline-block">
                  ← Back to Role Selection
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Create your account
                </h1>
                <div className="flex justify-center items-center gap-2 text-gray-600 capitalize">
                  <span>Signing up as {roles.join(' / ')}</span>
                  <InfoIcon tooltip={combinedMobileInfo.explanation.join(' ')} />
                </div>
              </div>

              {/* Google OAuth */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => {}}
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 font-medium hover:bg-gray-50 transition"
                >
                  <FcGoogle size={24} />
                  Sign up with Google
                </button>
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-sm text-gray-400">OR</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      {...register('password')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      {...register('confirmPassword')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
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

              {/* Footer */}
              <p className="text-center text-gray-600 mt-6">
                Already have an account?{' '}
                <Link href="/signin" className="text-brand-green hover:underline font-semibold">
                  Sign in
                </Link>
              </p>

              {/* Mobile Combined Tooltip */}
              <motion.div
                className="md:hidden mt-6 bg-blue-100 p-4 rounded-lg border border-blue-200 text-blue-800 text-sm space-y-1"
                key={roles.join('-')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{roles.join(' / ')}</span>
                  <InfoIcon tooltip={combinedMobileInfo.explanation.join(' ')} />
                </div>
                {combinedMobileInfo.benefits.map((b, i) => (
                  <p key={i}>{b}</p>
                ))}
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}

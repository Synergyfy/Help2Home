'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
import type { Role } from '@/store/userStore'

/* ---------------- Schema ---------------- */

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

/* ---------------- Role Info ---------------- */

const roleInfoMap: Record<
  Role,
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

/* ---------------- Component ---------------- */

export default function CreateAccountClient() {
  const router = useRouter();
  const roles = useUserStore((state) => state.role); // array of selected roles
  const setRole = useUserStore((state) => state.setRole);
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const setUser = useUserStore((state) => state.setUser);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateAccountForm>({
    resolver: zodResolver(createAccountSchema),
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  /* ---------------- Role Selection Logic ---------------- */
  const canSelectRole = (roleToSelect: Role): boolean => {
    if (!roles || roles.length === 0) return true;

    // Tenant can only be tenant
    if (roles.includes('tenant')) {
      return roleToSelect === 'tenant';
    }

    // Investor can only be investor
    if (roles.includes('investor')) {
      return roleToSelect === 'investor';
    }

    // Landlord can also be agent or caretaker
    if (roles.includes('landlord')) {
      return ['landlord', 'agent', 'caretaker'].includes(roleToSelect);
    }

    // Agent can also be landlord or caretaker
    if (roles.includes('agent')) {
      return ['landlord', 'agent', 'caretaker'].includes(roleToSelect);
    }

    // Caretaker can also be landlord or agent
    if (roles.includes('caretaker')) {
      return ['landlord', 'agent', 'caretaker'].includes(roleToSelect);
    }

    return true;
  };

  const isRoleDisabled = (roleToCheck: Role): boolean => {
    if (!roles || roles.length === 0) return false;
    return !canSelectRole(roleToCheck);
  };

  /* ---------------- Role Toggle Function ---------------- */
  const toggleRole = (role: Role) => {
    if (!roles) return;

    // Check if role can be selected
    if (!canSelectRole(role)) {
      if (roles.includes('tenant')) {
        toast.error('Tenants can only select the tenant role');
      } else if (roles.includes('investor')) {
        toast.error('Investors can only select the investor role');
      } else {
        toast.error('This role combination is not allowed');
      }
      return;
    }

    let newRoles: Role[];
    if (roles.includes(role)) {
      // Prevent removing last role
      if (roles.length > 1) {
        newRoles = roles.filter((r) => r !== role);
        toast.info(`${role.charAt(0).toUpperCase() + role.slice(1)} role removed`);
      } else {
        toast.warning('You must have at least one role selected');
        return;
      }
    } else {
      newRoles = [...roles, role];
      toast.success(`${role.charAt(0).toUpperCase() + role.slice(1)} role added`);
    }
    
    setRole(newRoles);
    setCurrentIndex(0);
    setDisplayText('');
    setCharIndex(0);
  };

  /* ---------------- Slide & Typewriter Effects ---------------- */
  useEffect(() => {
    if (!roles || roles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
      setDisplayText('');
      setCharIndex(0);
    }, 7000);
    return () => clearInterval(interval);
  }, [roles]);

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

  useEffect(() => {
    if (!hasHydrated) return;
    if (!roles || roles.length === 0) router.replace('/signup');
  }, [roles, hasHydrated, router]);

  /* ---------------- Submit ---------------- */
  const onSubmit = async (data: CreateAccountForm) => {
    await new Promise((r) => setTimeout(r, 1500));
    setUser({ email: data.email, verified: false });
    localStorage.setItem('email_otp', '123456');

    toast.success('Account created successfully! Please verify your email.');
    router.push('/signup/verify');
  };

  if (!hasHydrated) return <div className="min-h-screen bg-gray-50" />;

  /* ---------------- Combined Info for Mobile ---------------- */
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
        {/* Desktop Slide Panel */}
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
                      <h2 className="text-white text-4xl font-bold mb-4 drop-shadow-lg">
                        Welcome to Help2Home
                      </h2>
                      <p className="text-gray-200 text-lg drop-shadow-md max-w-xs mb-2">
                        {displayText}
                      </p>
                      <p className="text-gray-200 text-base drop-shadow-sm max-w-xs">
                        {info.benefits}
                      </p>
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

              {/* Role Selector */}
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {(Object.keys(roleInfoMap) as Role[]).map((role) => {
                  const active = roles.includes(role);
                  const disabled = isRoleDisabled(role);
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => toggleRole(role)}
                      disabled={disabled && !active}
                      className={`px-4 py-2 rounded-full text-sm capitalize border transition ${
                        active
                          ? 'bg-brand-green text-white border-brand-green'
                          : disabled
                          ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed opacity-50'
                          : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      {role}
                    </button>
                  );
                })}
              </div>

              {/* Header */}
              <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Create your account
              </h1>

              {/* Google */}
              <button className="w-full border rounded-lg py-3 flex justify-center gap-2 mb-4 hover:bg-gray-50 transition">
                <FcGoogle size={22} /> Sign up with Google
              </button>

              <div className="flex items-center gap-2 text-gray-400">
                <hr className="flex-1" />
                <span className="text-sm">or</span>
                <hr className="flex-1" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>}
                </div>

                <div>
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>}
                </div>

                <div>
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-green text-white py-3 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              {/* Mobile Combined Tooltip */}
              <motion.div className="md:hidden mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200 text-blue-800 text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold capitalize">{roles.join(' / ')}</span>
                  <InfoIcon tooltip={combinedMobileInfo.explanation.join(' ')} />
                </div>
                {combinedMobileInfo.benefits.map((b, i) => (
                  <p key={i} className="text-xs">{b}</p>
                ))}
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
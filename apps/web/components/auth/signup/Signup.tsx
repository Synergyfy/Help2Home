'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MdHome, MdApartment, MdAttachMoney } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Role } from '@/store/userStore';
import Logo from '@/components/shared/Logo';

import SignUpForm from './SignUpForm';
import { registerUser } from '@/lib/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useAuth();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const { setRoles, goToStep, setSignupPath } = useOnboardingStore();

  const [step, setStep] = useState<'role' | 'register'>('role');
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [activeMessage, setActiveMessage] = useState("");

  const handleRoleSelection = (roles: Role[], path: any) => {
    setSignupPath(path);
    setSelectedRoles(roles);
    setStep('register');
  };

  const handleSignUpSubmit = async (data: any) => {
    // This will be handled by the useAuth mutation
    signUp({ ...data, roles: selectedRoles });
  };

  if (step === 'register') {
    return (
      <main className="min-h-screen bg-white flex flex-col justify-center py-20 relative">
        <SignUpForm 
          roles={selectedRoles} 
          onBack={() => setStep('role')} 
          onSubmit={handleSignUpSubmit}
          isLoading={isRedirecting}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-20 relative">
      <div className="container mx-auto px-6">
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              Join <Logo width={40} height={40} textClassName="text-4xl md:text-5xl font-black text-brand-green" />
            </h1>
            <p className="text-lg text-gray-600">
              Select your primary path to get started. You can add additional management roles later in your profile.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Tenant Card */}
          <FadeIn direction="up">
            <button
              onClick={() => handleRoleSelection(['tenant'], 'tenant')}
              className="w-full bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-green/30 transition-all flex flex-col items-start h-full group text-left"
            >
              <div className="mb-6 p-4 bg-brand-green/10 text-brand-green rounded-xl group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                <MdHome size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tenant</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Find verified homes, pay rent monthly, and enjoy a stress-free renting experience.
              </p>
            </button>
          </FadeIn>

          {/* Landlord/Management Card */}
          <FadeIn direction="up">
            <button
              onClick={() => handleRoleSelection(['landlord'], 'propertyManagement')}
              className="w-full bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-green/30 transition-all flex flex-col items-start h-full group text-left"
            >
              <div className="mb-6 p-4 bg-brand-green/10 text-brand-green rounded-xl group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                <MdApartment size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Property Management</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                For Landlords, Agents, and Caretakers. List properties and manage your real estate portfolio.
              </p>
            </button>
          </FadeIn>

          {/* Investor Card */}
          <FadeIn direction="up">
            <button
              onClick={() => handleRoleSelection(['investor'], 'investor')}
              className="w-full bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-green/30 transition-all flex flex-col items-start h-full group text-left"
            >
              <div className="mb-6 p-4 bg-brand-green/10 text-brand-green rounded-xl group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                <MdAttachMoney size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Investor</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Fund rental deals and earn attractive returns on your real estate investment.
              </p>
            </button>
          </FadeIn>

          {/* Developer Card */}
          <FadeIn direction="up">
            <button
              onClick={() => handleRoleSelection(['developer'], 'developer')}
              className="w-full bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-brand-green/30 transition-all flex flex-col items-start h-full group text-left"
            >
              <div className="mb-6 p-4 bg-brand-green/10 text-brand-green rounded-xl group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                <MdAttachMoney size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Developer</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
               Find reliable investors for your properties 
              </p>
            </button>
          </FadeIn>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">
            Already have an account?{' '}
            <a href="/signin" className="text-brand-green font-bold hover:underline ml-1">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}

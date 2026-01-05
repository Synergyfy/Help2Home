'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdHome, MdApartment, MdAttachMoney } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/FadeIn';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Role } from '@/store/userStore';

export default function SignUpPage() {
  const router = useRouter();
  const { setRoles, goToStep } = useOnboardingStore();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [activeMessage, setActiveMessage] = useState("");

  const triggerCreativeRedirect = (roles: Role[]) => {
    // 1. Sync Roles to Store
    setRoles(roles);
    setIsRedirecting(true);

    // 2. Set Contextual Message
    const messages: Record<string, string> = {
      tenant: "Finding the best verified homes for you...",
      investor: "Preparing your investment dashboard...",
      landlord: "Setting up your property management suite...",
      agent: "Configuring your agency tools...",
      caretaker: "Initializing maintenance management..."
    };

    setActiveMessage(messages[roles[0]] || "Customizing your experience...");

    // 3. Navigate after transition effect
    setTimeout(() => {
      goToStep(0); // Ensure onboarding starts from the beginning
      router.push('/onboarding');
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-20 relative">
      {/* Creative Overlay */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Excellent Choice.</h2>
              <p className="text-brand-green font-medium animate-pulse">{activeMessage}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6">
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join <span className="text-brand-green">Help2Home</span>
            </h1>
            <p className="text-lg text-gray-600">
              Select your primary path to get started. You can add additional management roles later in your profile.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Tenant Card */}
          <FadeIn direction="up">
            <button
              onClick={() => triggerCreativeRedirect(['tenant'])}
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
              onClick={() => triggerCreativeRedirect(['landlord'])} // Triggers immediately now
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
              onClick={() => triggerCreativeRedirect(['investor'])}
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
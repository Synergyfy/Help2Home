'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { MdHome, MdApartment, MdAttachMoney, MdCheck } from 'react-icons/md';
import { FaXmark } from 'react-icons/fa6';
import InfoIcon from '@/components/lib/InfoIcon';
import FadeIn from '@/components/FadeIn';

const AVAILABLE_ROLES = ['landlord', 'agent', 'caretaker'] as const;

const ROLE_TOOLTIPS: Record<(typeof AVAILABLE_ROLES)[number], string> = {
  landlord: 'Owns property and lists it for rent or sale on the platform.',
  agent: 'Manages listings and tenant relations on behalf of landlords.',
  caretaker: 'Handles day-to-day property maintenance and tenant support.',
};

export default function SignUpPage() {
  const router = useRouter();
  const setRole = useUserStore((state) => state.setRole);
  const [showModal, setShowModal] = useState(false);
  const [tempRoles, setTempRoles] = useState<string[]>([]);

  const handleRoleSelect = (role: string) => {
    if (role === 'landlord') {
      setTempRoles([]); // reset for modal
      setShowModal(true);
    } else {
      setRole([role as any]);
      router.push('/signup/create-account');
    }
  };

  const toggleTempRole = (role: string) => {
    setTempRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleModalConfirm = () => {
    setRole(tempRoles as any[]);
    setShowModal(false);
    router.push('/signup/create-account');
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-20">
      <div className="container mx-auto px-6 md:px-12">
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join <span className="text-brand-green">Help2Home</span>
            </h1>
            <p className="text-lg text-gray-600">
              Choose how you want to get started. You can sign up as a Tenant, Investor, or pick one/multiple roles: Landlord, Agent, Caretaker.
            </p>
          </div>
        </FadeIn>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 max-w-6xl mx-auto">
          {/* Tenant Card */}
          <FadeIn direction="up">
            <button
              onClick={() => handleRoleSelect('tenant')}
              className="flex-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col items-start h-full group"
            >
              <div className="mb-4 p-3 bg-brand-green/10 text-brand-green rounded-lg group-hover:bg-brand-green group-hover:text-white transition-colors">
                <MdHome className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tenant</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
                Find verified homes, pay rent monthly, and enjoy a stress-free renting experience.
              </p>
            </button>
          </FadeIn>

          {/* Landlord / Agent / Caretaker Card */}
          <FadeIn direction="up">
            <button
              onClick={() => handleRoleSelect('landlord')}
              className="flex-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col items-start h-full group"
            >
              <div className="mb-4 p-3 bg-brand-green/10 text-brand-green rounded-lg group-hover:bg-brand-green group-hover:text-white transition-colors">
                <MdApartment className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Landlord / Agent / Caretaker</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
                List properties, manage tenants, coordinate tasks, or handle properties efficiently.
              </p>
            </button>
          </FadeIn>

          {/* Investor Card */}
          <FadeIn direction="up">
            <button
              onClick={() => handleRoleSelect('investor')}
              className="flex-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col items-start h-full group"
            >
              <div className="mb-4 p-3 bg-brand-green/10 text-brand-green rounded-lg group-hover:bg-brand-green group-hover:text-white transition-colors">
                <MdAttachMoney className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Investor</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
                Fund rental deals and earn attractive returns on your investment.
              </p>
            </button>
          </FadeIn>
        </div>

        <div className="text-center mt-12 text-gray-600">
          Already have an account?{' '}
          <a href="/signin" className="text-brand-green font-bold hover:underline">
            Sign In
          </a>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-8 rounded-xl w-full max-w-md md:max-w-2xl lg:max-w-3xl space-y-4 relative shadow-lg">
              <button
                className="absolute top-3 right-3 text-gray-500 text-xl font-bold hover:text-gray-900"
                onClick={() => setShowModal(false)}
              >
                <FaXmark className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-gray-900">Select your roles</h2>
              <p className="text-gray-700 text-lg">
                You can select one, two, or all roles. Selecting all roles enables the full platform features.
              </p>

              <div className="flex flex-col md:flex-row gap-4 mt-6">
                {AVAILABLE_ROLES.map((r) => (
                  <button
                    key={r}
                    className={`flex-1 flex items-center justify-between px-6 py-4 rounded-lg bg-brand-green text-white font-medium border border-green-700 ${tempRoles.includes(r) ? 'opacity-90' : ''
                      }`}
                    onClick={() => toggleTempRole(r)}
                  >
                    <span className="flex items-center gap-2">
                      <MdApartment /> {r.charAt(0).toUpperCase() + r.slice(1)}
                    </span>
                    {tempRoles.includes(r) && <MdCheck />}
                    <InfoIcon tooltip={ROLE_TOOLTIPS[r]} />
                  </button>
                ))}
              </div>

              <button
                className="mt-6 w-full py-4 bg-brand-green text-white rounded-lg font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleModalConfirm}
                disabled={tempRoles.length === 0}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

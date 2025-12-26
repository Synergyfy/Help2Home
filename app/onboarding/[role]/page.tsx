'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import OnboardingPanel from '@/components/onboarding/OnboardingPanel';
import OnboardingForm from '@/components/onboarding/OnboardingForm';
import { toast } from 'react-toastify';

export default function OnboardingPage() {
  const router = useRouter();
  const roles = useUserStore((state) => state.role);
  const setUserOnboarding = useUserStore((state) => state.setOnboarding);
  const resetOnboarding = useOnboardingStore((state) => state.reset);

  const [selectedRole, setSelectedRole] = useState<string | null>(
    roles.length === 1 ? roles[0] : null
  );

 const handleOnboardingComplete = (formData: any) => {
    if (!selectedRole) return;
    setUserOnboarding({ role: selectedRole, data: formData });
    resetOnboarding();
    toast.success(`Onboarding for ${selectedRole} complete!`); 
    
    const remainingRoles = roles.filter((r) => r !== selectedRole);
    if (remainingRoles.length === 0) {
      router.push('/signin');
    } else {
      setSelectedRole(null);
    }
  };

  if (!selectedRole && roles.length > 1) {
    return (
      <main className="h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Select a role to onboard</h2>
          <p className="mb-6 text-gray-600">
            You have multiple roles. Complete onboarding for one role now, and do the others later.
          </p>
          <div className="flex flex-col gap-4">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className="w-full py-3 bg-brand-green text-white rounded-lg font-semibold hover:bg-green-600 transition capitalize"
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
<main className="h-screen bg-gray-50">
  <div className="flex h-full flex-col md:flex-row">
    {/* Left Panel */}
    <div className="hidden md:flex md:w-1/2 h-screen relative">
      <OnboardingPanel role={selectedRole!} />
    </div>

    {/* Right Form */}
    <div className="w-full md:w-1/2 h-screen overflow-y-auto">
      <OnboardingForm role={selectedRole!} onComplete={handleOnboardingComplete} />
    </div>
  </div>
</main>

  );
}

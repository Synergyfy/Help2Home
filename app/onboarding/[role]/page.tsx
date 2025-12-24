'use client';

import React, { JSX, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FadeIn from '@/components/FadeIn';
import BackgroundPanel from '@/components/lib/BackgroundPanel';
import { toast } from 'react-toastify';
import { useUserStore } from '@/store/userStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { COUNTRIES, NIGERIA_STATES } from '@/utils/locations';

export default function OnboardingPage() {
  const router = useRouter();
  const roles = useUserStore((state) => state.role); // array of roles
  const setUserOnboarding = useUserStore((state) => state.setOnboarding);

  const formData = useOnboardingStore((state) => state.formData);
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const setFormData = useOnboardingStore((state) => state.setFormData);
  const setStep = useOnboardingStore((state) => state.setStep);
  const resetOnboarding = useOnboardingStore((state) => state.reset);

  const [selectedRole, setSelectedRole] = useState<string | null>(
    roles.length === 1 ? roles[0] : null
  );

  useEffect(() => {
    setStep(0);
  }, [setStep, selectedRole]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleNext = () => setStep(Math.min(currentStep + 1, steps.length - 1));
  const handlePrev = () => setStep(Math.max(currentStep - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    let onboardingData: Record<string, any> = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      country: formData.country,
      state: formData.state,
    };

    if (selectedRole === 'tenant') {
      onboardingData = {
        ...onboardingData,
        gender: formData.gender,
        address: formData.address,
        employmentStatus: formData.employmentStatus,
        monthlyIncome: formData.monthlyIncome,
      };
    } else if (['landlord', 'agent', 'property_manager', 'caretaker'].includes(selectedRole)) {
      onboardingData = {
        ...onboardingData,
        portfolioSize: formData.portfolioSize,
        responsibilities: formData.responsibilities,
      };
    } else if (selectedRole === 'investor') {
      onboardingData = {
        ...onboardingData,
        investorType: formData.investorType,
        investmentBudget: formData.investmentBudget,
      };
    }

    setUserOnboarding({ role: selectedRole, data: onboardingData });
    resetOnboarding();
    toast.success(`Onboarding for ${selectedRole} complete!`);

    // Remove the completed role
    const remainingRoles = roles.filter((r) => r !== selectedRole);
    if (remainingRoles.length === 0) {
      router.push('/signin');
    } else {
      setSelectedRole(null); // show role selector for remaining roles
    }
  };

  // --- Steps Definition ---
  const baseSteps = [
    {
      title: 'Basic Info',
      tooltip: 'We use this to personalize your experience and verify your account.',
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <select
              name="country"
              value={formData.country || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
            >
              <option value="">Select Country</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          {formData.country === 'Nigeria' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                name="state"
                value={formData.state || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              >
                <option value="">Select State</option>
                {NIGERIA_STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      ),
    },
  ];

  const roleStepsMap: Record<string, { title: string; tooltip?: string; fields: JSX.Element }[]> = {
    tenant: [
      {
        title: 'Tenant Details',
        tooltip: 'This information helps landlords assess suitability.',
        fields: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status</label>
              <select
                name="employmentStatus"
                value={formData.employmentStatus || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              >
                <option value="">Select...</option>
                <option value="employed">Employed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="student">Student</option>
                <option value="unemployed">Unemployed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income</label>
              <select
                name="monthlyIncome"
                value={formData.monthlyIncome || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              >
                <option value="">Select...</option>
                <option value="0-100k">₦0 - ₦100,000</option>
                <option value="100k-300k">₦100,000 - ₦300,000</option>
                <option value="300k-500k">₦300,000 - ₦500,000</option>
                <option value="500k+">₦500,000+</option>
              </select>
            </div>
          </div>
        ),
      },
    ],

    landlord: [
      {
        title: 'Landlord Details',
        tooltip: 'Tell us about your property portfolio.',
        fields: (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Size</label>
            <input
              type="number"
              name="portfolioSize"
              value={formData.portfolioSize || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
            />
          </div>
        ),
      },
    ],

    agent: [
      {
        title: 'Agent Details',
        tooltip: 'Provide your property management portfolio info.',
        fields: (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Size</label>
            <input
              type="number"
              name="portfolioSize"
              value={formData.portfolioSize || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300"
            />
          </div>
        ),
      },
    ],

    caretaker: [
      {
        title: 'Caretaker Details',
        tooltip: 'Provide your property management responsibilities.',
        fields: (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Size</label>
              <input
                type="number"
                name="portfolioSize"
                value={formData.portfolioSize || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
              <input
                type="text"
                name="responsibilities"
                value={formData.responsibilities || ''}
                onChange={handleChange}
                placeholder="E.g., Maintenance, Repairs, Tenant Coordination"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              />
            </div>
          </div>
        ),
      },
    ],

    investor: [
      {
        title: 'Investor Details',
        tooltip: 'Provide your investment preferences.',
        fields: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Investor Type</label>
              <input
                type="text"
                name="investorType"
                value={formData.investorType || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Investment Budget</label>
              <input
                type="number"
                name="investmentBudget"
                value={formData.investmentBudget || ''}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
              />
            </div>
          </div>
        ),
      },
    ],
  };

  // Compose steps for current role
  const steps = selectedRole ? [...baseSteps, ...(roleStepsMap[selectedRole] || [])] : [];

  const safeStep = Math.min(currentStep, steps.length - 1);
  const isLastStep = safeStep === steps.length - 1;

  if (!selectedRole && roles.length > 1) {
    // Show role selector first
    return (
      <main className="h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Select a role to onboard</h2>
          <p className="mb-6 text-gray-600">You have multiple roles. Complete onboarding for one role now, and do the others later.</p>
          <div className="flex flex-col gap-4">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className="w-full py-3 bg-brand-green text-white rounded-lg font-semibold hover:bg-green-600 transition"
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
    <main className="h-screen bg-gray-50 overflow-hidden">
      <div className="flex h-full flex-col md:flex-row">
        {/* Info Panel */}
        <BackgroundPanel
          backgroundImage="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900"
          containerClassName="hidden md:flex md:w-1/2 h-full relative overflow-hidden"
          overlayClassName="absolute inset-0 bg-black/40"
          contentClassName="absolute inset-0 flex flex-col justify-center items-center text-center p-8"
        >
          <FadeIn>
            <h2 className="text-white text-4xl font-bold mb-4 drop-shadow-lg">
              Welcome to Help2Home
            </h2>
            {selectedRole && (
              <p className="text-gray-200 text-lg drop-shadow-md max-w-md mb-4">
                {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Onboarding — Fill in your details to get started.
              </p>
            )}


            <div className="space-y-4">
              <div className="bg-white/20 p-4 rounded-lg">
                <p className="text-white text-sm">
                  Step {safeStep + 1} of {steps.length}: {steps[safeStep].title}
                </p>
              </div>
              {steps[safeStep].tooltip && (
                <div className="bg-white/20 p-3 rounded-lg text-sm text-gray-100">
                  {steps[safeStep].tooltip}
                </div>
              )}
            </div>
          </FadeIn>
        </BackgroundPanel>

        {/* Form Column */}
        <div className="w-full md:w-1/2 h-full overflow-y-auto p-6 md:p-12">
          <div className="min-h-full flex items-center justify-center">
            <FadeIn>
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 w-full max-w-2xl">
                <div className="text-center mb-10">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {steps[safeStep].title}
                  </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <FadeIn key={safeStep}>
                    {steps[safeStep].fields}
                  </FadeIn>

                  <div className="flex justify-between mt-6">
                    {safeStep > 0 && (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
                      >
                        Previous
                      </button>
                    )}

                    {!isLastStep && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="ml-auto px-6 py-3 bg-[#00853E] text-white rounded-lg font-medium hover:bg-green-700 transition"
                      >
                        Next
                      </button>
                    )}

                    {isLastStep && (
                      <button
                        type="submit"
                        className="ml-auto px-6 py-3 bg-[#00853E] text-white rounded-lg font-bold hover:bg-green-700 transition"
                      >
                        Complete Onboarding
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </main>
  );
}

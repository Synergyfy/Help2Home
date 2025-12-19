'use client';

import React,{ useState,JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FadeIn from '@/components/FadeIn';
import {toast} from 'react-toastify'

export default function OnboardingPage() {
  const router = useRouter();

  const storedUser = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('auth_user') || '{}')
    : {};
  const role = storedUser.role || 'tenant';

  const [formData, setFormData] = useState<any>({
    firstName: '',
    lastName: '',
    phone: '',
    portfolioSize: '',
    investorType: 'individual',
    investmentBudget: '',
    address: '',
    state: '',
    employmentStatus: '',
    monthlyIncome: '',
    gender: '',
  });

  const [currentStep, setCurrentStep] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let onboardingData: any = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
    };

    if (role === 'tenant') {
      onboardingData = {
        ...onboardingData,
        gender: formData.gender,
        address: formData.address,
        state: formData.state,
        employmentStatus: formData.employmentStatus,
        monthlyIncome: formData.monthlyIncome,
      };
    } else if (role === 'landlord' || role === 'agent' || role === 'property_manager') {
      onboardingData = {
        ...onboardingData,
        portfolioSize: formData.portfolioSize,
      };
    } else if (role === 'investor') {
      onboardingData = {
        ...onboardingData,
        investorType: formData.investorType,
        investmentBudget: formData.investmentBudget,
      };
    }

    localStorage.setItem('user_onboarding', JSON.stringify(onboardingData));
    localStorage.setItem('user_session', 'true');
    window.dispatchEvent(new Event('auth-change'));
    toast.success('login with your credentials');
    router.push('/signin');
  };

  // Define form steps dynamically
  const steps: { title: string; fields: JSX.Element }[] = [
    {
      title: 'Basic Info',
      fields: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
              required
            />
          </div>
        </div>
      ),
    },
    ...(role === 'tenant'
      ? [
        {
          title: 'Tenant Details',
          fields: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                  required
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
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status</label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                  required
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
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                  required
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
      ]
      : role === 'investor'
        ? [
          {
            title: 'Investor Details',
            fields: (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investor Type</label>
                  <select
                    name="investorType"
                    value={formData.investorType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                    required
                  >
                    <option value="individual">Individual</option>
                    <option value="corporate">Corporate / Institution</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Budget</label>
                  <select
                    name="investmentBudget"
                    value={formData.investmentBudget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="500k-1m">₦500,000 - ₦1,000,000</option>
                    <option value="1m-5m">₦1,000,000 - ₦5,000,000</option>
                    <option value="5m-20m">₦5,000,000 - ₦20,000,000</option>
                    <option value="20m+">₦20,000,000+</option>
                  </select>
                </div>
              </div>
            ),
          },
        ]
        : role === 'landlord' || role === 'agent' || role === 'property_manager'
          ? [
            {
              title: 'Portfolio Info',
              fields: (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Size</label>
                  <select
                    name="portfolioSize"
                    value={formData.portfolioSize}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#00853E] focus:border-transparent"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="1">1 Property</option>
                    <option value="2-5">2-5 Properties</option>
                    <option value="6-20">6-20 Properties</option>
                    <option value="20+">20+ Properties</option>
                  </select>
                </div>
              ),
            },
          ]
          : []),
  ];

  const isLastStep = currentStep === steps.length - 1;

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl">
        <FadeIn>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-10">

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{steps[currentStep].title}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FadeIn key={currentStep}>
                {steps[currentStep].fields}
              </FadeIn>

              <div className="flex justify-between mt-6">
                {currentStep > 0 && (
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
    </main>
  );
}

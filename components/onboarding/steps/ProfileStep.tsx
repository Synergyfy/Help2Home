'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiPhone, FiArrowRight, FiArrowLeft, FiMail } from "react-icons/fi";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";

const ProfileStep = () => {
  const { getCurrentUser, nextStep, prevStep } = useOnboardingStore();
  const { setUser } = useUserStore()
  const user = getCurrentUser();

  const isEmailSignup = !!user?.currentEmail;
  const isPhoneSignup = !!user?.currentPhone;

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");
  const [errors, setErrors] = useState<{ firstName?: string; lastName?: string; phone?: string; email?: string }>({});

  // Auto-detect names from email if email signup
  useEffect(() => {
    if (isEmailSignup && user?.currentEmail && !firstName && !lastName) {
      const parts = user.currentEmail.split('@')[0].split(/[._-]/);
      if (parts.length >= 1) {
        setFirstName(parts[0].charAt(0).toUpperCase() + parts[0].slice(1));
      }
      if (parts.length >= 2) {
        setLastName(parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' '));
      }
    }
  }, [isEmailSignup, user?.currentEmail, firstName, lastName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { firstName?: string; lastName?: string; phone?: string; email?: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = "Please enter your first name";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Please enter your last name";
    }

    if (isEmailSignup && !phone.trim()) {
      newErrors.phone = "Please enter your phone number";
    }

    if (isPhoneSignup && !email.trim()) {
      newErrors.email = "Please enter your email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    useOnboardingStore.getState().setNames(firstName, lastName);
    useUserStore.getState().updateProfile({ firstName, lastName });

    // Handle skip logic directly here to avoid multiple intermediate transitions
    const roles = user?.roles || [];
    if (roles.length === 1) {
      // Single role (Tenant, Investor, etc.) -> Jump to Role Onboarding (Step 5+)
      useOnboardingStore.getState().setActiveRole(roles[0]);
      useOnboardingStore.getState().goToStep(5);
    } else if (roles.length > 1) {
      // Multiple roles (Property Management) -> Jump to Role Chooser (Step 4)
      useOnboardingStore.getState().goToStep(4);
    } else {
      // No roles pre-selected -> Go to Role Selection (Step 3)
      nextStep();
    }
  };

  return (
    <motion.div
      key="profile-step"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col"
    >
      <div className="mb-8">
        <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Personal Details</p>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
          Tell us about yourself
        </h1>
        <p className="text-gray-600 font-medium">
          We found some details for you. Please complete the rest.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                First Name
              </label>
              <div className="relative group">
                <FiUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all"
                />
              </div>
              {errors.firstName && (
                <p className="mt-2 text-sm text-red-500 font-bold flex items-center gap-1">
                  <span>•</span> {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Last Name
              </label>
              <div className="relative group">
                <FiUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all"
                />
              </div>
              {errors.lastName && (
                <p className="mt-2 text-sm text-red-500 font-bold flex items-center gap-1">
                  <span>•</span> {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {isEmailSignup ? (
            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Phone Number
              </label>
              <div className="relative group">
                <FiPhone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors"
                  size={20}
                />
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all"
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-500 font-bold flex items-center gap-1">
                  <span>•</span> {errors.phone}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative group">
                <FiMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 bg-white text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-500 font-bold flex items-center gap-1">
                  <span>•</span> {errors.email}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-4 border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 active:scale-95"
          >
            <FiArrowLeft size={18} />
            Back
          </button>
          <button
            type="submit"
            className="flex-1 py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            Continue
            <FiArrowRight size={20} />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfileStep;

'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiArrowRight, FiPhone } from "react-icons/fi";
import { useOnboardingStore } from "@/store/onboardingStore";
import { Role } from "@/store/userStore";
import Logo from "@/components/shared/Logo";

const EmailStep = () => {
  const {
    setCurrentEmail,
    setCurrentPhone,
    nextStep,
    currentEmail: storedEmail,
    currentPhone: storedPhone,
    currentStep,
    selectedRoles
  } = useOnboardingStore();

  const [inputType, setInputType] = useState<'email' | 'phone'>('email');
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!value.trim()) {
      setError(`Please enter your ${inputType === 'email' ? 'email address' : 'phone number'}`);
      return;
    }

    if (inputType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError("Please enter a valid email address");
        return;
      }
      setCurrentEmail(value.toLowerCase().trim());
      setCurrentPhone(""); // Clear phone if email is used
    } else {
      // Basic phone validation
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(value)) {
        setError("Please enter a valid phone number");
        return;
      }
      setCurrentPhone(value.trim());
      setCurrentEmail(""); // Clear email if phone is used
    }

    nextStep();
  };

  const hasProgress =
    (inputType === 'email' && value.toLowerCase().trim() === storedEmail?.toLowerCase() && storedEmail) ||
    (inputType === 'phone' && value.trim() === storedPhone && storedPhone);

  return (
    <motion.div
      key="email-step"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
          Let&apos;s get you started
        </h1>
        <p className="text-gray-600 font-medium">
          Choose your preferred way to create an account.
        </p>
      </div>

      <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
        <button
          onClick={() => { setInputType('email'); setValue(""); setError(""); }}
          className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${inputType === 'email' ? 'bg-white text-brand-green shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Email Address
        </button>
        <button
          onClick={() => { setInputType('phone'); setValue(""); setError(""); }}
          className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${inputType === 'phone' ? 'bg-white text-brand-green shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Phone Number
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-4 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={inputType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <label htmlFor="input" className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                {inputType === 'email' ? 'Email Address' : 'Phone Number'}
              </label>
              <div className="relative group">
                {inputType === 'email' ? (
                  <FiMail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors"
                    size={20}
                  />
                ) : (
                  <FiPhone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-green transition-colors"
                    size={20}
                  />
                )}
                <input
                  type={inputType === 'email' ? 'email' : 'tel'}
                  id="input"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={inputType === 'email' ? 'you@example.com' : '+234 800 000 0000'}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 bg-white text-gray-900 font-medium focus:outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all"
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-500 font-bold flex items-center gap-1">
                  <span>•</span> {error}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {hasProgress && currentStep > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl bg-brand-green/5 border border-brand-green/20"
            >
              <p className="text-sm text-gray-900 font-bold mb-1">
                Welcome back! 👋
              </p>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                We found your progress. You can jump straight back to step {currentStep + 1}.
              </p>
              <div className="mt-2 flex gap-2">
                {selectedRoles.map((role: Role) => (
                  <span key={role} className="text-[10px] uppercase font-bold tracking-widest bg-white px-2 py-0.5 rounded border border-brand-green/20 text-brand-green">
                    {role}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-8 space-y-5">
          <button
            type="submit"
            className="w-full py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {hasProgress ? "Resume Setup" : "Continue"}
            <FiArrowRight size={20} />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EmailStep;

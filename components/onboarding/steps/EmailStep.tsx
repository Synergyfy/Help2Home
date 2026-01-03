'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { useOnboardingStore } from "@/store/onboardingStore";
import { Role } from "@/store/userStore";

const EmailStep = () => {
  // users does not exist, but currentEmail and currentStep do.
  const { setCurrentEmail, nextStep, currentEmail: storedEmail, currentStep, selectedRoles } = useOnboardingStore();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    setCurrentEmail(normalizedEmail);
    
    // If they are resuming the same email that has progress stored locally
    if (normalizedEmail === storedEmail?.toLowerCase() && currentStep > 0) {
      // Logic for jumping to the specific step is usually handled in the parent 
      // by reading 'currentStep' from the store.
      nextStep(); 
      return;
    }
    
    nextStep();
  };

  // Logic: "Progress" exists if the typed email matches the persisted email in the wizard
  const hasProgress = 
    email.toLowerCase().trim() === storedEmail?.toLowerCase() && 
    currentStep > 0 && 
    selectedRoles.length > 0;

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
        <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Welcome to Help2Home</p>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
          Let&apos;s get you started
        </h1>
        <p className="text-gray-600 font-medium">
          Enter your email to create an account or resume your setup.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-4 flex-1">
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
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-100 bg-white text-gray-900 font-medium focus:outline-none focus:border-brand-green focus:ring-4 focus:ring-brand-green/10 transition-all"
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500 font-bold flex items-center gap-1">
                <span>•</span> {error}
              </p>
            )}
          </div>

          {hasProgress && (
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
'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { FiDollarSign, FiTrendingUp, FiClock, FiArrowRight, FiArrowLeft, FiCheck } from "react-icons/fi";
import { useOnboardingStore, InvestorData } from "@/store/onboardingStore";
import { useUserStore } from "@/store/userStore";

const budgetRanges = ["₦100k - ₦500k", "₦500k - ₦1M", "₦1M - ₦5M", "₦5M - ₦10M", "₦10M+"];
const investmentTypes = [
  { label: "Rental Properties", tooltip: "Direct ownership of properties to earn regular rental income." },
  { label: "Fix & Flip", tooltip: "Buying distressed properties, renovating them, and selling for profit." },
  { label: "Development", tooltip: "Investing in the construction of new buildings or major infrastructure." },
  { label: "REITs", tooltip: "Investing in companies that own or finance income-producing real estate." },
  { label: "Land Banking", tooltip: "Buying undeveloped land to hold for future development or resale." },
  { label: "Short-term Rentals", tooltip: "Managing properties for short stays through platforms like Airbnb." }
];
const riskLevels = [
  { label: "Conservative", tooltip: "Focuses on capital preservation and steady, low-risk returns." },
  { label: "Moderate", tooltip: "A balanced approach seeking a mix of safety and growth." },
  { label: "Aggressive", tooltip: "Higher risk tolerance for potentially significant capital appreciation." },
  { label: "Very Aggressive", tooltip: "Maximum risk for maximum potential returns and rapid growth." }
];
const returnExpectations = ["8-12% annually", "12-18% annually", "18-25% annually", "25%+ annually"];
const timelines = ["Short-term (1-2 years)", "Medium-term (3-5 years)", "Long-term (5-10 years)", "Very long-term (10+ years)"];

interface InvestorStepProps {
  stepNumber: 1 | 2 | 3;
}

const InvestorStep = ({ stepNumber }: InvestorStepProps) => {
  const { getCurrentUser, updateRoleData, nextStep, prevStep, goToStep, completeRoleOnboarding } = useOnboardingStore();
  const user = getCurrentUser();
  const investorData = user?.investor || {} as InvestorData;

  const [formData, setFormData] = useState<InvestorData>({
    investmentBudget: investorData.investmentBudget || "",
    investmentType: investorData.investmentType || [],
    riskTolerance: investorData.riskTolerance || "",
    expectedReturns: investorData.expectedReturns || "",
    investmentTimeline: investorData.investmentTimeline || "",
  });

  const handleContinue = () => {
    updateRoleData("investor", formData);
    nextStep();
  };

  const handleComplete = () => {
    updateRoleData("investor", formData);
    useUserStore.getState().updateRoleProfileData("investor", formData);
    completeRoleOnboarding("investor");

    // Check if other selected roles need onboarding
    const remainingRoles = user?.roles?.filter(
      r => !user.roleOnboardingCompleted?.[r] && r !== 'investor'
    ) || [];

    if (remainingRoles.length > 0) {
      goToStep(4); // Back to chooser
    } else {
      goToStep(8); // Proceed to completion screen
    }
  };

  const toggleInvestmentType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      investmentType: prev.investmentType.includes(type)
        ? prev.investmentType.filter(t => t !== type)
        : [...prev.investmentType, type]
    }));
  };

  if (stepNumber === 1) {
    return (
      <motion.div
        key="investor-step-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col"
      >
        <div className="mb-6">
          <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Investor Setup • Step 1 of 3</p>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Investment budget</h1>
          <p className="text-gray-600 font-medium">What is your current investment capacity?</p>
        </div>

        <div className="space-y-6 flex-1">
          <div>
            <label className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
              <FiDollarSign className="text-brand-green" /> Investment budget range
            </label>
            <div className="grid grid-cols-1 gap-3">
              {budgetRanges.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, investmentBudget: range }))}
                  className={`p-4 rounded-xl border-2 text-sm font-bold transition-all text-left ${formData.investmentBudget === range
                    ? "border-brand-green bg-brand-green/5 text-brand-green"
                    : "border-gray-100 hover:border-gray-300 text-gray-500"
                    }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => goToStep(4)}
            className="px-6 py-4 border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <FiArrowLeft size={18} /> Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!formData.investmentBudget}
            className="flex-1 py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
          >
            Continue <FiArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    );
  }

  if (stepNumber === 2) {
    return (
      <motion.div
        key="investor-step-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col"
      >
        <div className="mb-6">
          <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Investor Setup • Step 2 of 3</p>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Strategy & Risk</h1>
          <p className="text-gray-600 font-medium">Define your investment style and comfort levels.</p>
        </div>

        <div className="space-y-8 flex-1">
          <div>
            <label className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
              <FiTrendingUp className="text-brand-green" /> Investment types
            </label>
            <div className="grid grid-cols-2 gap-3">
              {investmentTypes.map((type) => (
                <div key={type.label} className="relative group">
                  <button
                    key={type.label}
                    type="button"
                    onClick={() => toggleInvestmentType(type.label)}
                    className={`w-full p-4 rounded-xl border-2 text-sm font-bold transition-all flex items-center justify-between ${formData.investmentType.includes(type.label)
                      ? "border-brand-green bg-brand-green/5 text-brand-green"
                      : "border-gray-100 hover:border-gray-300 text-gray-500"
                      }`}
                  >
                    {type.label} {formData.investmentType.includes(type.label) && <FiCheck size={16} />}
                  </button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-gray-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 text-center shadow-xl">
                    {type.tooltip}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Risk tolerance</label>
            <div className="grid grid-cols-2 gap-3">
              {riskLevels.map((level) => (
                <div key={level.label} className="relative group">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, riskTolerance: level.label }))}
                    className={`w-full p-4 rounded-xl border-2 text-sm font-bold transition-all ${formData.riskTolerance === level.label
                      ? "border-brand-green bg-brand-green/5 text-brand-green"
                      : "border-gray-100 hover:border-gray-300 text-gray-500"
                      }`}
                  >
                    {level.label}
                  </button>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-gray-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 text-center shadow-xl">
                    {level.tooltip}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button onClick={prevStep} className="px-6 py-4 border-2 border-gray-100 text-gray-600 font-bold rounded-xl active:scale-95 transition-all">
            <FiArrowLeft size={18} />
          </button>
          <button
            onClick={handleContinue}
            disabled={formData.investmentType.length === 0 || !formData.riskTolerance}
            className="flex-1 py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
          >
            Continue <FiArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="investor-step-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col"
    >
      <div className="mb-6">
        <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Investor Setup • Step 3 of 3</p>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Expectations</h1>
        <p className="text-gray-600 font-medium">What are your long-term goals?</p>
      </div>

      <div className="space-y-8 flex-1">
        <div>
          <label className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
            <FiTrendingUp className="text-brand-green" /> Expected annual returns
          </label>
          <div className="grid grid-cols-2 gap-3">
            {returnExpectations.map((expectation) => (
              <button
                key={expectation}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, expectedReturns: expectation }))}
                className={`p-4 rounded-xl border-2 text-sm font-bold transition-all ${formData.expectedReturns === expectation
                  ? "border-brand-green bg-brand-green/5 text-brand-green"
                  : "border-gray-100 hover:border-gray-300 text-gray-500"
                  }`}
              >
                {expectation}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
            <FiClock className="text-brand-green" /> Investment timeline
          </label>
          <div className="grid grid-cols-1 gap-3">
            {timelines.map((timeline) => (
              <button
                key={timeline}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, investmentTimeline: timeline }))}
                className={`p-4 rounded-xl border-2 text-sm font-bold transition-all text-left ${formData.investmentTimeline === timeline
                  ? "border-brand-green bg-brand-green/5 text-brand-green"
                  : "border-gray-100 hover:border-gray-300 text-gray-500"
                  }`}
              >
                {timeline}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button onClick={prevStep} className="px-6 py-4 border-2 border-gray-100 text-gray-600 font-bold rounded-xl active:scale-95 transition-all">
          <FiArrowLeft size={18} />
        </button>
        <button
          onClick={handleComplete}
          disabled={!formData.expectedReturns || !formData.investmentTimeline}
          className="flex-1 py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
        >
          Complete Investor Setup <FiCheck size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default InvestorStep;

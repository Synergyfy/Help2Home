'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { FiDollarSign, FiTrendingUp, FiClock, FiArrowRight, FiArrowLeft, FiCheck } from "react-icons/fi";
import { useOnboardingStore, InvestorData } from "@/store/onboardingStore";

const budgetRanges = ["₦10M - ₦50M", "₦50M - ₦100M", "₦100M - ₦500M", "₦500M - ₦1B", "₦1B+"];
const investmentTypes = ["Rental Properties", "Fix & Flip", "Development", "REITs", "Land Banking", "Short-term Rentals"];
const riskLevels = ["Conservative", "Moderate", "Aggressive", "Very Aggressive"];
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
    completeRoleOnboarding("investor");
    
    // Check if other selected roles need onboarding
    const remainingRoles = user?.roles?.filter(
      r => !user.roleOnboardingCompleted?.[r] && r !== 'investor'
    ) || [];
    
    if (remainingRoles.length > 0) {
      goToStep(4); // Back to chooser
    } else {
      nextStep(); // Proceed to completion screen
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
            <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
              <FiDollarSign className="text-brand-green" /> Investment budget range
            </label>
            <div className="grid grid-cols-1 gap-3">
              {budgetRanges.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, investmentBudget: range }))}
                  className={`p-4 rounded-xl border-2 text-sm font-bold transition-all text-left ${
                    formData.investmentBudget === range
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
            <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
              <FiTrendingUp className="text-brand-green" /> Investment types
            </label>
            <div className="grid grid-cols-2 gap-3">
              {investmentTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleInvestmentType(type)}
                  className={`p-4 rounded-xl border-2 text-sm font-bold transition-all flex items-center justify-between ${
                    formData.investmentType.includes(type)
                      ? "border-brand-green bg-brand-green/5 text-brand-green"
                      : "border-gray-100 hover:border-gray-300 text-gray-500"
                  }`}
                >
                  {type} {formData.investmentType.includes(type) && <FiCheck size={16} />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Risk tolerance</label>
            <div className="grid grid-cols-2 gap-3">
              {riskLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, riskTolerance: level }))}
                  className={`p-4 rounded-xl border-2 text-sm font-bold transition-all ${
                    formData.riskTolerance === level
                      ? "border-brand-green bg-brand-green/5 text-brand-green"
                      : "border-gray-100 hover:border-gray-300 text-gray-500"
                  }`}
                >
                  {level}
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
          <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
            <FiTrendingUp className="text-brand-green" /> Expected annual returns
          </label>
          <div className="grid grid-cols-2 gap-3">
            {returnExpectations.map((expectation) => (
              <button
                key={expectation}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, expectedReturns: expectation }))}
                className={`p-4 rounded-xl border-2 text-sm font-bold transition-all ${
                  formData.expectedReturns === expectation
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
          <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
            <FiClock className="text-brand-green" /> Investment timeline
          </label>
          <div className="grid grid-cols-1 gap-3">
            {timelines.map((timeline) => (
              <button
                key={timeline}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, investmentTimeline: timeline }))}
                className={`p-4 rounded-xl border-2 text-sm font-bold transition-all text-left ${
                  formData.investmentTimeline === timeline
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
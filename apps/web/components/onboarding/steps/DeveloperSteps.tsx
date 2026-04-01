'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { FiHome, FiSettings, FiTool, FiArrowRight, FiArrowLeft, FiCheck, FiBriefcase, FiLayers } from "react-icons/fi";
import { useOnboardingStore, DeveloperData } from "@/store/onboardingStore";
import { useUserStore } from "@/store/userStore";

const yearsExperienceOptions = ["0-2 years", "3-5 years", "6-10 years", "10+ years"];
const specializationOptions = ["Residential", "Commercial", "Industrial", "Luxury", "Affordable Housing", "Mixed-Use"];

interface DeveloperStepProps {
    stepNumber: 1 | 2;
}

const DeveloperSteps = ({ stepNumber }: DeveloperStepProps) => {
    const { getCurrentUser, updateRoleData, nextStep, prevStep, goToStep, completeRoleOnboarding } = useOnboardingStore();
    const user = getCurrentUser();
    const developerData = user?.developer || {} as DeveloperData;

    const [formData, setFormData] = useState<DeveloperData>({
        companyName: developerData.companyName || "",
        registrationNumber: developerData.registrationNumber || "",
        yearsExperience: developerData.yearsExperience || "",
        specialization: developerData.specialization || [],
        portfolioHighlights: developerData.portfolioHighlights || "",
    });

    const handleContinue = () => {
        updateRoleData("developer", formData);
        nextStep();
    };

    const handleComplete = () => {
        updateRoleData("developer", formData);
        useUserStore.getState().updateRoleProfileData("developer", formData);
        completeRoleOnboarding("developer");

        // Check if there are other roles selected that haven't been completed yet
        const remainingRoles = user?.roles?.filter(
            r => !user.roleOnboardingCompleted?.[r] && r !== 'developer'
        ) || [];

        if (remainingRoles.length > 0) {
            goToStep(4); // Return to Role Chooser
        } else {
            goToStep(8); // Proceed to final completion screen
        }
    };

    const toggleSpecialization = (spec: string) => {
        setFormData(prev => ({
            ...prev,
            specialization: prev.specialization.includes(spec)
                ? prev.specialization.filter(s => s !== spec)
                : [...prev.specialization, spec]
        }));
    };

    if (stepNumber === 1) {
        return (
            <motion.div
                key="developer-step-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col"
            >
                <div className="mb-6">
                    <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Developer Setup • Step 1 of 2</p>
                    <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Company Information</h1>
                    <p className="text-gray-600 font-medium">Tell us about your development firm.</p>
                </div>

                <div className="space-y-6 flex-1">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Company Name</label>
                        <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                            placeholder="e.g. Zenith Developments"
                            className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-brand-green outline-none font-medium transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">CAC Registration Number</label>
                        <input
                            type="text"
                            value={formData.registrationNumber}
                            onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                            placeholder="RC1234567"
                            className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-brand-green outline-none font-medium transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Years of Experience</label>
                        <div className="grid grid-cols-2 gap-3">
                            {yearsExperienceOptions.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, yearsExperience: option }))}
                                    className={`p-4 rounded-xl border-2 text-sm font-bold transition-all ${formData.yearsExperience === option
                                        ? "border-brand-green bg-brand-green/5 text-brand-green"
                                        : "border-gray-100 hover:border-gray-300 text-gray-500"
                                        }`}
                                >
                                    {option}
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
                        disabled={!formData.companyName || !formData.registrationNumber || !formData.yearsExperience}
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
            key="developer-step-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col"
        >
            <div className="mb-6">
                <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Developer Setup • Step 2 of 2</p>
                <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Specialization & Portfolio</h1>
                <p className="text-gray-600 font-medium">What kind of projects do you focus on?</p>
            </div>

            <div className="space-y-6 flex-1">
                <div>
                    <label className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
                        <FiLayers className="text-brand-green" /> Key Specializations
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {specializationOptions.map((spec) => (
                            <button
                                key={spec}
                                type="button"
                                onClick={() => toggleSpecialization(spec)}
                                className={`p-4 rounded-xl border-2 text-sm font-bold transition-all flex items-center justify-between ${formData.specialization.includes(spec)
                                    ? "border-brand-green bg-brand-green/5 text-brand-green"
                                    : "border-gray-100 hover:border-gray-300 text-gray-500"
                                    }`}
                            >
                                {spec} {formData.specialization.includes(spec) && <FiCheck size={16} />}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Portfolio Highlights</label>
                    <textarea
                        value={formData.portfolioHighlights}
                        onChange={(e) => setFormData(prev => ({ ...prev, portfolioHighlights: e.target.value }))}
                        placeholder="Tell us about some of your notable completed projects..."
                        className="w-full p-4 rounded-xl border-2 border-gray-100 focus:border-brand-green outline-none font-medium transition-all h-32 resize-none"
                    />
                </div>
            </div>

            <div className="mt-8 flex gap-3">
                <button onClick={prevStep} className="px-6 py-4 border-2 border-gray-100 text-gray-600 font-bold rounded-xl active:scale-95 transition-all">
                    <FiArrowLeft size={18} />
                </button>
                <button
                    onClick={handleComplete}
                    disabled={formData.specialization.length === 0}
                    className="flex-1 py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
                >
                    Complete Developer Setup <FiCheck size={18} />
                </button>
            </div>
        </motion.div>
    );
};

export default DeveloperSteps;

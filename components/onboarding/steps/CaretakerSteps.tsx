'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiArrowLeft, FiCheck } from "react-icons/fi";
import { useOnboardingStore } from "@/store/onboardingStore";

interface CaretakerStepProps {
  stepNumber: 1 | 2 | 3;
}

const CaretakerStep1 = () => {
  const { getCurrentUser, updateRoleData, nextStep, goToStep } = useOnboardingStore();
  const user = getCurrentUser();
  const caretakerData = user?.caretaker || {};

  const [propertiesManaged, setPropertiesManaged] = useState(caretakerData.propertiesManaged || "");
  const [managementExperience, setManagementExperience] = useState(caretakerData.managementExperience || "");

  const experienceLevels = ["Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"];
  const propertyRanges = ["1-5 properties", "6-15 properties", "16-30 properties", "30+ properties"];

  const handleContinue = () => {
    updateRoleData("caretaker", { propertiesManaged, managementExperience });
    nextStep();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col">
      <div className="mb-6">
        <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Caretaker Setup • Step 1 of 3</p>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Your Experience</h1>
        <p className="text-gray-600">Tell us about your property management background.</p>
      </div>

      <div className="space-y-8 flex-1">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">How many properties do you currently manage?</label>
          <div className="grid grid-cols-2 gap-3">
            {propertyRanges.map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setPropertiesManaged(range)}
                className={`p-4 rounded-xl border-2 text-sm font-bold transition-all ${
                  propertiesManaged === range ? "border-brand-green bg-brand-green/5 text-brand-green" : "border-gray-100 hover:border-gray-300 text-gray-500"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Years of experience as a caretaker?</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {experienceLevels.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setManagementExperience(level)}
                className={`p-4 rounded-xl border-2 text-left text-sm font-bold transition-all ${
                  managementExperience === level ? "border-brand-green bg-brand-green/5 text-brand-green" : "border-gray-100 hover:border-gray-300 text-gray-500"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button onClick={() => goToStep(4)} className="px-6 py-4 border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
          <FiArrowLeft size={18} /> Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!propertiesManaged || !managementExperience}
          className="flex-1 py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
        >
          Continue <FiArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

const CaretakerStep2 = () => {
  const { getCurrentUser, updateRoleData, nextStep, prevStep } = useOnboardingStore();
  const user = getCurrentUser();
  const caretakerData = user?.caretaker || {};

  const [availableHours, setAvailableHours] = useState(caretakerData.availableHours || "");
  const [preferredPropertyTypes, setPreferredPropertyTypes] = useState<string[]>(caretakerData.preferredPropertyTypes || []);

  const hourOptions = ["Part-time (< 20 hrs/week)", "Full-time (40 hrs/week)", "On-call / Flexible", "24/7 Available"];
  const propertyTypes = ["Residential Apartments", "Single Family Homes", "Commercial Buildings", "Mixed-Use Properties", "Gated Communities"];

  const togglePropertyType = (type: string) => {
    setPreferredPropertyTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const handleContinue = () => {
    updateRoleData("caretaker", { availableHours, preferredPropertyTypes });
    nextStep();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col">
      <div className="mb-6">
        <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Caretaker Setup • Step 2 of 3</p>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Availability</h1>
        <p className="text-gray-600">Let us know your work capacity and property preferences.</p>
      </div>

      <div className="space-y-8 flex-1">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">What's your availability?</label>
          <div className="space-y-3">
            {hourOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setAvailableHours(option)}
                className={`w-full p-4 rounded-xl border-2 text-left text-sm font-bold transition-all ${
                  availableHours === option ? "border-brand-green bg-brand-green/5 text-brand-green" : "border-gray-100 hover:border-gray-300 text-gray-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Preferred Property Types</label>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => togglePropertyType(type)}
                className={`px-4 py-2 rounded-full border-2 text-sm font-bold transition-all flex items-center gap-2 ${
                  preferredPropertyTypes.includes(type) ? "border-brand-green bg-brand-green text-white" : "border-gray-100 hover:border-gray-300 text-gray-500"
                }`}
              >
                {preferredPropertyTypes.includes(type) && <FiCheck size={14} />} {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button onClick={prevStep} className="px-6 py-4 border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
          <FiArrowLeft size={18} /> Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!availableHours || preferredPropertyTypes.length === 0}
          className="flex-1 py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
        >
          Continue <FiArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

const CaretakerStep3 = () => {
  const { getCurrentUser, updateRoleData, completeRoleOnboarding, goToStep, nextStep, prevStep } = useOnboardingStore();
  const user = getCurrentUser();
  const caretakerData = user?.caretaker || {};

  const [services, setServices] = useState<string[]>(caretakerData.services || []);
  const serviceOptions = ["Rent Collection", "Tenant Screening", "Property Maintenance", "Security & Surveillance", "Cleaning & Landscaping", "Emergency Response", "Utility Management", "Tenant Communication"];

  const toggleService = (service: string) => {
    setServices(prev => prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]);
  };

  const handleComplete = () => {
    updateRoleData("caretaker", { services });
    completeRoleOnboarding("caretaker");
    
    // Check if other selected roles need onboarding
    const remainingRoles = user?.roles?.filter(r => !user.roleOnboardingCompleted?.[r] && r !== 'caretaker') || [];
    
    if (remainingRoles.length > 0) {
      goToStep(4); // Back to chooser
    } else {
      nextStep(); // Finish onboarding
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col">
      <div className="mb-6">
        <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Caretaker Setup • Step 3 of 3</p>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Services You Offer</h1>
        <p className="text-gray-600">Select the specialized services you provide.</p>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {serviceOptions.map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => toggleService(service)}
              className={`p-4 rounded-xl border-2 text-sm font-bold text-left transition-all flex items-center justify-between ${
                services.includes(service) ? "border-brand-green bg-brand-green/5 text-brand-green" : "border-gray-100 hover:border-gray-300 text-gray-500"
              }`}
            >
              {service} {services.includes(service) && <FiCheck className="text-brand-green" size={18} />}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button onClick={prevStep} className="px-6 py-4 border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
          <FiArrowLeft size={18} /> Back
        </button>
        <button
          onClick={handleComplete}
          disabled={services.length === 0}
          className="flex-1 py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
        >
          Complete Caretaker Setup <FiCheck size={18} />
        </button>
      </div>
    </motion.div>
  );
};

const CaretakerStep = ({ stepNumber }: CaretakerStepProps) => {
  switch (stepNumber) {
    case 1: return <CaretakerStep1 />;
    case 2: return <CaretakerStep2 />;
    case 3: return <CaretakerStep3 />;
    default: return <CaretakerStep1 />;
  }
};

export default CaretakerStep;
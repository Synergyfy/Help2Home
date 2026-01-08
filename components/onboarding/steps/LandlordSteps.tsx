'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { FiHome, FiSettings, FiTool, FiArrowRight, FiArrowLeft, FiCheck } from "react-icons/fi";
import { useOnboardingStore, LandlordData } from "@/store/onboardingStore";
import { useUserStore } from "@/store/userStore";

const propertyCountOptions = ["1 property", "2-5 properties", "6-10 properties", "10+ properties"];
const propertyTypes = ["Apartments", "Houses", "Duplexes", "Commercial", "Land", "Mixed"];
const managementStyles = ["Self-managed", "Property manager", "Hybrid", "Looking for help"];
const experienceLevels = ["New landlord", "1-3 years", "3-5 years", "5+ years"];
const servicesList = ["Tenant screening", "Rent collection", "Maintenance", "Legal support", "Marketing", "Accounting"];

interface LandlordStepProps {
  stepNumber: 1 | 2 | 3;
}

const LandlordStep = ({ stepNumber }: LandlordStepProps) => {
  const { getCurrentUser, updateRoleData, nextStep, prevStep, goToStep, completeRoleOnboarding } = useOnboardingStore();
  const user = getCurrentUser();
  const landlordData = user?.landlord || {} as LandlordData;

  const [formData, setFormData] = useState<LandlordData>({
    propertyCount: landlordData.propertyCount || "",
    propertyTypes: landlordData.propertyTypes || [],
    managementStyle: landlordData.managementStyle || "",
    services: landlordData.services || [],
    experience: landlordData.experience || "",
  });

  const handleContinue = () => {
    updateRoleData("landlord", formData);
    nextStep();
  };

  const handleComplete = () => {
    updateRoleData("landlord", formData);
    useUserStore.getState().updateRoleProfileData("landlord", formData);
    completeRoleOnboarding("landlord");

    // Check if there are other roles selected that haven't been completed yet
    const remainingRoles = user?.roles?.filter(
      r => !user.roleOnboardingCompleted?.[r] && r !== 'landlord'
    ) || [];

    if (remainingRoles.length > 0) {
      goToStep(4); // Return to Role Chooser
    } else {
      goToStep(8); // Proceed to final completion screen
    }
  };

  const togglePropertyType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  };

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  if (stepNumber === 1) {
    return (
      <motion.div
        key="landlord-step-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col"
      >
        <div className="mb-6">
          <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Landlord Setup • Step 1 of 3</p>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Property Portfolio</h1>
          <p className="text-gray-600 font-medium">Tell us about the properties you own or manage.</p>
        </div>

        <div className="space-y-8 flex-1">
          <div>
            <label className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
              <FiHome className="text-brand-green" /> How many properties?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {propertyCountOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, propertyCount: option }))}
                  className={`p-4 rounded-xl border-2 text-sm font-bold transition-all ${formData.propertyCount === option
                    ? "border-brand-green bg-brand-green/5 text-brand-green"
                    : "border-gray-100 hover:border-gray-300 text-gray-500"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Property Types</label>
            <div className="grid grid-cols-2 gap-3">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => togglePropertyType(type)}
                  className={`p-4 rounded-xl border-2 text-sm font-bold transition-all flex items-center justify-between ${formData.propertyTypes.includes(type)
                    ? "border-brand-green bg-brand-green/5 text-brand-green"
                    : "border-gray-100 hover:border-gray-300 text-gray-500"
                    }`}
                >
                  {type} {formData.propertyTypes.includes(type) && <FiCheck size={16} />}
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
            disabled={!formData.propertyCount || formData.propertyTypes.length === 0}
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
        key="landlord-step-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col"
      >
        <div className="mb-6">
          <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Landlord Setup • Step 2 of 3</p>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Management Style</h1>
          <p className="text-gray-600 font-medium">How are your properties currently handled?</p>
        </div>

        <div className="space-y-8 flex-1">
          <div>
            <label className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
              <FiSettings className="text-brand-green" /> Management Approach
            </label>
            <div className="grid grid-cols-1 gap-3">
              {managementStyles.map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, managementStyle: style }))}
                  className={`p-4 rounded-xl border-2 text-sm font-bold transition-all text-left ${formData.managementStyle === style
                    ? "border-brand-green bg-brand-green/5 text-brand-green"
                    : "border-gray-100 hover:border-gray-300 text-gray-500"
                    }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">Experience Level</label>
            <div className="grid grid-cols-2 gap-3">
              {experienceLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, experience: level }))}
                  className={`p-4 rounded-xl border-2 text-sm font-bold transition-all ${formData.experience === level
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
            disabled={!formData.managementStyle || !formData.experience}
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
      key="landlord-step-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col"
    >
      <div className="mb-6">
        <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Landlord Setup • Step 3 of 3</p>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Support Services</h1>
        <p className="text-gray-600 font-medium">Which services would improve your experience?</p>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <label className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide flex items-center gap-2">
            <FiTool className="text-brand-green" /> Interested Services
          </label>
          <div className="grid grid-cols-2 gap-3">
            {servicesList.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`p-4 rounded-xl border-2 text-sm font-bold transition-all flex items-center justify-between ${formData.services.includes(service)
                  ? "border-brand-green bg-brand-green/5 text-brand-green"
                  : "border-gray-100 hover:border-gray-300 text-gray-500"
                  }`}
              >
                {service} {formData.services.includes(service) && <FiCheck size={16} />}
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
          className="flex-1 py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
        >
          Complete Landlord Setup <FiCheck size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default LandlordStep;
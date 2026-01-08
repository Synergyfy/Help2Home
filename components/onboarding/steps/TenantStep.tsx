'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiDollarSign, FiCalendar, FiHome, FiArrowRight, FiArrowLeft, FiCheck } from "react-icons/fi";
import { useOnboardingStore, TenantData } from "@/store/onboardingStore";
import { useUserStore } from "@/store/userStore";

const locations = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Kano", "Other"];
const budgetRanges = ["₦50k - ₦150k", "₦150k - ₦300k", "₦300k - ₦500k", "₦500k - ₦1M", "₦1M+"];
const propertyTypes = ["Apartment", "House", "Duplex", "Self-Contain", "Studio", "Bungalow"];
const bedroomOptions = ["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms"];
const amenitiesList = ["Parking", "Security", "Water Supply", "Electricity", "Internet", "Gym", "Pool", "Garden"];

interface TenantStepProps {
  stepNumber: 1 | 2 | 3;
}

const TenantStep = ({ stepNumber }: TenantStepProps) => {
  const { getCurrentUser, updateRoleData, nextStep, prevStep, goToStep, completeRoleOnboarding } = useOnboardingStore();
  const user = getCurrentUser();
  const tenantData = user?.tenant || {} as TenantData;

  const [formData, setFormData] = useState<TenantData>({
    preferredLocation: tenantData.preferredLocation || "",
    budgetRange: tenantData.budgetRange || "",
    moveInDate: tenantData.moveInDate || "",
    propertyType: tenantData.propertyType || "",
    bedrooms: tenantData.bedrooms || "",
    amenities: tenantData.amenities || [],
  });

  const handleContinue = () => {
    updateRoleData("tenant", formData);
    nextStep();
  };

  const handleComplete = () => {
    updateRoleData("tenant", formData);
    useUserStore.getState().updateRoleProfileData("tenant", formData);
    completeRoleOnboarding("tenant");

    // Check if there are other roles selected that haven't been completed yet
    const remainingRoles = user?.roles?.filter(
      r => !user.roleOnboardingCompleted?.[r] && r !== 'tenant'
    ) || [];

    if (remainingRoles.length > 0) {
      goToStep(4); // Return to Role Chooser
    } else {
      goToStep(8); // Proceed to final completion screen (instead of nextStep to be safe)
    }
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const Header = ({ title, description, step }: { title: string, description: string, step: number }) => (
    <div className="mb-6">
      <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">
        Tenant Setup • Step {step} of 3
      </p>
      <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">{title}</h1>
      <p className="text-gray-600 font-medium">{description}</p>
    </div>
  );

  const SelectionButton = ({ label, isSelected, onClick }: { label: string, isSelected: boolean, onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-xl border-2 text-sm font-bold transition-all duration-200 active:scale-[0.97] ${isSelected
        ? "border-brand-green bg-brand-green/5 text-brand-green shadow-sm"
        : "border-gray-100 bg-white text-gray-500 hover:border-gray-300"
        }`}
    >
      {label}
    </button>
  );

  if (stepNumber === 1) {
    return (
      <motion.div
        key="tenant-step-1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex flex-col"
      >
        <Header
          step={1}
          title="Where do you want to live?"
          description="Select your preferred location and budget range."
        />

        <div className="space-y-8 flex-1">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
              <FiMapPin className="inline mr-2 text-brand-green" />
              Preferred Location
            </label>
            <div className="grid grid-cols-2 gap-3">
              {locations.map((loc) => (
                <SelectionButton
                  key={loc}
                  label={loc}
                  isSelected={formData.preferredLocation === loc}
                  onClick={() => setFormData(p => ({ ...p, preferredLocation: loc }))}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
              <FiDollarSign className="inline mr-2 text-brand-green" />
              Monthly Budget
            </label>
            <div className="grid grid-cols-2 gap-3">
              {budgetRanges.map((range) => (
                <SelectionButton
                  key={range}
                  label={range}
                  isSelected={formData.budgetRange === range}
                  onClick={() => setFormData(p => ({ ...p, budgetRange: range }))}
                />
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
            disabled={!formData.preferredLocation || !formData.budgetRange}
            className="flex-1 py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-30 active:scale-[0.98]"
          >
            Continue <FiArrowRight size={20} />
          </button>
        </div>
      </motion.div>
    );
  }

  if (stepNumber === 2) {
    return (
      <motion.div
        key="tenant-step-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex flex-col"
      >
        <Header
          step={2}
          title="What type of property?"
          description="Tell us about your ideal home requirements."
        />

        <div className="space-y-8 flex-1">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
              <FiHome className="inline mr-2 text-brand-green" />
              Property Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {propertyTypes.map((type) => (
                <SelectionButton
                  key={type}
                  label={type}
                  isSelected={formData.propertyType === type}
                  onClick={() => setFormData(p => ({ ...p, propertyType: type }))}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
              Bedrooms
            </label>
            <div className="grid grid-cols-2 gap-3">
              {bedroomOptions.map((opt) => (
                <SelectionButton
                  key={opt}
                  label={opt}
                  isSelected={formData.bedrooms === opt}
                  onClick={() => setFormData(p => ({ ...p, bedrooms: opt }))}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button onClick={prevStep} className="px-6 py-4 border-2 border-gray-100 text-gray-600 font-bold rounded-xl active:scale-95 transition-all"><FiArrowLeft size={18} /></button>
          <button
            onClick={handleContinue}
            disabled={!formData.propertyType || !formData.bedrooms}
            className="flex-1 py-4 px-6 bg-brand-green text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-30 active:scale-[0.98]"
          >
            Continue <FiArrowRight size={20} />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="tenant-step-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex flex-col"
    >
      <Header
        step={3}
        title="Final Details"
        description="Select must-have amenities and your move-in timeline."
      />

      <div className="space-y-8 flex-1">
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
            <FiCalendar className="inline mr-2 text-brand-green" />
            Expected Move-in Date
          </label>
          <input
            type="date"
            value={formData.moveInDate}
            onChange={(e) => setFormData(prev => ({ ...prev, moveInDate: e.target.value }))}
            className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 bg-white text-gray-900 font-bold focus:outline-none focus:border-brand-green transition-all"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Must-have Amenities
          </label>
          <div className="grid grid-cols-2 gap-3">
            {amenitiesList.map((amenity) => {
              const active = formData.amenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`p-4 rounded-xl border-2 text-sm font-bold transition-all flex items-center justify-between ${active
                    ? "border-brand-green bg-brand-green/5 text-brand-green shadow-sm"
                    : "border-gray-100 bg-white text-gray-500 hover:border-gray-300"
                    }`}
                >
                  {amenity}
                  {active && <FiCheck size={16} className="text-brand-green" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button onClick={prevStep} className="px-6 py-4 border-2 border-gray-100 text-gray-600 font-bold rounded-xl active:scale-95 transition-all"><FiArrowLeft size={18} /></button>
        <button
          onClick={handleComplete}
          className="flex-1 py-4 px-6 bg-brand-green text-white font-bold rounded-xl shadow-xl flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          Complete Tenant Setup <FiCheck size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default TenantStep;
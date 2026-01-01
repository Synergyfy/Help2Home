'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { FiAward, FiMapPin, FiTarget, FiArrowRight, FiArrowLeft, FiCheck } from "react-icons/fi";
import { useOnboardingStore, AgentData } from "@/store/onboardingStore";

const specializations = ["Residential", "Commercial", "Luxury", "Land", "Industrial", "Mixed-use"];
const experienceOptions = ["Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"];
const areas = ["Lagos Island", "Lagos Mainland", "Abuja Central", "Port Harcourt", "Ibadan", "Other cities"];
const certifications = ["NIESV", "ARCON", "FIABCI", "RICS", "Licensed Agent", "Other"];

interface AgentStepProps {
  stepNumber: 1 | 2 | 3;
}

const AgentStep = ({ stepNumber }: AgentStepProps) => {
  const { getCurrentUser, updateRoleData, nextStep, prevStep, goToStep, completeRoleOnboarding } = useOnboardingStore();
  const user = getCurrentUser();
  const agentData = user?.agent || {} as AgentData;

  const [formData, setFormData] = useState<AgentData>({
    licenseNumber: agentData.licenseNumber || "",
    specialization: agentData.specialization || [],
    yearsExperience: agentData.yearsExperience || "",
    areasServed: agentData.areasServed || [],
    certifications: agentData.certifications || [],
  });

  const handleContinue = () => {
    updateRoleData("agent", formData);
    nextStep();
  };

  const handleComplete = () => {
    updateRoleData("agent", formData);
    completeRoleOnboarding("agent");

    // Check if there are other roles selected that haven't been completed yet
    const remainingRoles = user?.roles?.filter(
      r => !user.roleOnboardingCompleted?.[r] && r !== 'agent'
    ) || [];

    if (remainingRoles.length > 0) {
      goToStep(4); // Return to the Role Chooser list
    } else {
      nextStep(); // Proceed to the final "Success/Welcome" step
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

  const toggleArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      areasServed: prev.areasServed.includes(area)
        ? prev.areasServed.filter(a => a !== area)
        : [...prev.areasServed, area]
    }));
  };

  const toggleCertification = (cert: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(cert)
        ? prev.certifications.filter(c => c !== cert)
        : [...prev.certifications, cert]
    }));
  };

  if (stepNumber === 1) {
    return (
      <motion.div
        key="agent-step-1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex flex-col"
      >
        <div className="mb-6">
          <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Agent Setup • Step 1 of 3</p>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Professional credentials</h1>
          <p className="text-gray-600">Tell us about your real estate expertise.</p>
        </div>

        <div className="space-y-6 flex-1">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <FiAward className="text-brand-green" />
              License Number (optional)
            </label>
            <input
              type="text"
              value={formData.licenseNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, licenseNumber: e.target.value }))}
              placeholder="Enter your license number"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-green transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Years of experience</label>
            <div className="grid grid-cols-2 gap-2">
              {experienceOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData(prev => ({ ...prev, yearsExperience: option }))}
                  className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${
                    formData.yearsExperience === option
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

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => goToStep(4)}
            className="px-6 py-3 border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <FiArrowLeft size={18} /> Back
          </button>
          <button
            onClick={handleContinue}
            disabled={!formData.yearsExperience}
            className="flex-1 py-3 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
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
        key="agent-step-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex flex-col"
      >
        <div className="mb-6">
          <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Agent Setup • Step 2 of 3</p>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Your specializations</h1>
          <p className="text-gray-600">What types of properties do you focus on?</p>
        </div>

        <div className="space-y-6 flex-1">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <FiTarget className="text-brand-green" /> Property specializations
            </label>
            <div className="grid grid-cols-2 gap-2">
              {specializations.map((spec) => (
                <button
                  key={spec}
                  onClick={() => toggleSpecialization(spec)}
                  className={`p-3 rounded-xl border-2 text-sm font-bold transition-all flex items-center justify-between ${
                    formData.specialization.includes(spec) ? "border-brand-green bg-brand-green/5 text-brand-green" : "border-gray-100 hover:border-gray-300 text-gray-500"
                  }`}
                >
                  {spec} {formData.specialization.includes(spec) && <FiCheck size={16} className="text-brand-green" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <FiMapPin className="text-brand-green" /> Areas you serve
            </label>
            <div className="grid grid-cols-2 gap-2">
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => toggleArea(area)}
                  className={`p-3 rounded-xl border-2 text-sm font-bold transition-all flex items-center justify-between ${
                    formData.areasServed.includes(area) ? "border-brand-green bg-brand-green/5 text-brand-green" : "border-gray-100 hover:border-gray-300 text-gray-500"
                  }`}
                >
                  {area} {formData.areasServed.includes(area) && <FiCheck size={16} className="text-brand-green" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={prevStep} className="px-6 py-3 border-2 border-gray-100 text-gray-600 font-bold rounded-xl active:scale-95 transition-all">
            <FiArrowLeft size={18} />
          </button>
          <button
            onClick={handleContinue}
            disabled={formData.specialization.length === 0 || formData.areasServed.length === 0}
            className="flex-1 py-3 px-6 bg-brand-green text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
          >
            Continue <FiArrowRight size={18} />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="agent-step-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex-1 flex flex-col"
    >
      <div className="mb-6">
        <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Agent Setup • Step 3 of 3</p>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">Certifications</h1>
        <p className="text-gray-600">Select any certifications you hold.</p>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <FiAward className="text-brand-green" /> Professional credentials
          </label>
          <div className="grid grid-cols-2 gap-2">
            {certifications.map((cert) => (
              <button
                key={cert}
                onClick={() => toggleCertification(cert)}
                className={`p-3 rounded-xl border-2 text-sm font-bold transition-all flex items-center justify-between ${
                  formData.certifications.includes(cert) ? "border-brand-green bg-brand-green/5 text-brand-green" : "border-gray-100 hover:border-gray-300 text-gray-500"
                }`}
              >
                {cert} {formData.certifications.includes(cert) && <FiCheck size={16} className="text-brand-green" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button onClick={prevStep} className="px-6 py-3 border-2 border-gray-100 text-gray-600 font-bold rounded-xl active:scale-95 transition-all">
          <FiArrowLeft size={18} />
        </button>
        <button
          onClick={handleComplete}
          className="flex-1 py-3 px-6 bg-brand-green text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95"
        >
          Complete Agent Setup <FiCheck size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default AgentStep;
'use client'

import { motion } from "framer-motion";
import { FiHome, FiKey, FiBriefcase, FiTrendingUp, FiArrowRight, FiArrowLeft, FiCheck, FiUsers } from "react-icons/fi";
import { useOnboardingStore, UserRole, MULTI_SELECT_ROLES } from "@/store/onboardingStore";

const roles: { id: UserRole; name: string; description: string; icon: React.ReactNode; multiSelect?: boolean }[] = [
  {
    id: "tenant",
    name: "Tenant",
    description: "Looking to rent a property for residential or commercial use",
    icon: <FiHome size={24} />,
  },
  {
    id: "landlord",
    name: "Landlord",
    description: "Own properties and want to find reliable tenants",
    icon: <FiKey size={24} />,
    multiSelect: true,
  },
  {
    id: "caretaker",
    name: "Caretaker",
    description: "Manage properties on behalf of landlords",
    icon: <FiUsers size={24} />,
    multiSelect: true,
  },
  {
    id: "agent",
    name: "Real Estate Agent",
    description: "Help clients buy, sell, or rent properties professionally",
    icon: <FiBriefcase size={24} />,
    multiSelect: true,
  },
  {
    id: "investor",
    name: "Investor",
    description: "Looking to invest in real estate for returns and growth",
    icon: <FiTrendingUp size={24} />,
  },
];

const RoleSelectionStep = () => {
  const { getCurrentUser, toggleRole, nextStep, prevStep } = useOnboardingStore();
  const user = getCurrentUser();
  const selectedRoles = user?.roles || [];

  const isMultiSelectMode = selectedRoles.some(r => MULTI_SELECT_ROLES.includes(r));

  const handleRoleSelect = (role: UserRole) => {
    toggleRole(role);
  };

  const handleContinue = () => {
    if (selectedRoles.length > 0) {
      nextStep();
    }
  };

  const isRoleDisabled = (roleId: UserRole) => {
    if (selectedRoles.length === 0) return false;
    if (isMultiSelectMode && !MULTI_SELECT_ROLES.includes(roleId)) return true;
    if (!isMultiSelectMode && selectedRoles.length > 0 && MULTI_SELECT_ROLES.includes(roleId)) return true;
    return false;
  };

  return (
    <motion.div
      key="role-step"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col"
    >
      <div className="mb-6">
        <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Step 2: Role Selection</p>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
          How will you use Help2Home?
        </h1>
        <p className="text-gray-600 font-medium">
          Select your primary function. Professional users can select multiple roles.
        </p>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {roles.map((role, index) => {
          const isSelected = selectedRoles.includes(role.id);
          const isDisabled = isRoleDisabled(role.id);
          
          return (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => !isDisabled && handleRoleSelect(role.id)}
              disabled={isDisabled}
              className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-300 group ${
                isSelected
                  ? "border-brand-green bg-brand-green/5 shadow-md"
                  : isDisabled
                  ? "border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed"
                  : "border-gray-100 hover:border-gray-300 bg-white"
              }`}
            >
              {isSelected && (
                <div className="absolute top-5 right-5 w-6 h-6 rounded-full bg-brand-green flex items-center justify-center shadow-lg">
                  <FiCheck size={14} className="text-white" />
                </div>
              )}
              
              {role.multiSelect && !isSelected && !isDisabled && (
                <span className="absolute top-5 right-5 text-[10px] font-bold text-brand-green bg-brand-green/10 px-2 py-1 rounded-md uppercase tracking-tight">
                  Multi-select
                </span>
              )}
              
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  isSelected
                    ? "bg-brand-green text-white shadow-inner"
                    : "bg-gray-50 text-gray-500 group-hover:bg-gray-100"
                }`}>
                  {role.icon}
                </div>
                <div className="flex-1 pr-8">
                  <p className={`font-bold text-lg ${isSelected ? "text-gray-900" : "text-gray-700"}`}>
                    {role.name}
                  </p>
                  <p className="text-sm text-gray-500 font-medium leading-snug mt-1">
                    {role.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {selectedRoles.length > 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 p-4 rounded-xl bg-brand-green/5 border border-brand-green/20"
        >
          <p className="text-xs font-bold text-brand-green uppercase tracking-wider">
            Combined Portfolio Active
          </p>
          <p className="text-sm text-gray-700 font-medium mt-1">
            {selectedRoles.map(r => roles.find(role => role.id === r)?.name).join(" + ")}
          </p>
        </motion.div>
      )}

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-4 border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <FiArrowLeft size={18} />
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={selectedRoles.length === 0}
          className="flex-1 py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          Continue
          <FiArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default RoleSelectionStep;
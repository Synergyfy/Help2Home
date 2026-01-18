'use client';

import { motion } from "framer-motion";
import { FiHome, FiKey, FiBriefcase, FiTrendingUp, FiArrowRight, FiArrowLeft, FiCheck, FiUsers, FiCode } from "react-icons/fi";
import { useOnboardingStore, UserRole, MULTI_SELECT_ROLES } from "@/store/onboardingStore";

const roles: { id: UserRole; name: string; description: string; icon: React.ReactNode; multiSelect?: boolean }[] = [
  { id: "tenant", name: "Tenant", description: "Looking to rent a property for residential or commercial use", icon: <FiHome className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { id: "landlord", name: "Landlord", description: "Own properties and want to find reliable tenants", icon: <FiKey className="w-5 h-5 sm:w-6 sm:h-6" />, multiSelect: true },
  { id: "caretaker", name: "Caretaker", description: "Manage properties on behalf of landlords", icon: <FiUsers className="w-5 h-5 sm:w-6 sm:h-6" />, multiSelect: true },
  { id: "agent", name: "Real Estate Agent", description: "Help clients buy, sell, or rent properties professionally", icon: <FiBriefcase className="w-5 h-5 sm:w-6 sm:h-6" />, multiSelect: true },
  { id: "developer", name: "Real Estate Developer", description: "Create large scale projects, manage portfolios and set investment terms", icon: <FiCode className="w-5 h-5 sm:w-6 sm:h-6" />, multiSelect: true },
  { id: "investor", name: "Investor", description: "Looking to invest in real estate for returns and growth", icon: <FiTrendingUp className="w-5 h-5 sm:w-6 sm:h-6" /> },
];

const RoleSelectionStep = () => {
  const { getCurrentUser, toggleRole, nextStep, prevStep, goToStep, setActiveRole } = useOnboardingStore();
  const user = getCurrentUser();
  const selectedRoles = user?.roles || [];

  const isMultiSelectMode = selectedRoles.some(r => MULTI_SELECT_ROLES.includes(r));

  const handleContinue = () => {
    if (selectedRoles.length === 0) return;

    // If only one role is picked, skip the Chooser (Step 4) and go to Step 5
    if (selectedRoles.length === 1) {
      setActiveRole(selectedRoles[0]);
      goToStep(5);
    } else {
      // Multiple roles selected, go to Chooser to pick which one to start with
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex-1 flex flex-col h-full max-w-full overflow-hidden"
    >
      <div className="mb-4 sm:mb-6">
        <p className="text-[10px] sm:text-xs text-brand-green font-bold uppercase tracking-wider mb-1">Step 2: Role Selection</p>
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900 leading-tight">How will you use Help2Home?</h1>
        <p className="text-xs sm:text-base text-gray-500 font-medium mt-1">Professional users can select multiple roles.</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar pb-4">
        {roles.map((role, index) => {
          const isSelected = selectedRoles.includes(role.id);
          const isDisabled = isRoleDisabled(role.id);

          return (
            <motion.button
              key={role.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => {
                if (!isDisabled) {
                  toggleRole(role.id);
                  // If it's a single-select role (not multiSelect), auto-proceed
                  if (!role.multiSelect) {
                    setActiveRole(role.id);
                    goToStep(5);
                  }
                }
              }}
              disabled={isDisabled}
              className={`w-full relative p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-3 sm:gap-4 ${isSelected ? "border-brand-green bg-brand-green/5 shadow-sm" : isDisabled ? "border-gray-50 bg-gray-50/50 opacity-40 cursor-not-allowed" : "border-gray-100 hover:border-brand-green/30 bg-white"
                }`}
            >
              <div className={`shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl flex items-center justify-center transition-all ${isSelected ? "bg-brand-green text-white" : "bg-gray-100 text-gray-500"}`}>
                {role.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`font-bold text-sm sm:text-lg truncate ${isSelected ? "text-gray-900" : "text-gray-700"}`}>{role.name}</p>
                  {role.multiSelect && !isSelected && !isDisabled && (
                    <span className="text-[8px] sm:text-[10px] font-black text-brand-green/70 uppercase tracking-tighter">• Multi</span>
                  )}
                </div>
                <p className="text-[11px] sm:text-sm text-gray-500 font-medium leading-tight line-clamp-2">{role.description}</p>
              </div>

              <div className={`shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "bg-brand-green border-brand-green" : "border-gray-200"}`}>
                {isSelected && <FiCheck size={12} className="text-white" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="pt-4 mt-auto flex gap-2 sm:gap-3 bg-white border-t border-gray-100">
        <button type="button" onClick={prevStep} className="px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-100 text-gray-600 text-sm sm:text-base font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
          <FiArrowLeft size={18} />
          <span className="hidden sm:inline">Back</span>
        </button>
        <button
          onClick={handleContinue}
          disabled={selectedRoles.length === 0}
          className="flex-1 py-3 sm:py-4 px-6 bg-brand-green text-white text-sm sm:text-base font-bold rounded-xl hover:bg-green-600 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-30 active:scale-[0.98]"
        >
          Continue
          <FiArrowRight size={20} />
        </button>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </motion.div>
  );
};

export default RoleSelectionStep;

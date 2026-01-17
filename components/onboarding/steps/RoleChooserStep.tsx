'use client'

import { motion } from "framer-motion";
import { FiKey, FiBriefcase, FiArrowRight, FiArrowLeft, FiCheck, FiUsers, FiHome, FiTrendingUp, FiStar, FiShield } from "react-icons/fi";
import { useOnboardingStore, UserRole } from "@/store/onboardingStore";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

const roleIcons: Record<UserRole, React.ReactNode> = {
  tenant: <FiHome size={24} />,
  landlord: <FiKey size={24} />,
  caretaker: <FiUsers size={24} />,
  agent: <FiBriefcase size={24} />,
  investor: <FiTrendingUp size={24} />,
  developer: <FiCheck size={24} />,
  admin: <FiStar size={24} />,
  superAdmin: <FiShield size={24} />
};

const roleNames: Record<UserRole, string> = {
  tenant: "Tenant",
  landlord: "Landlord",
  caretaker: "Caretaker",
  agent: "Real Estate Agent",
  investor: "Investor",
  developer: "Real Estate Developer",
  admin: "Administrator",
  superAdmin: "Super Admin",
};

const RoleChooserStep = () => {
  const router = useRouter();
  const { getCurrentUser, nextStep, prevStep, goToStep, setActiveRole } = useOnboardingStore();
  const user = getCurrentUser();
  const selectedRoles = user?.roles || [];

  const incompleteRoles = selectedRoles.filter(
    (role) => !user?.roleOnboardingCompleted?.[role]
  );

  const completedRoles = selectedRoles.filter(
    (role) => user?.roleOnboardingCompleted?.[role]
  );

  const handleStartOnboarding = (role: UserRole) => {
    setActiveRole(role);
    nextStep();
  };

  const handleFinish = () => {
    // Proceed to success step (Step 8) regardless of pending roles
    goToStep(8);
  };

  const allRolesCompleted = incompleteRoles.length === 0;

  return (
    <motion.div
      key="role-chooser-step"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col"
    >
      <div className="mb-6">
        <p className="text-sm text-brand-green font-bold uppercase tracking-wider mb-2">Setup Progress</p>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">
          {allRolesCompleted ? "All set!" : "Configure your roles"}
        </h1>
        <p className="text-gray-600 font-medium leading-relaxed">
          {allRolesCompleted
            ? "Your profiles are ready. You can now access your dashboard."
            : "Complete the setup for each role you've selected to get started."}
        </p>
      </div>

      <div className="space-y-6 flex-1">
        {incompleteRoles.length > 0 && (
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              Pending Setup
            </p>
            {incompleteRoles.map((role, index) => (
              <motion.button
                key={role}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleStartOnboarding(role)}
                className="w-full relative p-5 rounded-2xl border-2 border-gray-100 hover:border-brand-green bg-white text-left transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-colors shadow-sm">
                    {roleIcons[role]}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{roleNames[role]}</p>
                    <p className="text-xs text-gray-500 font-medium">Tap to finish setup</p>
                  </div>
                  <FiArrowRight className="text-gray-300 group-hover:text-brand-green transition-transform group-hover:tranbrand-green-x-1" size={20} />
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {completedRoles.length > 0 && (
          <div className="space-y-3 mt-6">
            <p className="text-[10px] font-bold text-brand-green uppercase tracking-[0.2em]">
              Completed
            </p>
            {completedRoles.map((role, index) => (
              <motion.div
                key={role}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full relative p-5 rounded-2xl border-2 border-brand-green/10 bg-brand-green/5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-green text-white flex items-center justify-center shadow-inner">
                    {roleIcons[role]}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{roleNames[role]}</p>
                    <p className="text-xs text-brand-green font-bold italic tracking-wide">Ready to use</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center shadow-lg">
                    <FiCheck className="text-white" size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-4 border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 active:scale-95"
        >
          <FiArrowLeft size={18} />
          Back
        </button>

        {(allRolesCompleted || completedRoles.length > 0) && (
          <button
            onClick={handleFinish}
            className="flex-1 py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {incompleteRoles.length > 0 ? "Finish Now (Optional)" : "Complete Setup"}
            <FiArrowRight size={20} />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default RoleChooserStep;

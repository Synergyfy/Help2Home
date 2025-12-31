'use client'

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiHome, FiKey, FiBriefcase, FiTrendingUp, FiUsers } from "react-icons/fi";
import { useOnboardingStore, UserRole } from "@/store/onboardingStore";

const roleIcons: Record<UserRole, React.ReactNode> = {
  tenant: <FiHome size={32} />,
  landlord: <FiKey size={32} />,
  caretaker: <FiUsers size={32} />,
  agent: <FiBriefcase size={32} />,
  investor: <FiTrendingUp size={32} />,
};

const roleNames: Record<UserRole, string> = {
  tenant: "Tenant",
  landlord: "Landlord",
  caretaker: "Caretaker",
  agent: "Real Estate Agent",
  investor: "Investor",
};

const CompletionStep = () => {
  const { getCurrentUser, resetOnboarding, setOnboardingCompleted } = useOnboardingStore();
  const user = getCurrentUser();

  useEffect(() => {
    setOnboardingCompleted(true);
  }, [setOnboardingCompleted]);

  const primaryRole = user?.roles?.[0];
  const completedRoles = user?.roles?.filter(role => user.roleOnboardingCompleted?.[role]) || [];

  const getRoleMessage = () => {
    if (completedRoles.length > 1) {
      return `You've set up ${completedRoles.length} roles. Switch between them anytime from your dashboard.`;
    }
    switch (primaryRole) {
      case "tenant": 
        return "We'll start showing you properties that match your preferences.";
      case "landlord": 
        return "Get ready to connect with verified tenants and manage your properties.";
      case "caretaker":
        return "You're set to manage properties. Start connecting with landlords.";
      case "agent": 
        return "Your professional profile is set. Start connecting with clients.";
      case "investor": 
        return "We'll curate investment opportunities based on your goals.";
      default: 
        return "Your account is ready.";
    }
  };

  return (
    <motion.div
      key="completion-step"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col items-center justify-center text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-24 h-24 rounded-full bg-brand-green/10 flex items-center justify-center mb-8 relative"
      >
        <div className="w-16 h-16 rounded-full bg-brand-green flex items-center justify-center text-white shadow-xl shadow-brand-green/20">
          {primaryRole ? roleIcons[primaryRole] : <FiCheck size={32} />}
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center border-4 border-white text-brand-green shadow-md"
        >
          <FiCheck size={16} strokeWidth={4} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          You're all set, {user?.fullName?.split(' ')[0] || 'there'}!
        </h1>
        <p className="text-gray-600 max-w-sm mx-auto font-medium">
          {getRoleMessage()}
        </p>
        
        {completedRoles.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {completedRoles.map(role => (
              <span 
                key={role}
                className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider border border-gray-200"
              >
                {roleNames[role]}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm space-y-4"
      >
        <button className="w-full py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg active:scale-[0.98]">
          Go to Dashboard
        </button>
        <button
          onClick={resetOnboarding}
          className="w-full py-4 px-6 border-2 border-gray-100 text-gray-500 font-bold rounded-xl hover:bg-gray-50 transition-colors active:scale-[0.98]"
        >
          Start Over
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 p-5 rounded-2xl bg-gray-50 border border-gray-100 max-w-sm"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
          <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">Onboarding Complete</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed font-medium">
          Your preferences are securely saved. Access your specialized tools instantly from the sidebar menu.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CompletionStep;
'use client'

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiHome, FiKey, FiBriefcase, FiTrendingUp, FiUsers, FiLogIn } from "react-icons/fi";
import { useOnboardingStore, UserRole } from "@/store/onboardingStore";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { getCurrentUser, resetOnboarding,setOnboardingCompleted } = useOnboardingStore();
  const user = getCurrentUser();

  useEffect(() => {
    // Mark the account as finished so they don't see onboarding again
    setOnboardingCompleted(true);
  }, [setOnboardingCompleted]);

  const primaryRole = user?.roles?.[0];
  const completedRoles = user?.roles?.filter(role => user.roleOnboardingCompleted?.[role]) || [];

  const handleSignIn = () => {
    router.push("/signin");
  };

  const getRoleMessage = () => {
    if (completedRoles.length > 1) {
      return `You've successfully set up ${completedRoles.length} profiles. Please sign in to access your unified dashboard.`;
    }
    switch (primaryRole) {
      case "tenant": return "Your rental preferences are saved. Sign in to start viewing matching properties.";
      case "landlord": return "Your landlord profile is ready. Sign in to list your first property.";
      case "caretaker": return "Property management tools are ready. Sign in to connect with landlords.";
      case "agent": return "Your agent profile is active. Sign in to start managing your listings.";
      case "investor": return "Investment filters are applied. Sign in to view curated opportunities.";
      default: return "Your account setup is complete. Please sign in to continue.";
    }
  };

  return (
    <motion.div
      key="completion-step"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col items-center justify-center text-center py-8"
    >
      {/* Success Icon Animation */}
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

      {/* Completion Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          Setup Complete!
        </h1>
        <p className="text-gray-600 max-w-sm mx-auto font-medium leading-relaxed">
          {getRoleMessage()}
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm space-y-4"
      >
        <button 
          onClick={handleSignIn}
          className="w-full py-4 px-6 bg-brand-green text-white font-bold rounded-xl hover:bg-green-600 transition-all shadow-lg flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          <FiLogIn size={20} />
          Sign In to Your Account
        </button>
        
        <button
          onClick={() => {
            resetOnboarding();
            router.push("/onboarding");
          }}
          className="w-full py-4 px-6 text-gray-400 text-sm font-semibold hover:text-gray-600 transition-colors"
        >
          Not you? Start over
        </button>
      </motion.div>

      {/* Info Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 p-4 rounded-2xl bg-brand-green/5 border border-brand-green/10 max-w-xs"
      >
        <p className="text-[11px] text-brand-green font-bold uppercase tracking-widest mb-1">
          Secure Session Active
        </p>
        <p className="text-[11px] text-gray-500 font-medium">
          Your profile data has been cached locally. Simply sign in to sync with your permanent account.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CompletionStep;
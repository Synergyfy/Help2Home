'use client'

import { useState, useEffect } from "react";
import { useOnboardingStore } from "@/store/onboardingStore";
import OnboardingLayout from "./OnboardingLayout";
import EmailStep from "./steps/EmailStep";
import VerifyEmailStep from "./steps/VerfiyEmailStep";
import ProfileStep from "./steps/ProfileStep";
import RoleSelectionStep from "./steps/RoleSelectionStep";
import RoleChooserStep from "@/components/onboarding/steps/RoleChooserStep";
import TenantStep from "./steps/TenantStep";
import LandlordStep from "./steps/LandlordSteps";
import CaretakerStep from "./steps/CaretakerSteps";
import AgentStep from "./steps/AgentSteps";
import InvestorStep from "./steps/InvestorSteps";
import CompletionStep from "./steps/CompletionStep";

const OnboardingPage = () => {
  const [isHydrated, setIsHydrated] = useState(false); 
  const { getCurrentUser, getTotalSteps } = useOnboardingStore();
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const user = getCurrentUser();
  const currentStep = user?.currentStep || 0;
  const totalSteps = getTotalSteps();

  const renderStep = () => {
    if (!isHydrated) return <div className="flex-1 animate-pulse bg-gray-50 rounded-xl" />;

    // Handle initial flow
    switch (currentStep) {
      case 0: return <EmailStep />;
      case 1: return <VerifyEmailStep />;
      case 2: return <ProfileStep />;
      case 3: return <RoleSelectionStep />;
      case 4: return <RoleChooserStep />;
    }

    // Handle dynamic role forms
    if (currentStep < totalSteps - 1) {
      const activeRole = user?.activeRole;
      // Convert current step into role-specific sub-step
      const roleSubStep = Math.min(Math.max(currentStep - 4, 1), 3) as 1 | 2 | 3;

      if (!activeRole) return <RoleChooserStep />;

      switch (activeRole) {
        case "tenant":    return <TenantStep stepNumber={roleSubStep} />;
        case "landlord":  return <LandlordStep stepNumber={roleSubStep} />;
        case "caretaker": return <CaretakerStep stepNumber={roleSubStep} />;
        case "agent":     return <AgentStep stepNumber={roleSubStep} />;
        case "investor":  return <InvestorStep stepNumber={roleSubStep} />;
        default:          return <RoleChooserStep />;
      }
    }

    // Fallback to completion
    return <CompletionStep />;
  };

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={totalSteps}>
      {renderStep()}
    </OnboardingLayout>
  );
};

export default OnboardingPage;

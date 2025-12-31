'use client'

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

const Index = () => {
  const { getCurrentUser, getTotalSteps } = useOnboardingStore();
  const user = getCurrentUser();
  const currentStep = user?.currentStep || 0;
  const totalSteps = getTotalSteps();

  const renderStep = () => {
    // Step 0: Email
    if (currentStep === 0) {
      return <EmailStep />;
    }
    // Step 1: Email Verification
    if (currentStep === 1) {
      return <VerifyEmailStep />;
    }
    // Step 2: Profile
    if (currentStep === 2) {
      return <ProfileStep />;
    }
    // Step 3: Role Selection
    if (currentStep === 3) {
      return <RoleSelectionStep />;
    }
    // Step 4: Role Chooser (for multi-role users)
    if (currentStep === 4) {
      return <RoleChooserStep />;
    }
    // Step 5-7: Role-specific steps
    if (currentStep >= 5 && currentStep <= 7) {
      const roleStep = (currentStep - 4) as 1 | 2 | 3;
      const activeRole = user?.activeRole;
      
      switch (activeRole) {
        case "tenant":
          return <TenantStep stepNumber={roleStep} />;
        case "landlord":
          return <LandlordStep stepNumber={roleStep} />;
        case "caretaker":
          return <CaretakerStep stepNumber={roleStep} />;
        case "agent":
          return <AgentStep stepNumber={roleStep} />;
        case "investor":
          return <InvestorStep stepNumber={roleStep} />;
        default:
          return <RoleChooserStep />;
      }
    }
    // Step 8: Completion
    return <CompletionStep />;
  };

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={totalSteps}>
      {renderStep()}
    </OnboardingLayout>
  );
};

export default Index;
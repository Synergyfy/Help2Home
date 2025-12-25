// store/onboardingStore.ts
import { create } from 'zustand';

interface OnboardingState {
  formData: {
    // Basic Info
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    countryCode: string;        
    state: string;
    fullAddress: string;        
    postalCode?: string;         
    
    // Tenant specific
    gender: string;
    employmentStatus: string;
    monthlyIncome: string;
    
    // Landlord/Agent/Caretaker specific
    portfolioSize: string;
    responsibilities: string;
    
    // Investor specific
    investorType: string;
    investmentBudget: string;
  };
  currentStep: number;
  setFormData: (data: Partial<OnboardingState['formData']>) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  formData: {
    // Basic Info
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    countryCode: '',
    state: '',
    fullAddress: '',
    postalCode: '',
    
    // Tenant specific
    gender: '',
    employmentStatus: '',
    monthlyIncome: '',
    
    // Landlord/Agent/Caretaker specific
    portfolioSize: '',
    responsibilities: '',
    
    // Investor specific
    investorType: 'individual',
    investmentBudget: '',
  },
  currentStep: 0,
  
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
    
  setStep: (step) => set({ currentStep: step }),
  
  reset: () =>
    set({
      formData: {
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        countryCode: '',
        state: '',
        fullAddress: '',
        postalCode: '',
        gender: '',
        employmentStatus: '',
        monthlyIncome: '',
        portfolioSize: '',
        responsibilities: '',
        investorType: 'individual',
        investmentBudget: '',
      },
      currentStep: 0,
    }),
}));
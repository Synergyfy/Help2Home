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
    gender?: 'male' | 'female';
    employmentStatus?: string;
    monthlyIncome?: string;
    
    // Landlord/Agent/Caretaker specific
    portfolioSize?: number; // changed to number
    responsibilities?: string;
    
    // Investor specific
    investorType?: string;
    investmentBudget?: number; // changed to number
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
    gender: undefined,
    employmentStatus: undefined,
    monthlyIncome: undefined,
    
    // Landlord/Agent/Caretaker specific
    portfolioSize: undefined,
    responsibilities: undefined,
    
    // Investor specific
    investorType: 'individual',
    investmentBudget: undefined,
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
        gender: undefined,
        employmentStatus: undefined,
        monthlyIncome: undefined,
        portfolioSize: undefined,
        responsibilities: undefined,
        investorType: 'individual',
        investmentBudget: undefined,
      },
      currentStep: 0,
    }),
}));

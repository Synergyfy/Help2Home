import { create } from 'zustand';

interface OnboardingState {
  formData: {
    // Basic Info
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    state: string;
    city: string;
    fullAddress: string;
    postalCode?: string;
    
    // Tenant specific
    gender?: 'male' | 'female';
    employmentStatus?: string;
    monthlyIncome?: string;
    
    // Landlord/Agent/Caretaker specific
    portfolioSize?: number;
    responsibilities?: string;
    
    // Investor specific
    investmentBudget?: number;
  };
  currentStep: number;
  setFormData: (data: Partial<OnboardingState['formData']>) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  formData: {
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    fullAddress: '',
    postalCode: '',
    gender: undefined,
    employmentStatus: undefined,
    monthlyIncome: undefined,
    portfolioSize: undefined,
    responsibilities: undefined,
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
        state: '',
        city: '',
        fullAddress: '',
        postalCode: '',
        gender: undefined,
        employmentStatus: undefined,
        monthlyIncome: undefined,
        portfolioSize: undefined,
        responsibilities: undefined,
        investmentBudget: undefined,
      },
      currentStep: 0,
    }),
}));
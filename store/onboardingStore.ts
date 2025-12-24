import { create } from 'zustand';

interface OnboardingState {
  formData: {
    firstName: string;
    lastName: string;
    phone: string;
    country: string;         
    portfolioSize: string;
    responsibilities: string;  // added for caretaker
    investorType: string;
    investmentBudget: string;
    address: string;
    state: string;
    employmentStatus: string;
    monthlyIncome: string;
    gender: string;
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
    portfolioSize: '',
    responsibilities: '',  // added for caretaker
    investorType: 'individual',
    investmentBudget: '',
    address: '',
    state: '',
    employmentStatus: '',
    monthlyIncome: '',
    gender: '',
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
        portfolioSize: '',
        responsibilities: '', 
        investorType: 'individual',
        investmentBudget: '',
        address: '',
        state: '',
        employmentStatus: '',
        monthlyIncome: '',
        gender: '',
      },
      currentStep: 0,
    }),
}));

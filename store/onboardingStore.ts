import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Role } from './userStore';

export interface TenantData {
  preferredLocation: string;
  customLocation?: string;
  budgetRange: string;
  moveInDate?: string;
  propertyType: string;
  bedrooms: string;
  amenities: string[];
}

export interface LandlordData {
  propertyCount: string;
  propertyTypes: string[];
  managementStyle: string;
  services: string[];
  experience: string;
}

export interface CaretakerData {
  propertiesManaged: string;
  managementExperience: string;
  availableHours: string;
  services: string[];
  preferredPropertyTypes: string[];
}

export interface AgentData {
  licenseNumber: string;
  specialization: string[];
  yearsExperience: string;
  areasServed: string[];
  certifications: string[];
}

export interface InvestorData {
  investmentBudget: string;
  investmentType: string[];
  riskTolerance: string;
  expectedReturns: string;
  investmentTimeline: string;
}

export interface DeveloperData {
  companyName: string;
  registrationNumber: string;
  yearsExperience: string;
  specialization: string[];
  portfolioHighlights: string;
}

export const MULTI_SELECT_ROLES: Role[] = ['landlord', 'caretaker', 'agent', 'developer'];
export type UserRole = 'tenant' | 'landlord' | 'caretaker' | 'agent' | 'investor' | 'developer' | 'admin' | 'superAdmin';

interface OnboardingStore {
  currentStep: number;
  selectedRoles: Role[];
  draftData: Record<string, any>;
  roleOnboardingCompleted: Record<Role, boolean>;
  onboardingCompleted: boolean;
  activeRole: Role | null;
  currentEmail: string;
  currentPhone: string;

  
  setStep: (step: number) => void;
  goToStep: (step: number) => void; 
  nextStep: () => void;
  prevStep: () => void;
  setRoles: (roles: Role[]) => void;
  toggleRole: (role: Role) => void;
  setActiveRole: (role: Role | null) => void;
  setOnboardingCompleted: (status: boolean) => void;
  setCurrentEmail: (email: string) => void;
  setCurrentPhone: (phone: string) => void;
  updateRoleData: (role: Role, data: any) => void;
  completeRoleOnboarding: (role: Role) => void;
  resetOnboarding: () => void;
  getTotalSteps: () => number;
  
 
  getCurrentUser: () => ({
    roles: Role[];
    currentStep: number;
    activeRole: Role | null;
    roleOnboardingCompleted: Record<Role, boolean>;
  } & OnboardingStore['draftData']) | null;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      selectedRoles: [],
      activeRole: null,
      currentEmail: '',
      currentPhone: '',
      onboardingCompleted: false,
      draftData: {},
      roleOnboardingCompleted: {
        tenant: false, landlord: false, caretaker: false, agent: false,
        investor: false,
        developer: false,
        admin: false,
        superAdmin: false,
      },

      getCurrentUser: () => {
        const state = get();
        if (!state.selectedRoles.length && state.currentStep === 0) return null;
        return { 
          roles: state.selectedRoles, 
          currentStep: state.currentStep,
          activeRole: state.activeRole, 
          roleOnboardingCompleted: state.roleOnboardingCompleted,
          currentEmail: state.currentEmail,
          currentPhone: state.currentPhone,
          ...state.draftData 
        };
      },

      setCurrentEmail: (currentEmail) => set({ currentEmail }),
      setCurrentPhone: (currentPhone) => set({ currentPhone }),

      setStep: (currentStep) => set({ currentStep }),
      goToStep: (step) => set({ currentStep: step }),
      getTotalSteps: () => {
        return 9;
      },
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

      setRoles: (selectedRoles) => set({ selectedRoles }),
      toggleRole: (role) => set((state) => {
        const isMulti = MULTI_SELECT_ROLES.includes(role);
        if (isMulti) {
          const currentMulti = state.selectedRoles.filter(r => MULTI_SELECT_ROLES.includes(r));
          const newMulti = currentMulti.includes(role) 
            ? currentMulti.filter(r => r !== role) 
            : [...currentMulti, role];
          return { selectedRoles: newMulti };
        }
        return { selectedRoles: state.selectedRoles.includes(role) ? [] : [role] };
      }),
      setActiveRole: (activeRole) => set({ activeRole }),

      updateRoleData: (role, data) => set((state) => ({
        draftData: { ...state.draftData, [role]: { ...state.draftData[role], ...data } }
      })),

      completeRoleOnboarding: (role) => set((state) => ({
        roleOnboardingCompleted: { ...state.roleOnboardingCompleted, [role]: true }
      })),
      setOnboardingCompleted: (status) => set({ onboardingCompleted: status }),

      resetOnboarding: () => set({
        currentStep: 0,
        selectedRoles: [],
        activeRole: null,
        draftData: {},
        onboardingCompleted: false,
        roleOnboardingCompleted: {
          tenant: false, landlord: false, caretaker: false, agent: false, investor: false, developer: false, admin: false, superAdmin: false
        }
      }),
    }),
    { name: 'help2home-onboarding-wizard' }
  )
);
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'tenant' | 'landlord' | 'caretaker' | 'agent' | 'investor';

// Roles that can be combined (property management roles)
export const MULTI_SELECT_ROLES: UserRole[] = ['landlord', 'caretaker', 'agent'];

export interface TenantData {
  preferredLocation: string;
  budgetRange: string;
  moveInDate: string;
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

export interface RoleOnboardingStatus {
  landlord: boolean;
  caretaker: boolean;
  agent: boolean;
  tenant: boolean;
  investor: boolean;
}

export interface OnboardingData {
  email: string;
  fullName: string;
  phone: string;
  roles: UserRole[];
  activeRole: UserRole | null;
  currentStep: number;
  completedSteps: number[];
  isEmailVerified: boolean;
  isOnboardingCompleted: boolean;
  roleOnboardingCompleted: RoleOnboardingStatus;
  tenant?: TenantData;
  landlord?: LandlordData;
  caretaker?: CaretakerData;
  agent?: AgentData;
  investor?: InvestorData;
}

interface OnboardingStore {
  users: Record<string, OnboardingData>;
  currentEmail: string | null;
  setCurrentEmail: (email: string) => void;
  getCurrentUser: () => OnboardingData | null;
  updateUserData: (data: Partial<OnboardingData>) => void;
  setRoles: (roles: UserRole[]) => void;
  toggleRole: (role: UserRole) => void;
  setActiveRole: (role: UserRole) => void;
  completeRoleOnboarding: (role: UserRole) => void;
  setEmailVerified: (verified: boolean) => void;
  setOnboardingCompleted: (completed: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  completeStep: (step: number) => void;
  updateRoleData: <T extends keyof Pick<OnboardingData, 'tenant' | 'landlord' | 'caretaker' | 'agent' | 'investor'>>(
    roleKey: T,
    data: Partial<NonNullable<OnboardingData[T]>>
  ) => void;
  resetOnboarding: () => void;
  getTotalSteps: () => number;
  getIncompleteRoles: () => UserRole[];
}

const getDefaultOnboardingData = (): OnboardingData => ({
  email: '',
  fullName: '',
  phone: '',
  roles: [],
  activeRole: null,
  currentStep: 0,
  completedSteps: [],
  isEmailVerified: false,
  isOnboardingCompleted: false,
  roleOnboardingCompleted: {
    landlord: false,
    caretaker: false,
    agent: false,
    tenant: false,
    investor: false,
  },
});

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set, get) => ({
      users: {},
      currentEmail: null,

      setCurrentEmail: (email: string) => {
        const { users } = get();
        if (!users[email]) {
          set({
            users: {
              ...users,
              [email]: { ...getDefaultOnboardingData(), email },
            },
            currentEmail: email,
          });
        } else {
          set({ currentEmail: email });
        }
      },

      getCurrentUser: () => {
        const { users, currentEmail } = get();
        return currentEmail ? users[currentEmail] || null : null;
      },

      updateUserData: (data: Partial<OnboardingData>) => {
        const { users, currentEmail } = get();
        if (!currentEmail) return;
        set({
          users: {
            ...users,
            [currentEmail]: { ...users[currentEmail], ...data },
          },
        });
      },

      setRoles: (roles: UserRole[]) => {
        const { updateUserData } = get();
        updateUserData({ roles });
      },

      toggleRole: (role: UserRole) => {
        const { users, currentEmail } = get();
        if (!currentEmail) return;
        const currentRoles = users[currentEmail]?.roles || [];
        
        // If it's a multi-select role (landlord, caretaker, agent)
        if (MULTI_SELECT_ROLES.includes(role)) {
          // Remove tenant/investor if selecting a multi-select role
          let newRoles = currentRoles.filter(r => MULTI_SELECT_ROLES.includes(r));
          
          if (newRoles.includes(role)) {
            newRoles = newRoles.filter(r => r !== role);
          } else {
            newRoles = [...newRoles, role];
          }
          
          set({
            users: {
              ...users,
              [currentEmail]: { ...users[currentEmail], roles: newRoles },
            },
          });
        } else {
          // Tenant or Investor - single select, clears other roles
          const newRoles = currentRoles.includes(role) ? [] : [role];
          set({
            users: {
              ...users,
              [currentEmail]: { ...users[currentEmail], roles: newRoles },
            },
          });
        }
      },

      setActiveRole: (role: UserRole) => {
        const { updateUserData } = get();
        updateUserData({ activeRole: role });
      },

      completeRoleOnboarding: (role: UserRole) => {
        const { users, currentEmail } = get();
        if (!currentEmail) return;
        const currentStatus = users[currentEmail]?.roleOnboardingCompleted || getDefaultOnboardingData().roleOnboardingCompleted;
        set({
          users: {
            ...users,
            [currentEmail]: {
              ...users[currentEmail],
              roleOnboardingCompleted: { ...currentStatus, [role]: true },
            },
          },
        });
      },

      setEmailVerified: (verified: boolean) => {
        const { updateUserData } = get();
        updateUserData({ isEmailVerified: verified });
      },

      setOnboardingCompleted: (completed: boolean) => {
        const { updateUserData } = get();
        updateUserData({ isOnboardingCompleted: completed });
      },

      nextStep: () => {
        const { users, currentEmail, completeStep } = get();
        if (!currentEmail) return;
        const currentStep = users[currentEmail]?.currentStep || 0;
        completeStep(currentStep);
        set({
          users: {
            ...users,
            [currentEmail]: {
              ...users[currentEmail],
              currentStep: currentStep + 1,
            },
          },
        });
      },

      prevStep: () => {
        const { users, currentEmail } = get();
        if (!currentEmail) return;
        const currentStep = users[currentEmail]?.currentStep || 0;
        if (currentStep > 0) {
          set({
            users: {
              ...users,
              [currentEmail]: {
                ...users[currentEmail],
                currentStep: currentStep - 1,
              },
            },
          });
        }
      },

      goToStep: (step: number) => {
        const { users, currentEmail } = get();
        if (!currentEmail) return;
        set({
          users: {
            ...users,
            [currentEmail]: {
              ...users[currentEmail],
              currentStep: step,
            },
          },
        });
      },

      completeStep: (step: number) => {
        const { users, currentEmail } = get();
        if (!currentEmail) return;
        const completedSteps = users[currentEmail]?.completedSteps || [];
        if (!completedSteps.includes(step)) {
          set({
            users: {
              ...users,
              [currentEmail]: {
                ...users[currentEmail],
                completedSteps: [...completedSteps, step],
              },
            },
          });
        }
      },

      updateRoleData: (roleKey, data) => {
        const { users, currentEmail } = get();
        if (!currentEmail) return;
        const currentRoleData = users[currentEmail]?.[roleKey] || {};
        set({
          users: {
            ...users,
            [currentEmail]: {
              ...users[currentEmail],
              [roleKey]: { ...currentRoleData, ...data },
            },
          },
        });
      },

      resetOnboarding: () => {
        const { users, currentEmail } = get();
        if (!currentEmail) return;
        set({
          users: {
            ...users,
            [currentEmail]: { ...getDefaultOnboardingData(), email: currentEmail },
          },
        });
      },

      getTotalSteps: () => {
        const user = get().getCurrentUser();
        if (!user?.roles.length) return 4; // email, verify, profile, role selection
        // email(0), verify(1), profile(2), role selection(3), role chooser(4), role steps(5-7), completion(8)
        return 9;
      },

      getIncompleteRoles: () => {
        const user = get().getCurrentUser();
        if (!user) return [];
        return user.roles.filter(role => !user.roleOnboardingCompleted[role]);
      },
    }),
    {
      name: 'help2home-onboarding',
    }
  )
);
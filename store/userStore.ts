import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'tenant' | 'landlord' | 'caretaker' | 'agent' | 'investor' | 'admin' | 'superAdmin';



interface UserState {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  roles: Role[];       
  activeRole: Role | null; 
  token: string | null;
  verified: boolean;
  hasHydrated: boolean;
  onboardingCompleted: boolean;
  roleOnboardingCompleted: Record<Role, boolean>;
  draftData: Record<string, any>;
  
  
  // Actions
  setUser: (data: Partial<UserState>) => void;
  updateProfileData: (role: Role, data: any) => void;
  setActiveRole: (role: Role) => void;
  setEmailVerified: (status: boolean) => void;
  setHasHydrated: (value: boolean) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: '',
      email: '',
      fullName: '',
      phone: '',
      roles: [],
      token: null,
      activeRole: null,
      
      verified: false,
      hasHydrated: false,
      onboardingCompleted: false,
      roleOnboardingCompleted: {
        tenant: false,
        landlord: false,
        caretaker: false,
        agent: false,
        investor: false,
        admin: false,
        superAdmin: false,
      },
      draftData: {},

      setUser: (data) => set((state) => ({ ...state, ...data })),
      updateProfileData: (role, data) => set((state) => ({
    draftData: { ...state.draftData, [role]: { ...state.draftData[role], ...data } }
})),
      setActiveRole: (activeRole) => set({ activeRole }),
      setEmailVerified: (verified) => set({ verified }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      resetUser: () => set({ 
       id: '', email: '', roles: [], activeRole: null, verified: false, fullName: '', phone: '',token: null
      }),
    }),
    {
      name: 'help2home-session',
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    }
  )
);
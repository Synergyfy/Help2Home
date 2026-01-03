import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'tenant' | 'landlord' | 'caretaker' | 'agent' | 'investor';

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
  
  // Actions
  setUser: (data: Partial<UserState>) => void;
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

      setUser: (data) => set((state) => ({ ...state, ...data })),
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
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'tenant' | 'landlord' | 'caretaker' | 'agent' | 'investor';

interface UserState {
  email: string;
  role: Role[];
  verified: boolean;
  onboarding: Record<string, any>;
  hasHydrated: boolean;
  otp: string;
  setOtp: (otp: string) => void;
  setUser: (data: Partial<UserState>) => void;
  addRole: (role: Role) => void;       // add a single role
  removeRole: (role: Role) => void;    // remove a single role
  setRole: (roles: Role[]) => void;    // replace entire array
  setOnboarding: (data: Partial<UserState['onboarding']>) => void;
  resetUser: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: '',
      role: [],
      verified: false,
      onboarding: {},
      hasHydrated: false,
      otp: '',
      setOtp: (otp) => set({ otp }),
      setUser: (data) => set((state) => ({ ...state, ...data })),
      
      // Add a role (union)
      addRole: (role) =>
        set((state) => ({
          role: Array.from(new Set([...state.role, role])),
        })),
      
      // Remove a role
      removeRole: (role) =>
        set((state) => ({
          role: state.role.filter((r) => r !== role),
        })),
      
      // Replace all roles
      setRole: (roles) => set({ role: roles }),

      setOnboarding: (data) =>
        set((state) => ({ onboarding: { ...state.onboarding, ...data } })),
      resetUser: () =>
        set({ email: '', role: [], verified: false, onboarding: {} }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'user_store',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

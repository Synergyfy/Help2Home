import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  email: string;
  role: string;
  verified: boolean;
  onboarding: Record<string, any>;
  hasHydrated: boolean;
  otp: string;
  setOtp: (otp: string) => void;
  setUser: (data: Partial<UserState>) => void;
  setRole: (role: string) => void;
  setOnboarding: (data: Partial<UserState['onboarding']>) => void;
  resetUser: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: '',
      role: '', 
      verified: false,
      onboarding: {},
      hasHydrated: false,
      otp: '',
      setOtp: (otp) => set({ otp }),
      setUser: (data) => set((state) => ({ ...state, ...data })),
      setRole: (role) => set({ role }),
      setOnboarding: (data) =>
        set((state) => ({ onboarding: { ...state.onboarding, ...data } })),
      resetUser: () =>
        set({ email: '', role: '', verified: false, onboarding: {} }),
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

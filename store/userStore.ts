// src/store/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  email: string;
  role: string;
  verified: boolean;
  onboarding: Record<string, any>;
  setUser: (data: Partial<UserState>) => void;
  setOnboarding: (data: Partial<UserState['onboarding']>) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      email: '',
      role: 'tenant',
      verified: false,
      onboarding: {},
      setUser: (data) => set((state) => ({ ...state, ...data })),
      setOnboarding: (data) => set((state) => ({ onboarding: { ...state.onboarding, ...data } })),
      resetUser: () => set({ email: '', role: 'tenant', verified: false, onboarding: {} }),
    }),
    { name: 'user_store' }
  )
);

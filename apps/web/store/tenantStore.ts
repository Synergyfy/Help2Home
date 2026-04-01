import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MOCK_TENANTS, Tenant } from '@/lib/mockLandlordData';

interface TenantState {
  tenants: Tenant[];
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  addTenant: (tenant: Tenant) => void;
  updateTenant: (id: string, data: Partial<Tenant>) => void;
  deleteTenant: (id: string) => void;
}

export const useTenantStore = create<TenantState>()(
  persist(
    (set) => ({
      tenants: MOCK_TENANTS,
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      addTenant: (tenant) => set((state) => ({ 
        tenants: [tenant, ...state.tenants] 
      })),
      updateTenant: (id, data) => set((state) => ({
        tenants: state.tenants.map(t => t.id === id ? { ...t, ...data } : t)
      })),
      deleteTenant: (id) => set((state) => ({
        tenants: state.tenants.filter(t => t.id !== id)
      }))
    }),
    {
      name: 'help2home-tenants',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);

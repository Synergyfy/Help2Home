import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SubAccount {
  id: string;
  name: string;
  email: string;
  roles: string[];
  status: 'Active' | 'Away' | 'Inactive';
  lastActive: string;
}

interface AdminState {
  subAccounts: SubAccount[];
  addSubAccount: (account: Omit<SubAccount, 'id' | 'status' | 'lastActive'>) => void;
  removeSubAccount: (id: string) => void;
  updateSubAccount: (id: string, data: Partial<SubAccount>) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      subAccounts: [
        { id: '1', name: 'Mike Ross', email: 'mike.ross@admin.com', roles: ['Finance Admin', 'Listing Admin'], status: 'Active', lastActive: '2 hours ago' },
        { id: '2', name: 'Sarah Jenkins', email: 's.jenkins@admin.com', roles: ['Support Admin'], status: 'Away', lastActive: 'Yesterday' },
      ],
      addSubAccount: (account) => set((state) => ({
        subAccounts: [
          ...state.subAccounts,
          {
            ...account,
            id: Math.random().toString(36).substr(2, 9),
            status: 'Active',
            lastActive: 'Just now',
          }
        ]
      })),
      removeSubAccount: (id) => set((state) => ({
        subAccounts: state.subAccounts.filter((a) => a.id !== id)
      })),
      updateSubAccount: (id, data) => set((state) => ({
        subAccounts: state.subAccounts.map((a) => a.id === id ? { ...a, ...data } : a)
      })),
    }),
    {
      name: 'help2home-admin-settings',
    }
  )
);

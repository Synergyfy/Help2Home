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

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: 'Tenant' | 'Investor' | 'Landlord' | 'Agent' | 'Caretaker';
  status: 'Active' | 'Pending' | 'Suspended';
  joinedAt: string;
}

export interface PendingProperty {
  id: string;
  title: string;
  landlord: string;
  type: string;
  price: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
}

export interface AuditLog {
  id: string;
  action: string;
  admin: string;
  target: string;
  timestamp: string;
  details: string;
}

export interface PlatformStats {
  totalUsers: number;
  activeProperties: number;
  pendingVerifications: number;
  revenueTotal: string;
}

interface AdminState {
  subAccounts: SubAccount[];
  users: PlatformUser[];
  moderationQueue: PendingProperty[];
  auditLogs: AuditLog[];
  platformStats: PlatformStats;
  
  // Actions
  addSubAccount: (account: Omit<SubAccount, 'id' | 'status' | 'lastActive'>) => void;
  removeSubAccount: (id: string) => void;
  updateSubAccount: (id: string, data: Partial<SubAccount>) => void;
  
  approveProperty: (id: string) => void;
  rejectProperty: (id: string, reason: string) => void;
  flagProperty: (id: string) => void;
  
  addAuditLog: (log: Omit<AuditLog, 'id' | 'timestamp'>) => void;
  addUser: (user: PlatformUser) => void;
  updateUserStatus: (id: string, status: 'Active' | 'Pending' | 'Suspended') => void;
  deleteUser: (id: string) => void;
  updateUser: (user: PlatformUser) => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      subAccounts: [
        { id: '1', name: 'Mike Ross', email: 'mike.ross@admin.com', roles: ['Finance Admin', 'Listing Admin'], status: 'Active', lastActive: '2 hours ago' },
        { id: '2', name: 'Sarah Jenkins', email: 's.jenkins@admin.com', roles: ['Support Admin'], status: 'Away', lastActive: 'Yesterday' },
      ],
      users: [
        { id: 'u1', name: 'Alice Tenant', email: 'alice@example.com', role: 'Tenant', status: 'Active', joinedAt: '2024-01-15' },
        { id: 'u2', name: 'Bob Investor', email: 'bob@invest.com', role: 'Investor', status: 'Active', joinedAt: '2024-02-10' },
        { id: 'u3', name: 'Charlie Landlord', email: 'charlie@ll.com', role: 'Landlord', status: 'Active', joinedAt: '2024-01-05' },
        { id: 'u4', name: 'Dave Agent', email: 'dave@agency.com', role: 'Agent', status: 'Active', joinedAt: '2024-03-01' },
        { id: 'u5', name: 'Eve Caretaker', email: 'eve@care.com', role: 'Caretaker', status: 'Pending', joinedAt: '2024-03-20' },
        { id: 'u6', name: 'Frank Tenant', email: 'frank@example.com', role: 'Tenant', status: 'Suspended', joinedAt: '2023-11-12' },
      ],
      moderationQueue: [
        { id: 'prop_1', title: 'Luxury 2-Bed Flat', landlord: 'John Doe', type: 'Apartment', price: '₦150,000,000', submittedAt: '2024-03-24 10:30', status: 'pending' },
        { id: 'prop_2', title: 'Commercial Office Space', landlord: 'Global Corp', type: 'Office', price: '₦45,000,000/yr', submittedAt: '2024-03-24 11:15', status: 'pending' },
        { id: 'prop_3', title: 'Beachfront Villa', landlord: 'Sarah Smith', type: 'Villa', price: '₦750,000,000', submittedAt: '2024-03-23 15:00', status: 'pending' },
      ],
      auditLogs: [
        { id: 'log_1', action: 'User Suspension', admin: 'Super Admin', target: 'user_99', timestamp: '2024-03-24 09:00', details: 'Suspended for suspicious activity' },
      ],
      platformStats: {
        totalUsers: 1240,
        activeProperties: 450,
        pendingVerifications: 12,
        revenueTotal: '₦125.4M'
      },

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

      approveProperty: (id) => set((state) => {
        const prop = state.moderationQueue.find(p => p.id === id);
        return {
          moderationQueue: state.moderationQueue.filter(p => p.id !== id),
          auditLogs: [{
            id: `log_${Date.now()}`,
            action: 'Property Approval',
            admin: 'Super Admin',
            target: prop?.title || id,
            timestamp: new Date().toLocaleString(),
            details: 'Approved for public listing'
          }, ...state.auditLogs]
        };
      }),

      rejectProperty: (id, reason) => set((state) => {
        const prop = state.moderationQueue.find(p => p.id === id);
        return {
          moderationQueue: state.moderationQueue.filter(p => p.id !== id),
          auditLogs: [{
            id: `log_${Date.now()}`,
            action: 'Property Rejection',
            admin: 'Super Admin',
            target: prop?.title || id,
            timestamp: new Date().toLocaleString(),
            details: `Rejected: ${reason}`
          }, ...state.auditLogs]
        };
      }),

      flagProperty: (id) => set((state) => ({
        moderationQueue: state.moderationQueue.map(p => p.id === id ? { ...p, status: 'flagged' } : p)
      })),

      addAuditLog: (log) => set((state) => ({
        auditLogs: [{
          ...log,
          id: `log_${Date.now()}`,
          timestamp: new Date().toLocaleString()
        }, ...state.auditLogs]
      })),
      addUser: (user) => set((state) => ({
        users: [...state.users, user]
      })),
      updateUserStatus: (id, status) => set((state) => ({
        users: state.users.map(u => u.id === id ? { ...u, status } : u)
      })),
      deleteUser: (id) => set((state) => ({
        users: state.users.filter(u => u.id !== id)
      })),
      updateUser: (updatedUser) => set((state) => ({
        users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
      }))
    }),
    {
      name: 'help2home-admin-settings',
    }
  )
);

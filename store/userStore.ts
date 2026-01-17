import React from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'tenant' | 'landlord' | 'caretaker' | 'agent' | 'investor' | 'admin' | 'superAdmin';



export interface CommonProfile {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  address: string;
  state: string;
  image: string;
}

export interface TenantProfileData {
  preferredLocation: string;
  budgetRange: string;
  moveInDate: string;
  propertyType: string;
  bedrooms: string;
  amenities: string[];
  employmentStatus?: string;
  employerName?: string;
  organizationName?: string;
  organizationId?: string;
  jobTitle?: string;
  monthlySalary?: string;
  employmentType?: string;
  startDate?: string;
  employerContact?: string;
  nextOfKin?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
  guarantor?: {
    name: string;
    relationship: string;
    phone: string;
    email?: string;
  };
  bvn?: string;
  isBvnVerified?: boolean;
  // Section Verifications
  isBasicVerified?: boolean;
  isWorkVerified?: boolean;
  isNokVerified?: boolean;
  isGuarantorVerified?: boolean;
}

export interface LandlordProfileData {
  propertyCount: string;
  propertyTypes: string[];
  managementStyle: string;
  services: string[];
  experience: string;
  bankAccounts?: any[];
}

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
  profile: CommonProfile;
  roleData: {
    tenant?: TenantProfileData;
    landlord?: LandlordProfileData;
    caretaker?: any;
    agent?: any;
    investor?: any;
  };
  followedListers: string[];
  draftData: Record<string, any>;
  
  
  // Actions
  setUser: (data: Partial<UserState>) => void;
  updateProfile: (data: Partial<CommonProfile>) => void;
  updateRoleProfileData: (role: Role, data: any) => void;
  toggleFollowLister: (listerId: string) => void;
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
      profile: {
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        maritalStatus: '',
        address: '',
        state: '',
        image: '/assets/dashboard/profile-placeholder.png',
      },
      roleData: {},
      followedListers: [],
      draftData: {},

      setUser: (data) => set((state) => ({ ...state, ...data })),
      updateProfile: (data) => set((state) => ({
        profile: { ...state.profile, ...data }
      })),
      updateRoleProfileData: (role, data) => set((state) => ({
        roleData: { 
          ...state.roleData, 
          [role]: { ...state.roleData[role as keyof typeof state.roleData], ...data }
        }
      })),
      toggleFollowLister: (listerId) => set((state) => ({
        followedListers: state.followedListers.includes(listerId)
          ? state.followedListers.filter(id => id !== listerId)
          : [...state.followedListers, listerId]
      })),
      setActiveRole: (activeRole) => set({ activeRole }),
      setEmailVerified: (verified) => set({ verified }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      resetUser: () => set({ 
       id: '', email: '', roles: [], activeRole: null, verified: false, fullName: '', phone: '',token: null,
        profile: { firstName: '', lastName: '', dob: '', gender: '', maritalStatus: '', address: '', state: '', image: '/assets/dashboard/profile-placeholder.png' },
        roleData: {}
      }),
    }),
    {
      name: 'help2home-session',
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    }
  )
);
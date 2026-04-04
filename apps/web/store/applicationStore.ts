import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ApplicationStatus = 'Pending' | 'Under Review' | 'Approved' | 'Funded' | 'Handover' | 'Active' | 'Rejected' | 'Draft';

export interface Application {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyAddress: string;
  propertyImage: string;
  landlordId: string;
  tenantId: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  status: ApplicationStatus;
  submittedAt: string;
  progress: number;
  financing: {
    downPaymentPercent: number;
    repaymentDuration: number;
  };
  details: {
    employmentStatus: string;
    employerName: string;
    monthlySalary: string;
  };
  calculations?: {
    downPayment: number;
    monthlyRent: number;
    propertyPrice: number;
    repaymentDuration: number;
  };
  documents?: any[];
  contracts?: any[];
  activityLogs?: any[];
}

interface ApplicationState {
  applications: Application[];
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  addApplication: (application: Application) => void;
  updateApplicationStatus: (id: string, status: ApplicationStatus) => void;
  deleteApplication: (id: string) => void;
}

export const useApplicationStore = create<ApplicationState>()(
  persist(
    (set) => ({
      applications: [],
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      addApplication: (app) => set((state) => ({ 
        applications: [app, ...state.applications] 
      })),
      updateApplicationStatus: (id, status) => set((state) => ({
        applications: state.applications.map(app => 
          app.id === id ? { ...app, status, progress: status === 'Approved' ? 100 : app.progress } : app
        )
      })),
      deleteApplication: (id) => set((state) => ({
        applications: state.applications.filter(app => app.id !== id)
      }))
    }),
    {
      name: 'help2home-applications',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);

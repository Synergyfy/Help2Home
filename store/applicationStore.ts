import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ApplicationStatus = 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Draft';

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
      applications: [
        {
          id: 'A-000123',
          propertyId: 'prop_123',
          propertyTitle: 'Sunnyvale Apartments',
          propertyAddress: '15, Admiralty Way, Lekki Phase 1, Lagos',
          propertyImage: '/assets/marketplace assets/Home2.png',
          landlordId: 'landlord_1',
          tenantId: 'tenant_1',
          tenantName: 'Mercy Okoli',
          tenantEmail: 'mercyokoli@gmail.com',
          tenantPhone: '08128860774',
          status: 'Under Review',
          submittedAt: '2026-03-01T10:00:00Z',
          progress: 35,
          financing: { downPaymentPercent: 25, repaymentDuration: 10 },
          details: { employmentStatus: 'Employed', employerName: 'Tech Solutions Ltd', monthlySalary: '350,000' }
        },
        {
          id: 'A-000124',
          propertyId: 'prop_456',
          propertyTitle: 'Greenwood Estate',
          propertyAddress: '22, Orchid Road, Chevron, Lagos',
          propertyImage: '/assets/marketplace assets/Home3.png',
          landlordId: 'landlord_1',
          tenantId: 'tenant_1',
          tenantName: 'Mercy Okoli',
          tenantEmail: 'mercyokoli@gmail.com',
          tenantPhone: '08128860774',
          status: 'Draft',
          submittedAt: '',
          progress: 10,
          financing: { downPaymentPercent: 20, repaymentDuration: 6 },
          details: { employmentStatus: 'Employed', employerName: 'Tech Solutions Ltd', monthlySalary: '350,000' }
        }
      ],
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

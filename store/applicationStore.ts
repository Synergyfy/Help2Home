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
          propertyImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=400',
          landlordId: 'user_clt02landlord002',
          tenantId: 'tenant_1',
          tenantName: 'Mercy Okoli',
          tenantEmail: 'mercyokoli@gmail.com',
          tenantPhone: '08128860774',
          status: 'Under Review',
          submittedAt: '2026-02-10T10:00:00Z',
          progress: 35,
          financing: { downPaymentPercent: 30, repaymentDuration: 10 },
          details: { employmentStatus: 'Employed', employerName: 'Tech Solutions Ltd', monthlySalary: '350,000' }
        },
        {
          id: 'A-000125',
          propertyId: 'prop_789',
          propertyTitle: 'Victoria Island Penthouse',
          propertyAddress: '10, Sanusi Fafunwa St, Victoria Island, Lagos',
          propertyImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400',
          landlordId: 'user_clt02landlord002',
          tenantId: 'tenant_2',
          tenantName: 'Obinna Eze',
          tenantEmail: 'obinna.eze@gmail.com',
          tenantPhone: '08031234567',
          status: 'Pending',
          submittedAt: '2026-02-14T09:30:00Z',
          progress: 20,
          financing: { downPaymentPercent: 25, repaymentDuration: 8 },
          details: { employmentStatus: 'Self-Employed', employerName: 'Eze Logistics', monthlySalary: '850,000' }
        },
        {
          id: 'A-000126',
          propertyId: 'prop_101',
          propertyTitle: 'Ikeja Heights',
          propertyAddress: '5, Allen Avenue, Ikeja, Lagos',
          propertyImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400',
          landlordId: 'user_clt02landlord002',
          tenantId: 'tenant_3',
          tenantName: 'Chioma Adeyemi',
          tenantEmail: 'chioma.a@yahoo.com',
          tenantPhone: '07069876543',
          status: 'Approved',
          submittedAt: '2026-02-08T14:20:00Z',
          progress: 100,
          financing: { downPaymentPercent: 40, repaymentDuration: 12 },
          details: { employmentStatus: 'Employed', employerName: 'Global Bank PLC', monthlySalary: '500,000' }
        },
        {
          id: 'A-000127',
          propertyId: 'prop_202',
          propertyTitle: 'Surulere Modern Flats',
          propertyAddress: '18, Bode Thomas St, Surulere, Lagos',
          propertyImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400',
          landlordId: 'user_clt02landlord002',
          tenantId: 'tenant_4',
          tenantName: 'Babajide Sanwo',
          tenantEmail: 'b.sanwo@gov.ng',
          tenantPhone: '08022223333',
          status: 'Rejected',
          submittedAt: '2026-02-05T11:45:00Z',
          progress: 100,
          financing: { downPaymentPercent: 10, repaymentDuration: 24 },
          details: { employmentStatus: 'Employed', employerName: 'Lagos State Govt', monthlySalary: '1,200,000' }
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

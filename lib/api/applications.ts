import { Application, ApplicationStatus } from '@/store/applicationStore';

// Mock delay to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchApplications = async (role: 'tenant' | 'landlord', id: string): Promise<Application[]> => {
  await delay(1000);
  
  // In a real app, this would be an API call
  // For now, we rely on the store to hold the "source of truth" but fetch via this function
  // In a real scenario, this would hit /api/applications?role=...&id=...
  const stored = localStorage.getItem('help2home-applications');
  if (stored) {
    const parsed = JSON.parse(stored);
    const allApps = parsed.state.applications as Application[];
    
    if (role === 'tenant') {
      return allApps.filter(app => app.tenantId === id);
    } else {
      return allApps.filter(app => app.landlordId === id && app.status !== 'Draft');
    }
  }
  
  return [];
};

export const updateApplicationStatusApi = async (id: string, status: ApplicationStatus): Promise<boolean> => {
  await delay(800);
  return true;
};

export const submitApplicationApi = async (application: Application): Promise<Application> => {
  await delay(1500);
  return application;
};

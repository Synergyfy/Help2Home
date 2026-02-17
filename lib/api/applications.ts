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
    
    let filtered = [];
    if (role === 'tenant') {
      filtered = allApps.filter(app => app.tenantId === id);
    } else {
      filtered = allApps.filter(app => app.landlordId === id && app.status !== 'Draft');
    }

    // Demo Fallback: If no apps for this user, show all apps (except drafts)
    if (filtered.length === 0) {
      return allApps.filter(app => app.status !== 'Draft');
    }

    return filtered;
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

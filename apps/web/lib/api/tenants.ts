import { Tenant } from '@/lib/mockLandlordData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTenantsByLandlord = async (landlordId: string): Promise<Tenant[]> => {
  await delay(800);
  const stored = localStorage.getItem('help2home-tenants');
  if (stored) {
    const parsed = JSON.parse(stored);
    return parsed.state.tenants as Tenant[];
  }
  return [];
};

export const addTenantApi = async (tenant: Tenant): Promise<Tenant> => {
  await delay(1000);
  return tenant;
};

export const updateTenantApi = async (id: string, data: Partial<Tenant>): Promise<boolean> => {
  await delay(500);
  return true;
};

export const deleteTenantApi = async (id: string): Promise<boolean> => {
  await delay(500);
  return true;
};

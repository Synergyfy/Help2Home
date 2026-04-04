import axios from 'axios';
import { useUserStore } from '@/store/userStore';
export interface Lease {
    id: string;
    propertyId: string;
    startDate: string;
    endDate: string;
    rentAmount: number;
    paymentFrequency: 'Monthly' | 'Quarterly' | 'Annually';
    depositAmount: number;
    status: 'Active' | 'Pending' | 'Expired';
    documentUrl?: string; // Link to signed tenancy agreement
}

export interface Tenant {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profileImage?: string;
    status: 'Active' | 'Delinquent' | 'Pending' | 'Past';
    currentProperty?: {
        id: string;
        title: string;
        address: string;
    };
    lease?: Lease;
    onTimePaymentRate: number; // Percentage (0-100)
    outstandingBalance: number;
    joinedDate: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const getAuthHeader = () => {
    const token = useUserStore.getState().token;
    return { Authorization: `Bearer ${token}` };
};

export const fetchTenantsByLandlord = async (landlordId: string): Promise<Tenant[]> => {
  try {
    const { data } = await axios.get(`${API_URL}/landlord-dashboard/tenants`, {
      headers: getAuthHeader(),
      params: { landlordId }
    });
    return data;
  } catch (error) {
    console.error('Error fetching tenants:', error);
    return [];
  }
};

export const addTenantApi = async (tenant: Tenant): Promise<Tenant> => {
  try {
    const { data } = await axios.post(`${API_URL}/landlord-dashboard/tenants`, tenant, {
      headers: getAuthHeader()
    });
    return data;
  } catch (error) {
    console.error('Error adding tenant:', error);
    throw error;
  }
};

export const updateTenantApi = async (id: string, data: Partial<Tenant>): Promise<boolean> => {
  try {
    await axios.patch(`${API_URL}/landlord-dashboard/tenants/${id}`, data, {
      headers: getAuthHeader()
    });
    return true;
  } catch (error) {
    console.error('Error updating tenant:', error);
    return false;
  }
};

export const deleteTenantApi = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/landlord-dashboard/tenants/${id}`, {
      headers: getAuthHeader()
    });
    return true;
  } catch (error) {
    console.error('Error deleting tenant:', error);
    return false;
  }
};

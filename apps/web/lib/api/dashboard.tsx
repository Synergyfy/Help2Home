import axios from 'axios';
import { useUserStore } from '@/store/userStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const getAuthHeader = () => {
    const token = useUserStore.getState().token;
    return { Authorization: `Bearer ${token}` };
};

export interface DashboardData {
  summary: any[];
  activities: any[];
  tasks: any[];
  payments: any[];
  verification: any[];
}

export const fetchDashboardData = async (
  role: string | null, 
  filters: { range: string; property: string }
): Promise<DashboardData> => {
  if (!role) throw new Error("No active role selected");

  try {
    // Determine the base path based on role
    let basePath = '';
    switch (role) {
      case 'landlord':
        basePath = 'landlord-dashboard';
        break;
      case 'agent':
        basePath = 'agent-dashboard';
        break;
      case 'caretaker':
        basePath = 'caretaker-dashboard';
        break;
      case 'admin':
        basePath = 'admin-dashboard';
        break;
      default:
        // Default to tenant dashboard (or separate logic if needed)
        const { data } = await axios.get(`${API_URL}/dashboard/tenant/stats`, {
          headers: getAuthHeader()
        });
        return data;
    }

    const { data } = await axios.get(`${API_URL}/${basePath}/stats`, {
      headers: getAuthHeader(),
      params: {
        range: filters.range,
        propertyId: filters.property !== 'all' ? filters.property : undefined
      }
    });

    return data;
  } catch (error) {
    console.error(`Error fetching ${role} dashboard data:`, error);
    // Fallback to empty data on error to prevent total breakage
    return {
      summary: [],
      activities: [],
      tasks: [],
      payments: [],
      verification: []
    };
  }
};

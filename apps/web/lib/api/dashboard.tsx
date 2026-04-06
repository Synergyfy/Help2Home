import apiClient from './apiClient';
import { 
  SummaryTileData, 
  ActivityItem, 
  TaskItem, 
  PaymentItem, 
  VerificationItem, 
  PerformanceData 
} from '@/types/dashboard';

export interface DashboardData {
  summary: SummaryTileData[];
  activities: ActivityItem[];
  tasks: TaskItem[];
  payments: PaymentItem[];
  verification: VerificationItem[];
  performance?: PerformanceData;
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
        const { data } = await apiClient.get(`/dashboard/tenant/stats`);
        return data;
    }

    const { data } = await apiClient.get(`/${basePath}/stats`, {
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

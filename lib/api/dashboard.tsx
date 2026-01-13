import { 
  MOCK_SUMMARY_TILES, MOCK_ACTIVITY, MOCK_TASKS, 
  MOCK_PAYMENTS, MOCK_VERIFICATION 
} from '@/lib/mockLandlordData';

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

  // Simulate API Network Latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Switch logic to return different mock sets based on the perspective
  // In production: return (await axios.get(`/api/${role}/stats`)).data;
  switch (role) {
    case 'landlord':
    case 'agent':
    case 'caretaker':
      // Currently using landlord mocks for all three as placeholders
      return {
        summary: MOCK_SUMMARY_TILES,
        activities: MOCK_ACTIVITY,
        tasks: MOCK_TASKS,
        payments: MOCK_PAYMENTS,
        verification: MOCK_VERIFICATION
      };
    default:
      return {
        summary: [], activities: [], tasks: [], payments: [], verification: []
      };
  }
};

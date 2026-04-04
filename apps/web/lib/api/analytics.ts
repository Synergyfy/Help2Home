import axios from 'axios';
import { useUserStore } from '@/store/userStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const getAuthHeader = () => {
    const token = useUserStore.getState().token;
    return { Authorization: `Bearer ${token}` };
};

export interface AnalyticsSummary {
    totalRevenue: string;
    revenueGrowth: string;
    occupancyRate: string;
    activeMaintenance: number;
}

export interface ChartDataPoint {
    name: string;
    total?: number;
    value?: number;
}

export interface AnalyticsData {
    summary: AnalyticsSummary;
    incomeData: ChartDataPoint[];
    occupancyData: ChartDataPoint[];
    maintenanceData: ChartDataPoint[];
}

export const fetchLandlordAnalytics = async (): Promise<AnalyticsData | null> => {
    try {
        const { data } = await axios.get(`${API_URL}/dashboard/landlord/analytics`, {
            headers: getAuthHeader()
        });
        return data;
    } catch (error) {
        console.error('Error fetching landlord analytics:', error);
        return null;
    }
};

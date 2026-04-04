export interface AnalyticsSummary {
    totalIncome: { value: number; trend: 'up' | 'down' | 'neutral'; trendValue: string };
    occupancyRate: { value: number; totalUnits: number; occupiedUnits: number; trend: 'up' | 'down' | 'neutral'; trendValue: string };
    avgTimeToRent: { value: number; trend: 'up' | 'down' | 'neutral'; trendValue: string };
    churnRate: { value: number; trend: 'up' | 'down' | 'neutral'; trendValue: string };
    onTimePayments: { value: number; trend: 'up' | 'down' | 'neutral'; trendValue: string };
    maintenanceSpend: { value: number; trend: 'up' | 'down' | 'neutral'; trendValue: string };
}

export interface IncomeData {
    date: string;
    gross: number;
    net: number;
    fees: number;
}

export interface OccupancyData {
    property: string;
    occupancy: number; // percentage
    total: number;
    occupied: number;
}

export interface MaintenanceData {
    category: string;
    spend: number;
    requests: number;
}

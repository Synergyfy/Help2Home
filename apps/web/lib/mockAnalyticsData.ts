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

export const MOCK_ANALYTICS_SUMMARY: AnalyticsSummary = {
    totalIncome: { value: 12500000, trend: 'up', trendValue: '12%' },
    occupancyRate: { value: 92, totalUnits: 50, occupiedUnits: 46, trend: 'up', trendValue: '5%' },
    avgTimeToRent: { value: 14, trend: 'down', trendValue: '2 days' },
    churnRate: { value: 4, trend: 'down', trendValue: '1%' },
    onTimePayments: { value: 95, trend: 'up', trendValue: '3%' },
    maintenanceSpend: { value: 450000, trend: 'down', trendValue: '8%' },
};

export const MOCK_INCOME_DATA: IncomeData[] = [
    { date: 'Jan', gross: 1000000, net: 900000, fees: 100000 },
    { date: 'Feb', gross: 1200000, net: 1080000, fees: 120000 },
    { date: 'Mar', gross: 1150000, net: 1035000, fees: 115000 },
    { date: 'Apr', gross: 1300000, net: 1170000, fees: 130000 },
    { date: 'May', gross: 1400000, net: 1260000, fees: 140000 },
    { date: 'Jun', gross: 1350000, net: 1215000, fees: 135000 },
];

export const MOCK_OCCUPANCY_DATA: OccupancyData[] = [
    { property: 'Lekki Phase 1', occupancy: 95, total: 20, occupied: 19 },
    { property: 'Yaba Heights', occupancy: 80, total: 15, occupied: 12 },
    { property: 'Ikeja GRA', occupancy: 100, total: 10, occupied: 10 },
    { property: 'Victoria Island', occupancy: 90, total: 5, occupied: 4.5 }, // 4.5 is weird but ok for mock
];

export const MOCK_MAINTENANCE_DATA: MaintenanceData[] = [
    { category: 'Plumbing', spend: 150000, requests: 12 },
    { category: 'Electrical', spend: 120000, requests: 8 },
    { category: 'HVAC', spend: 80000, requests: 4 },
    { category: 'General', spend: 50000, requests: 15 },
    { category: 'Cleaning', spend: 50000, requests: 20 },
];

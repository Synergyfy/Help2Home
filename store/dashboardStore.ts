import { create } from 'zustand';

interface DashboardFilters {
  dateRange: string;
  propertyFilter: string;
  setFilters: (filters: Partial<{ dateRange: string; propertyFilter: string }>) => void;
}

export const useDashboardStore = create<DashboardFilters>((set) => ({
  dateRange: '30d',
  propertyFilter: 'All',
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
}));
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/store/userStore';
import { useDashboardStore } from '@/store/dashboardStore';
import { fetchDashboardData } from '@/lib/api/dashboard';

export const useDashboardData = () => {
  const { activeRole, hasHydrated } = useUserStore();
  const { dateRange, propertyFilter } = useDashboardStore();

  return useQuery({
    // TanStack Query Key: Unique to user perspective + filters
    queryKey: ['dashboard', activeRole, dateRange, propertyFilter],
    queryFn: () => fetchDashboardData(activeRole, { range: dateRange, property: propertyFilter }),
    // Important: Wait for Zustand to hydrate from LocalStorage before fetching
    enabled: hasHydrated && !!activeRole,
    staleTime: 1000 * 60 * 5, // Cache results for 5 minutes
  });
};
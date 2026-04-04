import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const useTenantDashboard = () => {
    const { token, hasHydrated } = useUserStore();

    const statsQuery = useQuery({
        queryKey: ['tenant-dashboard-stats'],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/dashboard/tenant/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        },
        enabled: hasHydrated && !!token,
    });

    const fundingQuery = useQuery({
        queryKey: ['tenant-funding-properties'],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/dashboard/tenant/funding-properties`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        },
        enabled: hasHydrated && !!token,
    });

    return {
        stats: statsQuery.data,
        fundingProperties: fundingQuery.data || [],
        isLoading: statsQuery.isLoading || fundingQuery.isLoading,
        refetch: () => {
            statsQuery.refetch();
            fundingQuery.refetch();
        }
    };
};

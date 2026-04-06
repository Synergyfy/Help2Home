import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api/apiClient';

export const useAdminDashboard = (range: string) => {
    return useQuery({
        queryKey: ['admin-stats', range],
        queryFn: async () => {
            const { data } = await apiClient.get('/dashboard/admin/stats', {
                params: { range }
            });
            return data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false,
    });
};

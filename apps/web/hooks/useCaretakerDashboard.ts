import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useUserStore } from '@/store/userStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const useCaretakerDashboard = () => {
    const { token, hasHydrated } = useUserStore();

    const statsQuery = useQuery({
        queryKey: ['caretaker-dashboard-stats'],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/dashboard/caretaker/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        },
        enabled: hasHydrated && !!token,
    });

    const propertiesQuery = useQuery({
        queryKey: ['caretaker-properties'],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/dashboard/caretaker/properties`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        },
        enabled: hasHydrated && !!token,
    });

    const activityQuery = useQuery({
        queryKey: ['caretaker-activity'],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/dashboard/caretaker/activity`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        },
        enabled: hasHydrated && !!token,
    });

    return {
        stats: statsQuery.data,
        properties: propertiesQuery.data || [],
        activity: activityQuery.data || [],
        isLoading: statsQuery.isLoading || propertiesQuery.isLoading || activityQuery.isLoading,
        refetch: () => {
            statsQuery.refetch();
            propertiesQuery.refetch();
            activityQuery.refetch();
        }
    };
};

export const useCaretakerTasks = (status?: string) => {
    const { token, hasHydrated } = useUserStore();

    return useQuery({
        queryKey: ['caretaker-tasks', status],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/dashboard/caretaker/tasks`, {
                params: { status },
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        },
        enabled: hasHydrated && !!token,
    });
};

export const useCaretakerPartners = () => {
    const { token, hasHydrated } = useUserStore();

    return useQuery({
        queryKey: ['caretaker-partners'],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/dashboard/caretaker/partners`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return data;
        },
        enabled: hasHydrated && !!token,
    });
};

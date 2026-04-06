import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api/apiClient';
import { toast } from 'react-toastify';

export interface PendingProperty {
    id: string;
    title: string;
    location: string;
    ownerId: string;
    createdAt: string;
    status: string;
    price: number;
}

export const useAdminModeration = () => {
    const queryClient = useQueryClient();

    const fetchPending = async (): Promise<PendingProperty[]> => {
        const { data } = await apiClient.get(`/dashboard/admin/listing/pending`);
        return data;
    };

    const { data: items = [], isLoading, isError } = useQuery({
        queryKey: ['admin-moderation'],
        queryFn: fetchPending,
    });

    const approveMutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await apiClient.patch(`/dashboard/admin/listing/${id}/approve`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-moderation'] });
            toast.success('Property approved successfully');
        },
        onError: () => toast.error('Failed to approve property'),
    });

    const rejectMutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await apiClient.patch(`/dashboard/admin/listing/${id}/reject`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-moderation'] });
            toast.success('Property rejected');
        },
        onError: () => toast.error('Failed to reject property'),
    });

    const requestInfoMutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await apiClient.patch(`/dashboard/admin/listing/${id}/request-info`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-moderation'] });
            toast.success('Request for more info sent');
        },
        onError: () => toast.error('Failed to request info'),
    });

    return {
        items,
        isLoading,
        isError,
        approve: approveMutation.mutate,
        isApproving: approveMutation.isPending,
        reject: rejectMutation.mutate,
        isRejecting: rejectMutation.isPending,
        requestInfo: requestInfoMutation.mutate,
        isRequestingInfo: requestInfoMutation.isPending,
    };
};

export const useAdminModerationItem = (id: string) => {
    return useQuery({
        queryKey: ['admin-moderation', id],
        queryFn: async () => {
            const { data } = await apiClient.get(`/dashboard/admin/listing/${id}`);
            return data;
        },
        enabled: !!id,
    });
};

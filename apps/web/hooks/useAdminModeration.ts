import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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
        const { data } = await axios.get(`${API_URL}/dashboard/admin/listing/pending`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        return data;
    };

    const { data: items = [], isLoading, isError } = useQuery({
        queryKey: ['admin-moderation'],
        queryFn: fetchPending,
    });

    const approveMutation = useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axios.patch(`${API_URL}/dashboard/admin/listing/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            });
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
            const { data } = await axios.patch(`${API_URL}/dashboard/admin/listing/${id}/reject`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-moderation'] });
            toast.success('Property rejected');
        },
        onError: () => toast.error('Failed to reject property'),
    });

    return {
        items,
        isLoading,
        isError,
        approve: approveMutation.mutate,
        isApproving: approveMutation.isPending,
        reject: rejectMutation.mutate,
        isRejecting: rejectMutation.isPending,
    };
};

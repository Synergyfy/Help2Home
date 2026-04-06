import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api/apiClient';
import { toast } from 'react-toastify';

export const useAdminSupportList = (status?: string) => {
    return useQuery({
        queryKey: ['admin-support', status],
        queryFn: async () => {
            const { data } = await apiClient.get('/dashboard/admin/support', {
                params: { status: status !== 'All' ? status : undefined }
            });
            return data;
        },
    });
};

export const useAdminSupportItem = (id: string) => {
    const queryClient = useQueryClient();

    const ticketQuery = useQuery({
        queryKey: ['admin-support', id],
        queryFn: async () => {
            const { data } = await apiClient.get(`/dashboard/admin/support/${id}`);
            return data;
        },
        enabled: !!id,
    });

    const messagesQuery = useQuery({
        queryKey: ['admin-support-messages', id],
        queryFn: async () => {
            const { data } = await apiClient.get(`/dashboard/admin/support/${id}/messages`);
            return data;
        },
        enabled: !!id,
    });

    const sendMessageMutation = useMutation({
        mutationFn: async (messageData: { senderId: string, senderName: string, senderRole: string, content: string }) => {
            const { data } = await apiClient.post(`/dashboard/admin/support/${id}/messages`, messageData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-support-messages', id] });
        },
        onError: () => toast.error('Failed to send message'),
    });

    const updateStatusMutation = useMutation({
        mutationFn: async (status: string) => {
            const { data } = await apiClient.patch(`/dashboard/admin/support/${id}/status`, { status });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-support', id] });
            queryClient.invalidateQueries({ queryKey: ['admin-support'] }); // For list
            toast.success('Ticket status updated');
        },
        onError: () => toast.error('Failed to update status'),
    });

    return {
        ticket: ticketQuery.data,
        isLoading: ticketQuery.isLoading,
        messages: messagesQuery.data || [],
        sendMessage: sendMessageMutation.mutate,
        isSending: sendMessageMutation.isPending,
        updateStatus: updateStatusMutation.mutate,
        isUpdatingStatus: updateStatusMutation.isPending,
    };
};

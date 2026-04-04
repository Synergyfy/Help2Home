import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { landlordSupportApi } from '../lib/api/support';
import { Ticket } from '@/lib/api/support-types';
import { toast } from 'react-toastify';

export const useLandlordSupport = () => {
    const queryClient = useQueryClient();

    const { data: tickets = [], isLoading, isError } = useQuery({
        queryKey: ['landlord-support-tickets'],
        queryFn: landlordSupportApi.getTickets,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const createTicketMutation = useMutation({
        mutationFn: (data: Partial<Ticket>) => landlordSupportApi.createTicket(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['landlord-support-tickets'] });
            toast.success('Support ticket created successfully');
        },
        onError: (error: any) => {
            console.error('Failed to create support ticket:', error);
            toast.error('Failed to create support ticket');
        }
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: string }) => 
            landlordSupportApi.updateStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['landlord-support-tickets'] });
            toast.success('Ticket status updated');
        },
        onError: (error: any) => {
            console.error('Failed to update ticket status:', error);
            toast.error('Failed to update ticket status');
        }
    });

    return {
        tickets,
        isLoading,
        isError,
        createTicket: createTicketMutation.mutate,
        isCreating: createTicketMutation.isPending,
        updateStatus: updateStatusMutation.mutate,
        isUpdating: updateStatusMutation.isPending,
    };
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { landlordMaintenanceApi } from '../lib/api/maintenance';
import { MaintenanceStatus } from '../lib/mockMaintenanceData';
import { toast } from 'react-toastify';

export const useLandlordMaintenance = () => {
    const queryClient = useQueryClient();

    const { data: requests = [], isLoading, isError } = useQuery({
        queryKey: ['landlord-maintenance'],
        queryFn: landlordMaintenanceApi.getRequests,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status, reason, artisanId, cost }: { 
            id: string, 
            status: MaintenanceStatus, 
            reason?: string, 
            artisanId?: string,
            cost?: number
        }) => landlordMaintenanceApi.updateStatus(id, status, reason, artisanId, cost),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['landlord-maintenance'] });
            toast.success('Maintenance request updated successfully');
        },
        onError: (error: any) => {
            console.error('Failed to update maintenance request:', error);
            toast.error('Failed to update maintenance request');
        }
    });

    return {
        requests,
        isLoading,
        isError,
        updateStatus: updateStatusMutation.mutate,
        isUpdating: updateStatusMutation.isPending,
    };
};

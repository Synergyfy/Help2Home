import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/store/userStore';
import { maintenanceApi, MaintenanceStatus } from '@/lib/api/maintenance';
import { toast } from 'react-toastify';

export const useMaintenance = () => {
    const queryClient = useQueryClient();
    const { activeRole } = useUserStore();

    const role = activeRole || 'landlord'; // Fallback to landlord

    const { data: requests = [], isLoading, isError, error } = useQuery({
        queryKey: ['maintenance', role],
        queryFn: () => maintenanceApi.getRequests(role),
        enabled: !!role,
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, status, reason, artisanId, cost }: { 
            id: string, 
            status: MaintenanceStatus, 
            reason?: string, 
            artisanId?: string,
            cost?: number 
        }) => maintenanceApi.updateStatus(role, id, status, reason, artisanId, cost),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['maintenance', role] });
            toast.success('Maintenance status updated');
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Failed to update status');
        }
    });

    const hireArtisanMutation = useMutation({
        mutationFn: ({ id, artisanId }: { id: string, artisanId: string }) => 
            maintenanceApi.updateStatus(role, id, 'In Progress', undefined, artisanId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['maintenance', role] });
            toast.success('Artisan assigned successfully');
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || 'Failed to assign artisan');
        }
    });

    return {
        requests,
        isLoading,
        isError,
        error,
        updateStatus: updateStatusMutation.mutate,
        hireArtisan: hireArtisanMutation.mutate,
        isUpdating: updateStatusMutation.isPending || hireArtisanMutation.isPending,
    };
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/store/userStore';
import { useTenantStore } from '@/store/tenantStore';
import { Tenant } from '@/lib/mockLandlordData';
import { 
  fetchTenantsByLandlord, 
  addTenantApi, 
  updateTenantApi, 
  deleteTenantApi 
} from '@/lib/api/tenants';
import { toast } from 'react-toastify';

export const useTenants = () => {
  const queryClient = useQueryClient();
  const { id: landlordId, hasHydrated: userHydrated } = useUserStore();
  const { 
    addTenant: addToStore, 
    updateTenant: updateInStore,
    deleteTenant: deleteFromStore,
    hasHydrated: tenantsHydrated 
  } = useTenantStore();

  const queryKey = ['tenants', landlordId];

  const query = useQuery({
    queryKey,
    queryFn: () => fetchTenantsByLandlord(landlordId),
    enabled: userHydrated && tenantsHydrated && !!landlordId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const addMutation = useMutation({
    mutationFn: addTenantApi,
    onSuccess: (newTenant) => {
      addToStore(newTenant);
      queryClient.invalidateQueries({ queryKey });
      toast.success('Tenant added successfully!');
    },
    onError: () => {
      toast.error('Failed to add tenant.');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Tenant> }) => 
      updateTenantApi(id, data),
    onSuccess: (_, { id, data }) => {
      updateInStore(id, data);
      queryClient.invalidateQueries({ queryKey });
      toast.success('Tenant updated.');
    },
    onError: () => {
      toast.error('Failed to update tenant.');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTenantApi,
    onSuccess: (_, id) => {
      deleteFromStore(id);
      queryClient.invalidateQueries({ queryKey });
      toast.success('Tenant removed.');
    },
    onError: () => {
      toast.error('Failed to remove tenant.');
    }
  });

  return {
    tenants: query.data || [],
    isLoading: query.isLoading,
    isRefetching: query.isRefetching,
    addTenant: addMutation.mutate,
    isAdding: addMutation.isPending,
    updateTenant: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteTenant: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    refetch: query.refetch,
  };
};

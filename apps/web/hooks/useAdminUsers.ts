import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/api/apiClient';

export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  isActive: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useAdminUsers = (search?: string) => {
  const query = useQuery({
    queryKey: ['admin-users', search],
    queryFn: async () => {
      const { data } = await apiClient.get<AdminUser[]>(`/dashboard/admin/users`, {
        params: { search }
      });
      return data;
    }
  });

  return {
    users: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch
  };
};

export const useAdminUserActions = () => {
  const queryClient = useQueryClient();

  const deactivateMutation = useMutation({
    mutationFn: (userId: string) => apiClient.delete(`/dashboard/admin/users/${userId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] })
  });

  const activateMutation = useMutation({
    mutationFn: (userId: string) => apiClient.patch(`/dashboard/admin/users/${userId}/activate`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] })
  });

  return {
    deactivate: deactivateMutation.mutate,
    activate: activateMutation.mutate,
    isProcessing: deactivateMutation.isPending || activateMutation.isPending
  };
};

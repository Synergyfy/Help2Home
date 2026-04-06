import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api/apiClient';

export interface AuditLogEntry {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  performedBy: string;
  performedByName: string;
  meta: Record<string, any>;
  ipAddress: string;
  createdAt: string;
}

export const useAdminAudit = () => {
  const query = useQuery({
    queryKey: ['admin-audit-logs'],
    queryFn: async () => {
      const { data } = await apiClient.get<AuditLogEntry[]>(`/dashboard/admin/audit`);
      return data;
    }
  });

  return {
    logs: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch
  };
};

import { useQuery } from '@tanstack/react-query';
import apiClient from '@/lib/api/apiClient';

export interface AgentStats {
  totalCommission: string;
  totalCommissionTrend: string;
  activeLeads: string;
  activeLeadsTrend: string;
  propertiesSold: string;
  pendingClosings: string;
  activeListingsCount: string;
  maintenanceTasks: string;
  pendingMaintenance: string;
  scheduledInspections: string;
}

export interface AgentListing {
  id: string;
  title: string;
  address: string;
  status: string;
  views: number;
  price: string;
  images: string[];
}

export interface AgentLead {
  id: string;
  tenantName: string;
  propertyTitle: string;
  status: string;
  createdAt: string;
  type?: string; 
}

export const useAgentDashboard = (range: string = '30D') => {
  const statsQuery = useQuery({
    queryKey: ['agent-stats', range],
    queryFn: async () => {
      const { data } = await apiClient.get<AgentStats>(`/dashboard/agent/stats`, {
        params: { range }
      });
      return data;
    }
  });

  const listingsQuery = useQuery({
    queryKey: ['agent-listings-high-performance'],
    queryFn: async () => {
      // This endpoint specifically returns top 3 high-performance listings
      const { data } = await apiClient.get<AgentListing[]>(`/dashboard/agent/listings`);
      return data;
    }
  });

  const leadsQuery = useQuery({
    queryKey: ['agent-leads-recent'],
    queryFn: async () => {
      const { data } = await apiClient.get<AgentLead[]>(`/dashboard/agent/leads`);
      return data;
    }
  });

  const inspectionsQuery = useQuery({
    queryKey: ['agent-inspections-scheduled'],
    queryFn: async () => {
      const { data } = await apiClient.get<any[]>(`/dashboard/agent/inspections`);
      return data;
    }
  });

  return {
    stats: statsQuery.data,
    listings: listingsQuery.data || [],
    leads: leadsQuery.data || [],
    inspections: inspectionsQuery.data || [],
    isLoading: statsQuery.isLoading || listingsQuery.isLoading || leadsQuery.isLoading || inspectionsQuery.isLoading,
    isError: statsQuery.isError || listingsQuery.isError || leadsQuery.isError || inspectionsQuery.isError,
    refetch: () => {
      statsQuery.refetch();
      listingsQuery.refetch();
      leadsQuery.refetch();
      inspectionsQuery.refetch();
    }
  };
};

export const useAgentProperties = () => {
  const query = useQuery({
    queryKey: ['agent-properties-all'],
    queryFn: async () => {
      const { data } = await apiClient.get<AgentListing[]>(`/dashboard/agent/properties`);
      return data;
    }
  });

  return {
    properties: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch
  };
};


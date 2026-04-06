import apiClient from './apiClient';

export type MaintenanceStatus = 'Pending' | 'In Progress' | 'Resolved' | 'Cancelled' | 'Rejected';

export interface MaintenanceRequest {
    id: string;
    propertyId: string;
    propertyName: string;
    propertyAddress: string;
    tenantId: string;
    tenantName: string;
    tenantPhone: string;
    issueTitle: string;
    issueDescription: string;
    status: MaintenanceStatus;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    category: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
    cost?: number;
    assignedArtisanId?: string;
    artisanName?: string;
    rejectionReason?: string;
}

export const landlordMaintenanceApi = {
    getRequests: async (): Promise<MaintenanceRequest[]> => {
        const { data } = await apiClient.get(`/dashboard/landlord/maintenance`);
        return data;
    },

    updateStatus: async (
        id: string, 
        status: MaintenanceStatus, 
        reason?: string, 
        artisanId?: string,
        cost?: number
    ): Promise<MaintenanceRequest> => {
        const { data } = await apiClient.put(`/dashboard/landlord/maintenance/${id}/status`, 
            { status, reason, artisanId, cost }
        );
        return data;
    },

    getRequestDetails: async (id: string): Promise<MaintenanceRequest> => {
        const { data } = await apiClient.get(`/dashboard/landlord/maintenance/${id}`);
        return data;
    }
};

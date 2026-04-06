import apiClient from './apiClient';

export type MaintenanceStatus = 'Pending' | 'In Progress' | 'Resolved' | 'Cancelled' | 'Rejected';
export type MaintenancePriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface MaintenanceRequest {
    id: string;
    propertyId: string;
    propertyName: string;
    propertyAddress: string;
    tenantId: string;
    tenantName: string;
    tenantPhone: string;
    issueTitle: string; // Map to title in backend
    issueDescription: string; // Map to description in backend
    status: MaintenanceStatus;
    priority: MaintenancePriority;
    category: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
    cost?: number;
    assignedArtisanId?: string;
    artisanName?: string;
    rejectionReason?: string;
}

export const maintenanceApi = {
    getRequests: async (role: string): Promise<MaintenanceRequest[]> => {
        const { data } = await apiClient.get(`/dashboard/${role}/maintenance`);
        return data.map((req: any) => ({
            ...req,
            issueTitle: req.title || 'Untitled Request', // Handle mapping from backend title
            issueDescription: req.description,
            propertyName: req.property?.title || 'Unknown Property',
            propertyAddress: req.property?.address || '',
            tenantName: req.tenant?.fullName || 'Unknown Tenant',
            tenantPhone: req.tenant?.phone || '',
        }));
    },

    updateStatus: async (
        role: string,
        id: string, 
        status: MaintenanceStatus, 
        reason?: string, 
        artisanId?: string,
        cost?: number
    ): Promise<MaintenanceRequest> => {
        const { data } = await apiClient.put(`/dashboard/${role}/maintenance/${id}/status`, 
            { status, reason, artisanId, cost }
        );
        return data;
    },

    getRequestDetails: async (role: string, id: string): Promise<MaintenanceRequest> => {
        const { data } = await apiClient.get(`/dashboard/${role}/maintenance/${id}`);
        return {
            ...data,
            issueTitle: data.title || 'Untitled Request',
            issueDescription: data.description,
            propertyName: data.property?.title || 'Unknown Property',
            propertyAddress: data.property?.address || '',
            tenantName: data.tenant?.fullName || 'Unknown Tenant',
        };
    }
};

// For backward compatibility while refactoring
export const landlordMaintenanceApi = {
    getRequests: () => maintenanceApi.getRequests('landlord'),
    updateStatus: (id: string, status: MaintenanceStatus, reason?: string, artId?: string, cost?: number) => 
        maintenanceApi.updateStatus('landlord', id, status, reason, artId, cost),
    getRequestDetails: (id: string) => maintenanceApi.getRequestDetails('landlord', id)
};

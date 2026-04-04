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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const landlordMaintenanceApi = {
    getRequests: async (): Promise<MaintenanceRequest[]> => {
        const response = await fetch(`${API_URL}/dashboard/landlord/maintenance`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        if (!response.ok) throw new Error('Failed to fetch maintenance requests');
        return response.json();
    },

    updateStatus: async (
        id: string, 
        status: MaintenanceStatus, 
        reason?: string, 
        artisanId?: string,
        cost?: number
    ): Promise<MaintenanceRequest> => {
        const response = await fetch(`${API_URL}/dashboard/landlord/maintenance/${id}/status`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ status, reason, artisanId, cost })
        });
        if (!response.ok) throw new Error('Failed to update status');
        return response.json();
    },

    getRequestDetails: async (id: string): Promise<MaintenanceRequest> => {
        const response = await fetch(`${API_URL}/dashboard/landlord/maintenance/${id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        if (!response.ok) throw new Error('Failed to fetch request details');
        return response.json();
    }
};

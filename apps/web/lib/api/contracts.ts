export type ContractStatus = 'Draft' | 'Pending Signatures' | 'Partially Signed' | 'Signed' | 'Declined' | 'Expired';

export interface Signer {
    id: string;
    name: string;
    email: string;
    role: 'Tenant' | 'Landlord' | 'Agent';
    status: 'Pending' | 'Viewed' | 'Signed' | 'Declined';
    signedAt?: string;
    declinedReason?: string;
    signatureMethod?: 'typed' | 'uploaded';
    signatureContent?: string;
}

export interface ContractFields {
    startDate: string;
    endDate?: string;
    rentAmount: number;
    paymentFrequency: 'Monthly' | 'Quarterly' | 'Annually';
    depositAmount: number;
    noticePeriod: number;
    specialClauses?: string;
}

export interface Contract {
    id: string;
    propertyId: string;
    propertyTitle: string;
    propertyAddress: string;
    applicationId?: string;
    title: string;
    status: ContractStatus;
    signers: Signer[];
    fields: ContractFields;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    content?: string;
    previewUrl?: string;
    signedUrl?: string;
}

export interface ContractTemplate {
    id: string;
    name: string;
    description: string;
    content: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const landlordContractsApi = {
    getContracts: async (): Promise<Contract[]> => {
        const response = await fetch(`${API_URL}/dashboard/landlord/contracts`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        if (!response.ok) throw new Error('Failed to fetch contracts');
        return response.json();
    },

    getContractDetails: async (id: string): Promise<Contract> => {
        const response = await fetch(`${API_URL}/dashboard/landlord/contracts/${id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        if (!response.ok) throw new Error('Failed to fetch contract details');
        return response.json();
    },

    getTemplates: async (): Promise<ContractTemplate[]> => {
        const response = await fetch(`${API_URL}/dashboard/landlord/contracts/templates`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        if (!response.ok) throw new Error('Failed to fetch contract templates');
        return response.json();
    },

    createContract: async (data: Partial<Contract>): Promise<Contract> => {
        const response = await fetch(`${API_URL}/dashboard/landlord/contracts`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to create contract');
        return response.json();
    },

    updateStatus: async (id: string, status: string): Promise<Contract> => {
        const response = await fetch(`${API_URL}/dashboard/landlord/contracts/${id}/status`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ status })
        });
        if (!response.ok) throw new Error('Failed to update contract status');
        return response.json();
    }
};

import apiClient from './apiClient';

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

export const landlordContractsApi = {
    getContracts: async (): Promise<Contract[]> => {
        try {
            const { data } = await apiClient.get(`/dashboard/landlord/contracts`);
            return data;
        } catch (error) {
            console.error('Failed to fetch contracts:', error);
            throw error;
        }
    },

    getContractDetails: async (id: string): Promise<Contract> => {
        const { data } = await apiClient.get(`/dashboard/landlord/contracts/${id}`);
        return data;
    },

    getTemplates: async (): Promise<ContractTemplate[]> => {
        const { data } = await apiClient.get(`/dashboard/landlord/contracts/templates`);
        return data;
    },

    createContract: async (contractData: Partial<Contract>): Promise<Contract> => {
        const { data } = await apiClient.post(`/dashboard/landlord/contracts`, contractData);
        return data;
    },

    updateStatus: async (id: string, status: string): Promise<Contract> => {
        const { data } = await apiClient.put(`/dashboard/landlord/contracts/${id}/status`, { status });
        return data;
    }
};

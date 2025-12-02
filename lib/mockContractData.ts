import { subDays, addDays } from 'date-fns';

// --- Interfaces ---

export type ContractStatus = 'Draft' | 'Pending Signatures' | 'Partially Signed' | 'Signed' | 'Declined' | 'Expired';

export interface Signer {
    id: string;
    name: string;
    email: string;
    role: 'Tenant' | 'Landlord' | 'Agent';
    status: 'Pending' | 'Viewed' | 'Signed' | 'Declined';
    signedAt?: string;
    declinedReason?: string;
}

export interface ContractFields {
    startDate: string;
    endDate?: string;
    rentAmount: number;
    paymentFrequency: 'Monthly' | 'Quarterly' | 'Annually';
    depositAmount: number;
    noticePeriod: number; // in days
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
    previewUrl?: string; // Mock URL for PDF preview
    signedUrl?: string; // Mock URL for signed PDF
}

export interface ContractTemplate {
    id: string;
    name: string;
    description: string;
    content: string; // HTML or markdown content
}

// --- Mock Data ---

export const MOCK_CONTRACTS: Contract[] = [
    {
        id: 'cont_1',
        propertyId: 'prop_1',
        propertyTitle: 'Modern Apartment in Lekki',
        propertyAddress: '123 Admiralty Way, Lekki Phase 1, Lagos',
        applicationId: 'app_1',
        title: 'Tenancy Agreement - John Doe',
        status: 'Pending Signatures',
        signers: [
            {
                id: 'sig_1',
                name: 'John Doe',
                email: 'john@example.com',
                role: 'Tenant',
                status: 'Pending'
            },
            {
                id: 'sig_2',
                name: 'Landlord User',
                email: 'landlord@help2home.com',
                role: 'Landlord',
                status: 'Signed',
                signedAt: subDays(new Date(), 1).toISOString()
            }
        ],
        fields: {
            startDate: addDays(new Date(), 14).toISOString(),
            endDate: addDays(new Date(), 379).toISOString(), // 1 year
            rentAmount: 2500000,
            paymentFrequency: 'Monthly',
            depositAmount: 250000,
            noticePeriod: 30
        },
        createdAt: subDays(new Date(), 2).toISOString(),
        updatedAt: subDays(new Date(), 1).toISOString(),
        createdBy: 'Landlord User'
    },
    {
        id: 'cont_2',
        propertyId: 'prop_2',
        propertyTitle: 'Cozy Studio in Yaba',
        propertyAddress: '45 University Road, Yaba, Lagos',
        title: 'Tenancy Agreement - Jane Smith',
        status: 'Draft',
        signers: [
            {
                id: 'sig_3',
                name: 'Jane Smith',
                email: 'jane@example.com',
                role: 'Tenant',
                status: 'Pending'
            },
            {
                id: 'sig_4',
                name: 'Landlord User',
                email: 'landlord@help2home.com',
                role: 'Landlord',
                status: 'Pending'
            }
        ],
        fields: {
            startDate: addDays(new Date(), 7).toISOString(),
            rentAmount: 800000,
            paymentFrequency: 'Annually',
            depositAmount: 80000,
            noticePeriod: 60
        },
        createdAt: subDays(new Date(), 5).toISOString(),
        updatedAt: subDays(new Date(), 5).toISOString(),
        createdBy: 'Landlord User'
    },
    {
        id: 'cont_3',
        propertyId: 'prop_3',
        propertyTitle: 'Luxury Duplex in Ikoyi',
        propertyAddress: '10 Bourdillon Road, Ikoyi, Lagos',
        title: 'Tenancy Agreement - Michael Brown',
        status: 'Signed',
        signers: [
            {
                id: 'sig_5',
                name: 'Michael Brown',
                email: 'michael@example.com',
                role: 'Tenant',
                status: 'Signed',
                signedAt: subDays(new Date(), 10).toISOString()
            },
            {
                id: 'sig_6',
                name: 'Landlord User',
                email: 'landlord@help2home.com',
                role: 'Landlord',
                status: 'Signed',
                signedAt: subDays(new Date(), 12).toISOString()
            }
        ],
        fields: {
            startDate: subDays(new Date(), 30).toISOString(),
            rentAmount: 15000000,
            paymentFrequency: 'Annually',
            depositAmount: 1500000,
            noticePeriod: 90
        },
        createdAt: subDays(new Date(), 45).toISOString(),
        updatedAt: subDays(new Date(), 10).toISOString(),
        createdBy: 'Landlord User',
        signedUrl: '#'
    }
];

export const MOCK_TEMPLATES: ContractTemplate[] = [
    {
        id: 'temp_1',
        name: 'Standard Residential Tenancy',
        description: 'Standard agreement for residential properties in Lagos.',
        content: '...'
    },
    {
        id: 'temp_2',
        name: 'Short-let Agreement',
        description: 'For short-term rentals less than 6 months.',
        content: '...'
    }
];

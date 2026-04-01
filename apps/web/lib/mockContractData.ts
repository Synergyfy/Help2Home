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
    signatureMethod?: 'typed' | 'uploaded';
    signatureContent?: string; // Stores typed name or a placeholder for uploaded image
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
    content?: string; // Final legal text
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
        content: `
# TENANCY AGREEMENT

**THIS AGREEMENT** is made on {{today_date}}

**BETWEEN:**
**LANDLORD:** {{landlord_name}} of {{landlord_address}} (hereinafter called "the Landlord") of the one part.
**AND**
**TENANT:** {{tenant_name}} of {{tenant_phone}} (hereinafter called "the Tenant") of the other part.

**WHEREAS:**
1. The Landlord is the owner of the property situated at **{{property_address}}** (hereinafter called "the Premises").
2. The Landlord has agreed to let and the Tenant has agreed to take the Premises for a period of {{lease_duration}} commencing from **{{start_date}}**.

**IT IS HEREBY AGREED AS FOLLOWS:**
1. **RENT:** The rent shall be **₦{{rent_amount}}** per {{payment_frequency}}, payable in advance.
2. **SECURITY DEPOSIT:** The Tenant shall pay the sum of **₦{{deposit_amount}}** as security deposit against damages.
3. **NOTICE PERIOD:** Either party may terminate this agreement by giving **{{notice_period}} days** notice in writing.
4. **UTILITIES:** The Tenant shall be responsible for payment of all utility bills including electricity, water, and waste management.

**SPECIAL CLAUSES:**
{{special_clauses}}

SIGNED BY THE LANDLORD: ____________________
SIGNED BY THE TENANT: ____________________
`
    },
    {
        id: 'temp_2',
        name: 'Short-let & Vacation Rental',
        description: 'Simplified agreement for short-term stays and holiday rentals.',
        content: `
# SHORT-LET RENTAL AGREEMENT

**PROPERTY:** {{property_address}}
**GUEST:** {{tenant_name}}
**START DATE:** {{start_date}}
**END DATE:** {{end_date}}

**RENTAL TERMS:**
- Total Rent: ₦{{rent_amount}}
- Security Deposit: ₦{{deposit_amount}}
- Check-in Time: 2:00 PM
- Check-out Time: 11:00 AM

**HOUSE RULES:**
1. No smoking inside the premises.
2. No loud parties or events without prior approval.
3. Maximum occupancy: {{max_occupants}} persons.

SIGNED: ____________________
`
    }
];

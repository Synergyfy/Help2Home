export interface PaymentTransaction {
    id: string;
    date: string;
    property: {
        id: string;
        name: string;
        address: string;
    };
    tenant: {
        name: string;
        avatarUrl?: string;
        email: string;
    };
    amount: number;
    method: 'Bank Transfer' | 'Debit Card' | 'Wallet' | 'Cash';
    status: 'Cleared' | 'Pending' | 'Failed';
    referenceId: string;
    fees: {
        platformFee: number;
        processingFee: number;
        commission?: number;
        penalty?: number;
    };
    netAmount: number;
    payoutStatus: 'Paid out' | 'Scheduled' | 'Pending';
    contract: {
        id: string;
        name: string;
        startDate: string;
        endDate: string;
    };
}

export interface PayoutTransaction {
    id: string;
    date: string;
    referenceId: string;
    amount: number;
    method: 'Bank Transfer' | 'Instant Payout';
    status: 'Success' | 'Processing' | 'Failed';
    failureReason?: string;
    deductions: {
        label: string;
        amount: number;
    }[];
    includedPayments: string[]; // IDs of included payments
    destinationAccount: {
        bankName: string;
        accountNumber: string;
    };
}

export interface BankAccount {
    id: string;
    accountName: string;
    bankName: string;
    accountNumber: string;
    bvnLast4: string;
    status: 'Verified' | 'Pending' | 'Failed';
    isPrimary: boolean;
}

export interface PayoutSettings {
    frequency: 'Instant' | 'Weekly' | 'Monthly';
    minThreshold: number;
    bankAccounts: BankAccount[];
}

export const MOCK_PAYMENTS: PaymentTransaction[] = [
    {
        id: 'pay_1',
        date: '2023-10-24T14:30:00Z',
        property: { id: 'prop_1', name: 'Modern 2-Bedroom Apartment', address: '12 Admiralty Way, Lekki' },
        tenant: { name: 'Jane Doe', email: 'jane@example.com' },
        amount: 1200000,
        method: 'Bank Transfer',
        status: 'Cleared',
        referenceId: 'REF-1023-889',
        fees: { platformFee: 12000, processingFee: 5000 },
        netAmount: 1183000,
        payoutStatus: 'Paid out',
        contract: { id: 'cont_1', name: 'Annual Lease 2023', startDate: '2023-01-01', endDate: '2023-12-31' }
    },
    {
        id: 'pay_2',
        date: '2023-10-23T09:15:00Z',
        property: { id: 'prop_2', name: 'Cozy Studio in Yaba', address: '45 Herbert Macaulay Way' },
        tenant: { name: 'John Smith', email: 'john@example.com' },
        amount: 800000,
        method: 'Debit Card',
        status: 'Pending',
        referenceId: 'REF-1023-990',
        fees: { platformFee: 8000, processingFee: 12000 }, // Higher processing for card
        netAmount: 780000,
        payoutStatus: 'Pending',
        contract: { id: 'cont_2', name: '6-Month Lease', startDate: '2023-06-01', endDate: '2023-12-01' }
    },
    {
        id: 'pay_3',
        date: '2023-10-20T11:00:00Z',
        property: { id: 'prop_3', name: 'Luxury 4-Bedroom House', address: '5 Banana Island Rd' },
        tenant: { name: 'Mike Johnson', email: 'mike@example.com' },
        amount: 4500000,
        method: 'Bank Transfer',
        status: 'Failed',
        referenceId: 'REF-1023-777',
        fees: { platformFee: 45000, processingFee: 5000 },
        netAmount: 4450000,
        payoutStatus: 'Pending',
        contract: { id: 'cont_3', name: '2-Year Lease', startDate: '2023-01-01', endDate: '2024-12-31' }
    }
];

export const MOCK_PAYOUTS: PayoutTransaction[] = [
    {
        id: 'payout_1',
        date: '2023-10-25T10:00:00Z',
        referenceId: 'PO-8821',
        amount: 1183000,
        method: 'Bank Transfer',
        status: 'Success',
        deductions: [],
        includedPayments: ['pay_1'],
        destinationAccount: { bankName: 'GTBank', accountNumber: '****1234' }
    },
    {
        id: 'payout_2',
        date: '2023-10-18T10:00:00Z',
        referenceId: 'PO-8810',
        amount: 450000,
        method: 'Instant Payout',
        status: 'Processing',
        deductions: [{ label: 'Instant Payout Fee', amount: 500 }],
        includedPayments: [],
        destinationAccount: { bankName: 'GTBank', accountNumber: '****1234' }
    }
];

export const MOCK_PAYOUT_SETTINGS: PayoutSettings = {
    frequency: 'Weekly',
    minThreshold: 50000,
    bankAccounts: [
        { id: 'ba_1', accountName: 'Lagos Properties Ltd', bankName: 'GTBank', accountNumber: '0123456789', bvnLast4: '1234', status: 'Verified', isPrimary: true },
        { id: 'ba_2', accountName: 'Tunde Bakare', bankName: 'Zenith Bank', accountNumber: '9876543210', bvnLast4: '5678', status: 'Pending', isPrimary: false }
    ]
};

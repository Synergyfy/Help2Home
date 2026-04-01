export interface RepaymentInstallment {
    dueDate: string;
    amount: number;
    fees: number;
    status: 'Pending' | 'Paid' | 'Overdue';
}

export interface BankLoanApplication {
    id: string;
    tenantName: string;
    propertyTitle: string;
    propertyImage: string;
    propertyAddress: string;
    requestedAmount: number;
    termMonths: number;
    status: 'New' | 'In review' | 'Approved' | 'Rejected' | 'Disbursed';
    creditScore: number;
    assignedOfficer: string;
    receivedDate: string;
    tenantDetails: {
        dob: string;
        phone: string;
        email: string;
        kycStatus: 'Verified' | 'Pending' | 'Flagged';
    };
    documents: {
        id: string;
        name: string;
        type: string;
        uploadedDate: string;
        status: 'Verified' | 'Pending' | 'Rejected';
        url: string;
    }[];
    creditRisk: {
        reportDate: string;
        redFlags: string[];
        recommendation: 'Approve' | 'Manual Review' | 'Reject';
        debtToIncomeRatio: number;
        monthlyExpenses: number;
    };
    repaymentSchedule: RepaymentInstallment[];
}

export const MOCK_BANK_APPLICATIONS: BankLoanApplication[] = [
    {
        id: 'APP-1001',
        tenantName: 'Oluwaseun Adeyemi',
        propertyTitle: 'Luxury 3 Bedroom Flat',
        propertyImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
        propertyAddress: 'Lekki Phase 1, Lagos',
        requestedAmount: 3500000,
        termMonths: 12,
        status: 'New',
        creditScore: 720,
        assignedOfficer: 'Unassigned',
        receivedDate: '2026-02-18T10:30:00Z',
        tenantDetails: {
            dob: '1990-05-15',
            phone: '+234 801 234 5678',
            email: 'seun.ade@example.com',
            kycStatus: 'Verified'
        },
        documents: [
            { id: 'DOC-01', name: 'Identity Card', type: 'ID', uploadedDate: '2026-02-18', status: 'Verified', url: '#' },
            { id: 'DOC-02', name: '3 Months Payslip', type: 'Finance', uploadedDate: '2026-02-18', status: 'Pending', url: '#' }
        ],
        creditRisk: {
            reportDate: '2026-02-18',
            redFlags: ['No significant red flags'],
            recommendation: 'Approve',
            debtToIncomeRatio: 22,
            monthlyExpenses: 120000
        },
        repaymentSchedule: [
            { dueDate: '2026-03-01', amount: 291666, fees: 5000, status: 'Pending' },
            { dueDate: '2026-04-01', amount: 291666, fees: 5000, status: 'Pending' }
        ]
    },
    {
        id: 'APP-1002',
        tenantName: 'Chioma Okoro',
        propertyTitle: 'Modern Studio Apartment',
        propertyImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        propertyAddress: 'Yaba, Lagos',
        requestedAmount: 1200000,
        termMonths: 6,
        status: 'In review',
        creditScore: 680,
        assignedOfficer: 'John Doe',
        receivedDate: '2026-02-17T14:45:00Z',
        tenantDetails: {
            dob: '1994-11-20',
            phone: '+234 802 345 6789',
            email: 'chioma.o@example.com',
            kycStatus: 'Verified'
        },
        documents: [
            { id: 'DOC-03', name: 'Identity Card', type: 'ID', uploadedDate: '2026-02-17', status: 'Verified', url: '#' }
        ],
        creditRisk: {
            reportDate: '2026-02-17',
            redFlags: ['Recent credit card application'],
            recommendation: 'Manual Review',
            debtToIncomeRatio: 35,
            monthlyExpenses: 85000
        },
        repaymentSchedule: []
    },
    {
        id: 'APP-1003',
        tenantName: 'Ibrahim Musa',
        propertyTitle: '2 Bedroom Terraced House',
        propertyImage: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09',
        propertyAddress: 'Gwarinpa, Abuja',
        requestedAmount: 2800000,
        termMonths: 12,
        status: 'Approved',
        creditScore: 750,
        assignedOfficer: 'Jane Smith',
        receivedDate: '2026-02-15T09:00:00Z',
        tenantDetails: {
            dob: '1988-03-10',
            phone: '+234 803 456 7890',
            email: 'i.musa@example.com',
            kycStatus: 'Verified'
        },
        documents: [
            { id: 'DOC-04', name: 'Passport', type: 'ID', uploadedDate: '2026-02-15', status: 'Verified', url: '#' }
        ],
        creditRisk: {
            reportDate: '2026-02-15',
            redFlags: [],
            recommendation: 'Approve',
            debtToIncomeRatio: 18,
            monthlyExpenses: 150000
        },
        repaymentSchedule: [
            { dueDate: '2026-03-15', amount: 233333, fees: 4500, status: 'Pending' }
        ]
    }
];

export const MOCK_BANK_STATS = {
    totalOutstanding: 125000000,
    newApplications24h: 12,
    approvalsToday: 5,
    delinquencyRate: 2.4,
    disbursedThisMonth: 45000000
};

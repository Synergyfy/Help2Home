export interface SummaryTileData {
    id: string;
    label: string;
    value: string | number;
    subtitle: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    status?: 'critical' | 'warning' | 'good' | 'neutral';
    link: string;
}

export interface ActivityItem {
    id: string;
    type: 'application' | 'payment' | 'contract' | 'document' | 'maintenance';
    message: string;
    timestamp: string;
    read: boolean;
    link: string;
}

export interface TaskItem {
    id: string;
    title: string;
    property: string;
    dueDate?: string;
    priority: 'High' | 'Medium' | 'Low';
    actionLabel: string;
    link: string;
}

export interface PaymentItem {
    id: string;
    date: string;
    property: string;
    tenant: string;
    amount: number;
    status: 'Cleared' | 'Pending' | 'Failed';
}

export interface VerificationItem {
    id: string;
    label: string;
    status: 'verified' | 'pending' | 'rejected' | 'missing';
    date?: string;
}

export interface ProfileData {
    id: string;
    displayName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    businessName: string;
    payoutFrequency: 'Instant' | 'Weekly' | 'Monthly';
    currency: string;
    address: string;
    timezone: string;
    avatarUrl: string;
    role: 'Landlord' | 'Agent' | 'Caretaker';
    verificationStatus: 'verified' | 'pending' | 'not_verified' | 'rejected';
    verificationDate?: string;
}

export interface VerificationDocument {
    id: string;
    type: 'ID' | 'Ownership' | 'License' | 'Other';
    label: string;
    filename?: string;
    status: 'pending' | 'approved' | 'rejected' | 'missing';
    uploadedAt?: string;
    rejectionReason?: string;
}

export interface BankAccount {
    id: string;
    bankName: string;
    accountNumber: string; // Masked
    accountHolder: string;
    type: 'Savings' | 'Current';
    country: string;
    isPrimary: boolean;
    status: 'verified' | 'pending' | 'rejected';
}

export const MOCK_PROFILE: ProfileData = {
    id: 'u1',
    displayName: 'Lagos Properties Ltd',
    firstName: 'Tunde',
    lastName: 'Bakare',
    email: 'tunde@lagosproperties.com',
    phone: '+234 801 234 5678',
    businessName: 'Lagos Properties Ltd',
    payoutFrequency: 'Weekly',
    currency: 'NGN',
    address: '15 Adeola Odeku St, Victoria Island, Lagos',
    timezone: 'Africa/Lagos',
    avatarUrl: '', // Empty for placeholder
    role: 'Landlord',
    verificationStatus: 'verified',
    verificationDate: 'Oct 15, 2023'
};

export const MOCK_DOCUMENTS_LANDLORD: VerificationDocument[] = [
    { id: 'd1', type: 'ID', label: 'Government Issued ID', filename: 'passport_scan.jpg', status: 'approved', uploadedAt: 'Oct 10, 2023' },
    { id: 'd2', type: 'Ownership', label: 'Proof of Property Ownership', filename: 'title_deed_15b.pdf', status: 'approved', uploadedAt: 'Oct 12, 2023' },
    { id: 'd4', type: 'Other', label: 'Utility Bill / Proof of Address', status: 'missing' },
];

export const MOCK_DOCUMENTS_DEVELOPER: VerificationDocument[] = [
    { id: 'dev1', type: 'License', label: 'CAC Registration Certificate', status: 'pending', uploadedAt: 'Jan 15, 2024' },
    { id: 'dev2', type: 'Other', label: 'Company Profile & Track Record', status: 'approved', uploadedAt: 'Jan 10, 2024' },
    { id: 'dev3', type: 'ID', label: 'Director Government ID', status: 'approved', uploadedAt: 'Jan 12, 2024' },
];

export const MOCK_DOCUMENTS_INVESTOR: VerificationDocument[] = [
    { id: 'inv1', type: 'ID', label: 'KYC Verification (ID)', status: 'approved', uploadedAt: 'Dec 05, 2023' },
    { id: 'inv2', type: 'Other', label: 'Proof of Funds / Bank Statement', status: 'pending', uploadedAt: 'Jan 18, 2024' },
    { id: 'inv3', type: 'Other', label: 'Accreditation Status (Optional)', status: 'missing' },
];

export const MOCK_DOCUMENTS_AGENT: VerificationDocument[] = [
    { id: 'ag1', type: 'ID', label: 'Government Issued ID', status: 'approved', uploadedAt: 'Nov 20, 2023' },
    { id: 'ag2', type: 'License', label: 'Agency License / Certification', status: 'missing' },
    { id: 'ag3', type: 'Other', label: 'Company Authorization Letter', status: 'approved', uploadedAt: 'Nov 22, 2023' },
];

export const MOCK_DOCUMENTS_TENANT: VerificationDocument[] = [
    { id: 'ten3', type: 'Other', label: 'Proof of Address', status: 'missing' },
];

export const MOCK_DOCUMENTS = MOCK_DOCUMENTS_LANDLORD;


export const MOCK_BANK_ACCOUNTS: BankAccount[] = [
    { id: 'b1', bankName: 'GTBank', accountNumber: '****1234', accountHolder: 'Lagos Properties Ltd', type: 'Current', country: 'Nigeria', isPrimary: true, status: 'verified' },
    { id: 'b2', bankName: 'Zenith Bank', accountNumber: '****5678', accountHolder: 'Tunde Bakare', type: 'Savings', country: 'Nigeria', isPrimary: false, status: 'pending' },
];

export const MOCK_SUMMARY_TILES: SummaryTileData[] = [
    { id: 'properties', label: 'Total properties', value: 12, subtitle: 'Listed properties', link: '/dashboard/landlord/properties' },
    { id: 'applications', label: 'Pending applications', value: 3, subtitle: 'Needs review', status: 'warning', link: '/dashboard/landlord/applications?status=pending' },
    { id: 'tenants', label: 'Active tenants', value: 10, subtitle: 'Current tenants', link: '/dashboard/landlord/tenants' },
    { id: 'payouts', label: 'Recent payouts', value: '₦450,000', subtitle: 'Net payouts — 30 days', link: '/dashboard/landlord/payouts' },
    { id: 'maintenance', label: 'Open maintenance', value: 2, subtitle: 'Awaiting action', status: 'critical', link: '/dashboard/landlord/maintenance' },
];

export const MOCK_ACTIVITY: ActivityItem[] = [
    { id: '1', type: 'application', message: 'New application from Jane Doe for 15B Bourdillon St.', timestamp: '2 hours ago', read: false, link: '#' },
    { id: '2', type: 'payment', message: '₦120,000 received from John K. for Apt 2A', timestamp: '5 hours ago', read: true, link: '#' },
    { id: '3', type: 'contract', message: 'Lease signed for 10C Akerele Rd', timestamp: '1 day ago', read: true, link: '#' },
    { id: '4', type: 'document', message: 'Proof of ownership approved', timestamp: '2 days ago', read: true, link: '#' },
    { id: '5', type: 'maintenance', message: 'Leaky tap reported at Apt 1B', timestamp: '2 days ago', read: true, link: '#' },
];

export const MOCK_TASKS: TaskItem[] = [
    { id: '1', title: 'Review 3 pending applications', property: 'Multiple', priority: 'High', actionLabel: 'Review', link: '/dashboard/landlord/applications' },
    { id: '2', title: 'Verify ID document', property: 'Account', priority: 'Medium', actionLabel: 'Verify', link: '/dashboard/landlord/profile' },
    { id: '3', title: 'Approve maintenance request', property: 'Apt 1B', dueDate: 'Today', priority: 'High', actionLabel: 'Approve', link: '/dashboard/landlord/maintenance' },
];

export const MOCK_PAYMENTS: PaymentItem[] = [
    { id: '1', date: 'Oct 24', property: '15B Bourdillon St', tenant: 'Jane Doe', amount: 120000, status: 'Cleared' },
    { id: '2', date: 'Oct 23', property: 'Apt 2A', tenant: 'John K.', amount: 85000, status: 'Pending' },
    { id: '3', date: 'Oct 20', property: '10C Akerele Rd', tenant: 'Mike S.', amount: 200000, status: 'Cleared' },
    { id: '4', date: 'Oct 18', property: 'Apt 1B', tenant: 'Sarah L.', amount: 45000, status: 'Failed' },
];

export const MOCK_VERIFICATION: VerificationItem[] = [
    { id: 'id', label: 'ID uploaded', status: 'verified', date: 'Oct 10, 2023' },
    { id: 'ownership', label: 'Proof of ownership', status: 'verified' },
    { id: 'bank', label: 'Bank details added', status: 'verified' },
    { id: 'license', label: 'Agency license', status: 'missing' }, 
];

export interface Tenant {
    id: string;
    name: string;
    email: string;
    phone: string;
    propertyId: string;
    propertyName: string;
    status: 'Active' | 'Past' | 'Evicted';
    rentAmount: number;
    leaseStart: string;
    leaseEnd: string;
    paymentStatus: 'Up to date' | 'Late' | 'Pending';
    avatarUrl?: string;
    details?: {
        employmentStatus: string;
        employerName: string;
        monthlySalary: string;
        guarantor?: {
            name: string;
            phone: string;
            relationship: string;
            email: string;
        };
        documents?: {
            id: string;
            type: string;
            name: string;
            status: string;
            fileUrl?: string;
        }[];
        notes?: string;
    };
}

export const MOCK_TENANTS: Tenant[] = [
    {
        id: 't1',
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        phone: '+234 801 111 2222',
        propertyId: '1',
        propertyName: 'The Glass House - 5 Bed Detached',
        status: 'Active',
        rentAmount: 1500000,
        leaseStart: '2023-01-01',
        leaseEnd: '2024-01-01',
        paymentStatus: 'Up to date'
    },
    {
        id: 't2',
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '+234 802 222 3333',
        propertyId: '3',
        propertyName: '3 Bedroom Modern Terrace',
        status: 'Active',
        rentAmount: 375000,
        leaseStart: '2023-06-01',
        leaseEnd: '2024-06-01',
        paymentStatus: 'Late'
    },
    {
        id: 't3',
        name: 'Michael Brown',
        email: 'mike.brown@example.com',
        phone: '+234 803 333 4444',
        propertyId: '5',
        propertyName: 'VI Executive Staff Quarters',
        status: 'Past',
        rentAmount: 2900000,
        leaseStart: '2022-01-01',
        leaseEnd: '2023-01-01',
        paymentStatus: 'Up to date'
    },
    {
        id: 't4',
        name: 'Sarah Connor',
        email: 'sarah.c@example.com',
        phone: '+234 804 444 5555',
        propertyId: '6',
        propertyName: 'The Penthouse Short-Let',
        status: 'Active',
        rentAmount: 4000000,
        leaseStart: '2023-09-01',
        leaseEnd: '2024-09-01',
        paymentStatus: 'Up to date'
    },
    {
        id: 't5',
        name: 'David Wilson',
        email: 'david.w@example.com',
        phone: '+234 805 555 6666',
        propertyId: '2',
        propertyName: 'Apex Corporate Plaza',
        status: 'Active',
        rentAmount: 500000,
        leaseStart: '2023-03-15',
        leaseEnd: '2025-03-15',
        paymentStatus: 'Pending'
    }
];

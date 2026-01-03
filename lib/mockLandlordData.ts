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

export const MOCK_DOCUMENTS: VerificationDocument[] = [
    { id: 'd1', type: 'ID', label: 'Upload ID', filename: 'passport_scan.jpg', status: 'approved', uploadedAt: 'Oct 10, 2023' },
    { id: 'd2', type: 'Ownership', label: 'Proof of ownership', filename: 'title_deed_15b.pdf', status: 'approved', uploadedAt: 'Oct 12, 2023' },
    { id: 'd3', type: 'License', label: 'Upload agency license', status: 'missing' },
];

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


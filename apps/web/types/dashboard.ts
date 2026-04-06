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

export interface Lease {
    id: string;
    propertyId: string;
    startDate: string;
    endDate: string;
    rentAmount: number;
    paymentFrequency: 'Monthly' | 'Quarterly' | 'Annually';
    depositAmount: number;
    status: 'Active' | 'Pending' | 'Expired';
    documentUrl?: string;
}

export interface Tenant {
    id: string; // Local/System ID
    tenantId?: string; // App-specific ID (e.g. T-123456)
    name: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phone: string;
    propertyId: string;
    propertyName: string;
    status: 'Active' | 'Delinquent' | 'Pending' | 'Past' | 'Evicted';
    monthlyRentAmount: number;
    dateLeaseStart: string;
    leaseEnd?: string;
    paymentStatus: 'Up to date' | 'Late' | 'Pending';
    onTimePaymentRate?: number;
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
    profileImage?: string;
}

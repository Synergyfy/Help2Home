export type ApplicationStatus = 'Submitted' | 'Pending' | 'Under Review' | 'Bank Approval' | 'Funded' | 'Active' | 'Completed' | 'Rejected' | 'Approved' | 'Draft';

export interface TimelineStep {
    id: string;
    title: string;
    status: 'Completed' | 'In Progress' | 'Pending' | 'Blocked' | 'Rejected';
    responsibleParty: 'Help2Home' | 'Bank' | 'Landlord' | 'Tenant';
    timestamp?: string;
    notes?: string;
    actionLabel?: string;
    onAction?: () => void;
}

export interface ApplicationDocument {
    id: string;
    type: string;
    name: string;
    status: 'Pending' | 'In Review' | 'Verified' | 'Rejected';
    fileUrl?: string;
    rejectionReason?: string;
    size?: string;
    uploadDate?: string;
}

export interface ContractDetails {
    id: string;
    applicationId: string;
    name: string;
    parties: string[];
    rentAmount: number;
    tenure: string;
    monthlyPayment: number;
    isSigned: boolean;
    signedDate?: string;
    pdfUrl: string;
}

export interface RepaymentSchedule {
    nextDueDate: string;
    nextAmount: number;
    totalPaid: number;
    status: 'Paid' | 'Overdue' | 'Upcoming';
}

export interface ActivityLogItem {
    id: string;
    event: string;
    actor: string;
    timestamp: string;
    type: 'status' | 'document' | 'contract' | 'payment' | 'info';
}

export interface ApplicationDetails {
    id: string;
    propertyId: string;
    propertyName: string;
    propertyAddress: string;
    propertyImage: string;
    landlordName: string;
    currentStatus: ApplicationStatus;
    progressPercent: number;
    lastUpdated: string;
    timeline: TimelineStep[];
    documents: ApplicationDocument[];
    contract?: ContractDetails;
    repayment?: RepaymentSchedule;
    activityLog: ActivityLogItem[];
    financials: {
        downPayment: number;
        duration: number;
        monthlyPayment: number;
        totalPayable: number;
    };
}

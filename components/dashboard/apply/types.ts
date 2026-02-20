export interface PropertyDetails {
    id: string;
    name: string;
    location: string;
    rentPrice: number;
    paymentOption: 'Outright' | 'Installment';
    startDate?: string;
    landlordName: string;
    image: string;
}

export interface InstallmentPlan {
    downPaymentPercent: number;
    downPaymentAmount: number;
    repaymentDuration: number; // months
    monthlyRepayment: number;
    totalPayable: number;
    interestRate: number; // percentage
    serviceFee: number;
}

export interface ApplicationData {
    propertyId: string;
    financing: {
        downPaymentPercent: number;
        repaymentDuration: number;
        acceptedTerms: boolean;
        hasMarketplaceConsent?: boolean;
        hasDirectDebitAuth?: boolean;
    };
    tenantInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        employmentStatus: string;
        employerName: string;
        monthlySalary: string;
    };
    guarantor: {
        name: string;
        phone: string;
        relationship: string;
        email: string;
    };
    notes: string;
    documents: ApplicationDocument[];
}

export interface ApplicationDocument {
    id: string;
    type: string;
    name: string;
    status: 'Pending' | 'Uploaded' | 'Rejected';
    file?: File;
    fileUrl?: string;
    size?: number;
}

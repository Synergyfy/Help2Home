export interface ContractSigner {
    id: string;
    name: string;
    role: 'Tenant' | 'Landlord' | 'Help2Home' | 'Bank';
    status: 'Pending' | 'Signed';
    signedAt?: string;
    canSign: boolean;
}

export interface ContractData {
    id: string;
    title: string;
    applicationId: string;
    propertyTitle: string;
    propertyAddress: string;
    summary: {
        rentAmount: number;
        contractType: string;
        tenure: string;
        monthlyRepayment: number;
        downPayment: number;
        interestRate: number;
        penalty: string;
        startDate: string;
        nextPayment: string;
    };
    pdfUrl: string;
    fileSize: string;
    lastUpdated: string;
    signers: ContractSigner[];
    audit: {
        createdDate: string;
        version: string;
        lastModifiedBy: string;
    };
}

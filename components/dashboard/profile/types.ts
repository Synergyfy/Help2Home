export interface ProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    maritalStatus: string;
    address: string;
    state: string;
    image: string;
}

export interface EmploymentData {
    status: string;
    employerName: string;
    jobTitle: string;
    salary: string;
    type: string;
    startDate: string;
    contact: string;
    organizationId?: string;
    companyName?: string;
}

export interface Guarantor {
    id: string;
    name: string;
    phone: string;
    relationship: string;
    email?: string;
    notes?: string;
    status: 'Contacted' | 'Verified' | 'Rejected';
}

export interface DocumentItem {
    id: string;
    type: 'NIN' | 'BVN' | 'Government ID' | 'Bank Statement' | 'Proof of Address';
    name: string;
    status: 'Pending' | 'In Review' | 'Verified' | 'Rejected';
    fileUrl?: string;
    rejectionReason?: string;
}

import { Role } from "@/store/userStore";

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export interface VerificationRequirement {
    id: string;
    label: string;
    description: string;
    type: 'file' | 'text' | 'phone';
    category: 'identity' | 'business' | 'address';
}

export const VERIFICATION_REQUIREMENTS: Record<Role, VerificationRequirement[]> = {
    landlord: [
        { id: 'gov_id', label: 'Government ID', description: 'NIN, International Passport, or Drivers License', type: 'file', category: 'identity' },
        { id: 'cac_doc', label: 'Business Registration (Optional)', description: 'CAC documents if managing as a company', type: 'file', category: 'business' },
        { id: 'utility_bill', label: 'Proof of Address', description: 'Recent utility bill (not older than 3 months)', type: 'file', category: 'address' }
    ],
    agent: [
        { id: 'gov_id', label: 'Government ID', description: 'NIN, International Passport, or Drivers License', type: 'file', category: 'identity' },
        { id: 'agent_license', label: 'Professional License', description: 'Real Estate regulatory body license/certificate', type: 'file', category: 'business' },
        { id: 'office_address', label: 'Office Address Verification', description: 'Utility bill or lease agreement for office', type: 'file', category: 'address' }
    ],
    caretaker: [
        { id: 'gov_id', label: 'Government ID', description: 'NIN, International Passport, or Drivers License', type: 'file', category: 'identity' },
        { id: 'phone_v', label: 'Phone Verification', description: 'Verified phone number via OTP', type: 'phone', category: 'identity' }
    ],
    tenant: [
        { id: 'gov_id', label: 'Government ID', description: 'NIN, International Passport, or Drivers License', type: 'file', category: 'identity' },
        { id: 'employment_letter', label: 'Letter of Employment', description: 'Proof of current employment or income', type: 'file', category: 'business' }
    ],
    investor: [
        { id: 'gov_id', label: 'Government ID', description: 'NIN, International Passport, or Drivers License', type: 'file', category: 'identity' },
        { id: 'investor_accreditation', label: 'Accreditation Proof', description: 'Proof of investor status or net worth', type: 'file', category: 'business' }
    ],
    developer: [
        { id: 'gov_id', label: 'Government ID', description: 'NIN, International Passport, or Drivers License', type: 'file', category: 'identity' },
        { id: 'cac_doc', label: 'Business Registration', description: 'CAC documents (Form CAC 7 & 2)', type: 'file', category: 'business' },
        { id: 'portfolio_proof', label: 'Portfolio Proof', description: 'Evidence of previous/current development projects', type: 'file', category: 'business' }
    ],
    admin: [],
    superAdmin: []
};

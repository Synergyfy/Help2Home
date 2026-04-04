import axios from 'axios';
import { useUserStore } from '@/store/userStore';

export interface PaymentTransaction {
    id: string;
    date: string;
    propertyId: string;
    property?: {
        id: string;
        title: string;
        address: string;
    };
    tenantId: string;
    tenant?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    tenantName?: string; // Fallback
    propertyName?: string; // Fallback
    amount: number;
    method: string;
    status: 'Completed' | 'Cleared' | 'Pending' | 'Failed';
    referenceId: string;
    transactionId?: string; // Alias for ref if needed
    fees?: {
        platformFee: number;
        processingFee: number;
        commission?: number;
        penalty?: number;
    };
    netAmount?: number;
    payoutStatus?: string;
    contract?: {
        id: string;
        name: string;
        startDate: string;
        endDate: string;
    };
}

export interface BankAccount {
    id: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    bvnLast4: string;
    isPrimary: boolean;
}

export interface PayoutSettings {
    frequency: 'Instant' | 'Weekly' | 'Monthly';
    bankAccounts: BankAccount[];
    autoPayout: boolean;
    notifications: {
        email: boolean;
        sms: boolean;
    };
}

export interface PayoutTransaction {
    id: string;
    date: string;
    amount: number;
    status: 'Completed' | 'Processing' | 'Success' | 'Failed';
    reference: string;
    referenceId?: string;
    bankAccount?: string;
    method?: string;
    destinationAccount?: {
        bankName: string;
        accountNumber: string;
    };
    deductions?: {
        label: string;
        amount: number;
    }[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const getAuthHeader = () => {
    const token = useUserStore.getState().token;
    return { Authorization: `Bearer ${token}` };
};

export const getPaymentData = async () => {
    const { data } = await axios.get(`${API_URL}/dashboard/tenant/payments`, {
        headers: getAuthHeader()
    });
    
    // Map backend transactions to frontend history format
    const history = data.map((t: any) => ({
        id: t.id,
        type: t.paymentMethod === 'Down Payment' ? 'Down Payment' : 'Installment',
        amount: Number(t.amount),
        date: new Date(t.createdAt).toLocaleDateString(),
        status: t.status === 'Completed' ? 'Success' : t.status
    }));

    // Find the down payment (if any)
    const downPaymentRecord = data.find((t: any) => t.paymentMethod === 'Down Payment');

    return {
        history,
        downPayment: downPaymentRecord ? {
            amount: Number(downPaymentRecord.amount),
            isPaid: downPaymentRecord.status === 'Completed',
            deadline: new Date(downPaymentRecord.createdAt).toLocaleDateString(),
            dueDate: new Date(downPaymentRecord.createdAt).toLocaleDateString(),
            rentAmount: Number(downPaymentRecord.amount) * 0.1, // Example calculation
            percentage: 10,
            serviceFees: 5000,
        } : null,
        schedule: [], // Full schedule requires installment engine
        settings: { smsEnabled: true, emailEnabled: true }
    };
};

export const landlordPaymentsApi = {
    getPayments: async (): Promise<PaymentTransaction[]> => {
        try {
            const { data } = await axios.get(`${API_URL}/dashboard/landlord/payments`, {
                headers: getAuthHeader()
            });
            // Ensure status mapping if backend uses different terms
            return data.map((p: any) => ({
                ...p,
                status: p.status === 'Cleared' ? 'Completed' : p.status
            }));
        } catch (error) {
            console.error('Error fetching landlord payments:', error);
            return [];
        }
    },

    getPayouts: async (): Promise<PayoutTransaction[]> => {
        try {
            const { data } = await axios.get(`${API_URL}/dashboard/landlord/payments/payouts`, {
                headers: getAuthHeader()
            });
            return data;
        } catch (error) {
            console.error('Error fetching landlord payouts:', error);
            return [];
        }
    }
};

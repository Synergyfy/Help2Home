export interface Installment {
    id: string;
    installmentNumber: number;
    dueDate: string;
    principal: number;
    interest: number;
    fees: number;
    totalDue: number;
    status: 'Paid' | 'Upcoming' | 'Overdue';
    penalty?: number;
}

export interface PaymentHistoryItem {
    id: string;
    type: 'Down Payment' | string;
    amount: number;
    date: string;
    status: 'Success' | 'Failed' | 'Pending';
    receiptUrl?: string;
}

export interface DownPaymentDetails {
    amount: number;
    dueDate: string;
    rentAmount: number;
    percentage: number;
    serviceFees: number;
    isPaid: boolean;
}

export interface ReminderSettings {
    smsEnabled: boolean;
    emailEnabled: boolean;
    nextReminderDate?: string;
}

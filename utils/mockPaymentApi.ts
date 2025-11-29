import { DownPaymentDetails, Installment, PaymentHistoryItem, ReminderSettings } from '@/components/dashboard/payments/types';

// Mock Data
const mockDownPayment: DownPaymentDetails = {
    amount: 875000,
    dueDate: 'Mar 15, 2026',
    rentAmount: 3500000,
    percentage: 25,
    serviceFees: 0,
    isPaid: false
};

const mockSchedule: Installment[] = [
    { id: '1', installmentNumber: 1, dueDate: 'Apr 1, 2026', principal: 250000, interest: 41666, fees: 0, totalDue: 291666, status: 'Upcoming' },
    { id: '2', installmentNumber: 2, dueDate: 'May 1, 2026', principal: 250000, interest: 41666, fees: 0, totalDue: 291666, status: 'Upcoming' },
    { id: '3', installmentNumber: 3, dueDate: 'Jun 1, 2026', principal: 250000, interest: 41666, fees: 0, totalDue: 291666, status: 'Upcoming' },
    { id: '4', installmentNumber: 4, dueDate: 'Jul 1, 2026', principal: 250000, interest: 41666, fees: 0, totalDue: 291666, status: 'Upcoming' },
    { id: '5', installmentNumber: 5, dueDate: 'Aug 1, 2026', principal: 250000, interest: 41666, fees: 0, totalDue: 291666, status: 'Upcoming' },
    { id: '6', installmentNumber: 6, dueDate: 'Sep 1, 2026', principal: 250000, interest: 41666, fees: 0, totalDue: 291666, status: 'Upcoming' },
];

const mockHistory: PaymentHistoryItem[] = [];

const mockSettings: ReminderSettings = {
    smsEnabled: true,
    emailEnabled: true,
    nextReminderDate: 'Mar 10, 2026'
};

export const getPaymentData = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        downPayment: mockDownPayment,
        schedule: mockSchedule,
        history: mockHistory,
        settings: mockSettings
    };
};

export const initiatePayment = async (amount: number, type: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
        success: true,
        redirectUrl: '/bank-portal?paymentId=pay_123', // Reusing the bank portal for payments
        message: 'Payment initiated successfully'
    };
};

export const updateReminderSettings = async (settings: ReminderSettings) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
};

import { UserProfile, SecuritySettings, NotificationPreference, BankAccount, PaymentMethod, Session } from '@/components/dashboard/settings/types';

// Mock Data
let mockProfile: UserProfile = {
    fullName: 'John Doe',
    displayName: 'John',
    email: 'john.doe@example.com',
    phone: '+234 801 234 5678',
    dateOfBirth: 'Jan 1, 1990'
};

let mockSecurity: SecuritySettings = {
    twoFactorEnabled: false,
    lastPasswordChange: 'Oct 15, 2025'
};

let mockPreferences: NotificationPreference[] = [
    { type: 'payment_due', channels: { email: true, sms: false, push: true } },
    { type: 'payment_confirmation', channels: { email: true, sms: false, push: true } },
    { type: 'application_status', channels: { email: true, sms: false, push: true } },
    { type: 'contract_action', channels: { email: true, sms: false, push: true } },
    { type: 'message', channels: { email: true, sms: false, push: true } },
    { type: 'marketing', channels: { email: false, sms: false, push: false } }
];

let mockBankAccounts: BankAccount[] = [
    { id: '1', bankName: 'Access Bank', accountNumberMasked: '**** 1234', isPrimary: true, isVerified: true, dateLinked: 'Jan 10, 2025' },
    { id: '2', bankName: 'GTBank', accountNumberMasked: '**** 5678', isPrimary: false, isVerified: true, dateLinked: 'Feb 15, 2025' }
];

let mockPaymentMethods: PaymentMethod[] = [
    { id: '1', type: 'card', last4: '4242', expiry: '12/26', cardholderName: 'John Doe', isDefault: true, brand: 'visa' }
];

let mockSessions: Session[] = [
    { id: '1', deviceType: 'Chrome on Windows', location: 'Lagos, Nigeria', ipAddress: '192.168.1.1', lastActive: 'Just now', isCurrent: true },
    { id: '2', deviceType: 'Safari on iPhone', location: 'Lagos, Nigeria', ipAddress: '192.168.1.2', lastActive: '2 days ago', isCurrent: false }
];

// API Functions
export const getSettingsData = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
        profile: mockProfile,
        security: mockSecurity,
        preferences: mockPreferences,
        bankAccounts: mockBankAccounts,
        paymentMethods: mockPaymentMethods,
        sessions: mockSessions
    };
};

export const updateProfile = async (data: Partial<UserProfile>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockProfile = { ...mockProfile, ...data };
    return mockProfile;
};

export const updatePassword = async (current: string, newPass: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    mockSecurity.lastPasswordChange = new Date().toLocaleDateString();
    return true;
};

export const toggleTwoFactor = async (enabled: boolean) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockSecurity.twoFactorEnabled = enabled;
    return enabled;
};

export const updateNotificationPreference = async (type: string, channel: 'email' | 'sms' | 'push', enabled: boolean) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockPreferences = mockPreferences.map(p =>
        p.type === type
            ? { ...p, channels: { ...p.channels, [channel]: enabled } }
            : p
    );
    return mockPreferences;
};

export const unlinkBankAccount = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    mockBankAccounts = mockBankAccounts.filter(a => a.id !== id);
    return mockBankAccounts;
};

export const removePaymentMethod = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    mockPaymentMethods = mockPaymentMethods.filter(p => p.id !== id);
    return mockPaymentMethods;
};

export const terminateSession = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockSessions = mockSessions.filter(s => s.id !== id);
    return mockSessions;
};

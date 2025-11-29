export interface UserProfile {
    fullName: string;
    displayName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    avatarUrl?: string;
}

export interface SecuritySettings {
    twoFactorEnabled: boolean;
    twoFactorMethod?: 'sms' | 'app' | 'email';
    lastPasswordChange: string;
}

export type NotificationChannel = 'email' | 'sms' | 'push';
export type NotificationType = 'payment_due' | 'payment_confirmation' | 'application_status' | 'contract_action' | 'message' | 'marketing';

export interface NotificationPreference {
    type: NotificationType;
    channels: {
        email: boolean;
        sms: boolean;
        push: boolean;
    };
}

export interface BankAccount {
    id: string;
    bankName: string;
    accountNumberMasked: string; // e.g., "**** 1234"
    isPrimary: boolean;
    isVerified: boolean;
    dateLinked: string;
}

export interface PaymentMethod {
    id: string;
    type: 'card';
    last4: string;
    expiry: string;
    cardholderName: string;
    isDefault: boolean;
    brand: 'visa' | 'mastercard' | 'verve';
}

export interface Session {
    id: string;
    deviceType: string; // e.g., "Chrome on Windows"
    location: string;
    ipAddress: string;
    lastActive: string;
    isCurrent: boolean;
}

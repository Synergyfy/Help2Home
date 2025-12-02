import { addDays, subDays, subHours, subMinutes } from 'date-fns';

export type NotificationType =
    | 'New Application'
    | 'Document Verified'
    | 'Document Rejected'
    | 'Payment Received'
    | 'Payout Processed'
    | 'Maintenance Request'
    | 'Contract Signed'
    | 'System Alert';

export type NotificationChannel = 'In-app' | 'Email' | 'SMS';

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    relatedId?: string;
    url: string;
    isHighPriority: boolean;
    isRead: boolean;
    createdAt: string;
}

export interface NotificationPreference {
    type: NotificationType;
    channels: {
        inApp: boolean;
        email: boolean;
        sms: boolean;
    };
}

export interface UserNotificationSettings {
    globalEnabled: boolean;
    doNotDisturb: {
        enabled: boolean;
        startTime: string; // "22:00"
        endTime: string;   // "07:00"
    };
    preferences: NotificationPreference[];
}

// Mock Notifications
export const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 'notif_1',
        userId: 'user_1',
        type: 'Payment Received',
        title: 'Payment Received',
        message: 'You received ₦1,200,000 from Jane Doe for Modern 2-Bedroom Apartment.',
        url: '/dashboard/landlord/payments',
        isHighPriority: false,
        isRead: false,
        createdAt: subMinutes(new Date(), 5).toISOString(),
    },
    {
        id: 'notif_2',
        userId: 'user_1',
        type: 'New Application',
        title: 'New Application',
        message: 'John Smith submitted an application for Cozy Studio in Yaba.',
        url: '/dashboard/landlord/properties/prop_2', // Assuming link to property or application list
        isHighPriority: false,
        isRead: false,
        createdAt: subHours(new Date(), 2).toISOString(),
    },
    {
        id: 'notif_3',
        userId: 'user_1',
        type: 'System Alert',
        title: 'Urgent: Payout Failed',
        message: 'Your payout of ₦450,000 failed due to invalid bank details. Please update your account.',
        url: '/dashboard/landlord/payments/settings',
        isHighPriority: true,
        isRead: false,
        createdAt: subDays(new Date(), 1).toISOString(),
    },
    {
        id: 'notif_4',
        userId: 'user_1',
        type: 'Maintenance Request',
        title: 'New Maintenance Request',
        message: 'Tenant reported a leaking faucet at 5 Banana Island Rd.',
        url: '/dashboard/landlord/maintenance', // Assuming maintenance page exists or will exist
        isHighPriority: false,
        isRead: true,
        createdAt: subDays(new Date(), 2).toISOString(),
    },
    {
        id: 'notif_5',
        userId: 'user_1',
        type: 'Contract Signed',
        title: 'Contract Signed',
        message: 'Mike Johnson signed the lease agreement for Luxury 4-Bedroom House.',
        url: '/dashboard/landlord/properties/prop_3',
        isHighPriority: false,
        isRead: true,
        createdAt: subDays(new Date(), 3).toISOString(),
    },
    {
        id: 'notif_6',
        userId: 'user_1',
        type: 'Document Verified',
        title: 'Document Verified',
        message: 'Your ID verification document has been approved.',
        url: '/dashboard/landlord/settings/profile',
        isHighPriority: false,
        isRead: true,
        createdAt: subDays(new Date(), 5).toISOString(),
    }
];

// Mock User Settings
export const MOCK_NOTIFICATION_SETTINGS: UserNotificationSettings = {
    globalEnabled: true,
    doNotDisturb: {
        enabled: false,
        startTime: '22:00',
        endTime: '07:00',
    },
    preferences: [
        {
            type: 'New Application',
            channels: { inApp: true, email: true, sms: false }
        },
        {
            type: 'Payment Received',
            channels: { inApp: true, email: true, sms: true }
        },
        {
            type: 'Payout Processed',
            channels: { inApp: true, email: true, sms: false }
        },
        {
            type: 'Maintenance Request',
            channels: { inApp: true, email: true, sms: false }
        },
        {
            type: 'Contract Signed',
            channels: { inApp: true, email: true, sms: false }
        },
        {
            type: 'System Alert',
            channels: { inApp: true, email: true, sms: true }
        },
        {
            type: 'Document Verified',
            channels: { inApp: true, email: false, sms: false }
        },
        {
            type: 'Document Rejected',
            channels: { inApp: true, email: true, sms: false }
        }
    ]
};

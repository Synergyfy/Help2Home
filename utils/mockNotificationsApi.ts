import { Notification, NotificationType } from '@/components/dashboard/notifications/types';

// Mock Data
let mockNotifications: Notification[] = [
    {
        id: '1',
        type: 'payment',
        title: 'Rent Payment Due Soon',
        message: 'Your rent payment of ₦250,000 is due on Dec 1, 2025. Please ensure your account is funded.',
        timestamp: '2 hours ago',
        isRead: false,
        actionLink: '/dashboard/tenant/payments',
        actionLabel: 'Pay Now'
    },
    {
        id: '2',
        type: 'message',
        title: 'New Message from Landlord',
        message: 'Mr. Smith sent you a message regarding the maintenance request.',
        timestamp: 'Yesterday',
        isRead: true,
        actionLink: '/dashboard/tenant/messages'
    },
    {
        id: '3',
        type: 'verification',
        title: 'Identity Verification Successful',
        message: 'Your identity has been verified. You can now apply for rent financing.',
        timestamp: '2 days ago',
        isRead: true
    },
    {
        id: '4',
        type: 'system',
        title: 'Welcome to Help2Home',
        message: 'Welcome to your new tenant dashboard. Complete your profile to get started.',
        timestamp: '1 week ago',
        isRead: true
    }
];

export const getNotifications = async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [...mockNotifications];
};

export const markAsRead = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    mockNotifications = mockNotifications.map(n =>
        n.id === id ? { ...n, isRead: true } : n
    );
    return true;
};

export const markAllAsRead = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockNotifications = mockNotifications.map(n => ({ ...n, isRead: true }));
    return true;
};

export const clearNotification = async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    mockNotifications = mockNotifications.filter(n => n.id !== id);
    return true;
};

export const clearAllNotifications = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockNotifications = [];
    return true;
};

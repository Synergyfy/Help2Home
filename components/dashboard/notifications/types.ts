export type NotificationType = 'payment' | 'message' | 'verification' | 'system';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
    actionLink?: string;
    actionLabel?: string;
}

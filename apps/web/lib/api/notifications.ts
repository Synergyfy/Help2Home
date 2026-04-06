import axios from 'axios';
import { useUserStore } from '@/store/userStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const getAuthHeader = () => {
    const token = useUserStore.getState().token;
    return { Authorization: `Bearer ${token}` };
};

export type NotificationType = 'payment' | 'message' | 'verification' | 'system' | 'alert' | 'update';

export interface Notification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    isRead?: boolean; // For compatibility with older components
    actionLink?: string;
    actionLabel?: string;
}

export const fetchNotifications = async (userId?: string, role?: string) => {
    // Current backend seems to group notifications under tenant for now, but we'll use the role if it's there
    const endpoint = role ? `${API_URL}/dashboard/${role}/notifications` : `${API_URL}/dashboard/tenant/notifications`;
    const { data } = await axios.get(endpoint, {
        headers: getAuthHeader()
    });
    // For compatibility, we map read to isRead if needed
    return data.map((n: any) => ({ ...n, isRead: n.read }));
};

export const getNotifications = fetchNotifications;

export const markNotificationAsRead = async (id: string) => {
    const { data } = await axios.post(`${API_URL}/dashboard/tenant/notifications/${id}/read`, {}, {
        headers: getAuthHeader()
    });
    return data;
};

export const markAllNotificationsAsRead = async (userId?: string) => {
    const { data } = await axios.post(`${API_URL}/dashboard/tenant/notifications/all/read`, {}, {
        headers: getAuthHeader()
    });
    return data;
};

export const dismissNotification = async (id: string) => {
    const { data } = await axios.post(`${API_URL}/dashboard/tenant/notifications/${id}/clear`, {}, {
        headers: getAuthHeader()
    });
    return data;
};

export const clearNotification = dismissNotification;

export const clearAllNotifications = async () => {
    const { data } = await axios.post(`${API_URL}/dashboard/tenant/notifications/all/clear`, {}, {
        headers: getAuthHeader()
    });
    return data;
};

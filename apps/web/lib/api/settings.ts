import axios from 'axios';
import { useUserStore } from '@/store/userStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const getAuthHeader = () => {
    const token = useUserStore.getState().token;
    return { Authorization: `Bearer ${token}` };
};

export const getSettingsData = async () => {
    const { data } = await axios.get(`${API_URL}/profile/me`, {
        headers: getAuthHeader()
    });

    const user = data.data ?? data;

    return {
        profile: {
            fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
            displayName: user.firstName || '',
            email: user.email || '',
            phone: user.phone || '',
            avatar: user.avatar || null,
            dateOfBirth: user.dob || ''
        },
        security: {
            twoFactorEnabled: user.twoFactorEnabled || false,
            lastPasswordChange: new Date().toISOString()
        },
        preferences: (data.preferences || []).map((p: any) => ({
            type: p.type,
            enabled: p.enabled,
        })),
        bankAccounts: (data.bankAccounts || []).map((b: any) => ({
            id: b.id,
            bankName: b.bankName,
            accountNumberMasked: b.accountNumberMasked,
            isPrimary: b.isPrimary,
            isVerified: b.isVerified,
            dateLinked: b.createdAt ? new Date(b.createdAt).toLocaleDateString() : '',
        })),
        paymentMethods: (data.paymentMethods || []).map((p: any) => ({
            id: p.id,
            type: p.type,
            last4: p.last4,
            expiry: p.expiry,
            cardholderName: p.cardholderName,
            isDefault: p.isDefault,
            brand: p.brand,
        })),
        sessions: [],
    };
};

export const updateProfile = async (profileData: any) => {
    const { data } = await axios.patch(`${API_URL}/profile/me`, profileData, {
        headers: getAuthHeader()
    });
    return data;
};

export const updatePassword = async (current: string, newPass: string) => {
    const { data } = await axios.post(`${API_URL}/auth/change-password`, { current, newPass }, {
        headers: getAuthHeader()
    });
    return data;
};

export const toggleTwoFactor = async (enabled: boolean) => {
    const { data } = await axios.post(`${API_URL}/auth/mfa/toggle`, { enabled }, {
        headers: getAuthHeader()
    });
    return data.twoFactorEnabled;
};

export const updateNotificationPreference = async (type: string, channel: string, enabled: boolean) => {
    const { data } = await axios.post(`${API_URL}/profile/preferences`, { type, channel, enabled }, {
        headers: getAuthHeader()
    });
    return data;
};

export const unlinkBankAccount = async (id: string) => {
    const { data } = await axios.delete(`${API_URL}/profile/banks/${id}`, {
        headers: getAuthHeader()
    });
    return data;
};

export const removePaymentMethod = async (id: string) => {
    const { data } = await axios.delete(`${API_URL}/profile/payment-methods/${id}`, {
        headers: getAuthHeader()
    });
    return data;
};

export const terminateSession = async (id: string) => {
    // Sessions are stateless JWTs — this is a UI-only action for now
    return [];
};

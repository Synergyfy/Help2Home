import axios from 'axios';
import { useUserStore } from '@/store/userStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const getAuthHeader = () => {
    const token = useUserStore.getState().token;
    return { Authorization: `Bearer ${token}` };
};

export const getWishlist = async () => {
    const { data } = await axios.get(`${API_URL}/dashboard/tenant/wishlist`, {
        headers: getAuthHeader()
    });
    // The backend returns an array of Property objects
    // Map them to the frontend Property type if needed, or return as is
    return data;
};

export const toggleWishlistProperty = async (propertyId: string) => {
    const { data } = await axios.post(`${API_URL}/dashboard/tenant/wishlist/${propertyId}`, {}, {
        headers: getAuthHeader()
    });
    return data.isSaved; // boolean
};

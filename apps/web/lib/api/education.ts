import axios from 'axios';
import { useUserStore } from '@/store/userStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const getAuthHeader = () => {
    const token = useUserStore.getState().token;
    return { Authorization: `Bearer ${token}` };
};

export const getContentList = async (category: string = 'All', searchQuery: string = '') => {
    const { data } = await axios.get(`${API_URL}/education`, {
        headers: getAuthHeader(),
        params: { category, search: searchQuery }
    });
    return data;
};

export const getFeaturedContent = async () => {
    const { data } = await axios.get(`${API_URL}/education/featured`, {
        headers: getAuthHeader()
    });
    return data;
};

export const getContentDetail = async (id: string) => {
    const { data } = await axios.get(`${API_URL}/education/${id}`, {
        headers: getAuthHeader()
    });
    return data;
};

export const toggleSaveContent = async (id: string) => {
    const { data } = await axios.post(`${API_URL}/education/${id}/save`, {}, {
        headers: getAuthHeader()
    });
    return data.isSaved; // Returns boolean
};

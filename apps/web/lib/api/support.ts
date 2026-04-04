import axios from 'axios';
import { useUserStore } from '@/store/userStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const getAuthHeader = () => {
    const token = useUserStore.getState().token;
    return { Authorization: `Bearer ${token}` };
};

export const getTickets = async () => {
    const { data } = await axios.get(`${API_URL}/dashboard/tenant/support/tickets`, {
        headers: getAuthHeader()
    });
    // Map backend to frontend types if needed
    return data.map((t: any) => ({
        id: t.id,
        category: t.category,
        subject: t.title,
        status: t.status,
        lastUpdated: new Date(t.updatedAt).toLocaleString(),
        createdOn: new Date(t.createdAt).toLocaleDateString(),
        messages: [] // Messages are fetched separately
    }));
};

export const getFAQs = async () => {
    // FAQs might be public or specific to tenant
    const { data } = await axios.get(`${API_URL}/dashboard/admin/support/faqs`); // Need to ensure this exists
    return data;
};

export const createTicket = async (ticketData: any) => {
    const { data } = await axios.post(`${API_URL}/dashboard/tenant/support/tickets`, {
        title: ticketData.subject,
        description: ticketData.description,
        category: ticketData.category,
        priority: 'Medium'
    }, {
        headers: getAuthHeader()
    });
    return data;
};

export const getTicketMessages = async (ticketId: string) => {
    const { data } = await axios.get(`${API_URL}/dashboard/tenant/support/tickets/${ticketId}/messages`, {
        headers: getAuthHeader()
    });
    return data.map((m: any) => ({
        id: m.id,
        sender: m.senderRole === 'user' ? 'user' : 'agent',
        senderName: m.senderName,
        content: m.content,
        timestamp: new Date(m.createdAt).toLocaleString()
    }));
};

export const sendMessage = async (ticketId: string, content: string) => {
    const { data } = await axios.post(`${API_URL}/dashboard/tenant/support/tickets/${ticketId}/messages`, {
        content
    }, {
        headers: getAuthHeader()
    });
    return data;
};

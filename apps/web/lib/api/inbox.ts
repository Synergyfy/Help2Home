export interface Attachment {
    id: string;
    url: string;
    filename: string;
    fileSize: number;
    fileType: string;
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    senderName: string;
    senderAvatar?: string;
    content: string;
    timestamp: string;
    isRead: boolean;
    attachments?: Attachment[];
}

export interface Conversation {
    id: string;
    ticketId: string; // Link to the support ticket
    subject: string;
    participants: {
        id: string;
        name: string;
        role: 'Tenant' | 'Landlord' | 'Agent' | 'Support';
        avatar?: string;
    }[];
    lastMessage: Message;
    unreadCount: number;
    updatedAt: string;
    status: 'Open' | 'Closed' | 'Archived';
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const landlordInboxApi = {
    getConversations: async (): Promise<Conversation[]> => {
        const response = await fetch(`${API_URL}/chat/conversations`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        if (!response.ok) throw new Error('Failed to fetch conversations');
        return response.json();
    },

    getMessages: async (conversationId: string): Promise<Message[]> => {
        const response = await fetch(`${API_URL}/chat/conversations/${conversationId}/messages`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        if (!response.ok) throw new Error('Failed to fetch messages');
        return response.json();
    },

    sendMessage: async (conversationId: string, text: string, attachments?: any[]): Promise<Message> => {
        const response = await fetch(`${API_URL}/chat/conversations/${conversationId}/messages`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ text, attachments })
        });
        if (!response.ok) throw new Error('Failed to send message');
        return response.json();
    },

    markAsRead: async (conversationId: string): Promise<void> => {
        const response = await fetch(`${API_URL}/chat/conversations/${conversationId}/read`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
        });
        if (!response.ok) throw new Error('Failed to mark as read');
    }
};

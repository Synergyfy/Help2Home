export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    category: string;
    createdAt: string;
    updatedAt: string;
    tenantId: string;
    propertyId?: string;
    slaDeadline: string;
}

export interface Template {
    id: string;
    name?: string; // Sometimes components use name instead of title
    title: string;
    content: string;
    category: 'General' | 'Maintenance' | 'Payment' | 'Lease';
    usageCount: number;
}

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
    ticketId: string;
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

export const MOCK_CONVERSATIONS: Conversation[] = [];
export const MOCK_TICKETS: Ticket[] = [];
export const MOCK_MESSAGES: Message[] = [];
export const MOCK_TEMPLATES: Template[] = [];

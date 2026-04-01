import { subMinutes, subHours, subDays } from 'date-fns';

// --- Interfaces ---

export type MessageType = 'text' | 'image' | 'document' | 'system';
export type ParticipantRole = 'landlord' | 'tenant' | 'agent' | 'support' | 'applicant' | 'caretaker';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High';

export interface Attachment {
    id: string;
    url: string;
    filename: string;
    size: string;
    type: 'image' | 'document' | 'video';
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    senderName: string;
    role: ParticipantRole;
    text: string;
    type: MessageType;
    attachments?: Attachment[];
    createdAt: string;
    isRead: boolean;
}

export interface Participant {
    id: string;
    name: string;
    role: ParticipantRole;
    email?: string;
    avatar?: string;
}

export interface Conversation {
    id: string;
    participants: Participant[];
    lastMessage: Message;
    unreadCount: number;
    linkedObject?: {
        type: 'Application' | 'Property' | 'Contract' | 'Ticket';
        id: string;
        title: string;
    };
    labels: string[];
    updatedAt: string;
}

export interface TicketEvent {
    id: string;
    ticketId: string;
    type: 'status_change' | 'priority_change' | 'assignment' | 'note';
    description: string;
    actorName: string;
    createdAt: string;
}

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    category: string;
    assignedTo?: string; // Agent name
    createdBy: {
        id: string;
        name: string;
        role: ParticipantRole;
    };
    createdAt: string;
    updatedAt: string;
    slaDeadline: string;
    relatedObject?: {
        type: 'Property' | 'Application' | 'Contract';
        id: string;
        title: string;
    };
}

export interface Template {
    id: string;
    title: string;
    content: string;
    category: string;
}

// --- Mock Data ---

export const MOCK_TEMPLATES: Template[] = [
    {
        id: 'tpl_1',
        title: 'Application Received',
        content: 'Hi {applicantName}, thanks for your application for {propertyTitle}. We are currently reviewing it and will get back to you shortly.',
        category: 'Application'
    },
    {
        id: 'tpl_2',
        title: 'Viewing Confirmation',
        content: 'Hello, this is to confirm your viewing appointment for {propertyTitle} on {date} at {time}. Please let us know if you need to reschedule.',
        category: 'Viewing'
    },
    {
        id: 'tpl_3',
        title: 'Maintenance Acknowledged',
        content: 'We have received your maintenance request regarding {issue}. A contractor has been notified and will contact you to arrange a visit.',
        category: 'Maintenance'
    }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: 'conv_1',
        participants: [
            { id: 'user_1', name: 'You', role: 'landlord', email: 'landlord@example.com' },
            { id: 'tenant_1', name: 'John Smith', role: 'applicant', email: 'john@example.com' }
        ],
        lastMessage: {
            id: 'msg_103',
            conversationId: 'conv_1',
            senderId: 'tenant_1',
            senderName: 'John Smith',
            role: 'applicant',
            text: 'Is the apartment still available for viewing this weekend?',
            type: 'text',
            createdAt: subMinutes(new Date(), 15).toISOString(),
            isRead: false
        },
        unreadCount: 1,
        linkedObject: {
            type: 'Application',
            id: 'app_123',
            title: 'Cozy Studio in Yaba'
        },
        labels: ['Applicant', 'New'],
        updatedAt: subMinutes(new Date(), 15).toISOString()
    },
    {
        id: 'conv_2',
        participants: [
            { id: 'user_1', name: 'You', role: 'landlord', email: 'landlord@example.com' },
            { id: 'tenant_2', name: 'Sarah Connor', role: 'tenant', email: 'sarah.c@example.com' }
        ],
        lastMessage: {
            id: 'msg_205',
            conversationId: 'conv_2',
            senderId: 'user_1',
            senderName: 'You',
            role: 'landlord',
            text: 'Thanks, I received the payment.',
            type: 'text',
            createdAt: subHours(new Date(), 2).toISOString(),
            isRead: true
        },
        unreadCount: 0,
        linkedObject: {
            type: 'Property',
            id: 'prop_456',
            title: 'Luxury 3-Bed Apartment'
        },
        labels: ['Tenant'],
        updatedAt: subHours(new Date(), 2).toISOString()
    },
    {
        id: 'conv_partner_1',
        participants: [
            { id: 'user_1', name: 'You', role: 'landlord', email: 'landlord@example.com' },
            { id: 'partner_1', name: 'Ngozi Okafor', role: 'agent', email: 'ngozi@example.com' }
        ],
        lastMessage: {
            id: 'msg_p1_1',
            conversationId: 'conv_partner_1',
            senderId: 'partner_1',
            senderName: 'Ngozi Okafor',
            role: 'agent',
            text: 'I have scheduled three viewings for the Lekki property tomorrow.',
            type: 'text',
            createdAt: subHours(new Date(), 1).toISOString(),
            isRead: true
        },
        unreadCount: 0,
        labels: ['Agent'],
        updatedAt: subHours(new Date(), 1).toISOString()
    },
    {
        id: 'conv_partner_2',
        participants: [
            { id: 'user_1', name: 'You', role: 'landlord', email: 'landlord@example.com' },
            { id: 'partner_2', name: 'Yusuf Ibrahim', role: 'caretaker', email: 'yusuf@example.com' }
        ],
        lastMessage: {
            id: 'msg_p2_1',
            conversationId: 'conv_partner_2',
            senderId: 'partner_2',
            senderName: 'Yusuf Ibrahim',
            role: 'caretaker',
            text: 'The plumber has finished fixing the leak in Apt 4B.',
            type: 'text',
            createdAt: subDays(new Date(), 1).toISOString(),
            isRead: true
        },
        unreadCount: 0,
        labels: ['Caretaker'],
        updatedAt: subDays(new Date(), 1).toISOString()
    },
    {
        id: 'conv_3',
        participants: [
            { id: 'user_1', name: 'You', role: 'landlord', email: 'landlord@example.com' },
            { id: 'support_1', name: 'Help2Home Support', role: 'support', email: 'support@help2home.com' }
        ],
        lastMessage: {
            id: 'msg_302',
            conversationId: 'conv_3',
            senderId: 'support_1',
            senderName: 'Help2Home Support',
            role: 'support',
            text: 'Your verification documents have been approved.',
            type: 'text',
            createdAt: subDays(new Date(), 1).toISOString(),
            isRead: true
        },
        unreadCount: 0,
        labels: ['Support'],
        updatedAt: subDays(new Date(), 1).toISOString()
    }
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
    'conv_1': [
        {
            id: 'msg_101',
            conversationId: 'conv_1',
            senderId: 'tenant_1',
            senderName: 'John Smith',
            role: 'applicant',
            text: 'Hi, I just submitted my application.',
            type: 'text',
            createdAt: subHours(new Date(), 24).toISOString(),
            isRead: true
        },
        {
            id: 'msg_102',
            conversationId: 'conv_1',
            senderId: 'user_1',
            senderName: 'You',
            role: 'landlord',
            text: 'Thanks John, I will take a look today.',
            type: 'text',
            createdAt: subHours(new Date(), 23).toISOString(),
            isRead: true
        },
        {
            id: 'msg_103',
            conversationId: 'conv_1',
            senderId: 'tenant_1',
            senderName: 'John Smith',
            role: 'applicant',
            text: 'Is the apartment still available for viewing this weekend?',
            type: 'text',
            createdAt: subMinutes(new Date(), 15).toISOString(),
            isRead: false
        }
    ],
    'conv_2': [
        {
            id: 'msg_201',
            conversationId: 'conv_2',
            senderId: 'tenant_2',
            senderName: 'Sarah Connor',
            role: 'tenant',
            text: 'I have transferred the rent for this month.',
            type: 'text',
            attachments: [
                {
                    id: 'att_1',
                    url: '#',
                    filename: 'receipt.pdf',
                    size: '1.2 MB',
                    type: 'document'
                }
            ],
            createdAt: subHours(new Date(), 3).toISOString(),
            isRead: true
        },
        {
            id: 'msg_205',
            conversationId: 'conv_2',
            senderId: 'user_1',
            senderName: 'You',
            role: 'landlord',
            text: 'Thanks, I received the payment.',
            type: 'text',
            createdAt: subHours(new Date(), 2).toISOString(),
            isRead: true
        }
    ]
};

export const MOCK_TICKETS: Ticket[] = [
    {
        id: 'TKT-1001',
        title: 'Payout delayed for October',
        description: 'I have not received my payout for the month of October yet. It usually arrives by the 5th.',
        status: 'Open',
        priority: 'High',
        category: 'Payout',
        assignedTo: 'Support Agent A',
        createdBy: { id: 'user_1', name: 'You', role: 'landlord' },
        createdAt: subDays(new Date(), 2).toISOString(),
        updatedAt: subDays(new Date(), 2).toISOString(),
        slaDeadline: subHours(new Date(), -4).toISOString(), // 4 hours remaining
    },
    {
        id: 'TKT-1002',
        title: 'Update property listing photos',
        description: 'I am unable to upload new photos to my listing "Sunny Villa". Getting an error.',
        status: 'In Progress',
        priority: 'Medium',
        category: 'Technical',
        assignedTo: 'Tech Support',
        createdBy: { id: 'user_1', name: 'You', role: 'landlord' },
        createdAt: subDays(new Date(), 5).toISOString(),
        updatedAt: subDays(new Date(), 1).toISOString(),
        slaDeadline: subDays(new Date(), 1).toISOString(), // Overdue
        relatedObject: {
            type: 'Property',
            id: 'prop_999',
            title: 'Sunny Villa'
        }
    },
    {
        id: 'TKT-0998',
        title: 'Question about service fees',
        description: 'Can you clarify the service fee percentage for the premium plan?',
        status: 'Resolved',
        priority: 'Low',
        category: 'Billing',
        assignedTo: 'Support Agent B',
        createdBy: { id: 'user_1', name: 'You', role: 'landlord' },
        createdAt: subDays(new Date(), 10).toISOString(),
        updatedAt: subDays(new Date(), 8).toISOString(),
        slaDeadline: subDays(new Date(), 9).toISOString(),
    }
];

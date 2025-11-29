export type TicketStatus = 'Open' | 'Pending' | 'Awaiting Customer' | 'Resolved' | 'Closed';
export type TicketCategory = 'Complaint' | 'Payment Issue' | 'Restructuring Request' | 'Property Issue' | 'Application Issue' | 'Technical Issue' | 'Others';

export interface Message {
    id: string;
    sender: 'user' | 'agent';
    senderName: string;
    content: string;
    timestamp: string;
    attachments?: string[];
}

export interface Ticket {
    id: string;
    category: TicketCategory;
    subject: string;
    status: TicketStatus;
    lastUpdated: string;
    createdOn: string;
    messages: Message[];
    priority?: 'Normal' | 'High';
}

export interface CreateTicketData {
    category: TicketCategory;
    subject: string;
    description: string;
    attachments?: File[];
    // Restructuring specific fields
    restructuringReason?: string;
    proposedAmount?: number;
}

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

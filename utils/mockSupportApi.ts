import { Ticket, CreateTicketData, FAQItem, Message } from '@/components/dashboard/support/types';

// Mock Data
let mockTickets: Ticket[] = [
    {
        id: 'T-1001',
        category: 'Payment Issue',
        subject: 'Double charge on last installment',
        status: 'Open',
        lastUpdated: '2 hours ago',
        createdOn: 'Nov 28, 2025',
        messages: [
            {
                id: 'm1',
                sender: 'user',
                senderName: 'You',
                content: 'Hi, I noticed I was charged twice for my November installment. Can you please check?',
                timestamp: 'Nov 28, 10:00 AM'
            },
            {
                id: 'm2',
                sender: 'agent',
                senderName: 'Support Agent',
                content: 'Hello! I apologize for the inconvenience. Let me investigate this for you immediately.',
                timestamp: 'Nov 28, 10:15 AM'
            }
        ]
    },
    {
        id: 'T-1002',
        category: 'Property Issue',
        subject: 'Leaking faucet in kitchen',
        status: 'Resolved',
        lastUpdated: '1 week ago',
        createdOn: 'Nov 20, 2025',
        messages: [
            {
                id: 'm1',
                sender: 'user',
                senderName: 'You',
                content: 'The kitchen faucet is leaking badly.',
                timestamp: 'Nov 20, 09:00 AM'
            },
            {
                id: 'm2',
                sender: 'agent',
                senderName: 'Support Agent',
                content: 'We have dispatched a plumber. They should arrive by 2 PM.',
                timestamp: 'Nov 20, 10:00 AM'
            }
        ]
    }
];

const mockFAQs: FAQItem[] = [
    {
        id: 'f1',
        question: 'How do I pay my rent?',
        answer: 'You can pay your rent directly through the "Payments" tab in your dashboard. We accept bank transfers and card payments.'
    },
    {
        id: 'f2',
        question: 'Can I restructure my payment plan?',
        answer: 'Yes, if you are facing financial difficulties, you can request a restructuring plan. Open a new ticket with the category "Restructuring Request" and provide the necessary details.'
    },
    {
        id: 'f3',
        question: 'How long does verification take?',
        answer: 'Verification typically takes 24-48 hours after you have submitted all required documents.'
    },
    {
        id: 'f4',
        question: 'What happens if I miss a payment?',
        answer: 'Missing a payment may incur a penalty fee. Please contact support immediately if you anticipate a delay to avoid penalties.'
    }
];

export const getTickets = async (): Promise<Ticket[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...mockTickets];
};

export const getFAQs = async (): Promise<FAQItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockFAQs;
};

export const createTicket = async (data: CreateTicketData): Promise<Ticket> => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newTicket: Ticket = {
        id: `T-${Math.floor(Math.random() * 10000)}`,
        category: data.category,
        subject: data.subject,
        status: 'Open',
        lastUpdated: 'Just now',
        createdOn: new Date().toLocaleDateString(),
        priority: data.category === 'Restructuring Request' ? 'High' : 'Normal',
        messages: [
            {
                id: `m_${Date.now()}`,
                sender: 'user',
                senderName: 'You',
                content: `${data.description}\n\n${data.category === 'Restructuring Request' ? `Reason: ${data.restructuringReason}\nProposed Amount: ₦${data.proposedAmount}` : ''}`,
                timestamp: 'Just now'
            }
        ]
    };

    mockTickets = [newTicket, ...mockTickets];
    return newTicket;
};

export const sendMessage = async (ticketId: string, content: string): Promise<Message> => {
    await new Promise(resolve => setTimeout(resolve, 600));

    const newMessage: Message = {
        id: `m_${Date.now()}`,
        sender: 'user',
        senderName: 'You',
        content,
        timestamp: 'Just now'
    };

    mockTickets = mockTickets.map(t => {
        if (t.id === ticketId) {
            return {
                ...t,
                lastUpdated: 'Just now',
                messages: [...t.messages, newMessage]
            };
        }
        return t;
    });

    // Simulate auto-reply for demo
    setTimeout(() => {
        const reply: Message = {
            id: `m_reply_${Date.now()}`,
            sender: 'agent',
            senderName: 'Support Agent',
            content: 'Thank you for your message. We have received it and will get back to you shortly.',
            timestamp: 'Just now'
        };
        mockTickets = mockTickets.map(t => {
            if (t.id === ticketId) {
                return {
                    ...t,
                    messages: [...t.messages, reply]
                };
            }
            return t;
        });
    }, 3000);

    return newMessage;
};

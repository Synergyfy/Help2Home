export interface Partner {
    id: string;
    name: string;
    role: 'Agent' | 'Caretaker';
    email: string;
    phone: string;
    properties: number;
    status: 'Active' | 'Pending' | 'Inactive';
    joinedDate: string;
}

export const MOCK_PARTNERS: Partner[] = [
    {
        id: '1',
        name: 'Ngozi Okafor',
        role: 'Agent',
        email: 'ngozi@example.com',
        phone: '+234 801 234 5678',
        properties: 3,
        status: 'Active',
        joinedDate: '2025-09-10'
    },
    {
        id: '2',
        name: 'Yusuf Ibrahim',
        role: 'Caretaker',
        email: 'yusuf@example.com',
        phone: '+234 802 345 6789',
        properties: 5,
        status: 'Active',
        joinedDate: '2025-10-22'
    },
    {
        id: '3',
        name: 'Grace Adeola',
        role: 'Agent',
        email: 'grace@example.com',
        phone: '+234 803 456 7890',
        properties: 2,
        status: 'Pending',
        joinedDate: '2026-01-08'
    }
];

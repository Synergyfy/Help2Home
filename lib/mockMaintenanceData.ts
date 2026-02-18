export type MaintenanceStatus = 'Pending' | 'Approved' | 'In Progress' | 'Completed' | 'Rejected';
export type MaintenancePriority = 'Low' | 'Medium' | 'High' | 'Emergency';

export interface MaintenanceRequest {
    id: string;
    title: string;
    description: string;
    property: string;
    unit: string;
    tenant: string;
    priority: MaintenancePriority;
    status: MaintenanceStatus;
    createdAt: string;
    estimatedCost?: number;
    images?: string[];
}

export const MOCK_MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
    {
        id: 'MR-001',
        title: 'Leaky Faucet in Kitchen',
        description: 'The kitchen faucet is dripping constantly, causing water waste and annoying noise.',
        property: 'Lekki Phase 1',
        unit: 'Apt 4B',
        tenant: 'Jane Doe',
        priority: 'Medium',
        status: 'Pending',
        createdAt: '2026-02-14T10:00:00Z',
        estimatedCost: 15000,
        images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200']
    },
    {
        id: 'MR-002',
        title: 'AC Not Cooling',
        description: 'The AC in the master bedroom is blowing warm air even at the lowest temperature setting.',
        property: 'Yaba Heights',
        unit: 'Unit 12',
        tenant: 'John Smith',
        priority: 'High',
        status: 'In Progress',
        createdAt: '2026-02-15T08:30:00Z',
        estimatedCost: 45000
    },
    {
        id: 'MR-003',
        title: 'Broken Light Switch',
        description: "The light switch in the hallway is loose and doesn't turn on the lights.",
        property: 'Lekki Phase 1',
        unit: 'Apt 2A',
        tenant: 'Robert Fox',
        priority: 'Low',
        status: 'Completed',
        createdAt: '2026-02-10T14:20:00Z',
        estimatedCost: 5000
    },
    {
        id: 'MR-004',
        title: 'Water Heater Malfunction',
        description: 'No hot water in the entire apartment since this morning.',
        property: 'Ikeja GRA',
        unit: 'Flat 3',
        tenant: 'Alice Johnson',
        priority: 'Emergency',
        status: 'Pending',
        createdAt: '2026-02-16T07:00:00Z',
        estimatedCost: 35000
    }
];

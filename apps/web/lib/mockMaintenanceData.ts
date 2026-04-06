export type MaintenanceStatus = 'Pending' | 'In Progress' | 'Resolved' | 'Cancelled' | 'Rejected';
export type MaintenancePriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface MaintenanceRequest {
    id: string;
    issueTitle: string;
    issueDescription: string;
    propertyName: string;
    propertyAddress?: string;
    tenantName: string;
    priority: MaintenancePriority;
    status: MaintenanceStatus;
    createdAt: string;
    cost?: number;
    images?: string[];
    rejectionReason?: string;
    assignedArtisanId?: string;
    updatedAt?: string;
}

export const MOCK_MAINTENANCE_REQUESTS: MaintenanceRequest[] = [
    {
        id: 'MR-001',
        issueTitle: 'Leaky Faucet in Kitchen',
        issueDescription: 'The kitchen faucet is dripping constantly, causing water waste and annoying noise.',
        propertyName: 'Lekki Phase 1',
        propertyAddress: 'Apt 4B',
        tenantName: 'Jane Doe',
        priority: 'Medium',
        status: 'Pending',
        createdAt: '2026-02-14T10:00:00Z',
        cost: 15000,
        images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=200']
    },
    {
        id: 'MR-002',
        issueTitle: 'AC Not Cooling',
        issueDescription: 'The AC in the master bedroom is blowing warm air even at the lowest temperature setting.',
        propertyName: 'Yaba Heights',
        propertyAddress: 'Unit 12',
        tenantName: 'John Smith',
        priority: 'High',
        status: 'In Progress',
        createdAt: '2026-02-15T08:30:00Z',
        cost: 45000
    },
    {
        id: 'MR-003',
        issueTitle: 'Broken Light Switch',
        issueDescription: "The light switch in the hallway is loose and doesn't turn on the lights.",
        propertyName: 'Lekki Phase 1',
        propertyAddress: 'Apt 2A',
        tenantName: 'Robert Fox',
        priority: 'Low',
        status: 'Resolved',
        createdAt: '2026-02-10T14:20:00Z',
        cost: 5000
    },
    {
        id: 'MR-004',
        issueTitle: 'Water Heater Malfunction',
        issueDescription: 'No hot water in the entire apartment since this morning.',
        propertyName: 'Ikeja GRA',
        propertyAddress: 'Flat 3',
        tenantName: 'Alice Johnson',
        priority: 'Critical',
        status: 'Pending',
        createdAt: '2026-02-16T07:00:00Z',
        cost: 35000
    }
];

import { addDays, subDays } from 'date-fns';

export type TaskStatus = 'Unassigned' | 'Assigned' | 'Accepted' | 'In Progress' | 'Awaiting Approval' | 'Completed' | 'Cancelled';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface TaskTimelineEvent {
    id: string;
    type: 'status_change' | 'comment' | 'photo_upload';
    content: string;
    timestamp: string;
    author: string;
}

export interface CaretakerTask {
    id: string;
    title: string;
    propertyId: string;
    propertyTitle: string;
    unit?: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    assignedTo: string;
    dueDate: string;
    photos: string[];
    receipts: string[];
    timeline: TaskTimelineEvent[];
}

export type ChecklistType = 'move-in' | 'move-out';
export type ChecklistItemStatus = 'Pass' | 'Fail' | 'N/A' | 'Pending';

export interface ChecklistItem {
    id: string;
    label: string;
    required: boolean;
    type: 'passfail' | 'text' | 'number' | 'photo';
    status: ChecklistItemStatus;
    notes?: string;
    photos?: string[];
    value?: string; // For text/number inputs
}

export interface VerificationChecklist {
    id: string;
    propertyId: string;
    propertyTitle: string;
    unit?: string;
    type: ChecklistType;
    status: 'Draft' | 'Submitted' | 'Completed';
    items: ChecklistItem[];
    caretakerSignature?: string;
    tenantSignature?: string;
    submittedAt?: string;
}

export const MOCK_TASKS: CaretakerTask[] = [
    {
        id: 'TASK-001',
        title: 'Leaky Faucet Repair',
        propertyId: 'PROP-001',
        propertyTitle: 'Sunset Apartments',
        unit: '2A',
        description: 'Tenant reported a leaky faucet in the kitchen sink. Please investigate and repair.',
        priority: 'Medium',
        status: 'Assigned',
        assignedTo: 'current-user',
        dueDate: addDays(new Date(), 1).toISOString(),
        photos: [],
        receipts: [],
        timeline: [
            {
                id: 'EVT-1',
                type: 'status_change',
                content: 'Task assigned to you',
                timestamp: subDays(new Date(), 1).toISOString(),
                author: 'System'
            }
        ]
    },
    {
        id: 'TASK-002',
        title: 'Move-in Inspection',
        propertyId: 'PROP-002',
        propertyTitle: 'Ocean View Villa',
        unit: 'Villa 4',
        description: 'Perform move-in verification for new tenant arriving on Friday.',
        priority: 'High',
        status: 'In Progress',
        assignedTo: 'current-user',
        dueDate: new Date().toISOString(),
        photos: [],
        receipts: [],
        timeline: [
            {
                id: 'EVT-2',
                type: 'status_change',
                content: 'Task started',
                timestamp: subDays(new Date(), 0).toISOString(),
                author: 'You'
            }
        ]
    },
    {
        id: 'TASK-003',
        title: 'Garden Maintenance',
        propertyId: 'PROP-001',
        propertyTitle: 'Sunset Apartments',
        description: 'Regular lawn mowing and hedge trimming.',
        priority: 'Low',
        status: 'Completed',
        assignedTo: 'current-user',
        dueDate: subDays(new Date(), 2).toISOString(),
        photos: ['/mock-garden-1.jpg', '/mock-garden-2.jpg'],
        receipts: [],
        timeline: [
            {
                id: 'EVT-3',
                type: 'status_change',
                content: 'Task completed',
                timestamp: subDays(new Date(), 2).toISOString(),
                author: 'You'
            }
        ]
    }
];

export const MOCK_CHECKLISTS: VerificationChecklist[] = [
    {
        id: 'CHK-001',
        propertyId: 'PROP-002',
        propertyTitle: 'Ocean View Villa',
        unit: 'Villa 4',
        type: 'move-in',
        status: 'Draft',
        items: [
            { id: '1', label: 'Front Door Keys', required: true, type: 'passfail', status: 'Pass' },
            { id: '2', label: 'Living Room Walls', required: true, type: 'passfail', status: 'Pending' },
            { id: '3', label: 'Kitchen Appliances', required: true, type: 'passfail', status: 'Pending' },
            { id: '4', label: 'Electricity Meter Reading', required: true, type: 'number', status: 'Pending' },
            { id: '5', label: 'Water Meter Reading', required: true, type: 'number', status: 'Pending' },
            { id: '6', label: 'Bathroom Plumbing', required: true, type: 'passfail', status: 'Pending' }
        ]
    }
];

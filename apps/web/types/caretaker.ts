import { MaintenanceStatus } from '../lib/api/maintenance';

export interface CaretakerTask {
    id: string;
    title: string;
    propertyId: string;
    propertyTitle: string;
    unit?: string;
    description: string;
    status: MaintenanceStatus | 'Accepted' | 'Assigned';
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    dueDate: string;
    createdAt: string;
}

export interface ChecklistItem {
    id: string;
    label: string;
    type: 'pass-fail' | 'number' | 'text' | 'photo';
    required: boolean;
    status: 'Pending' | 'Pass' | 'Fail' | 'N/A';
    value?: string;
    notes?: string;
    photos?: string[];
}

export interface VerificationChecklist {
    id: string;
    propertyId: string;
    propertyTitle: string;
    inspectorName: string;
    date: string;
    items: ChecklistItem[];
    status: 'Draft' | 'Submitted';
}

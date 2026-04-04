export interface SummaryTileData {
    id: string;
    label: string;
    value: string;
    subtitle: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    status?: 'neutral' | 'warning' | 'critical';
    link: string;
}

export interface TaskItem {
    id: string;
    title: string;
    property: string;
    priority: 'High' | 'Medium' | 'Low';
    dueDate: string;
    actionLabel: string;
    link: string;
}

export interface PaymentItem {
    id: string;
    tenantName: string;
    propertyTitle: string;
    amount: number;
    date: string;
    status: 'Completed' | 'Pending' | 'Failed';
}

export interface VerificationItem {
    id: string;
    label: string;
    status: 'Verified' | 'Pending' | 'Rejected';
    date: string;
}

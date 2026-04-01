import { subMinutes, subHours, subDays } from 'date-fns';

// --- Interfaces ---

export type Permission =
    | 'users:read' | 'users:write' | 'users:delete'
    | 'roles:read' | 'roles:write'
    | 'audit:read'
    | 'properties:create' | 'properties:edit' | 'properties:delete'
    | 'payouts:request' | 'payouts:approve'
    | 'settings:manage';

export interface Role {
    id: string;
    name: string;
    description: string;
    permissions: Permission[];
    isSystem?: boolean; // Cannot be deleted
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: string;
    roleName: string;
    status: 'Active' | 'Disabled' | 'Pending';
    lastLogin: string;
    avatar?: string;
    mfaEnabled: boolean;
}

export interface AuditLog {
    id: string;
    actorId: string;
    actorName: string;
    action: string;
    resource: string;
    details: string;
    status: 'Success' | 'Failure';
    ipAddress: string;
    timestamp: string;
}

export interface Session {
    id: string;
    userId: string;
    device: string;
    browser: string;
    location: string;
    ipAddress: string;
    lastActive: string;
    isCurrent: boolean;
}

// --- Mock Data ---

export const MOCK_ROLES: Role[] = [
    {
        id: 'role_admin',
        name: 'Admin',
        description: 'Full access to all system resources.',
        permissions: [
            'users:read', 'users:write', 'users:delete',
            'roles:read', 'roles:write',
            'audit:read',
            'properties:create', 'properties:edit', 'properties:delete',
            'payouts:request', 'payouts:approve',
            'settings:manage'
        ],
        isSystem: true
    },
    {
        id: 'role_support',
        name: 'Support',
        description: 'Access to user management and audit logs for troubleshooting.',
        permissions: [
            'users:read',
            'audit:read',
            'properties:edit'
        ],
        isSystem: true
    },
    {
        id: 'role_landlord',
        name: 'Landlord',
        description: 'Standard landlord access to manage own properties.',
        permissions: [
            'properties:create', 'properties:edit',
            'payouts:request'
        ],
        isSystem: true
    },
    {
        id: 'role_agent',
        name: 'Agent',
        description: 'Can manage properties and view users.',
        permissions: [
            'properties:create', 'properties:edit',
            'users:read'
        ]
    }
];

export const MOCK_USERS: User[] = [
    {
        id: 'user_1',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@help2home.com',
        roleId: 'role_admin',
        roleName: 'Admin',
        status: 'Active',
        lastLogin: subMinutes(new Date(), 5).toISOString(),
        mfaEnabled: true
    },
    {
        id: 'user_2',
        firstName: 'Sarah',
        lastName: 'Support',
        email: 'sarah@help2home.com',
        roleId: 'role_support',
        roleName: 'Support',
        status: 'Active',
        lastLogin: subHours(new Date(), 2).toISOString(),
        mfaEnabled: true
    },
    {
        id: 'user_3',
        firstName: 'John',
        lastName: 'Landlord',
        email: 'john@example.com',
        roleId: 'role_landlord',
        roleName: 'Landlord',
        status: 'Active',
        lastLogin: subDays(new Date(), 1).toISOString(),
        mfaEnabled: false
    },
    {
        id: 'user_4',
        firstName: 'Mike',
        lastName: 'Agent',
        email: 'mike@agency.com',
        roleId: 'role_agent',
        roleName: 'Agent',
        status: 'Disabled',
        lastLogin: subDays(new Date(), 15).toISOString(),
        mfaEnabled: false
    }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
    {
        id: 'log_1',
        actorId: 'user_1',
        actorName: 'Admin User',
        action: 'ROLE_UPDATE',
        resource: 'Role: Agent',
        details: 'Added permission: users:read',
        status: 'Success',
        ipAddress: '192.168.1.1',
        timestamp: subMinutes(new Date(), 10).toISOString()
    },
    {
        id: 'log_2',
        actorId: 'user_2',
        actorName: 'Sarah Support',
        action: 'USER_LOGIN',
        resource: 'User: Sarah Support',
        details: 'Successful login via email/password',
        status: 'Success',
        ipAddress: '10.0.0.5',
        timestamp: subHours(new Date(), 2).toISOString()
    },
    {
        id: 'log_3',
        actorId: 'user_3',
        actorName: 'John Landlord',
        action: 'PAYOUT_REQUEST',
        resource: 'Payout #4455',
        details: 'Requested payout of ₦150,000',
        status: 'Success',
        ipAddress: '172.16.0.1',
        timestamp: subDays(new Date(), 1).toISOString()
    },
    {
        id: 'log_4',
        actorId: 'user_1',
        actorName: 'Admin User',
        action: 'USER_DISABLE',
        resource: 'User: Mike Agent',
        details: 'Account disabled due to inactivity',
        status: 'Success',
        ipAddress: '192.168.1.1',
        timestamp: subDays(new Date(), 2).toISOString()
    },
    {
        id: 'log_5',
        actorId: 'unknown',
        actorName: 'Unknown',
        action: 'LOGIN_ATTEMPT',
        resource: 'User: admin@help2home.com',
        details: 'Failed login attempt (invalid password)',
        status: 'Failure',
        ipAddress: '45.33.22.11',
        timestamp: subDays(new Date(), 3).toISOString()
    }
];

export const MOCK_SESSIONS: Session[] = [
    {
        id: 'sess_1',
        userId: 'user_1',
        device: 'MacBook Pro',
        browser: 'Chrome 120.0',
        location: 'Lagos, Nigeria',
        ipAddress: '192.168.1.1',
        lastActive: 'Just now',
        isCurrent: true
    },
    {
        id: 'sess_2',
        userId: 'user_1',
        device: 'iPhone 13',
        browser: 'Safari Mobile',
        location: 'Lagos, Nigeria',
        ipAddress: '10.5.5.1',
        lastActive: subHours(new Date(), 5).toISOString(),
        isCurrent: false
    }
];

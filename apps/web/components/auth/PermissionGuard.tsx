'use client';

import React, { useMemo } from 'react';
import { useUserStore, Role } from '@/store/userStore';

export type Permission =
    | 'users:read' | 'users:write' | 'users:delete'
    | 'roles:read' | 'roles:write'
    | 'audit:read'
    | 'properties:create' | 'properties:edit' | 'properties:delete'
    | 'payouts:request' | 'payouts:approve'
    | 'settings:manage';

interface PermissionGuardProps {
    children: React.ReactNode;
    requiredPermission: Permission;
    fallback?: React.ReactNode;
}

// Role-based permission mapping
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    admin: [
        'users:read', 'users:write', 'users:delete',
        'roles:read', 'roles:write',
        'audit:read',
        'properties:edit', 'properties:delete',
        'payouts:approve',
        'settings:manage'
    ],
    superAdmin: [
        'users:read', 'users:write', 'users:delete',
        'roles:read', 'roles:write',
        'audit:read',
        'properties:edit', 'properties:delete',
        'payouts:approve',
        'settings:manage'
    ],
    agent: ['users:read', 'properties:create', 'properties:edit'],
    landlord: ['properties:create', 'properties:edit', 'payouts:request'],
    caretaker: ['properties:edit'],
    tenant: ['payouts:request'], // for rent payments
    investor: ['payouts:request'],
    developer: ['properties:create', 'properties:edit']
};

export default function PermissionGuard({ children, requiredPermission, fallback = null }: PermissionGuardProps) {
    const { activeRole } = useUserStore();

    const hasPermission = useMemo(() => {
        if (!activeRole) return false;
        const permissions = ROLE_PERMISSIONS[activeRole] || [];
        return permissions.includes(requiredPermission);
    }, [activeRole, requiredPermission]);

    if (!hasPermission) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}

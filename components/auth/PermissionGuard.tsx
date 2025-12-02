'use client';

import React from 'react';
import { Permission, MOCK_ROLES } from '@/lib/mockSecurityData';

interface PermissionGuardProps {
    children: React.ReactNode;
    requiredPermission: Permission;
    fallback?: React.ReactNode;
}

// Mock hook to get current user permissions
// In a real app, this would come from UserContext or a dedicated AuthContext
const usePermissions = () => {
    // For demo purposes, we'll assume the current user is an Admin
    // You can change this to 'role_landlord' or 'role_agent' to test other scenarios
    const currentRoleId = 'role_admin';

    const role = MOCK_ROLES.find(r => r.id === currentRoleId);
    return role?.permissions || [];
};

export default function PermissionGuard({ children, requiredPermission, fallback = null }: PermissionGuardProps) {
    const permissions = usePermissions();
    const hasPermission = permissions.includes(requiredPermission);

    if (!hasPermission) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}

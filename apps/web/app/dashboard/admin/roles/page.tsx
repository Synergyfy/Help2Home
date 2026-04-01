'use client';

import React from 'react';
import RoleManager from '@/components/dashboard/admin/roles/RoleManager';

export default function AdminRolesPage() {
    return (
        <div className="pb-20">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Role Management</h1>
                <p className="text-gray-500">Define roles and assign permissions to control access.</p>
            </div>

            <RoleManager />
        </div>
    );
}

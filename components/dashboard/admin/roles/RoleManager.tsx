'use client';

import React, { useState } from 'react';
import { Role, Permission, MOCK_ROLES } from '@/lib/mockSecurityData';

const AVAILABLE_PERMISSIONS: { id: Permission; label: string; group: string }[] = [
    { id: 'users:read', label: 'View Users', group: 'User Management' },
    { id: 'users:write', label: 'Edit Users', group: 'User Management' },
    { id: 'users:delete', label: 'Delete Users', group: 'User Management' },
    { id: 'roles:read', label: 'View Roles', group: 'Role Management' },
    { id: 'roles:write', label: 'Manage Roles', group: 'Role Management' },
    { id: 'audit:read', label: 'View Audit Logs', group: 'Security' },
    { id: 'properties:create', label: 'Create Properties', group: 'Properties' },
    { id: 'properties:edit', label: 'Edit Properties', group: 'Properties' },
    { id: 'properties:delete', label: 'Delete Properties', group: 'Properties' },
    { id: 'payouts:request', label: 'Request Payouts', group: 'Finance' },
    { id: 'payouts:approve', label: 'Approve Payouts', group: 'Finance' },
    { id: 'settings:manage', label: 'Manage Settings', group: 'System' },
];

export default function RoleManager() {
    const [roles, setRoles] = useState<Role[]>(MOCK_ROLES);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleSaveRole = (updatedRole: Role) => {
        setRoles(prev => prev.map(r => r.id === updatedRole.id ? updatedRole : r));
        setIsEditing(false);
        setSelectedRole(null);
    };

    const togglePermission = (role: Role, permission: Permission) => {
        const hasPermission = role.permissions.includes(permission);
        const newPermissions = hasPermission
            ? role.permissions.filter(p => p !== permission)
            : [...role.permissions, permission];

        return { ...role, permissions: newPermissions };
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Roles List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Roles</h2>
                    <button className="text-sm text-[#00853E] font-medium hover:underline">
                        + New Role
                    </button>
                </div>
                <div className="divide-y divide-gray-100">
                    {roles.map(role => (
                        <button
                            key={role.id}
                            onClick={() => {
                                setSelectedRole(role);
                                setIsEditing(true);
                            }}
                            className={`w-full text-left p-4 hover:bg-gray-50 transition-colors flex items-center justify-between ${selectedRole?.id === role.id ? 'bg-green-50 border-l-4 border-[#00853E]' : ''
                                }`}
                        >
                            <div>
                                <div className="font-medium text-gray-900">{role.name}</div>
                                <div className="text-xs text-gray-500">{role.permissions.length} permissions</div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    ))}
                </div>
            </div>

            {/* Role Editor */}
            <div className="lg:col-span-2">
                {selectedRole ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Edit Role: {selectedRole.name}</h2>
                                <p className="text-sm text-gray-500">{selectedRole.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedRole(null)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleSaveRole(selectedRole)}
                                    className="px-4 py-2 bg-[#00853E] text-white rounded-lg text-sm font-medium hover:bg-green-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.entries(
                                    AVAILABLE_PERMISSIONS.reduce((acc, curr) => {
                                        (acc[curr.group] = acc[curr.group] || []).push(curr);
                                        return acc;
                                    }, {} as Record<string, typeof AVAILABLE_PERMISSIONS>)
                                ).map(([group, permissions]) => (
                                    <div key={group} className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">{group}</h3>
                                        <div className="space-y-2">
                                            {permissions.map(permission => (
                                                <label key={permission.id} className="flex items-center gap-3 cursor-pointer">
                                                    <div className="relative flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-[#00853E] checked:bg-[#00853E]"
                                                            checked={selectedRole.permissions.includes(permission.id)}
                                                            onChange={() => setSelectedRole(togglePermission(selectedRole, permission.id))}
                                                            disabled={selectedRole.isSystem && permission.id === 'users:read'} // Example of locked permission
                                                        />
                                                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm text-gray-700">{permission.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center h-full flex flex-col items-center justify-center text-gray-500">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Select a Role</h3>
                        <p className="max-w-xs mx-auto mt-2">Select a role from the list to view and edit its permissions.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

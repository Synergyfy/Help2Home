'use client';

import React from 'react';
import UserList from '@/components/dashboard/admin/users/UserList';
import { User } from '@/lib/mockSecurityData';

export default function AdminUsersPage() {
    const handleEditUser = (user: User) => {
        // In a real app, this would open a modal or navigate to an edit page
        console.log('Edit user:', user);
        alert(`Edit user: ${user.firstName} ${user.lastName}`);
    };

    return (
        <div className="pb-20">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-500">Manage system users, assign roles, and monitor status.</p>
                </div>
                <button className="px-4 py-2 bg-[#00853E] text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add User
                </button>
            </div>

            <UserList onEditUser={handleEditUser} />
        </div>
    );
}

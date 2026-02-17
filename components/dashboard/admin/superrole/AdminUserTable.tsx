'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlatformUser, useAdminStore } from '@/store/adminStore';
import { FiMoreVertical, FiUser, FiMail, FiCalendar, FiEye, FiEdit, FiTrash2, FiToggleRight, FiToggleLeft } from 'react-icons/fi';

interface AdminUserTableProps {
    users: PlatformUser[];
    title: string;
}

export default function AdminUserTable({ users, title }: AdminUserTableProps) {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const router = useRouter();
    const { updateUserStatus, deleteUser } = useAdminStore();

    const handleMenuToggle = (id: string) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const handleViewUser = (id: string) => {
        router.push(`/dashboard/admin/users/profile/${id}`);
        setOpenMenuId(null);
    };

    const handleEditUser = (id: string) => {
        router.push(`/dashboard/admin/users/edit/${id}`);
        setOpenMenuId(null);
    };

    const handleToggleStatus = (user: PlatformUser) => {
        const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
        updateUserStatus(user.id, newStatus);
        setOpenMenuId(null);
        alert(`User ${user.name} status changed to ${newStatus}`);
    };

    const handleDeleteUser = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete user ${name}? This action cannot be undone.`)) {
            deleteUser(id);
            setOpenMenuId(null);
            alert(`User ${name} deleted.`);
        }
    };

    if (users.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-brand-green-200 p-12 text-center shadow-sm">
                <FiUser className="mx-auto text-brand-green-300 mb-4" size={48} />
                <h3 className="text-lg font-bold text-brand-green-900">No {title} Found</h3>
                <p className="text-brand-green-500 mt-2">There are currently no users in this category.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <h3 className="text-lg font-black text-brand-green-900 tracking-tight">{title}</h3>
                <span className="px-3 py-1 bg-brand-green-100 text-brand-green-600 text-[10px] font-black rounded-full uppercase">
                    {users.length} Total
                </span>
            </div>

            <div className="bg-white rounded-2xl border border-brand-green-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-green-50 border-b border-brand-green-100">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-black text-brand-green-400 uppercase tracking-widest">User Details</th>
                            <th className="px-6 py-4 text-[10px] font-black text-brand-green-400 uppercase tracking-widest">Role</th>
                            <th className="px-6 py-4 text-[10px] font-black text-brand-green-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black text-brand-green-400 uppercase tracking-widest">Joined At</th>
                            <th className="px-6 py-4 text-[10px] font-black text-brand-green-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-green-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-brand-green-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 font-bold border border-emerald-100">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-brand-green-900">{user.name}</span>
                                            <span className="text-xs text-brand-green-500 flex items-center gap-1">
                                                <FiMail size={10} /> {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-bold text-brand-green-600 bg-brand-green-100 px-2 py-1 rounded-lg">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                            user.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                'bg-red-100 text-red-700'
                                        }`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-brand-green-500 text-xs text-nowrap">
                                        <FiCalendar size={12} />
                                        {user.joinedAt}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button 
                                        onClick={() => handleMenuToggle(user.id)}
                                        className="p-2 text-brand-green-400 hover:text-brand-green-900 hover:bg-brand-green-100 rounded-lg transition-all"
                                    >
                                        <FiMoreVertical size={18} />
                                    </button>
                                    {openMenuId === user.id && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-1000">
                                            <button 
                                                onClick={() => handleViewUser(user.id)}
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                <FiEye size={16} /> View User
                                            </button>
                                            <button 
                                                onClick={() => handleEditUser(user.id)}
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                <FiEdit size={16} /> Edit User
                                            </button>
                                            <button 
                                                onClick={() => handleToggleStatus(user)}
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            >
                                                {user.status === 'Active' ? <FiToggleLeft size={16} /> : <FiToggleRight size={16} />} 
                                                {user.status === 'Active' ? 'Suspend User' : 'Activate User'}
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteUser(user.id, user.name)}
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-100 w-full text-left"
                                            >
                                                <FiTrash2 size={16} /> Delete User
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

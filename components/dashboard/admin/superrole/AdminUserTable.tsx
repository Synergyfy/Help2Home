'use client'

import React from 'react';
import { PlatformUser } from '@/store/adminStore';
import { FiMoreVertical, FiUser, FiMail, FiCalendar, FiShield } from 'react-icons/fi';

interface AdminUserTableProps {
    users: PlatformUser[];
    title: string;
}

export default function AdminUserTable({ users, title }: AdminUserTableProps) {
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
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 text-brand-green-400 hover:text-brand-green-900 hover:bg-brand-green-100 rounded-lg transition-all">
                                        <FiMoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

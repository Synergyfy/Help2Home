'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlatformUser, useAdminStore } from '@/store/adminStore';
import { 
    FiMoreVertical, FiUser, FiMail, FiCalendar, FiEye, FiEdit, 
    FiTrash2, FiToggleRight, FiToggleLeft, FiShield, FiX, FiCommand 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminUserTableProps {
    users: PlatformUser[];
    title: string;
}

export default function AdminUserTable({ users, title }: AdminUserTableProps) {
    const [actionUser, setActionUser] = useState<PlatformUser | null>(null);
    const router = useRouter();
    const { updateUserStatus, deleteUser } = useAdminStore();

    const handleViewUser = (id: string) => {
        router.push(`/dashboard/admin/users/profile/${id}`);
        setActionUser(null);
    };

    const handleEditUser = (id: string) => {
        router.push(`/dashboard/admin/users/edit/${id}`);
        setActionUser(null);
    };

    const handleToggleStatus = (user: PlatformUser) => {
        const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
        updateUserStatus(user.id, newStatus);
        setActionUser(null);
    };

    const handleDeleteUser = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete user ${name}? This action cannot be undone.`)) {
            deleteUser(id);
            setActionUser(null);
        }
    };

    if (users.length === 0) {
        return (
            <div className="bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-200 p-20 text-center">
                <div className="size-20 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-6">
                    <FiUser className="text-gray-300" size={40} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No {title} Found</h3>
                <p className="text-gray-500 max-w-xs mx-auto">The digital archives are currently empty.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-6 bg-brand-green rounded-full" />
                    <h3 className="text-xl font-semibold text-gray-900 tracking-tight">{title}</h3>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 rounded-full">
                    <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest">
                        {users.length} Records
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-black/[0.02] overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Digital Identity</th>
                                <th className="px-8 py-5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Sector</th>
                                <th className="px-8 py-5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Access Status</th>
                                <th className="px-8 py-5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Onboarding Date</th>
                                <th className="px-8 py-5 text-[10px] font-semibold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-brand-green-50/30 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="size-12 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center text-white font-semibold text-lg border-2 border-white shadow-md group-hover:scale-110 transition-transform">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div className={`absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-white shadow-sm ${user.status === 'Active' ? 'bg-emerald-500' :
                                                    user.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'
                                                    }`} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-900 group-hover:text-brand-green transition-colors">{user.name}</span>
                                                <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                                                    <FiMail size={12} className="text-gray-300" /> {user.email}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-100 rounded-xl">
                                            <FiShield size={12} className="text-brand-green" />
                                            <span className="text-[10px] font-semibold text-gray-700 uppercase tracking-tighter">
                                                {user.role}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-widest ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                            user.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            <div className={`size-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' :
                                                user.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'
                                                }`} />
                                            {user.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2.5 text-gray-500">
                                            <div className="p-1.5 bg-gray-50 rounded-lg">
                                                <FiCalendar size={14} className="text-gray-400" />
                                            </div>
                                            <span className="text-xs font-semibold">{user.joinedAt}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button
                                            onClick={() => setActionUser(user)}
                                            className="p-2.5 text-gray-400 hover:text-brand-green hover:bg-brand-green-50 rounded-2xl transition-all active:scale-90"
                                        >
                                            <FiMoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Action Command Modal */}
            <AnimatePresence>
                {actionUser && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActionUser(null)}
                            className="absolute inset-0 bg-brand-green-950/40 backdrop-blur-md"
                        />
                        
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20"
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3 px-4 py-1.5 bg-brand-green/10 text-brand-green rounded-full">
                                        <FiCommand size={14} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">User Command Center</span>
                                    </div>
                                    <button 
                                        onClick={() => setActionUser(null)}
                                        className="p-2 hover:bg-white rounded-xl transition-all text-gray-400 hover:text-gray-900 shadow-sm"
                                    >
                                        <FiX size={20} />
                                    </button>
                                </div>

                                <div className="flex items-center gap-5">
                                    <div className="size-20 bg-gradient-to-tr from-brand-green to-emerald-400 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-brand-green/20">
                                        {actionUser.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{actionUser.name}</h2>
                                        <p className="text-gray-500 font-medium">{actionUser.email}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-[10px] font-bold px-2.5 py-1 bg-gray-900 text-white rounded-lg uppercase tracking-wider">{actionUser.role}</span>
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                                                actionUser.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                {actionUser.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Options */}
                            <div className="p-8 grid grid-cols-1 gap-3">
                                <button
                                    onClick={() => handleViewUser(actionUser.id)}
                                    className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-brand-green hover:bg-brand-green-50 transition-all group text-left"
                                >
                                    <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-brand-green group-hover:text-white transition-all">
                                        <FiEye size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Inspect Profile</div>
                                        <div className="text-xs text-gray-500">Detailed overview of user activities and data</div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleEditUser(actionUser.id)}
                                    className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-brand-green hover:bg-brand-green-50 transition-all group text-left"
                                >
                                    <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-brand-green group-hover:text-white transition-all">
                                        <FiEdit size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Modify Parameters</div>
                                        <div className="text-xs text-gray-500">Update user roles, permissions and personal info</div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleToggleStatus(actionUser)}
                                    className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-brand-green hover:bg-brand-green-50 transition-all group text-left"
                                >
                                    <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-brand-green group-hover:text-white transition-all">
                                        {actionUser.status === 'Active' ? <FiToggleLeft size={20} /> : <FiToggleRight size={20} />}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">
                                            {actionUser.status === 'Active' ? 'Suspend Access' : 'Restore Access'}
                                        </div>
                                        <div className="text-xs text-gray-500">Temporarily restrict or permit platform entry</div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleDeleteUser(actionUser.id, actionUser.name)}
                                    className="flex items-center gap-4 p-4 rounded-2xl border border-red-50 hover:border-red-500 hover:bg-red-50 transition-all group text-left mt-2"
                                >
                                    <div className="p-3 bg-red-50 text-red-500 rounded-xl group-hover:bg-red-500 group-hover:text-white transition-all">
                                        <FiTrash2 size={20} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-red-600">Purge Record</div>
                                        <div className="text-xs text-red-400">Permanently remove user from the ecosystem</div>
                                    </div>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

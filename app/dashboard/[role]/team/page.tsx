'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/userStore';
import InviteTeamModal from '@/components/dashboard/shared/InviteTeamModal';
import { HiOutlineUserPlus, HiOutlineUserGroup, HiOutlineEnvelope, HiOutlineClock } from '@/components/shared/Icons';
import FadeIn from '@/components/FadeIn';

const MOCK_TEAM = [
    { id: 1, name: 'John Agent', email: 'john@realty.com', role: 'agent', status: 'active', joined: '2023-11-12' },
    { id: 2, name: 'Sarah Caretaker', email: 'sarah@help.com', role: 'caretaker', status: 'pending', joined: '2024-01-05' },
];

export default function TeamPage() {
    const { activeRole } = useUserStore();
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

    return (
        <FadeIn>
            <div className="p-4 md:p-8 space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Partner Network</h1>
                        <p className="text-gray-500">Manage your trusted network of agents, landlords, and caretakers.</p>
                    </div>
                    <button
                        onClick={() => setIsInviteModalOpen(true)}
                        className="flex items-center justify-center gap-2 bg-brand-green text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-brand-green/20 hover:bg-green-700 transition-all active:scale-[0.98]"
                    >
                        <HiOutlineUserPlus size={20} />
                        Invite Partner
                    </button>
                </div>

                {/* Stats / Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green font-bold">
                            <HiOutlineUserGroup size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Partners</p>
                            <p className="text-2xl font-black text-gray-900">12</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                            <HiOutlineClock size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pending</p>
                            <p className="text-2xl font-black text-gray-900">3</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 text-brand-green">
                        <div className="size-12 rounded-2xl bg-brand-green flex items-center justify-center text-white font-bold shadow-lg shadow-brand-green/20">
                            <HiOutlineEnvelope size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Invites Sent</p>
                            <p className="text-2xl font-black">45</p>
                        </div>
                    </div>
                </div>

                {/* Team Table */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50">
                        <h3 className="font-bold text-gray-900">Network Directory</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Partner Details</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Assigned Role</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {MOCK_TEAM.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 font-bold">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">{member.name}</p>
                                                    <p className="text-xs text-gray-500">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-gray-100 text-gray-600 rounded-lg">
                                                {member.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${member.status === 'active' ? 'bg-green-50 text-brand-green' : 'bg-orange-50 text-orange-600'
                                                }`}>
                                                {member.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors">Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-6 bg-gray-50/50 text-center">
                        <button className="text-xs font-bold text-brand-green hover:underline">View All Network History</button>
                    </div>
                </div>

                <InviteTeamModal
                    isOpen={isInviteModalOpen}
                    onClose={() => setIsInviteModalOpen(false)}
                />
            </div>
        </FadeIn>
    );
}

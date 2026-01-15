'use client';

import React, { useState } from 'react';
import {
    HiOutlineUserGroup,
    HiOutlinePlus,
    HiOutlineEnvelope,
    HiOutlinePhone,
    HiOutlineCheckCircle,
    HiOutlineClock
} from 'react-icons/hi2';

interface Partner {
    id: string;
    name: string;
    role: 'Landlord' | 'Agent';
    email: string;
    phone: string;
    properties: number;
    status: 'Active' | 'Pending' | 'Inactive';
    joinedDate: string;
}

const MOCK_PARTNERS: Partner[] = [
    {
        id: '1',
        name: 'Funke Adeyemi',
        role: 'Landlord',
        email: 'funke@example.com',
        phone: '+234 801 234 5678',
        properties: 4,
        status: 'Active',
        joinedDate: '2025-10-20'
    },
    {
        id: '2',
        name: 'Tunde Bakare',
        role: 'Agent',
        email: 'tunde@example.com',
        phone: '+234 802 345 6789',
        properties: 2,
        status: 'Active',
        joinedDate: '2025-11-15'
    },
    {
        id: '3',
        name: 'Amina Hassan',
        role: 'Landlord',
        email: 'amina@example.com',
        phone: '+234 803 456 7890',
        properties: 1,
        status: 'Pending',
        joinedDate: '2026-01-05'
    }
];

export default function TeamPage() {
    const [partners] = useState<Partner[]>(MOCK_PARTNERS);
    const [filter, setFilter] = useState<'All' | 'Landlord' | 'Agent'>('All');

    const filteredPartners = filter === 'All'
        ? partners
        : partners.filter(p => p.role === filter);

    const activePartners = partners.filter(p => p.status === 'Active').length;
    const pendingInvites = partners.filter(p => p.status === 'Pending').length;

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Partner Network</h1>
                    <p className="text-gray-500 mt-1">Collaborate with landlords and agents for seamless property management.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100">
                    <HiOutlinePlus size={20} />
                    Invite Partner
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green mb-4">
                        <HiOutlineUserGroup size={24} />
                    </div>
                    <div className="text-2xl font-black text-gray-900">{activePartners}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Partners</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                        <HiOutlineClock size={24} />
                    </div>
                    <div className="text-2xl font-black text-gray-900">{pendingInvites}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pending Invites</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                        <HiOutlineCheckCircle size={24} />
                    </div>
                    <div className="text-2xl font-black text-gray-900">{partners.reduce((acc, p) => acc + p.properties, 0)}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Shared Properties</div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-gray-100">
                {(['All', 'Landlord', 'Agent'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-6 py-3 font-bold text-sm transition-all border-b-2 ${filter === tab
                                ? 'border-brand-green text-brand-green'
                                : 'border-transparent text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Partners List */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-50">
                    {filteredPartners.length > 0 ? (
                        filteredPartners.map((partner) => (
                            <div key={partner.id} className="p-6 hover:bg-gray-50/50 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="size-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green font-black text-lg">
                                            {partner.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-gray-900">{partner.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest ${partner.role === 'Landlord'
                                                        ? 'bg-blue-50 text-blue-600'
                                                        : 'bg-purple-50 text-purple-600'
                                                    }`}>
                                                    {partner.role}
                                                </span>
                                                <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest ${partner.status === 'Active'
                                                        ? 'bg-green-50 text-green-600'
                                                        : partner.status === 'Pending'
                                                            ? 'bg-orange-50 text-orange-600'
                                                            : 'bg-gray-50 text-gray-600'
                                                    }`}>
                                                    {partner.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                        <div className="text-sm">
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <HiOutlineEnvelope size={16} />
                                                <span>{partner.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500 mt-1">
                                                <HiOutlinePhone size={16} />
                                                <span>{partner.phone}</span>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="text-sm font-black text-gray-900">{partner.properties} Properties</div>
                                            <div className="text-xs text-gray-400 mt-1">Joined {new Date(partner.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button className="p-2.5 bg-brand-green text-white rounded-xl hover:bg-green-700 transition-colors">
                                                <HiOutlineEnvelope size={18} />
                                            </button>
                                            <button className="p-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors">
                                                <HiOutlinePhone size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center">
                            <HiOutlineUserGroup className="size-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">No {filter.toLowerCase()} partners found.</p>
                            <button className="mt-4 text-sm font-bold text-brand-green hover:underline">
                                Invite your first {filter.toLowerCase()} partner
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

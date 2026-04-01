'use client'

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAdminStore } from '@/store/adminStore';
import AdminUserTable from '@/components/dashboard/admin/superrole/AdminUserTable';
import { FiUsers, FiHome, FiTrendingUp, FiActivity, FiShield, FiPlus } from 'react-icons/fi';
import AddUserModal from '@/components/dashboard/admin/users/AddUserModal'; // Import the new modal

export default function AdminUsersPage() {
    const searchParams = useSearchParams();
    const queryTab = searchParams.get('tab');

    const [activeTab, setActiveTab] = useState<'ecosystem' | 'tenants' | 'investors' | 'landlords' | 'agents' | 'caretakers'>('ecosystem');
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

    const { users, addUser } = useAdminStore();

    useEffect(() => {
        if (queryTab) {
            setActiveTab(queryTab as any);
        }
    }, [queryTab]);

    const handleAddUser = (userData: any) => {
        addUser(userData);
        setIsAddUserModalOpen(false);
    };

    const tabs = [
        { id: 'ecosystem', label: 'Service Network', icon: FiActivity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { id: 'tenants', label: 'Resident Registry', icon: FiHome, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'investors', label: 'Venture Investors', icon: FiTrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    ];

    const isEcosystemActive = ['ecosystem', 'landlords', 'agents', 'caretakers'].includes(activeTab);

    // Stats calculations
    const stats = [
        { label: 'Total Members', value: users.length, icon: FiUsers, trend: '+12%', color: 'bg-emerald-500' },
        { label: 'Network Partners', value: users.filter(u => ['Landlord', 'Agent', 'Caretaker'].includes(u.role)).length, icon: FiShield, trend: '+5%', color: 'bg-blue-500' },
        { label: 'Residents', value: users.filter(u => u.role === 'Tenant').length, icon: FiHome, trend: '+8%', color: 'bg-amber-500' },
        { label: 'Investors', value: users.filter(u => u.role === 'Investor').length, icon: FiTrendingUp, trend: '+2%', color: 'bg-purple-500' },
    ];

    return (
        <div className="pb-20 space-y-8">
            {/* Premium Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-brand-green-900 via-brand-green-800 to-emerald-900 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/10 rounded-full -ml-10 -mb-10 blur-2xl" />

                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                <FiUsers className="text-white" size={24} />
                            </div>
                            <span className="text-emerald-400 font-semibold tracking-widest text-xs uppercase">Management Suite</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-2">
                            Organization <span className="text-emerald-400">Control</span>
                        </h1>
                        <p className="text-emerald-100/70 font-medium max-w-lg">
                            Oversee and coordinate the entire Help2Home stakeholder ecosystem from a single unified motherboard.
                        </p>
                    </div>

                    <button
                        onClick={() => setIsAddUserModalOpen(true)}
                        className="group relative flex items-center gap-3 px-8 py-4 bg-white text-brand-green-900 rounded-2xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/20"
                    >
                        <div className="p-1.5 bg-brand-green-100 rounded-lg group-hover:rotate-90 transition-transform">
                            <FiPlus size={20} className="text-brand-green-600" />
                        </div>
                        Add New Member
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-[10px] font-semibold py-1 px-2.5 bg-emerald-50 text-emerald-600 rounded-full uppercase tracking-wider">
                                {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-gray-500 font-medium text-sm">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm min-h-[600px] flex flex-col pb-20 -mb-20">
                {/* Modern Navigation */}
                <div className="flex flex-col md:flex-row border-b border-gray-100">
                    <div className="flex flex-1 p-2 gap-1 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id || (tab.id === 'ecosystem' && isEcosystemActive);
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-xs font-semibold uppercase tracking-widest transition-all ${isActive
                                        ? `${tab.bg} ${tab.color} shadow-sm`
                                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <tab.icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Sub-tabs for Ecosystem */}
                {isEcosystemActive && (activeTab !== 'tenants' && activeTab !== 'investors') && (
                    <div className="px-8 py-4 bg-gray-50/50 flex gap-2 border-b border-gray-100 overflow-x-auto no-scrollbar">
                        {[
                            { id: 'ecosystem', label: 'Whole Network' },
                            { id: 'landlords', label: 'Landlords' },
                            { id: 'agents', label: 'Agents' },
                            { id: 'caretakers', label: 'Caretakers' },
                        ].map((sub) => (
                            <button
                                key={sub.id}
                                onClick={() => setActiveTab(sub.id as any)}
                                className={`px-5 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-widest transition-all ${activeTab === sub.id
                                    ? 'bg-brand-green-900 text-white shadow-lg shadow-brand-green-900/20'
                                    : 'bg-white text-gray-400 hover:text-gray-600 border border-gray-200 shadow-sm'
                                    }`}
                            >
                                {sub.label}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex-1 p-4 lg:p-8">
                    {/* Table Containers */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Dynamic Rendering Based on Selection */}
                        {(activeTab === 'ecosystem' || isEcosystemActive) && (activeTab !== 'tenants' && activeTab !== 'investors') && (
                            <AdminUserTable
                                title={activeTab === 'ecosystem' ? "All Service Network Partners" : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} List`}
                                users={users.filter(u => {
                                    if (activeTab === 'ecosystem') return ['Landlord', 'Agent', 'Caretaker'].includes(u.role);
                                    return u.role.toLowerCase() === activeTab.slice(0, -1);
                                }).map(u => ({ ...u, role: u.role as any }))}
                            />
                        )}

                        {activeTab === 'tenants' && (
                            <AdminUserTable
                                title="Resident Tenants"
                                users={users.filter(u => u.role === 'Tenant')}
                            />
                        )}

                        {activeTab === 'investors' && (
                            <AdminUserTable
                                title="Venture Investors"
                                users={users.filter(u => u.role === 'Investor')}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Add User Modal */}
            <AddUserModal
                isOpen={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                onAddUser={handleAddUser}
            />
        </div>
    );
}

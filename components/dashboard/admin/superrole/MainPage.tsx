'use client'

import React, { useState, useEffect } from 'react';
import {
    FiActivity, FiDatabase, FiShield, FiKey,
    FiRefreshCw, FiSlash, FiTrash2, FiMessageSquare,
    FiServer, FiZap, FiUsers, FiHome, FiDollarSign, FiList, FiTrendingUp
} from 'react-icons/fi';
import ActionCard from './ActionCard';
import { LoginModal } from '@/components/dashboard/admin/superrole/LoginModal';
import { useAdminStore } from '@/store/adminStore';
import AdminPropertyModeration from './AdminPropertyModeration';
import AdminFinancials from './AdminFinancials';
import AdminAuditLogs from './AdminAuditLogs';
import { useSearchParams } from 'next/navigation';

interface AdminTab {
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    count?: number;
}

const SuperAdmin = () => {
    const searchParams = useSearchParams();
    const queryTab = searchParams.get('tab');

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'finance' | 'logs' | 'system'>('overview');

    // Synchronization with URL parameters
    useEffect(() => {
        if (queryTab) {
            setActiveTab(queryTab as any);
        }
    }, [queryTab]);

    const { platformStats, moderationQueue, users } = useAdminStore();

    if (!isAuthenticated) return <LoginModal onLogin={setIsAuthenticated} />;

    const tabs: AdminTab[] = [
        { id: 'overview', label: 'Overview', icon: FiTrendingUp },
        { id: 'properties', label: 'Properties', icon: FiHome, count: moderationQueue.length },
        { id: 'finance', label: 'Finance', icon: FiDollarSign },
        { id: 'logs', label: 'Audit Logs', icon: FiList },
        { id: 'system', label: 'System', icon: FiServer },
    ];

    return (
        <div className="min-h-screen bg-brand-green-50 font-sans text-brand-green-900 pb-20">
            {/* Brand Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-emerald-100 h-16">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500 rounded-lg text-white">
                            <FiShield size={20} />
                        </div>
                        <span className="font-extrabold text-xl tracking-tight text-emerald-900 uppercase">Super Admin</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
                            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-tighter">Live Access Control</span>
                        </div>
                        <button onClick={() => setIsAuthenticated(false)} className="text-sm font-medium text-brand-green-500 hover:text-red-500">Sign Out</button>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="bg-white border-b border-brand-green-200 sticky top-16 z-30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex gap-8 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 py-4 border-b-2 transition-all whitespace-nowrap px-1 ${activeTab === tab.id
                                    ? 'border-emerald-500 text-emerald-600 font-bold'
                                    : 'border-transparent text-brand-green-500 hover:text-brand-green-700'
                                    }`}
                            >
                                <tab.icon size={18} />
                                <span className="text-sm">{tab.label}</span>
                                {tab.count !== undefined && tab.count > 0 && (
                                    <span className="ml-1 px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full text-[10px] font-black leading-none">
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-black text-brand-green-900">Platform Health</h1>
                            <p className="text-brand-green-500">Real-time performance and audit aggregation.</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Total Users', value: platformStats.totalUsers.toLocaleString(), icon: FiUsers, color: 'text-blue-500', bg: 'bg-blue-50' },
                                { label: 'Live Listings', value: platformStats.activeProperties, icon: FiHome, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                                { label: 'Pending Verifications', value: platformStats.pendingVerifications, icon: FiActivity, color: 'text-amber-500', bg: 'bg-amber-50' },
                                { label: 'Total Revenue', value: platformStats.revenueTotal, icon: FiDollarSign, color: 'text-purple-500', bg: 'bg-purple-50' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-brand-green-200 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                                            <stat.icon size={20} />
                                        </div>
                                        <span className="text-[10px] font-bold text-brand-green-400 uppercase tracking-wider">Last 24h</span>
                                    </div>
                                    <div className="text-2xl font-black text-brand-green-900">{stat.value}</div>
                                    <div className="text-sm text-brand-green-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity / Quick Actions Placeholder */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <section className="bg-white rounded-2xl border border-brand-green-200 p-6 shadow-sm">
                                <h3 className="font-bold mb-4 flex items-center gap-2 tracking-tight">
                                    <FiActivity className="text-emerald-500" /> Recent System Audit
                                </h3>
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex gap-4 p-3 hover:bg-brand-green-50 rounded-xl transition-colors border-l-2 border-emerald-500 bg-emerald-50/20">
                                            <div className="text-xs text-brand-green-400 font-mono">09:4{i}</div>
                                            <div>
                                                <div className="text-sm font-bold">Admin Override: Property Approved</div>
                                                <div className="text-[10px] text-brand-green-500 uppercase font-black">SuperAdmin • ID: #PROP_12{i}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-6 py-2 text-xs font-bold text-brand-green-400 hover:text-emerald-600 uppercase tracking-widest transition-colors">View All Logs</button>
                            </section>

                            <section className="bg-emerald-900 rounded-2xl p-6 text-white shadow-xl shadow-emerald-100 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold mb-2 flex items-center gap-2"><FiMessageSquare size={18} /> Global Service Alert</h3>
                                    <p className="text-emerald-200 text-xs mb-4">Broadcast a priority banner to all active user dashboard sessions.</p>
                                    <textarea className="w-full bg-emerald-800/50 border border-emerald-700 rounded-lg p-3 text-sm mb-4 placeholder:text-emerald-500 outline-none focus:ring-1 focus:ring-emerald-400" rows={4} placeholder="e.g. Scheduled maintenance starting at 02:00 UTC..."></textarea>
                                </div>
                                <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">Push Broadcast</button>
                            </section>
                        </div>
                    </div>
                )}


                {activeTab === 'properties' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black text-brand-green-900">Content Moderation</h2>
                            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                                {moderationQueue.length} Pending Review
                            </span>
                        </div>
                        <AdminPropertyModeration />
                    </div>
                )}

                {activeTab === 'finance' && (
                    <AdminFinancials />
                )}

                {activeTab === 'logs' && (
                    <AdminAuditLogs />
                )}

                {activeTab === 'system' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-2xl font-black mb-6 font-mono text-emerald-900 tracking-tighter">System Console</h2>
                            <section className="bg-white rounded-2xl border border-brand-green-200 shadow-sm p-6 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <FiDatabase size={120} />
                                </div>
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <FiDatabase size={18} className="text-emerald-500" /> Direct SQL Query
                                </h3>
                                <textarea
                                    className="w-full h-48 bg-brand-green-900 text-emerald-400 font-mono text-sm p-4 rounded-xl mb-4 resize-none focus:ring-1 focus:ring-emerald-500 outline-none"
                                    placeholder="SELECT * FROM transactions WHERE status = 'pending' LIMIT 10..."
                                />
                                <div className="flex items-center justify-between">
                                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-md">
                                        Execute Query
                                    </button>
                                    <span className="text-[10px] font-black text-brand-green-400 uppercase tracking-widest">Read-Only Session</span>
                                </div>
                            </section>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-brand-green-900 mb-6 opacity-0">Maintenance</h2>
                            <section className="bg-white rounded-2xl border border-brand-green-200 p-6 shadow-sm">
                                <h3 className="font-bold mb-4 flex items-center gap-2"><FiServer size={18} /> Maintenance Tools</h3>
                                <div className="space-y-3">
                                    <button className="w-full py-4 px-4 rounded-xl border border-brand-green-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-sm font-bold flex items-center justify-between group transition-all">
                                        <div className="flex items-center gap-3">
                                            <FiZap className="text-amber-500" />
                                            <span>Flush Redis Cache</span>
                                        </div>
                                        <span className="text-[10px] bg-brand-green-100 px-2 py-1 rounded-md group-hover:bg-emerald-100 transition-colors uppercase font-black">Cluster-Wide</span>
                                    </button>
                                    <button className="w-full py-4 px-4 rounded-xl border border-brand-green-200 hover:border-emerald-500 hover:bg-emerald-50/30 text-sm font-bold flex items-center justify-between group transition-all">
                                        <div className="flex items-center gap-3">
                                            <FiActivity className="text-emerald-500" />
                                            <span>Rebuild Search Index</span>
                                        </div>
                                        <span className="text-[10px] bg-brand-green-100 px-2 py-1 rounded-md group-hover:bg-emerald-100 transition-colors uppercase font-black">Vast Data Store</span>
                                    </button>
                                    <button className="w-full py-4 px-4 rounded-xl border border-brand-green-200 hover:border-red-500 hover:bg-red-50/30 text-sm font-bold flex items-center justify-between group transition-all">
                                        <div className="flex items-center gap-3">
                                            <FiSlash className="text-red-500" />
                                            <span className="text-red-600">Enter Maintenance Mode</span>
                                        </div>
                                        <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-md uppercase font-black">Destructive</span>
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SuperAdmin;

'use client'



import React, { useState } from 'react';
import {
    FiActivity, FiDatabase, FiShield, FiKey,
    FiRefreshCw, FiSlash, FiTrash2, FiMessageSquare,
    FiServer, FiZap
} from 'react-icons/fi';
import ActionCard from './ActionCard';
import { LoginModal } from '@/components/dashboard/admin/superrole/LoginModal';

const SuperAdmin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (!isAuthenticated) return <LoginModal onLogin={setIsAuthenticated} />;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Brand Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-emerald-100 h-16">
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500 rounded-lg text-white">
                            <FiShield size={20} />
                        </div>
                        <span className="font-extrabold text-xl tracking-tight text-emerald-900">SUPER_ADMIN</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
                            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-emerald-700 uppercase">Live: Write Access</span>
                        </div>
                        <button onClick={() => setIsAuthenticated(false)} className="text-sm font-medium text-slate-500 hover:text-red-500">Sign Out</button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900">System Overrides</h1>
                    <p className="text-slate-500">Execute restricted administrative operations across the cluster.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Section: User Intervention */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-emerald-50/30">
                                <h3 className="font-bold flex items-center gap-2 text-emerald-900">
                                    <FiActivity size={18} /> User Account Intervention
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="flex gap-2 mb-6">
                                    <input className="flex-1 bg-slate-50 border-slate-200 rounded-xl px-4 py-2 text-sm" placeholder="User UUID or Email..." />
                                    <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold">Search</button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ActionCard
                                        title="Force Password Reset"
                                        icon={FiKey}
                                        description="Trigger immediate email reset link"
                                        colorClass="bg-blue-50 text-blue-600"
                                    />
                                    <ActionCard
                                        title="Unlock Account"
                                        icon={FiRefreshCw}
                                        description="Clear brute-force lockouts"
                                        colorClass="bg-amber-50 text-amber-600"
                                    />
                                    <ActionCard
                                        title="Suspend User"
                                        icon={FiSlash}
                                        description="Revoke access immediately"
                                        colorClass="bg-red-50 text-red-600"
                                    />
                                    <ActionCard
                                        title="Purge Data"
                                        icon={FiTrash2}
                                        description="GDPR compliant erasure"
                                        colorClass="bg-slate-100 text-slate-600"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Database Console */}
                        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <FiDatabase size={18} className="text-emerald-500" /> Direct Database Query
                            </h3>
                            <textarea
                                className="w-full h-32 bg-slate-900 text-emerald-400 font-mono text-sm p-4 rounded-xl mb-4"
                                placeholder="SELECT * FROM transactions WHERE status = 'pending'..."
                            />
                            <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2 rounded-xl font-bold transition-all">
                                Execute Read-Only Query
                            </button>
                        </section>
                    </div>

                    {/* Sidebar Tools */}
                    <div className="space-y-6">
                        <section className="bg-white rounded-2xl border border-slate-200 p-6">
                            <h3 className="font-bold mb-4 flex items-center gap-2"><FiServer size={18} /> System Health</h3>
                            <div className="space-y-2">
                                <button className="w-full py-2 px-4 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm font-medium flex items-center justify-between">
                                    <span>Flush Redis Cache</span>
                                    <FiZap size={14} className="text-amber-500" />
                                </button>
                                <button className="w-full py-2 px-4 rounded-lg border border-slate-200 hover:bg-slate-50 text-sm font-medium flex items-center justify-between">
                                    <span>Rebuild Search Index</span>
                                    <FiActivity size={14} className="text-emerald-500" />
                                </button>
                            </div>
                        </section>

                        <section className="bg-emerald-900 rounded-2xl p-6 text-white shadow-xl shadow-emerald-200">
                            <h3 className="font-bold mb-2 flex items-center gap-2"><FiMessageSquare size={18} /> Global Alert</h3>
                            <p className="text-emerald-200 text-xs mb-4">Post a banner to all active user sessions.</p>
                            <textarea className="w-full bg-emerald-800/50 border border-emerald-700 rounded-lg p-3 text-sm mb-4 placeholder:text-emerald-500" rows={3} placeholder="Maintenance starting at..."></textarea>
                            <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 rounded-lg text-xs font-black uppercase tracking-widest">Broadcast</button>
                        </section>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default SuperAdmin;
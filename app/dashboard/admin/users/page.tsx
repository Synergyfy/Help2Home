import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAdminStore } from '@/store/adminStore';
import AdminUserTable from '@/components/dashboard/admin/superrole/AdminUserTable';
import { FiUsers, FiHome, FiTrendingUp, FiActivity, FiShield, FiPlus } from 'react-icons/fi';

export default function AdminUsersPage() {
    const searchParams = useSearchParams();
    const queryTab = searchParams.get('tab');

    const [activeTab, setActiveTab] = useState<'ecosystem' | 'tenants' | 'investors' | 'landlords' | 'agents' | 'caretakers'>('ecosystem');

    // URL Sync
    useEffect(() => {
        if (queryTab) {
            setActiveTab(queryTab as any);
        }
    }, [queryTab]);

    const { users } = useAdminStore();

    // Mapping of tabs and hierarchy
    const tabs = [
        { id: 'ecosystem', label: 'Service Network', icon: FiActivity },
        { id: 'tenants', label: 'Resident Registry', icon: FiHome },
        { id: 'investors', label: 'Venture Investors', icon: FiTrendingUp },
    ];

    const isEcosystemActive = ['ecosystem', 'landlords', 'agents', 'caretakers'].includes(activeTab);

    return (
        <div className="pb-20 space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Organization Control</h1>
                    <p className="text-slate-500 font-medium">Coordinate the Help2Home stakeholder ecosystem.</p>
                </div>
                <button className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg active:scale-95 flex items-center gap-2">
                    <FiPlus size={18} /> Add New Member
                </button>
            </div>

            {/* Hierarchy Tabs */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex border-b border-slate-100 bg-slate-50/50">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 flex items-center justify-center gap-3 py-4 text-xs font-black uppercase tracking-widest transition-all ${(activeTab === tab.id || (tab.id === 'ecosystem' && isEcosystemActive))
                                    ? 'bg-white text-emerald-600 border-b-2 border-emerald-500'
                                    : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Sub-tabs for Ecosystem */}
                {isEcosystemActive && (activeTab !== 'tenants' && activeTab !== 'investors') && (
                    <div className="px-6 py-3 bg-white flex gap-4 border-b border-slate-100 overflow-x-auto no-scrollbar">
                        {[
                            { id: 'ecosystem', label: 'Whole Network' },
                            { id: 'landlords', label: 'Landlords' },
                            { id: 'agents', label: 'Agents' },
                            { id: 'caretakers', label: 'Caretakers' },
                        ].map((sub) => (
                            <button
                                key={sub.id}
                                onClick={() => setActiveTab(sub.id as any)}
                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${activeTab === sub.id
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                    }`}
                            >
                                {sub.label}
                            </button>
                        ))}
                    </div>
                )}

                <div className="p-1">
                    {/* Dynamic Rendering Based on Selection */}
                    {(activeTab === 'ecosystem' || isEcosystemActive) && (activeTab !== 'tenants' && activeTab !== 'investors') && (
                        <AdminUserTable
                            title={activeTab === 'ecosystem' ? "All Service Network Partners" : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} List`}
                            users={users.filter(u => {
                                if (activeTab === 'ecosystem') return ['Landlord', 'Agent', 'Caretaker'].includes(u.role);
                                return u.role.toLowerCase() === activeTab.slice(0, -1); // Simple mapping landlords -> Landlord
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
    );
}

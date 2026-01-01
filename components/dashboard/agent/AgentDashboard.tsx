'use client';

import {
    MdTrendingUp, MdPeople, MdHome, MdVpnKey,
    MdSchedule, MdMoreVert, MdArrowForward
} from 'react-icons/md';

// Professional Summary Component
const StatCard = ({ label, value, trend, icon: Icon, color }: any) => (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-xl`}>
                <Icon className={color.replace('bg-', 'text-')} />
            </div>
            {trend && (
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    {trend}
                </span>
            )}
        </div>
        <div className="mt-4">
            <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{label}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
    </div>
);

export default function AgentDashboard() {
    return (
        <div className="space-y-6 pb-12">
            {/* Top Bar - Responsive Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Developer Portfolio</h1>
                    <p className="text-sm text-gray-500">Managing 12 active projects across Lagos.</p>
                </div>
                <button className="bg-[#00853E] text-white px-6 py-2.5 rounded-xl font-medium text-sm shadow-lg shadow-green-900/20 hover:bg-green-700 transition-all w-full md:w-auto">
                    + New Listing
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Commission" value="₦4.2M" trend="+12.5%" icon={MdTrendingUp} color="bg-green-600" />
                <StatCard label="Active Leads" value="84" trend="+5 new" icon={MdPeople} color="bg-blue-600" />
                <StatCard label="Properties Sold" value="18" icon={MdHome} color="bg-purple-600" />
                <StatCard label="Pending Closings" value="3" icon={MdVpnKey} color="bg-orange-600" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Listings Table - Main Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                            <h2 className="font-bold text-gray-900">High-Performance Listings</h2>
                            <button className="text-[#00853E] text-sm font-semibold hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 text-gray-400 uppercase text-[10px] font-bold tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Property</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Views</th>
                                        <th className="px-6 py-4">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {[
                                        { name: 'Skyline Terrace', loc: 'Ikoyi', status: 'Active', views: '1.2k', price: '₦150M' },
                                        { name: 'Palm Grove Villa', loc: 'Lekki Phase 1', status: 'Pending', views: '850', price: '₦85M' },
                                        { name: 'The Penthouse', loc: 'Victoria Island', status: 'Active', views: '2.4k', price: '₦320M' },
                                    ].map((item, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                                                <div className="text-xs text-gray-500">{item.loc}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium">{item.views}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-gray-900">{item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Upcoming Viewings */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <MdSchedule className="text-[#00853E]" /> Scheduled Inspections
                        </h2>
                        <div className="space-y-4">
                            {[1, 2].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/30">
                                    <div className="flex gap-4 items-center">
                                        <div className="text-center bg-white p-2 rounded-lg border border-gray-100 min-w-[60px]">
                                            <div className="text-xs text-gray-400 font-bold uppercase">Dec</div>
                                            <div className="text-lg font-bold text-gray-900">28</div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">Mr. Adebayo - Inspection</div>
                                            <div className="text-xs text-gray-500">Skyline Terrace • 10:30 AM</div>
                                        </div>
                                    </div>
                                    <button className="p-2 hover:bg-white rounded-full transition-colors">
                                        <MdArrowForward className="text-gray-400" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Side Rail - Marketing & Leads */}
                <div className="space-y-6">
                    <div className="bg-[#00853E] text-white p-6 rounded-3xl shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg">Marketing Boost</h3>
                            <p className="text-white/80 text-xs mt-2 leading-relaxed">
                                Your listings are currently reaching 40% more people this week.
                            </p>
                            <button className="mt-4 bg-white text-[#00853E] px-4 py-2 rounded-xl text-xs font-bold hover:bg-opacity-90 transition-all">
                                Run Campaign
                            </button>
                        </div>
                        {/* Decorative circle */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 className="font-bold text-gray-900 mb-4">Recent Leads</h2>
                        <div className="space-y-5">
                            {[
                                { name: 'Sarah Jenkins', type: 'Buyer', time: '2m ago' },
                                { name: 'David Chen', type: 'Tenant', time: '1h ago' },
                                { name: 'Musa Ibrahim', type: 'Investor', time: '4h ago' },
                            ].map((lead, idx) => (
                                <div key={idx} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-600">
                                            {lead.name[0]}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-gray-900">{lead.name}</div>
                                            <div className="text-[10px] text-gray-400 font-medium">{lead.type} • {lead.time}</div>
                                        </div>
                                    </div>
                                    <button className="p-1 text-gray-400 hover:text-gray-600">
                                        <MdMoreVert size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-100 rounded-xl text-gray-400 text-xs font-bold hover:bg-gray-50 transition-colors">
                            Manage Pipeline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
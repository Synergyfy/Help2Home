'use client';

import React from 'react';
import {
    MdTrendingUp, MdPeople, MdHome, MdVpnKey,
    MdSchedule, MdMoreVert, MdArrowForward
} from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import {
    HiOutlineRocketLaunch,
    HiOutlineXMark,
    HiOutlineEye,
    HiOutlineChatBubbleLeftRight,
    HiOutlineCalendarDays,
    HiOutlineArchiveBox
} from 'react-icons/hi2';
import InspectionDetailsModal from './InspectionDetailsModal';
import { useAgentDashboard } from '@/hooks/useAgentDashboard';
import { format } from 'date-fns';

interface StatCardProps {
    label: string;
    value: string;
    trend?: string;
    icon: React.ElementType;
    color: string;
}

// Professional Summary Component
const StatCard = ({ label, value, trend, icon: Icon, color }: StatCardProps) => (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-xl`}>
                <Icon className={color.replace('bg-', 'text-')} />
            </div>
            {trend && trend !== '+0%' && (
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    {trend}
                </span>
            )}
        </div>
        <div className="mt-4">
            <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{label}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        </div>
    </div>
);

export default function AgentDashboard() {
    const router = useRouter();
    const { stats, listings, leads, inspections, isLoading } = useAgentDashboard();
    
    const [isComingSoonOpen, setIsComingSoonOpen] = React.useState(false);
    const [activeLeadMenuId, setActiveLeadMenuId] = React.useState<string | null>(null);
    const [selectedInspection, setSelectedInspection] = React.useState<any | null>(null);

    const handleAddProperty = () => {
        router.push('/dashboard/agent/properties/add')
    }

    const handleArchiveLead = (id: string, name: string) => {
        toast.info("Archiving is not yet implemented in the backend.");
        setActiveLeadMenuId(null);
    };

    const handleAction = (action: string, leadName: string) => {
        setActiveLeadMenuId(null);
        switch (action) {
            case 'profile':
                router.push('/dashboard/agent/leads');
                break;
            case 'message':
                router.push('/dashboard/agent/leads');
                break;
            case 'schedule':
                router.push('/dashboard/agent/schedule');
                break;
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-12">
            <AnimatePresence>
                {isComingSoonOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden p-8 text-center relative"
                        >
                            <button
                                onClick={() => setIsComingSoonOpen(false)}
                                className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                            >
                                <HiOutlineXMark size={24} />
                            </button>

                            <div className="size-20 rounded-3xl bg-brand-green/10 flex items-center justify-center text-brand-green mx-auto mb-6">
                                <HiOutlineRocketLaunch size={40} />
                            </div>

                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Coming Soon!</h2>
                            <p className="text-gray-500 font-medium leading-relaxed mb-8">
                                We're building advanced marketing tools to help you reach more potential clients. This feature will be available in the next update!
                            </p>

                            <button
                                onClick={() => setIsComingSoonOpen(false)}
                                className="w-full py-4 bg-brand-green text-white rounded-2xl font-semibold shadow-xl shadow-green-900/20 hover:bg-green-700 transition-all active:scale-95"
                            >
                                Got it, Thanks!
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Top Bar - Responsive Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Agent Portfolio</h1>
                    <p className="text-sm text-gray-500">Managing your active listings and client pipeline.</p>
                </div>
                <button onClick={handleAddProperty} className="bg-brand-green text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-green-900/20 hover:bg-green-700 transition-all w-full md:w-auto">
                    + New Listing
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    label="Total Commission" 
                    value={stats?.totalCommission || '₦0'} 
                    trend={stats?.totalCommissionTrend} 
                    icon={MdTrendingUp} 
                    color="bg-green-600" 
                />
                <StatCard 
                    label="Active Leads" 
                    value={stats?.activeLeads || '0'} 
                    trend={stats?.activeLeadsTrend} 
                    icon={MdPeople} 
                    color="bg-blue-600" 
                />
                <StatCard 
                    label="Properties Sold" 
                    value={stats?.propertiesSold || '0'} 
                    icon={MdHome} 
                    color="bg-purple-600" 
                />
                <StatCard 
                    label="Pending Closings" 
                    value={stats?.pendingClosings || '0'} 
                    icon={MdVpnKey} 
                    color="bg-orange-600" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Listings Table - Main Column */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                            <h2 className="font-semibold text-gray-900">High-Performance Listings</h2>
                            <button
                                onClick={() => router.push('/dashboard/agent/properties')}
                                className="text-brand-green text-sm font-semibold hover:underline"
                            >
                                View All
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 text-gray-400 uppercase text-[10px] font-semibold tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Property</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Views</th>
                                        <th className="px-6 py-4">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {listings.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-10 text-center text-gray-400 text-sm italic">
                                                No properties found.
                                            </td>
                                        </tr>
                                    ) : listings.map((item: any, idx: number) => (
                                        <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                                                <div className="text-xs text-gray-500">{item.location}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-semibold uppercase ${
                                                    item.status === 'available' || item.status === 'Active' 
                                                        ? 'bg-green-100 text-green-700' 
                                                        : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                                {item.views > 999 ? `${(item.views / 1000).toFixed(1)}k` : item.views}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                ₦{Number(item.price).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Upcoming Viewings */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <MdSchedule className="text-brand-green" /> Scheduled Inspections
                        </h2>
                        <div className="space-y-4">
                            {inspections.length === 0 ? (
                                <div className="text-center py-8 text-gray-400 text-sm italic border border-dashed border-gray-100 rounded-xl">
                                    No inspections scheduled.
                                </div>
                            ) : inspections.map((visit: any) => {
                                const visitDate = new Date(visit.date);
                                return (
                                    <div
                                        key={visit.id}
                                        onClick={() => setSelectedInspection(visit)}
                                        className="flex items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50/30 group hover:bg-white hover:shadow-md transition-all cursor-pointer"
                                    >
                                        <div className="flex gap-4 items-center">
                                            <div className="text-center bg-white p-2 rounded-lg border border-gray-100 min-w-[60px] group-hover:border-brand-green/30 transition-colors">
                                                <div className="text-xs text-gray-400 font-semibold uppercase">
                                                    {format(visitDate, 'MMM')}
                                                </div>
                                                <div className="text-lg font-semibold text-gray-900">
                                                    {format(visitDate, 'dd')}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-sm text-gray-900">{visit.tenantName} - {visit.type}</div>
                                                <div className="text-xs text-gray-500">
                                                    {visit.property?.title || 'Property'} • {visit.time}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                router.push('/dashboard/agent/schedule');
                                            }}
                                            className="p-2 hover:bg-brand-green hover:text-white rounded-full transition-all text-gray-400"
                                        >
                                            <MdArrowForward size={20} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Side Rail - Marketing & Leads */}
                <div className="space-y-6">
                    <div className="bg-brand-green text-white p-6 rounded-3xl shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="font-semibold text-lg">Marketing Boost</h3>
                            <p className="text-white/80 text-xs mt-2 leading-relaxed">
                                Your listings are currently reaching 40% more people this week.
                            </p>
                            <button
                                onClick={() => setIsComingSoonOpen(true)}
                                className="mt-4 bg-white text-brand-green px-4 py-2 rounded-xl text-xs font-semibold hover:bg-opacity-90 transition-all active:scale-95 shadow-lg shadow-black/10"
                            >
                                Run Campaign
                            </button>
                        </div>
                        {/* Decorative circle */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <h2 className="font-semibold text-gray-900 mb-4">Recent Leads</h2>
                        <div className="space-y-5">
                            {leads.length === 0 ? (
                                <div className="text-center py-6 text-gray-400 text-xs italic">
                                    No recent leads.
                                </div>
                            ) : leads.map((lead: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between relative">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-xs text-gray-600">
                                            {lead.tenantName?.[0] || '?'}
                                        </div>
                                        <div>
                                            <div className="text-sm font-semibold text-gray-900">{lead.tenantName}</div>
                                            <div className="text-[10px] text-gray-400 font-medium">
                                                {lead.propertyTitle || 'Lead'} • {format(new Date(lead.createdAt), 'MMM d')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={() => setActiveLeadMenuId(activeLeadMenuId === lead.id ? null : lead.id)}
                                            className={`p-1 rounded-lg transition-colors ${activeLeadMenuId === lead.id ? 'bg-gray-100 text-brand-green' : 'text-gray-400 hover:text-gray-600'}`}
                                        >
                                            <MdMoreVert size={20} />
                                        </button>

                                        {activeLeadMenuId === lead.id && (
                                            <>
                                                <div
                                                    className="fixed inset-0 z-10"
                                                    onClick={() => setActiveLeadMenuId(null)}
                                                />
                                                <div className="absolute right-0 top-8 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                                                    <button
                                                        onClick={() => handleAction('profile', lead.tenantName)}
                                                        className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <HiOutlineEye size={16} className="text-gray-400" />
                                                        View Profile
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction('message', lead.tenantName)}
                                                        className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <HiOutlineChatBubbleLeftRight size={16} className="text-gray-400" />
                                                        Send Message
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction('schedule', lead.tenantName)}
                                                        className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <HiOutlineCalendarDays size={16} className="text-gray-400" />
                                                        Schedule Viewing
                                                    </button>
                                                    <div className="h-px bg-gray-100 my-1 mx-2" />
                                                    <button
                                                        onClick={() => handleArchiveLead(lead.id, lead.tenantName)}
                                                        className="w-full text-left flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <HiOutlineArchiveBox size={16} className="text-red-400" />
                                                        Archive Lead
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => router.push('/dashboard/agent/leads')}
                            className="w-full mt-6 py-3 border-2 border-dashed border-gray-100 rounded-xl text-gray-400 text-xs font-semibold hover:bg-gray-50 hover:text-brand-green hover:border-brand-green/30 transition-all active:scale-[0.98]"
                        >
                            Manage Pipeline
                        </button>
                    </div>
                </div>
            </div>

            <InspectionDetailsModal
                isOpen={!!selectedInspection}
                onClose={() => setSelectedInspection(null)}
                inspection={selectedInspection}
            />
        </div>
    );
}


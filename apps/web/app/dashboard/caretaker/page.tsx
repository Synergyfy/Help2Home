'use client';

import React from 'react';
import Link from 'next/link';
import { useUserStore } from '@/store/userStore';
import { useCaretakerDashboard, useCaretakerTasks } from '@/hooks/useCaretakerDashboard';
import TaskCard from '@/components/dashboard/caretaker/TaskCard';
import CaretakerManagedProperties from '@/components/dashboard/caretaker/CaretakerManagedProperties';
import {
    HiOutlineHome,
    HiOutlinePlus,
    HiOutlineUserGroup,
    HiOutlineBellAlert,
    HiOutlineWrenchScrewdriver,
    HiOutlineChatBubbleLeftRight,
    HiOutlineChevronRight
} from 'react-icons/hi2';

export default function CaretakerDashboardPage() {
    const { profile } = useUserStore();
    const { stats, properties, activity, isLoading } = useCaretakerDashboard();
    const { data: liveTasks, isLoading: tasksLoading } = useCaretakerTasks('Assigned');

    const statsConfig = [
        {
            label: "Properties",
            value: stats?.properties || 0,
            icon: <HiOutlineHome size={24} />,
            color: "green" as const,
        },
        {
            label: "Active Tasks",
            value: stats?.activeTasks || 0,
            icon: <HiOutlineWrenchScrewdriver size={24} />,
            color: "blue" as const,
        },
        {
            label: "High Priority",
            value: stats?.highPriority || 0,
            icon: <HiOutlineBellAlert size={24} />,
            color: "red" as const,
        },
        {
            label: "Messages",
            value: stats?.messages || 0,
            icon: <HiOutlineChatBubbleLeftRight size={24} />,
            color: "orange" as const,
        },
    ];

    if (isLoading || tasksLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="h-12 bg-gray-200 rounded-2xl w-1/4"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 bg-gray-200 rounded-4xl"></div>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 h-96 bg-gray-200 rounded-[2.5rem]"></div>
                    <div className="h-96 bg-gray-200 rounded-[2.5rem]"></div>
                </div>
            </div>
        );
    }

    const assignedTasks = (liveTasks || []).map((t: any) => ({
        id: t.id,
        title: t.category,
        priority: t.priority,
        status: t.status,
        propertyTitle: t.property?.title || 'Unknown Property',
        unit: '', // Could be added to maintenance entity if needed
        dueDate: t.createdAt, // Fallback
        description: t.description
    }));

    return (
        <div className="pb-20 space-y-8">
            {/* Header / Welcome */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900 leading-tight">
                        Caretaker <span className="text-brand-green">Hub</span>
                    </h1>
                    <p className="text-gray-500 font-medium font-outfit uppercase tracking-widest text-xs">
                        Welcome back, {profile?.firstName || 'Caretaker'}. Here&apos;s your daily overview.
                    </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Link
                        href="/dashboard/caretaker/properties/add"
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-brand-green text-white rounded-2xl font-semibold hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                    >
                        <HiOutlinePlus size={20} />
                        Add Property
                    </Link>
                    <Link
                        href="/dashboard/caretaker/team"
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <HiOutlineUserGroup size={20} />
                        Invite Partner
                    </Link>
                </div>
            </div>

            {/* Quick Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsConfig.map((stat, i) => (
                    <StatCard key={i} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:col-span-3 gap-8">
                {/* Left Column: Properties & Management */}
                <div className="lg:col-span-2 space-y-8">
                    <CaretakerManagedProperties properties={properties} role="caretaker" />

                    {/* Maintenance / Tasks Highlights */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <HiOutlineWrenchScrewdriver size={24} className="text-blue-500" />
                                Maintenance Tasks
                            </h2>
                            <Link href="/dashboard/caretaker/tasks" className="text-sm font-semibold text-brand-green hover:underline">
                                View Full Schedule
                            </Link>
                        </div>

                        {assignedTasks.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {assignedTasks.slice(0, 4).map(task => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-gray-500">No active maintenance requests.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Activity & Network */}
                <div className="space-y-8">
                    {/* Partner Network Quick Link */}
                    <div className="bg-linear-to-br from-gray-900 to-gray-800 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-xl font-semibold mb-2">Partner Network</h3>
                            <p className="text-white/60 text-sm mb-6">Collaborate with Landlords and Agents to streamline property management.</p>
                            <Link href="/dashboard/caretaker/team" className="inline-flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-green-700 transition-all">
                                Manage Team
                                <HiOutlineChevronRight />
                            </Link>
                        </div>
                        <HiOutlineUserGroup className="absolute -bottom-4 -right-4 size-32 text-white/5 group-hover:scale-110 transition-transform duration-700" />
                    </div>

                    {/* Alerts / Activity Feed */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <HiOutlineBellAlert size={20} className="text-orange-500" />
                            Recent Activity
                        </h3>
                        <div className="space-y-4">
                            {activity.length > 0 ? (
                                activity.map((item: any) => (
                                    <ActivityItem
                                        key={item.id}
                                        title={item.title}
                                        description={item.description}
                                        time={new Date(item.time).toLocaleDateString()}
                                        icon={item.type === 'maintenance' ? <HiOutlineWrenchScrewdriver /> : <HiOutlineHome />}
                                    />
                                ))
                            ) : (
                                <p className="text-xs text-gray-500 text-center py-4">No recent activity found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color }: { label: string, value: number, icon: React.ReactNode, color: 'green' | 'blue' | 'red' | 'orange' }) {
    const colors = {
        green: 'bg-green-50 text-green-600 border-green-100',
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        red: 'bg-red-50 text-red-600 border-red-100',
        orange: 'bg-orange-50 text-orange-600 border-orange-100',
    };

    return (
        <div className={`p-6 rounded-4xl border transition-all hover:shadow-lg bg-white`}>
            <div className={`size-12 rounded-2xl ${colors[color]} flex items-center justify-center mb-4`}>
                {icon}
            </div>
            <div className="text-2xl font-semibold text-gray-900">{value}</div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{label}</div>
        </div>
    );
}

function ActivityItem({ title, description, time, icon }: { title: string, description: string, time: string, icon: React.ReactNode }) {
    return (
        <div className="flex gap-3 group cursor-pointer">
            <div className="size-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-brand-green/10 group-hover:text-brand-green transition-colors">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline gap-2">
                    <h4 className="text-xs font-semibold text-gray-900 truncate">{title}</h4>
                    <span className="text-[10px] text-gray-400 shrink-0">{time}</span>
                </div>
                <p className="text-[10px] text-gray-500 truncate">{description}</p>
            </div>
        </div>
    );
}

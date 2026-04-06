'use client';

import React, { useState } from 'react';
import TaskCard from '@/components/dashboard/caretaker/TaskCard';
import { useCaretakerTasks, useCaretakerDashboard } from '@/hooks/useCaretakerDashboard';
import {
    HiOutlineWrenchScrewdriver,
    HiOutlineBellAlert,
    HiOutlineCheckCircle,
    HiOutlineClock
} from 'react-icons/hi2';

export default function TasksPage() {
    const [filter, setFilter] = useState<'All' | 'Assigned' | 'In Progress' | 'Completed' | 'Accepted'>('All');
    const { stats, isLoading: statsLoading } = useCaretakerDashboard();
    const { data: rawTasks, isLoading: tasksLoading } = useCaretakerTasks(filter === 'All' ? undefined : filter);

    const tasks = (rawTasks || []).map((t: any) => ({
        id: t.id,
        title: t.category,
        priority: t.priority,
        status: t.status,
        propertyTitle: t.property?.title || 'Unknown Property',
        unit: '',
        dueDate: t.createdAt,
        description: t.description
    }));

    if (statsLoading || tasksLoading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="h-10 bg-gray-200 rounded-xl w-1/4"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-gray-200 rounded-4xl"></div>)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {[...Array(6)].map((_, i) => <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>)}
                </div>
            </div>
        );
    }

    const assignedCount = stats?.activeTasks || 0;
    const inProgressCount = tasks.filter((t: any) => t.status === 'In Progress').length;
    const completedCount = tasks.filter((t: any) => t.status === 'Completed').length;
    const highPriorityCount = stats?.highPriority || 0;

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Maintenance Tasks</h1>
                    <p className="text-gray-500 mt-1">Manage all your property maintenance and administrative tasks.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                        <HiOutlineClock size={24} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{assignedCount}</div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Active Stats</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                        <HiOutlineWrenchScrewdriver size={24} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{inProgressCount}</div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">In Progress</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-4">
                        <HiOutlineCheckCircle size={24} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{completedCount}</div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Completed</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 mb-4">
                        <HiOutlineBellAlert size={24} />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">{highPriorityCount}</div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">High Priority</div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-gray-100">
                {(['All', 'Assigned', 'Accepted', 'In Progress', 'Completed'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-6 py-3 font-semibold text-sm transition-all border-b-2 ${filter === tab
                            ? 'border-brand-green text-brand-green'
                            : 'border-transparent text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tasks Grid */}
            {tasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task: any) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                    <HiOutlineWrenchScrewdriver className="size-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No {filter.toLowerCase()} tasks found.</p>
                </div>
            )}
        </div>
    );
}

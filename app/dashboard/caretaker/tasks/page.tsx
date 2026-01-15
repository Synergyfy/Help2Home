'use client';

import React, { useState } from 'react';
import { MOCK_TASKS } from '@/lib/mockCaretakerData';
import TaskCard from '@/components/dashboard/caretaker/TaskCard';
import {
    HiOutlineWrenchScrewdriver,
    HiOutlineFunnel,
    HiOutlineBellAlert,
    HiOutlineCheckCircle,
    HiOutlineClock
} from 'react-icons/hi2';

export default function TasksPage() {
    const [tasks, setTasks] = useState(MOCK_TASKS);
    const [filter, setFilter] = useState<'All' | 'Assigned' | 'In Progress' | 'Completed'>('All');

    const handleAcceptTask = (taskId: string) => {
        setTasks(prev => prev.map(task =>
            task.id === taskId ? { ...task, status: 'Accepted' } : task
        ));
    };

    const handleStartTask = (taskId: string) => {
        setTasks(prev => prev.map(task =>
            task.id === taskId ? { ...task, status: 'In Progress' } : task
        ));
    };

    const filteredTasks = filter === 'All'
        ? tasks
        : tasks.filter(t => t.status === filter);

    const assignedCount = tasks.filter(t => t.status === 'Assigned').length;
    const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
    const completedCount = tasks.filter(t => t.status === 'Completed').length;
    const highPriorityCount = tasks.filter(t => t.priority === 'High' || t.priority === 'Critical').length;

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Maintenance Tasks</h1>
                    <p className="text-gray-500 mt-1">Manage all your property maintenance and administrative tasks.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                        <HiOutlineClock size={24} />
                    </div>
                    <div className="text-2xl font-black text-gray-900">{assignedCount}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Assigned</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                        <HiOutlineWrenchScrewdriver size={24} />
                    </div>
                    <div className="text-2xl font-black text-gray-900">{inProgressCount}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">In Progress</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-4">
                        <HiOutlineCheckCircle size={24} />
                    </div>
                    <div className="text-2xl font-black text-gray-900">{completedCount}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Completed</div>
                </div>
                <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
                    <div className="size-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 mb-4">
                        <HiOutlineBellAlert size={24} />
                    </div>
                    <div className="text-2xl font-black text-gray-900">{highPriorityCount}</div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">High Priority</div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 border-b border-gray-100">
                {(['All', 'Assigned', 'In Progress', 'Completed'] as const).map((tab) => (
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

            {/* Tasks Grid */}
            {filteredTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onAccept={handleAcceptTask}
                            onStart={handleStartTask}
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

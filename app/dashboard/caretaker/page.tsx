'use client';

import React, { useState } from 'react';
import { MOCK_TASKS } from '@/lib/mockCaretakerData';
import TaskCard from '@/components/dashboard/caretaker/TaskCard';
import Link from 'next/link';

export default function CaretakerDashboardPage() {
    const [tasks, setTasks] = useState(MOCK_TASKS);

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

    const assignedTasks = tasks.filter(t => t.status !== 'Completed' && t.status !== 'Cancelled');
    const completedTasks = tasks.filter(t => t.status === 'Completed');

    return (
        <div className="pb-20 max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Caretaker Dashboard</h1>
                    <p className="text-gray-500">Welcome back, John</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/caretaker/properties/add"
                        className="px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="hidden sm:inline">Add Property</span>
                    </Link>
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                        JD
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                    <div className="text-2xl font-bold text-brand-green">{assignedTasks.length}</div>
                    <div className="text-xs text-gray-500">Assigned</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                    <div className="text-2xl font-bold text-orange-500">
                        {assignedTasks.filter(t => t.priority === 'High' || t.priority === 'Critical').length}
                    </div>
                    <div className="text-xs text-gray-500">High Priority</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
                    <div className="text-2xl font-bold text-blue-500">2</div>
                    <div className="text-xs text-gray-500">Messages</div>
                </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Assigned Tasks</h2>
                    {assignedTasks.length > 0 ? (
                        <div className="space-y-4">
                            {assignedTasks.map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onAccept={handleAcceptTask}
                                    onStart={handleStartTask}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                            <p className="text-gray-500">No assigned tasks. Great job!</p>
                        </div>
                    )}
                </div>

                {completedTasks.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Recently Completed</h2>
                        <div className="space-y-4 opacity-75">
                            {completedTasks.map(task => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Floating Action Button for Mobile */}
            <div className="fixed bottom-6 right-6 md:hidden">
                <button className="h-14 w-14 bg-brand-green rounded-full shadow-lg flex items-center justify-center text-white hover:bg-green-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

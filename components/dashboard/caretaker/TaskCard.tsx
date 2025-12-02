'use client';

import React from 'react';
import { format } from 'date-fns';
import { CaretakerTask } from '@/lib/mockCaretakerData';
import Link from 'next/link';

interface TaskCardProps {
    task: CaretakerTask;
    onAccept?: (taskId: string) => void;
    onStart?: (taskId: string) => void;
}

export default function TaskCard({ task, onAccept, onStart }: TaskCardProps) {
    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Critical': return 'text-red-600 bg-red-50 border-red-100';
            case 'High': return 'text-orange-600 bg-orange-50 border-orange-100';
            case 'Medium': return 'text-blue-600 bg-blue-50 border-blue-100';
            default: return 'text-gray-600 bg-gray-50 border-gray-100';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'text-green-600 bg-green-50';
            case 'In Progress': return 'text-blue-600 bg-blue-50';
            case 'Assigned': return 'text-yellow-600 bg-yellow-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <span className={`text-xs px-2 py-0.5 rounded border ${getPriorityColor(task.priority)} mb-2 inline-block`}>
                        {task.priority}
                    </span>
                    <h3 className="font-bold text-gray-900">{task.title}</h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                </span>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {task.propertyTitle} {task.unit ? `• Unit ${task.unit}` : ''}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Due {format(new Date(task.dueDate), 'MMM d, h:mm a')}
                </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                <Link
                    href={`/dashboard/caretaker/tasks/${task.id}`}
                    className="flex-1 py-2 text-center text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    View Details
                </Link>

                {task.status === 'Assigned' && onAccept && (
                    <button
                        onClick={() => onAccept(task.id)}
                        className="flex-1 py-2 text-center text-sm font-medium text-white bg-[#00853E] rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Accept
                    </button>
                )}

                {task.status === 'Accepted' && onStart && (
                    <button
                        onClick={() => onStart(task.id)}
                        className="flex-1 py-2 text-center text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Start
                    </button>
                )}
            </div>
        </div>
    );
}

'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { MOCK_TASKS, TaskStatus } from '@/lib/mockCaretakerData';
import PhotoUploader from '@/components/dashboard/caretaker/PhotoUploader';

export default function TaskDetailPage() {
    const params = useParams();
    const router = useRouter();
    const taskId = params.id as string;
    const task = MOCK_TASKS.find(t => t.id === taskId);

    const [status, setStatus] = useState<TaskStatus>(task?.status || 'Assigned');
    const [notes, setNotes] = useState('');

    if (!task) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold text-gray-900">Task Not Found</h2>
                <Link href="/dashboard/caretaker" className="text-[#00853E] hover:underline mt-4 inline-block">
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    const handleStatusChange = (newStatus: TaskStatus) => {
        setStatus(newStatus);
        // In a real app, this would call an API
    };

    const handlePhotoUpload = (url: string) => {
        console.log('Uploaded photo:', url);
        // In a real app, this would add the photo to the task
    };

    return (
        <div className="pb-20 max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <Link href="/dashboard/caretaker" className="text-sm text-gray-500 hover:text-gray-900 mb-2 inline-flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Dashboard
                </Link>
                <div className="flex justify-between items-start">
                    <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${status === 'Completed' ? 'bg-green-100 text-green-800' :
                            status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-yellow-100 text-yellow-800'
                        }`}>
                        {status}
                    </span>
                </div>
            </div>

            {/* Task Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="p-6 space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Property</h3>
                        <p className="text-gray-900">{task.propertyTitle} {task.unit ? `• Unit ${task.unit}` : ''}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Description</h3>
                        <p className="text-gray-900 mt-1">{task.description}</p>
                    </div>
                    <div className="flex gap-8">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
                            <p className="text-gray-900">{format(new Date(task.dueDate), 'MMM d, yyyy')}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Priority</h3>
                            <p className={`font-medium ${task.priority === 'Critical' ? 'text-red-600' :
                                    task.priority === 'High' ? 'text-orange-600' :
                                        'text-blue-600'
                                }`}>{task.priority}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Update Status</h3>
                </div>
                <div className="p-6 space-y-6">
                    {status === 'Assigned' && (
                        <button
                            onClick={() => handleStatusChange('Accepted')}
                            className="w-full py-3 bg-[#00853E] text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                            Accept Task
                        </button>
                    )}

                    {status === 'Accepted' && (
                        <button
                            onClick={() => handleStatusChange('In Progress')}
                            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Start Work
                        </button>
                    )}

                    {status === 'In Progress' && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Completion Notes</label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#00853E] focus:border-[#00853E] outline-none resize-none"
                                    placeholder="Describe the work done..."
                                />
                            </div>

                            <PhotoUploader
                                onUpload={handlePhotoUpload}
                                label="Upload Completion Photos"
                            />

                            <button
                                onClick={() => handleStatusChange('Completed')}
                                className="w-full py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                            >
                                Mark as Completed
                            </button>
                        </div>
                    )}

                    {status === 'Completed' && (
                        <div className="text-center py-4 text-green-600 font-medium flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Task Completed
                        </div>
                    )}
                </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
                <h3 className="font-bold text-gray-900">Activity Timeline</h3>
                <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                    {task.timeline.map((event, index) => (
                        <div key={event.id} className="relative pl-4">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></div>
                            <p className="text-sm text-gray-900">{event.content}</p>
                            <p className="text-xs text-gray-500">
                                {format(new Date(event.timestamp), 'MMM d, h:mm a')} • {event.author}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

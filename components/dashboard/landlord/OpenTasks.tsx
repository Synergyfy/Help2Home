'use client';

import Link from 'next/link';
import { TaskItem } from '@/lib/mockLandlordData';

export default function OpenTasks({ tasks }: { tasks: TaskItem[] }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Open tasks</h3>
            </div>

            {tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    You're all caught up. No open tasks right now.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-xs text-gray-500 border-b border-gray-100">
                                <th className="pb-3 font-medium">Task</th>
                                <th className="pb-3 font-medium">Property</th>
                                <th className="pb-3 font-medium">Priority</th>
                                <th className="pb-3 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {tasks.map((task) => (
                                <tr key={task.id} className="group hover:bg-gray-50 transition-colors">
                                    <td className="py-4 pr-4 font-medium text-gray-900">{task.title}</td>
                                    <td className="py-4 pr-4 text-gray-600">{task.property}</td>
                                    <td className="py-4 pr-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.priority === 'High' ? 'bg-red-100 text-red-700' :
                                                task.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <Link
                                            href={task.link}
                                            className="text-[#00853E] font-bold hover:underline"
                                        >
                                            {task.actionLabel}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

import React from 'react';
import { ActivityLogItem } from './types';

interface ActivityLogProps {
    logs: ActivityLogItem[];
}

export default function ActivityLog({ logs }: ActivityLogProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Activity History</h3>

            <div className="space-y-6 relative">
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-100"></div>

                {logs.map((log) => (
                    <div key={log.id} className="relative flex gap-4">
                        <div className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white ring-2 ring-gray-50 z-10 flex-shrink-0 mt-1"></div>
                        <div>
                            <p className="text-sm text-gray-900">{log.event}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500">{log.timestamp}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs font-medium text-gray-600">{log.actor}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

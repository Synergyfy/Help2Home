'use client';

import React from 'react';
import { Session } from './types';

interface SessionsSectionProps {
    sessions: Session[];
    onTerminateSession: (id: string) => void;
}

export default function SessionsSection({ sessions, onTerminateSession }: SessionsSectionProps) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-gray-900">Sessions & Devices</h2>
                <p className="text-sm text-gray-500">Manage your active sessions and logged-in devices.</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="space-y-4">
                    {sessions.map((session) => (
                        <div key={session.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg bg-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-gray-900">{session.deviceType}</p>
                                        {session.isCurrent && (
                                            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">Current Device</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500">{session.location} • {session.ipAddress}</p>
                                    <p className="text-xs text-gray-400">Last active: {session.lastActive}</p>
                                </div>
                            </div>
                            {!session.isCurrent && (
                                <button
                                    onClick={() => onTerminateSession(session.id)}
                                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                                >
                                    Log Out
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                    <button className="w-full py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors">
                        Log Out of All Other Sessions
                    </button>
                </div>
            </div>
        </div>
    );
}

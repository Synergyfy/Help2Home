'use client';

import React, { useState } from 'react';
import { Session, MOCK_SESSIONS } from '@/lib/mockSecurityData';
import { formatDistanceToNow } from 'date-fns';

export default function SessionManager() {
    const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS);

    const handleRevokeSession = (sessionId: string) => {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
    };

    const handleRevokeAll = () => {
        setSessions(prev => prev.filter(s => s.isCurrent));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Active Sessions</h2>
                    <p className="text-sm text-gray-500">Manage your active sessions on other devices.</p>
                </div>
                {sessions.length > 1 && (
                    <button
                        onClick={handleRevokeAll}
                        className="text-red-600 text-sm font-medium hover:text-red-700 hover:underline"
                    >
                        Sign out of all other devices
                    </button>
                )}
            </div>

            <div className="divide-y divide-gray-100">
                {sessions.map((session) => (
                    <div key={session.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                {session.device.toLowerCase().includes('iphone') || session.device.toLowerCase().includes('android') ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-medium text-gray-900">{session.device}</h3>
                                    {session.isCurrent && (
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                            Current Device
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                    <span>{session.browser}</span>
                                    <span>•</span>
                                    <span>{session.location}</span>
                                    <span>•</span>
                                    <span>{session.ipAddress}</span>
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    Last active: {session.isCurrent ? 'Now' : formatDistanceToNow(new Date(session.lastActive), { addSuffix: true })}
                                </div>
                            </div>
                        </div>

                        {!session.isCurrent && (
                            <button
                                onClick={() => handleRevokeSession(session.id)}
                                className="px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200 hover:border-red-100"
                            >
                                Revoke
                            </button>
                        )}
                    </div>
                ))}

                {sessions.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No active sessions found.
                    </div>
                )}
            </div>
        </div>
    );
}

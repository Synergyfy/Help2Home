'use client';

import React, { useMemo } from 'react';
import { useUserStore } from '@/store/userStore';
import { toast } from 'react-toastify';

export default function SessionManager() {
    const { token, hasHydrated } = useUserStore();

    const currentSession = useMemo(() => {
        if (!hasHydrated || !token) return null;
        
        // Simple device detection
        const ua = typeof window !== 'undefined' ? window.navigator.userAgent : '';
        const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
        const browser = ua.includes('Chrome') ? 'Chrome' : ua.includes('Safari') ? 'Safari' : ua.includes('Firefox') ? 'Firefox' : 'Browser';

        return {
            id: 'current',
            device: isMobile ? 'Mobile Device' : 'Desktop Computer',
            browser: browser,
            location: 'Current Location',
            ipAddress: 'Unknown',
            isCurrent: true,
            lastActive: 'Now'
        };
    }, [token, hasHydrated]);

    const handleRevokeAction = () => {
        toast.info("Managing separate sessions is coming soon. You can sign out to end your current session.");
    };

    if (!currentSession) {
        return (
            <div className="p-8 text-center text-gray-400 italic bg-white rounded-xl border border-gray-100">
                No active session found. Please sign in.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Active Sessions</h2>
                    <p className="text-sm text-gray-500">Manage your active sessions on other devices.</p>
                </div>
                <button
                    onClick={handleRevokeAction}
                    className="text-red-600 text-sm font-medium hover:text-red-700 hover:underline"
                >
                    Sign out of all other devices
                </button>
            </div>

            <div className="divide-y divide-gray-100">
                <div className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                            {currentSession.device === 'Mobile Device' ? (
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
                                <h3 className="font-medium text-gray-900">{currentSession.device}</h3>
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                    Current Device
                                </span>
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-2 font-medium">
                                <span>{currentSession.browser}</span>
                                <span>•</span>
                                <span>{currentSession.location}</span>
                            </div>
                            <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">
                                Status: <span className="text-brand-green">Active Now</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-10 text-center space-y-3 bg-gray-50/30">
                    <div className="size-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <p className="text-xs text-gray-500 font-medium max-w-xs mx-auto">
                        Other devices will appear here once you sign in on them. Multiple session tracking is being optimized.
                    </p>
                </div>
            </div>
        </div>
    );
}


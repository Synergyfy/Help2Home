'use client';

import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import Link from 'next/link';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [userName, setUserName] = React.useState('Guest');
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    React.useEffect(() => {
        const firstName = localStorage.getItem('user_firstName');
        const lastName = localStorage.getItem('user_lastName');
        if (firstName && lastName) {
            setUserName(`${firstName} ${lastName}`);
        } else if (firstName) {
            setUserName(firstName);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <DashboardSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col min-w-0 transition-all duration-300">
                {/* Header */}
                <header className="bg-white h-20 border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-6 ml-auto">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-gray-900">{userName}</p>
                            <p className="text-xs text-gray-500">Tenant</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm relative">
                            {/* Placeholder Avatar */}
                            <div className="absolute inset-0 bg-brand-green flex items-center justify-center text-white font-bold">
                                {userName.charAt(0)}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}

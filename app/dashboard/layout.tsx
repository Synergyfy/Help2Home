'use client';

import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { UserProvider } from '@/components/providers/UserContext';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    return (
        <UserProvider>
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
                    <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />

                    {/* Page Content */}
                    <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
                        {children}
                    </main>
                </div>
            </div>
        </UserProvider>
    );
}

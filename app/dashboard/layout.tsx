'use client';

import { Suspense } from 'react';

import React from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import ContextBar from '@/components/dashboard/landlord/lib/ContextBar';
import { useRoleSync } from '@/hooks/useRoleSync';
import ProfileCompletionModal from '@/components/dashboard/profile/ProfileCompletionModal';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    // Initialized role-sync engine to keep store and URL in sync
    useRoleSync();

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex relative">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <div className="hidden md:block fixed inset-y-0 left-0 w-72 p-4 z-30">
                <DashboardSidebar
                    isOpen={true}
                    onClose={() => setIsSidebarOpen(false)}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 md:ml-72 transition-all duration-300">
                <div className="sticky top-0 z-20 w-full bg-white border-b border-gray-100">
                    <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
                </div>

                <main className="flex-1 py-6 px-4 md:p-10 w-full max-w-[1600px] mx-auto">
                    {/* Perspective switcher and page title bar */}
                    <ContextBar />

                    {/* Page specific content */}
                    <Suspense fallback={<div>Loading dashboard...</div>}>
                        {children}
                    </Suspense>
                </main>
            </div>
            <ProfileCompletionModal />
        </div>
    );
}

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
            {/* Sidebar */}
            <DashboardSidebar />

            {/* Main Content */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* Header */}
                <header className="bg-white h-20 border-b border-gray-100 flex items-center justify-end px-8 sticky top-0 z-30">
                    <div className="flex items-center gap-6">
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
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

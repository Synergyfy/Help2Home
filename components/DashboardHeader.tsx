'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import NotificationBell from '@/components/notifications/NotificationBell';

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const pathname = usePathname();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const router = useRouter()

    // Get data directly from your store definition
    const { fullName, activeRole, email, resetUser, hasHydrated } = useUserStore();

    // Prevent component from returning null during hydration to stop layout shifts
    if (!hasHydrated) {
        return <header className="bg-white h-20 border-b border-gray-100 w-full" />;
    }

    // Determine the path based on the actual activeRole from store
    const rolePath = activeRole || 'tenant';
    const profileLink = `/dashboard/${rolePath}/profile`;
    const settingsLink = `/dashboard/${rolePath}/settings`;

    const handleLogout = () => {
        resetUser();
        setIsProfileOpen(false);
        toast.success('Logged out successfully');
        router.replace('/signin');
    };

    return (
        <header className="bg-white h-20 border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20 w-full">
            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-4"
                onClick={onMenuClick}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Contextual Search Box */}
            <div className="hidden md:flex flex-1 max-w-xl relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green sm:text-sm transition-all"
                    placeholder={`Search as ${rolePath}...`}
                />
            </div>

            <div className="flex items-center gap-4 ml-auto">
                <NotificationBell />
                <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 focus:outline-none group"
                    >
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-gray-900 group-hover:text-brand-green transition-colors">
                                {fullName || 'User Account'}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">{rolePath}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center border-2 border-white shadow-sm hover:ring-2 hover:ring-brand-green transition-all">
                            <span className="text-brand-green font-bold text-xs">
                                {fullName?.charAt(0) || email?.charAt(0) || 'U'}
                            </span>
                        </div>
                    </button>

                    {isProfileOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 overflow-hidden">
                                <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Account</p>
                                    <p className="text-sm truncate text-gray-600">{email}</p>
                                </div>

                                <Link href={profileLink} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green" onClick={() => setIsProfileOpen(false)}>
                                    My Profile
                                </Link>
                                <Link href={settingsLink} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-green" onClick={() => setIsProfileOpen(false)}>
                                    Settings
                                </Link>

                                <div className="border-t border-gray-100 my-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
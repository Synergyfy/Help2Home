'use client';

import React, { useState } from 'react';
import { useUser } from '@/components/providers/UserContext';
import Link from 'next/link';

interface DashboardHeaderProps {
    onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    const { user, logout, getDefaultAvatar } = useUser();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    if (!user) return null;

    return (
        <header className="bg-white h-20 border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-4"
                onClick={onMenuClick}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Search Box */}
            <div className="hidden md:flex flex-1 max-w-xl relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00853E] focus:border-[#00853E] sm:text-sm transition-colors"
                    placeholder="Search properties, locations or landlords..."
                    aria-label="Search properties"
                />
            </div>

            <div className="flex items-center gap-4 ml-auto">
                {/* Notifications Icon */}
                <Link href="/dashboard/tenant/notifications" className="p-2 text-gray-400 hover:text-gray-600 relative rounded-full hover:bg-gray-100 transition-colors" aria-label="Notifications">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {/* Badge */}
                    <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
                </Link>

                <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 focus:outline-none"
                    >
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-gray-900">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm relative cursor-pointer hover:ring-2 hover:ring-[#00853E] transition-all">
                            <img
                                src={getDefaultAvatar()}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setIsProfileOpen(false)}
                            ></div>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                                <Link
                                    href="/dashboard/tenant/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#00853E]"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/dashboard/tenant/settings"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#00853E]"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    Settings
                                </Link>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsProfileOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    Log Out
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

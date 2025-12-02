'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import NotificationList from '@/components/dashboard/landlord/notifications/NotificationList';
import NotificationFilterBar from '@/components/dashboard/landlord/notifications/NotificationFilterBar';
import { MOCK_NOTIFICATIONS, Notification } from '@/lib/mockNotificationData';

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');

    const handleMarkAsRead = (id: string) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, isRead: true } : n
        ));
    };

    const handleDismiss = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const filteredNotifications = notifications.filter(n => {
        const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.message.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'All' || n.type === filterType;
        const matchesStatus = filterStatus === 'All' ||
            (filterStatus === 'Read' && n.isRead) ||
            (filterStatus === 'Unread' && !n.isRead);

        return matchesSearch && matchesType && matchesStatus;
    });

    return (
        <div className="pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                    <p className="text-gray-500">Stay updated with activity related to your account.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleMarkAllAsRead}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors shadow-sm"
                    >
                        Mark all as read
                    </button>
                    <Link
                        href="/dashboard/landlord/settings/notifications"
                        className="px-4 py-2 bg-[#00853E] text-white rounded-lg hover:bg-green-700 font-medium transition-colors shadow-sm flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                    </Link>
                </div>
            </div>

            <div className="mb-6">
                <NotificationFilterBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    filterType={filterType}
                    onFilterTypeChange={setFilterType}
                    filterStatus={filterStatus}
                    onFilterStatusChange={setFilterStatus}
                />
            </div>

            <NotificationList
                notifications={filteredNotifications}
                onMarkAsRead={handleMarkAsRead}
                onDismiss={handleDismiss}
            />
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import NotificationList from '@/components/dashboard/notifications/NotificationList';
import NotificationFilters from '@/components/dashboard/notifications/NotificationFilters';
import { Notification, NotificationType } from '@/components/dashboard/notifications/types';
import { getNotifications, markAsRead, markAllAsRead, clearNotification, clearAllNotifications } from '@/utils/mockNotificationsApi';

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<NotificationType | 'all' | 'unread'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getNotifications();
                setNotifications(data);
            } catch (error) {
                console.error("Failed to load notifications", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const handleMarkAsRead = async (id: string) => {
        await markAsRead(id);
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const handleMarkAllRead = async () => {
        await markAllAsRead();
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const handleClear = async (id: string) => {
        await clearNotification(id);
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleClearAll = async () => {
        if (confirm("Are you sure you want to clear all notifications?")) {
            await clearAllNotifications();
            setNotifications([]);
        }
    };

    // Filter Logic
    const filteredNotifications = notifications.filter(n => {
        // Type Filter
        if (activeFilter === 'unread' && n.isRead) return false;
        if (activeFilter !== 'all' && activeFilter !== 'unread' && n.type !== activeFilter) return false;

        // Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return n.title.toLowerCase().includes(query) || n.message.toLowerCase().includes(query);
        }

        return true;
    });

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading notifications...</div>;
    }

    return (
        <div className="p-4 md:p-8 max-w-4xl mx-auto font-sans">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {notifications.filter(n => !n.isRead).length} Unread
                </span>
            </div>

            <NotificationFilters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onMarkAllRead={handleMarkAllRead}
                onClearAll={handleClearAll}
            />

            <NotificationList
                notifications={filteredNotifications}
                onMarkAsRead={handleMarkAsRead}
                onClear={handleClear}
            />
        </div>
    );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Notification } from '@/lib/mockNotificationData';
import { formatDistanceToNow, isToday, isYesterday } from 'date-fns';

interface NotificationListProps {
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
    onDismiss: (id: string) => void;
}

export default function NotificationList({ notifications, onMarkAsRead, onDismiss }: NotificationListProps) {
    const getIconForType = (type: string) => {
        switch (type) {
            case 'Payment Received':
            case 'Payout Processed':
                return (
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                );
            case 'New Application':
                return (
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                );
            case 'System Alert':
                return (
                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                );
        }
    };

    const groupedNotifications = notifications.reduce((acc, notification) => {
        const date = new Date(notification.createdAt);
        let key = 'Earlier';
        if (isToday(date)) key = 'Today';
        else if (isYesterday(date)) key = 'Yesterday';

        if (!acc[key]) acc[key] = [];
        acc[key].push(notification);
        return acc;
    }, {} as Record<string, Notification[]>);

    const groups = ['Today', 'Yesterday', 'Earlier'].filter(key => groupedNotifications[key]?.length > 0);

    return (
        <div className="space-y-8">
            {notifications.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No notifications</h3>
                    <p className="text-gray-500 mt-1">We'll let you know when there's activity.</p>
                </div>
            ) : (
                groups.map(group => (
                    <div key={group}>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 pl-2">{group}</h3>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
                            {groupedNotifications[group].map(notification => (
                                <div
                                    key={notification.id}
                                    className={`p-6 flex gap-4 transition-colors hover:bg-gray-50 group ${!notification.isRead ? 'bg-blue-50/30' : ''}`}
                                >
                                    {getIconForType(notification.type)}

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={`text-base ${!notification.isRead ? 'font-bold text-gray-900' : 'font-medium text-gray-900'}`}>
                                                {notification.title}
                                            </h4>
                                            <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                                                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-3 leading-relaxed">{notification.message}</p>

                                        <div className="flex items-center gap-4">
                                            <Link
                                                href={notification.url}
                                                onClick={() => onMarkAsRead(notification.id)}
                                                className="text-sm font-medium text-[#00853E] hover:text-green-700 flex items-center gap-1"
                                            >
                                                View Details
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>

                                            {!notification.isRead && (
                                                <button
                                                    onClick={() => onMarkAsRead(notification.id)}
                                                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                                                >
                                                    Mark as read
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => onDismiss(notification.id)}
                                        className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all self-start p-1"
                                        title="Dismiss"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

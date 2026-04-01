'use client';

import React from 'react';
import Link from 'next/link';
import { Notification } from './types';

interface NotificationListProps {
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
    onClear: (id: string) => void;
}

export default function NotificationList({ notifications, onMarkAsRead, onClear }: NotificationListProps) {
    if (notifications.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-200">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-500">You're all caught up! Check back later for updates.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`relative p-4 rounded-xl border transition-all ${notification.isRead
                            ? 'bg-white border-gray-100'
                            : 'bg-blue-50 border-blue-100 shadow-sm'
                        }`}
                >
                    <div className="flex gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notification.type === 'payment' ? 'bg-green-100 text-green-600' :
                                notification.type === 'message' ? 'bg-blue-100 text-blue-600' :
                                    notification.type === 'verification' ? 'bg-purple-100 text-purple-600' :
                                        'bg-gray-100 text-gray-600'
                            }`}>
                            {notification.type === 'payment' && (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            {notification.type === 'message' && (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            )}
                            {notification.type === 'verification' && (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            {notification.type === 'system' && (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className={`font-bold ${notification.isRead ? 'text-gray-900' : 'text-blue-900'}`}>
                                    {notification.title}
                                </h3>
                                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                    {notification.timestamp}
                                </span>
                            </div>
                            <p className={`text-sm mt-1 ${notification.isRead ? 'text-gray-600' : 'text-blue-800'}`}>
                                {notification.message}
                            </p>

                            <div className="flex items-center gap-4 mt-3">
                                {notification.actionLink && (
                                    <Link
                                        href={notification.actionLink}
                                        className="text-sm font-bold text-[#00853E] hover:underline"
                                    >
                                        {notification.actionLabel || 'View Details'}
                                    </Link>
                                )}
                                {!notification.isRead && (
                                    <button
                                        onClick={() => onMarkAsRead(notification.id)}
                                        className="text-xs font-medium text-gray-500 hover:text-gray-700"
                                    >
                                        Mark as read
                                    </button>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={() => onClear(notification.id)}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                            title="Clear notification"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

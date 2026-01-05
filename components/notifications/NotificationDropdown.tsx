'use client';

import { useNotifications } from '@/hooks/useNotifications';
import { Notification } from '@/lib/api/notifications';
import NotificationItem from './NotificationItem';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiInbox } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { startOfToday, startOfYesterday, startOfWeek } from 'date-fns';

interface NotificationDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

const groupNotificationsByDate = (notifications: (Notification & { isRead: boolean })[]) => {
    const today = startOfToday();
    const yesterday = startOfYesterday();
    const weekStart = startOfWeek(new Date());

    const groups = {
        today: [] as (Notification & { isRead: boolean })[],
        yesterday: [] as (Notification & { isRead: boolean })[],
        thisWeek: [] as (Notification & { isRead: boolean })[],
        older: [] as (Notification & { isRead: boolean })[],
    };

    notifications.forEach((notification) => {
        const date = new Date(notification.createdAt);

        if (date >= today) {
            groups.today.push(notification);
        } else if (date >= yesterday && date < today) {
            groups.yesterday.push(notification);
        } else if (date >= weekStart) {
            groups.thisWeek.push(notification);
        } else {
            groups.older.push(notification);
        }
    });

    return groups;
};

export default function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
    const router = useRouter();
    const { notifications, unreadCount, isLoading, markAsRead, markAllAsRead, dismiss } = useNotifications();

    if (!isOpen) return null;

    const handleNotificationClick = (notification: Notification) => {
        if (notification.actionUrl && notification.actionUrl !== '#') {
            router.push(notification.actionUrl);
            onClose();
        }
    };

    const handleMarkAllAsRead = () => {
        markAllAsRead();
    };

    // Group notifications by date
    const groups = groupNotificationsByDate(notifications.slice(0, 10)); // Show only 10 most recent

    const hasNotifications = notifications.length > 0;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Dropdown Panel */}
            <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
            >
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-gray-900">
                            Notifications
                            {unreadCount > 0 && (
                                <span className="ml-2 px-2 py-0.5 bg-brand-green text-white text-xs rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={handleMarkAllAsRead}
                                className="text-xs text-brand-green hover:text-green-700 font-semibold flex items-center gap-1"
                            >
                                <FiCheck className="w-3 h-3" />
                                Mark all read
                            </button>
                        )}
                    </div>
                </div>

                {/* Notification List */}
                <div className="max-h-[400px] overflow-y-auto">
                    {isLoading ? (
                        <div className="p-8 text-center">
                            <div className="w-8 h-8 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin mx-auto mb-2" />
                            <p className="text-xs text-gray-500 font-medium">Loading notifications...</p>
                        </div>
                    ) : !hasNotifications ? (
                        <div className="p-8 text-center">
                            <FiInbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-sm text-gray-500 font-medium">No notifications</p>
                            <p className="text-xs text-gray-400 mt-1">You're all caught up!</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            <AnimatePresence mode="popLayout">
                                {/* Today */}
                                {groups.today.length > 0 && (
                                    <div key="today">
                                        <div className="px-4 py-2 bg-gray-50">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Today</p>
                                        </div>
                                        {groups.today.map((notification) => (
                                            <NotificationItem
                                                key={notification.id}
                                                notification={notification}
                                                onMarkAsRead={markAsRead}
                                                onDismiss={dismiss}
                                                onClick={handleNotificationClick}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Yesterday */}
                                {groups.yesterday.length > 0 && (
                                    <div key="yesterday">
                                        <div className="px-4 py-2 bg-gray-50">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Yesterday</p>
                                        </div>
                                        {groups.yesterday.map((notification) => (
                                            <NotificationItem
                                                key={notification.id}
                                                notification={notification}
                                                onMarkAsRead={markAsRead}
                                                onDismiss={dismiss}
                                                onClick={handleNotificationClick}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* This Week */}
                                {groups.thisWeek.length > 0 && (
                                    <div key="thisWeek">
                                        <div className="px-4 py-2 bg-gray-50">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">This Week</p>
                                        </div>
                                        {groups.thisWeek.map((notification) => (
                                            <NotificationItem
                                                key={notification.id}
                                                notification={notification}
                                                onMarkAsRead={markAsRead}
                                                onDismiss={dismiss}
                                                onClick={handleNotificationClick}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Older */}
                                {groups.older.length > 0 && (
                                    <div key="older">
                                        <div className="px-4 py-2 bg-gray-50">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Older</p>
                                        </div>
                                        {groups.older.map((notification) => (
                                            <NotificationItem
                                                key={notification.id}
                                                notification={notification}
                                                onMarkAsRead={markAsRead}
                                                onDismiss={dismiss}
                                                onClick={handleNotificationClick}
                                            />
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {hasNotifications && (
                    <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                        <button
                            onClick={() => {
                                router.push('/dashboard/landlord/notifications');
                                onClose();
                            }}
                            className="text-xs text-brand-green hover:text-green-700 font-semibold w-full text-center"
                        >
                            View all notifications
                        </button>
                    </div>
                )}
            </motion.div>
        </>
    );
}

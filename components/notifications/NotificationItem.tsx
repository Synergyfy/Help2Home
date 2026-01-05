'use client';

import { Notification } from '@/lib/api/notifications';
import { formatDistanceToNow } from 'date-fns';
import { FiFileText, FiDollarSign, FiEdit, FiTool, FiUpload, FiBell, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface NotificationItemProps {
    notification: Notification & { isRead: boolean };
    onMarkAsRead: (id: string) => void;
    onDismiss: (id: string) => void;
    onClick?: (notification: Notification) => void;
}

const getNotificationIcon = (type: Notification['type']) => {
    const iconClass = 'w-4 h-4';

    switch (type) {
        case 'application':
            return <FiFileText className={iconClass} />;
        case 'payment':
            return <FiDollarSign className={iconClass} />;
        case 'contract':
            return <FiEdit className={iconClass} />;
        case 'maintenance':
            return <FiTool className={iconClass} />;
        case 'document':
            return <FiUpload className={iconClass} />;
        default:
            return <FiBell className={iconClass} />;
    }
};

const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
        case 'application':
            return 'bg-blue-100 text-blue-600';
        case 'payment':
            return 'bg-green-100 text-green-600';
        case 'contract':
            return 'bg-purple-100 text-purple-600';
        case 'maintenance':
            return 'bg-amber-100 text-amber-600';
        case 'document':
            return 'bg-indigo-100 text-indigo-600';
        default:
            return 'bg-gray-100 text-gray-600';
    }
};

export default function NotificationItem({
    notification,
    onMarkAsRead,
    onDismiss,
    onClick,
}: NotificationItemProps) {
    const handleClick = () => {
        if (!notification.isRead) {
            onMarkAsRead(notification.id);
        }
        onClick?.(notification);
    };

    const handleDismiss = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDismiss(notification.id);
    };

    const timeAgo = formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={`
        group relative px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-l-2
        ${notification.isRead ? 'border-transparent' : 'border-brand-green bg-green-50/30'}
      `}
            onClick={handleClick}
        >
            <div className="flex gap-3 items-start">
                {/* Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <p className={`text-sm ${notification.isRead ? 'text-gray-700' : 'text-gray-900 font-semibold'}`}>
                        {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{timeAgo}</p>
                </div>

                {/* Dismiss Button */}
                <button
                    onClick={handleDismiss}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-1"
                    aria-label="Dismiss notification"
                >
                    <FiX className="w-4 h-4" />
                </button>
            </div>

            {/* Unread indicator dot */}
            {!notification.isRead && (
                <div className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-brand-green rounded-full" />
            )}
        </motion.div>
    );
}

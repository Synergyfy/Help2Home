'use client';

import { useNotifications } from '@/hooks/useNotifications';
import { useRouter } from 'next/navigation';
import { FiFileText, FiDollarSign, FiEdit, FiTool, FiUpload, FiBell } from 'react-icons/fi';

const ActivityIcon = ({ type }: { type: string }) => {
    const iconClass = 'w-4 h-4';

    switch (type) {
        case 'application':
            return (
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <FiFileText className={iconClass} />
                </div>
            );
        case 'payment':
            return (
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <FiDollarSign className={iconClass} />
                </div>
            );
        case 'contract':
            return (
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                    <FiEdit className={iconClass} />
                </div>
            );
        case 'maintenance':
            return (
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <FiTool className={iconClass} />
                </div>
            );
        case 'document':
            return (
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                    <FiUpload className={iconClass} />
                </div>
            );
        default:
            return (
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                    <FiBell className={iconClass} />
                </div>
            );
    }
};

export default function ActivityFeed() {
    const router = useRouter();
    const { notifications, isLoading, markAsRead } = useNotifications();

    // Show only the 5 most recent activities
    const recentActivities = notifications.slice(0, 5);

    const handleActivityClick = (notification: typeof notifications[0]) => {
        if (!notification.isRead) {
            markAsRead(notification.id);
        }
        if (notification.actionUrl && notification.actionUrl !== '#') {
            router.push(notification.actionUrl);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent activity</h3>
                <button
                    onClick={() => router.push('/dashboard/landlord/notifications')}
                    className="text-sm text-[#00853E] font-medium hover:underline"
                >
                    View all
                </button>
            </div>

            {isLoading ? (
                <div className="text-center py-8">
                    <div className="w-8 h-8 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-xs text-gray-500 font-medium">Loading activities...</p>
                </div>
            ) : recentActivities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No recent activity. We'll show important events here.
                </div>
            ) : (
                <div className="space-y-6">
                    {recentActivities.map((item) => (
                        <div
                            key={item.id}
                            className={`flex gap-4 items-start group cursor-pointer ${!item.isRead ? 'bg-green-50/50 -mx-2 px-2 py-2 rounded-lg' : ''}`}
                            onClick={() => handleActivityClick(item)}
                        >
                            <ActivityIcon type={item.type} />
                            <div className="flex-1">
                                <p className={`text-sm ${item.isRead ? 'text-gray-900' : 'text-gray-900 font-semibold'} group-hover:text-[#00853E] transition-colors`}>
                                    {item.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
                            </div>
                            {!item.isRead && (
                                <div className="w-2 h-2 bg-brand-green rounded-full mt-2 flex-shrink-0" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

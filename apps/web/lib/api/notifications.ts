import { ActivityItem, MOCK_ACTIVITY } from '../mockLandlordData';
import { Role } from '@/store/userStore';

export interface Notification extends ActivityItem {
  priority: 'high' | 'medium' | 'low';
  actionUrl: string;
  createdAt: string; // ISO timestamp
  userId: string;
  role: Role;
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Convert mock activity to notifications with enhanced data
const convertToNotifications = (activities: ActivityItem[], userId: string, role: Role): Notification[] => {
  return activities.map((activity) => {
    // Determine priority based on type
    let priority: 'high' | 'medium' | 'low' = 'medium';
    if (activity.type === 'maintenance' || activity.type === 'application') {
      priority = 'high';
    } else if (activity.type === 'payment') {
      priority = 'medium';
    } else {
      priority = 'low';
    }

    // Generate ISO timestamp (recent dates)
    const hoursAgo = parseInt(activity.timestamp.split(' ')[0]) || 1;
    const createdAt = new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();

    return {
      ...activity,
      priority,
      actionUrl: activity.link,
      createdAt,
      userId,
      role,
    };
  });
};

// Generate additional mock notifications for variety
const generateAdditionalNotifications = (userId: string, role: Role): Notification[] => {
  const additionalActivities: ActivityItem[] = [
    {
      id: '6',
      type: 'document',
      message: 'Property inspection report uploaded for 15B Bourdillon St.',
      timestamp: '3 hours ago',
      read: false,
      link: '/dashboard/landlord/properties/15b-bourdillon',
    },
    {
      id: '7',
      type: 'payment',
      message: 'Rent reminder sent to 3 tenants',
      timestamp: '6 hours ago',
      read: true,
      link: '/dashboard/landlord/tenants',
    },
    {
      id: '8',
      type: 'application',
      message: 'Background check completed for applicant Sarah M.',
      timestamp: '8 hours ago',
      read: true,
      link: '/dashboard/landlord/applications',
    },
    {
      id: '9',
      type: 'maintenance',
      message: 'Plumber scheduled for Apt 1B - Jan 6, 10:00 AM',
      timestamp: '12 hours ago',
      read: true,
      link: '/dashboard/landlord/maintenance',
    },
    {
      id: '10',
      type: 'contract',
      message: 'Lease renewal due in 30 days for Apt 2A',
      timestamp: '1 day ago',
      read: true,
      link: '/dashboard/landlord/tenants',
    },
  ];

  return convertToNotifications(additionalActivities, userId, role);
};

/**
 * Fetch all notifications for a user and role
 */
export const fetchNotifications = async (
  userId: string,
  role: Role | null
): Promise<Notification[]> => {
  // Simulate API delay
  await delay(Math.random() * 300 + 200);

  if (!role) {
    return [];
  }

  // Combine mock activity with additional notifications
  const baseNotifications = convertToNotifications(MOCK_ACTIVITY, userId, role);
  const additionalNotifications = generateAdditionalNotifications(userId, role);
  
  const allNotifications = [...baseNotifications, ...additionalNotifications];

  // Sort by createdAt (newest first)
  return allNotifications.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

/**
 * Mark a single notification as read (mock API call)
 */
export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  await delay(100);
  // In a real app, this would make an API call
  console.log(`Marked notification ${notificationId} as read`);
};

/**
 * Mark all notifications as read (mock API call)
 */
export const markAllNotificationsAsRead = async (userId: string): Promise<void> => {
  await delay(150);
  // In a real app, this would make an API call
  console.log(`Marked all notifications as read for user ${userId}`);
};

/**
 * Dismiss a notification (mock API call)
 */
export const dismissNotification = async (notificationId: string): Promise<void> => {
  await delay(100);
  // In a real app, this would make an API call
  console.log(`Dismissed notification ${notificationId}`);
};

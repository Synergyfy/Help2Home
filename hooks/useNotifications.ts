import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { useNotificationStore } from '@/store/notificationStore';
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  dismissNotification,
  Notification,
} from '@/lib/api/notifications';

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const { id: userId, activeRole, hasHydrated: userHydrated } = useUserStore();
  const {
    readNotifications,
    dismissedNotifications,
    preferences,
    hasHydrated: notificationHydrated,
    markAsRead,
    markAllAsRead,
    dismissNotification: dismissFromStore,
    setLastFetchedAt,
  } = useNotificationStore();

  // Fetch notifications with TanStack Query
  const query = useQuery({
    queryKey: ['notifications', userId, activeRole],
    queryFn: () => fetchNotifications(userId, activeRole),
    enabled: userHydrated && notificationHydrated && !!userId && !!activeRole,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: preferences.pollInterval * 1000, // Convert to milliseconds
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 2,
  });

  // Update last fetched timestamp when data changes (wrapped in useEffect to prevent infinite loop)
  useEffect(() => {
    if (query.data && query.dataUpdatedAt) {
      setLastFetchedAt(query.dataUpdatedAt);
    }
  }, [query.dataUpdatedAt, setLastFetchedAt]);

  // Filter out dismissed notifications and add read status
  const notifications: (Notification & { isRead: boolean })[] = (query.data || [])
    .filter((n) => !dismissedNotifications.has(n.id))
    .map((n) => ({
      ...n,
      isRead: readNotifications.has(n.id) || n.read,
    }));

  // Calculate unread count
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Mark as read mutation with optimistic update
  const markAsReadMutation = useMutation({
    mutationFn: (notificationId: string) => markNotificationAsRead(notificationId),
    onMutate: async (notificationId: string) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['notifications', userId, activeRole] });

      // Snapshot previous value
      const previousNotifications = queryClient.getQueryData<Notification[]>([
        'notifications',
        userId,
        activeRole,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData<Notification[]>(
        ['notifications', userId, activeRole],
        (old) => old?.map((n) => (n.id === notificationId ? { ...n, read: true } : n)) || []
      );

      // Update Zustand store
      markAsRead(notificationId);

      return { previousNotifications };
    },
    onError: (_err, _notificationId, context) => {
      // Rollback on error
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ['notifications', userId, activeRole],
          context.previousNotifications
        );
      }
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['notifications', userId, activeRole] });
    },
  });

  // Mark all as read mutation
  const markAllAsReadMutation = useMutation({
    mutationFn: () => markAllNotificationsAsRead(userId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['notifications', userId, activeRole] });

      const previousNotifications = queryClient.getQueryData<Notification[]>([
        'notifications',
        userId,
        activeRole,
      ]);

      // Mark all as read optimistically
      queryClient.setQueryData<Notification[]>(
        ['notifications', userId, activeRole],
        (old) => old?.map((n) => ({ ...n, read: true })) || []
      );

      // Update Zustand store
      const allIds = notifications.map((n) => n.id);
      markAllAsRead(allIds);

      return { previousNotifications };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ['notifications', userId, activeRole],
          context.previousNotifications
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', userId, activeRole] });
    },
  });

  // Dismiss notification mutation
  const dismissMutation = useMutation({
    mutationFn: (notificationId: string) => dismissNotification(notificationId),
    onMutate: async (notificationId: string) => {
      await queryClient.cancelQueries({ queryKey: ['notifications', userId, activeRole] });

      const previousNotifications = queryClient.getQueryData<Notification[]>([
        'notifications',
        userId,
        activeRole,
      ]);

      // Remove from UI optimistically
      queryClient.setQueryData<Notification[]>(
        ['notifications', userId, activeRole],
        (old) => old?.filter((n) => n.id !== notificationId) || []
      );

      // Update Zustand store
      dismissFromStore(notificationId);

      return { previousNotifications };
    },
    onError: (_err, _notificationId, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ['notifications', userId, activeRole],
          context.previousNotifications
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', userId, activeRole] });
    },
  });

  return {
    notifications,
    unreadCount,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    markAsRead: (notificationId: string) => markAsReadMutation.mutate(notificationId),
    markAllAsRead: () => markAllAsReadMutation.mutate(),
    dismiss: (notificationId: string) => dismissMutation.mutate(notificationId),
  };
};

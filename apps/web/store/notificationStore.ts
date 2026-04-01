import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NotificationPreferences {
  enableSound: boolean;
  enableDesktop: boolean;
  pollInterval: number; // in seconds
}

interface NotificationState {
  // Track which notifications have been read (by ID)
  readNotifications: Set<string>;
  
  // Track which notifications have been dismissed
  dismissedNotifications: Set<string>;
  
  // User preferences for notifications
  preferences: NotificationPreferences;
  
  // Last time notifications were fetched
  lastFetchedAt: number | null;
  
  // Hydration flag
  hasHydrated: boolean;

  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
    timestamp: number;
    read: boolean;
  }>;
  
  // Actions
  addNotification: (notification: { title: string; message: string; type: 'success' | 'info' | 'warning' | 'error' }) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: (notificationIds: string[]) => void;
  dismissNotification: (notificationId: string) => void;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
  setLastFetchedAt: (timestamp: number) => void;
  setHasHydrated: (value: boolean) => void;
  resetNotifications: () => void;
}

const defaultPreferences: NotificationPreferences = {
  enableSound: false,
  enableDesktop: false,
  pollInterval: 30, // 30 seconds
};

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      readNotifications: new Set<string>(),
      dismissedNotifications: new Set<string>(),
      preferences: defaultPreferences,
      lastFetchedAt: null,
      hasHydrated: false,
      notifications: [],

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              ...notification,
              timestamp: Date.now(),
              read: false,
            },
            ...state.notifications,
          ].slice(0, 50), // Keep last 50 notifications
        })),

      markAsRead: (notificationId: string) =>
        set((state) => ({
          readNotifications: new Set([...state.readNotifications, notificationId]),
          notifications: state.notifications.map((n) =>
            n.id === notificationId ? { ...n, read: true } : n
          ),
        })),

      markAllAsRead: (notificationIds: string[]) =>
        set((state) => ({
          readNotifications: new Set([...state.readNotifications, ...notificationIds]),
        })),

      dismissNotification: (notificationId: string) =>
        set((state) => ({
          dismissedNotifications: new Set([...state.dismissedNotifications, notificationId]),
        })),

      updatePreferences: (preferences: Partial<NotificationPreferences>) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),

      setLastFetchedAt: (timestamp: number) =>
        set({ lastFetchedAt: timestamp }),

      setHasHydrated: (hasHydrated: boolean) =>
        set({ hasHydrated }),

      resetNotifications: () =>
        set({
          readNotifications: new Set<string>(),
          dismissedNotifications: new Set<string>(),
          lastFetchedAt: null,
        }),
    }),
    {
      name: 'help2home-notifications',
      // Custom storage to handle Set serialization
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              ...state,
              readNotifications: new Set(state.readNotifications || []),
              dismissedNotifications: new Set(state.dismissedNotifications || []),
            },
          };
        },
        setItem: (name, value) => {
          const str = JSON.stringify({
            state: {
              ...value.state,
              readNotifications: Array.from(value.state.readNotifications),
              dismissedNotifications: Array.from(value.state.dismissedNotifications),
            },
          });
          localStorage.setItem(name, str);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    }
  )
);

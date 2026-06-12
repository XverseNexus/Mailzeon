import { create } from 'zustand';

export interface AppNotification {
  _id:      string;
  title:    string;
  message:  string;
  type:     'order' | 'withdrawal' | 'verification' | 'dispute' | 'system';
  isRead:   boolean;
  orderId?: string;
  createdAt: string;
}

interface NotificationState {
  notifications: AppNotification[];
  unreadCount:   number;

  /** Replace the full list (called after fetching from API). */
  setNotifications: (notifications: AppNotification[]) => void;

  /** Prepend a new notification received via Socket.IO. */
  addNotification: (notification: AppNotification) => void;

  /** Mark a single notification as read. */
  markAsRead: (id: string) => void;

  /** Mark all notifications as read. */
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount:   0,

  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    }),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount:   state.unreadCount + 1,
    })),

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount:   0,
    })),
}));

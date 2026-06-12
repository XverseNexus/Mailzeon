'use client';

import { useEffect } from 'react';
import { api } from '@/lib/api';
import { useNotificationStore } from '@/store/notificationStore';
import { ApiResponse, Notification } from '@/types';

export function useNotifications() {
  const { setNotifications, markAsRead, markAllAsRead, notifications, unreadCount } =
    useNotificationStore();

  // Fetch on mount
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get<ApiResponse<Notification[]>>('/notifications');
        if (data.success && data.data) {
          // Cast to AppNotification shape (same fields)
          setNotifications(data.data as never);
        }
      } catch {
        // Silently fail — notifications are non-critical
      }
    };
    fetch();
  }, [setNotifications]);

  const handleMarkAsRead = async (id: string) => {
    try {
      markAsRead(id); // Optimistic update
      await api.patch(`/notifications/${id}/read`);
    } catch {
      // Revert handled by next fetch
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      markAllAsRead(); // Optimistic update
      await api.patch('/notifications/read-all');
    } catch {
      //
    }
  };

  return { notifications, unreadCount, handleMarkAsRead, handleMarkAllAsRead };
}

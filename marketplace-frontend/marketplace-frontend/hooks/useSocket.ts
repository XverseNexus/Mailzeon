'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';
import { initSocket, getSocket, SOCKET_EVENTS } from '@/lib/socket';
import { AppNotification } from '@/store/notificationStore';

/**
 * Mount this hook in the role layout (customer/layout.tsx, worker/layout.tsx,
 * admin/layout.tsx) so the socket is active for the entire session.
 */
export function useSocket() {
  const { user }           = useAuthStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if (!user) return;

    const socket = initSocket(user._id, user.role);

    // Listen for generic notification pushes from the server
    socket.on(SOCKET_EVENTS.NOTIFICATION, (notification: AppNotification) => {
      addNotification(notification);
    });

    return () => {
      socket.off(SOCKET_EVENTS.NOTIFICATION);
    };
  }, [user, addNotification]);

  return getSocket();
}

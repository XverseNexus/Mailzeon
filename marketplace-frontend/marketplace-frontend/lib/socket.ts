import { io, Socket } from 'socket.io-client';

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

let socket: Socket | null = null;

/**
 * Initialize the Socket.IO connection after login.
 * Joins the user's private room and (if worker) the marketplace room.
 */
export const initSocket = (userId: string, role: string): Socket => {
  // Prevent duplicate connections
  if (socket?.connected) return socket;

  socket = io(SOCKET_URL, {
    withCredentials: true,
    autoConnect: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on('connect', () => {
    console.log('[Socket] Connected:', socket?.id);
    // Every user joins their own private notification room
    socket?.emit('join-room', userId);
    // Approved online workers also join the order marketplace broadcast room
    if (role === 'worker') {
      socket?.emit('join-marketplace');
    }
  });

  socket.on('disconnect', (reason) => {
    console.log('[Socket] Disconnected:', reason);
  });

  socket.on('connect_error', (err) => {
    console.error('[Socket] Connection error:', err.message);
  });

  return socket;
};

/** Get the active socket instance (null if not connected yet). */
export const getSocket = (): Socket | null => socket;

/** Disconnect and clean up on logout. */
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('[Socket] Disconnected on logout');
  }
};

// ─── Event name constants (mirror the backend EVENTS object) ─────────────────
export const SOCKET_EVENTS = {
  NEW_ORDER:          'new-order',
  ORDER_ACCEPTED:     'order-accepted',
  CREDENTIALS_READY:  'credentials-ready',
  ORDER_COMPLETED:    'order-completed',
  ORDER_CANCELLED:    'order-cancelled',
  CODE_REQUESTED:     'code-requested',
  CODE_RECEIVED:      'code-received',
  NEW_CODE_REQUESTED: 'new-code-requested',
  WITHDRAWAL_DONE:    'withdrawal-done',
  WORKER_APPROVED:    'worker-approved',
  NOTIFICATION:       'notification',
} as const;

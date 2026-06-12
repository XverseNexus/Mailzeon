import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { disconnectSocket } from '@/lib/socket';

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'worker' | 'admin';
  isApproved: boolean;
  level?: 'bronze' | 'silver' | 'gold';
  profileImage?: string;
}

interface AuthState {
  user:            AuthUser | null;
  token:           string | null;
  isAuthenticated: boolean;

  /** Call this after a successful login or register API response. */
  setAuth: (user: AuthUser, token: string) => void;

  /** Call this on logout or when the session expires. */
  clearAuth: () => void;

  /** Patch individual user fields (e.g. after profile update). */
  updateUser: (updates: Partial<AuthUser>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user:            null,
      token:           null,
      isAuthenticated: false,

      setAuth: (user, token) => {
        // Persist token in localStorage for the Axios interceptor
        localStorage.setItem('mp_token', token);

        // Set cookies for Next.js middleware (route protection)
        const maxAge = 7 * 24 * 60 * 60; // 7 days
        document.cookie = `mp_token=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
        document.cookie = `mp_role=${user.role}; path=/; max-age=${maxAge}; SameSite=Lax`;

        set({ user, token, isAuthenticated: true });
      },

      clearAuth: () => {
        localStorage.removeItem('mp_token');

        // Clear cookies
        document.cookie = 'mp_token=; path=/; max-age=0';
        document.cookie = 'mp_role=; path=/; max-age=0';

        // Disconnect socket
        disconnectSocket();

        set({ user: null, token: null, isAuthenticated: false });
      },

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
    }),
    {
      name: 'mp_auth-storage',
      // Only persist these fields — don't persist sensitive data
      partialize: (state) => ({
        user:            state.user,
        token:           state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

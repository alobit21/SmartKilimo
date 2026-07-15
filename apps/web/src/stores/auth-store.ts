import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Role } from '@kilimosmart/shared-types';

interface AuthState {
  user: { id: string; role: Role; email?: string; name?: string } | null;
  token: string | null;
  login: (user: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'kilimosmart-auth',
    }
  )
);

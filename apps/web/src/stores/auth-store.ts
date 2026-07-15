import { create } from 'zustand';
import { Role } from '@kilimosmart/shared-types';

interface AuthState {
  user: { id: string; role: Role; email?: string } | null;
  token: string | null;
  login: (user: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null, // set to null by default
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));

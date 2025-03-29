import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful login
    set({
      user: {
        id: '1',
        email,
        name: 'Demo User',
      },
      isAuthenticated: true,
    });
  },

  signup: async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll simulate a successful signup
    set({
      user: {
        id: '1',
        email,
        name,
      },
      isAuthenticated: true,
    });
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));
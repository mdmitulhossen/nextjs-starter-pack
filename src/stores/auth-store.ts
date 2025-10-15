import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

/**
 * User state interface
 */
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'user' | 'admin';
}

/**
 * Auth store state
 */
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

/**
 * Auth store actions
 */
interface AuthActions {
    setUser: (user: User | null) => void;
    login: (user: User) => void;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
}

/**
 * Combined auth store type
 */
type AuthStore = AuthState & AuthActions;

/**
 * Auth store using Zustand
 * 
 * Features:
 * - Persist to localStorage
 * - DevTools support for debugging
 * - Immer for immutable updates
 * - Full TypeScript support
 */
export const useAuthStore = create<AuthStore>()(
    devtools(
        persist(
            immer((set) => ({
                // Initial state
                user: null,
                isAuthenticated: false,
                isLoading: false,

                // Actions
                setUser: (user) =>
                    set((state) => {
                        state.user = user;
                        state.isAuthenticated = !!user;
                    }),

                login: (user) =>
                    set((state) => {
                        state.user = user;
                        state.isAuthenticated = true;
                    }),

                logout: () =>
                    set((state) => {
                        state.user = null;
                        state.isAuthenticated = false;
                    }),

                updateUser: (updates) =>
                    set((state) => {
                        if (state.user) {
                            state.user = { ...state.user, ...updates };
                        }
                    }),
            })),
            {
                name: 'auth-storage',
                // Optionally, you can specify which parts of the state to persist
                partialize: (state) => ({
                    user: state.user,
                    isAuthenticated: state.isAuthenticated,
                }),
            }
        ),
        {
            name: 'AuthStore',
            enabled: process.env.NODE_ENV === 'development',
        }
    )
);

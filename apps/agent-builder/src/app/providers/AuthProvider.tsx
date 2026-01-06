import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import { authApi } from '@/features/auth/api';
import { env } from '@/shared/utils/env';
import type { User } from '@/shared/types';

interface AuthState {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    redirectToLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider
 * Manages authentication state and provides auth methods
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = useMemo(() => !!user, [user]);

    const redirectToLogin = useCallback(() => {
        if (typeof window !== 'undefined') {
            window.location.href = `${env.authAppUrl}/auth`;
        }
    }, []);

    const refreshUser = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await authApi.me();
            if (response.success && response.data?.user) {
                setUser(response.data.user);
            } else {
                setUser(null);
                redirectToLogin();
            }
        } catch {
            setUser(null);
            redirectToLogin();
        } finally {
            setIsLoading(false);
        }
    }, [redirectToLogin]);

    const logout = useCallback(async () => {
        try {
            await authApi.logout();
        } catch {
            // Ignore logout errors
        } finally {
            setUser(null);
            redirectToLogin();
        }
    }, [redirectToLogin]);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const value = useMemo(() => ({
        user, isLoading, isAuthenticated, logout, refreshUser, redirectToLogin,
    }), [user, isLoading, isAuthenticated, logout, refreshUser, redirectToLogin]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}

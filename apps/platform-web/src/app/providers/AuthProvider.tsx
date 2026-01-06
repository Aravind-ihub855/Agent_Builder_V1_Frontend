'use client';

import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { authApi } from '@/features/auth/api';
import { getDashboardUrl } from '@/features/auth/constants';
import type { User } from '@/shared/types';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isAuthenticated = useMemo(() => !!user, [user]);

    const refreshUser = async () => {
        try {
            setIsLoading(true);
            const response = await authApi.me();
            setUser(response.success ? response.data?.user ?? null : null);
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const response = await authApi.login(email, password);
        if (response.success && response.data?.user) {
            setUser(response.data.user);
            window.location.href = getDashboardUrl();
        } else {
            throw new Error(response.message || 'Login failed');
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
        } catch {
            // Ignore
        } finally {
            setUser(null);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    const value = useMemo(() => ({
        user, isLoading, isAuthenticated, login, logout, refreshUser,
    }), [user, isLoading, isAuthenticated]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}

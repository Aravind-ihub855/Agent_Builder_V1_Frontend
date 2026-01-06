'use client';

import { useState, useCallback } from 'react';
import { authApi } from '../api';
import { getUserFriendlyMessage } from '@/shared/services';
import type { LoginFormData } from '../types';

interface UseLoginReturn {
    login: (data: LoginFormData) => Promise<void>;
    isLoading: boolean;
    error: string;
    clearError: () => void;
}

/**
 * Hook for handling login logic
 * Separates business logic from UI
 */
export function useLogin(onSuccess?: () => void): UseLoginReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const clearError = useCallback(() => setError(''), []);

    const login = useCallback(async (data: LoginFormData) => {
        setIsLoading(true);
        setError('');
        try {
            const response = await authApi.login(data.email, data.password);
            if (response.success) {
                onSuccess?.();
            } else {
                setError(response.message || 'Login failed');
            }
        } catch (err) {
            setError(getUserFriendlyMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, [onSuccess]);

    return { login, isLoading, error, clearError };
}

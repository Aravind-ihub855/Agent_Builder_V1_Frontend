'use client';

import { useState, useCallback } from 'react';
import { authApi } from '../api';
import { getUserFriendlyMessage } from '@/shared/services';
import type { RegisterFormData } from '../types';

interface UseRegisterReturn {
    register: (data: RegisterFormData) => Promise<void>;
    isLoading: boolean;
    error: string;
    success: string;
    clearError: () => void;
    clearSuccess: () => void;
}

/**
 * Hook for handling registration logic
 */
export function useRegister(): UseRegisterReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const clearError = useCallback(() => setError(''), []);
    const clearSuccess = useCallback(() => setSuccess(''), []);

    const register = useCallback(async (data: RegisterFormData) => {
        setIsLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await authApi.register({
                name: data.name,
                email: data.email,
                password: data.password,
            });
            if (response.success) {
                setSuccess('Account created! Please check your email to verify.');
            } else {
                setError(response.message || 'Registration failed');
            }
        } catch (err) {
            setError(getUserFriendlyMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { register, isLoading, error, success, clearError, clearSuccess };
}

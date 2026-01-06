'use client';

import { useState, useCallback } from 'react';
import { authApi } from '../api';
import { getUserFriendlyMessage } from '@/shared/services';
import type { ForgotPasswordFormData } from '../types';

interface UseForgotPasswordReturn {
    forgotPassword: (data: ForgotPasswordFormData) => Promise<void>;
    isLoading: boolean;
    error: string;
    success: string;
    clearError: () => void;
}

/**
 * Hook for handling forgot password logic
 */
export function useForgotPassword(): UseForgotPasswordReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const clearError = useCallback(() => setError(''), []);

    const forgotPassword = useCallback(async (data: ForgotPasswordFormData) => {
        setIsLoading(true);
        setError('');
        setSuccess('');
        try {
            const response = await authApi.forgotPassword(data.email);
            if (response.success) {
                setSuccess('If an account exists, a reset link has been sent.');
            } else {
                setError(response.message || 'Failed to send reset email');
            }
        } catch (err) {
            setError(getUserFriendlyMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { forgotPassword, isLoading, error, success, clearError };
}

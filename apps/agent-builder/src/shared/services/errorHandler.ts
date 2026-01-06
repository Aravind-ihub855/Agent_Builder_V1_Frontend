import type { AxiosError } from 'axios';

/**
 * Normalized API Error
 */
export interface ApiError {
    message: string;
    status?: number;
    code?: string;
}

/**
 * Normalize any error to ApiError format
 */
export function normalizeError(error: unknown): ApiError {
    // Axios error
    if (isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string; error?: string }>;
        const message =
            axiosError.response?.data?.message ||
            axiosError.response?.data?.error ||
            axiosError.message ||
            'An unexpected error occurred';
        return {
            message,
            status: axiosError.response?.status,
            code: axiosError.code,
        };
    }

    // Standard Error
    if (error instanceof Error) {
        return { message: error.message };
    }

    // String error
    if (typeof error === 'string') {
        return { message: error };
    }

    return { message: 'An unexpected error occurred' };
}

/**
 * Type guard for Axios errors
 */
function isAxiosError(error: unknown): error is AxiosError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'isAxiosError' in error &&
        (error as AxiosError).isAxiosError === true
    );
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyMessage(error: unknown): string {
    const normalized = normalizeError(error);

    // Map common HTTP status codes to friendly messages
    if (normalized.status) {
        switch (normalized.status) {
            case 400:
                return normalized.message || 'Invalid request. Please check your input.';
            case 401:
                return 'Your session has expired. Please log in again.';
            case 403:
                return 'You do not have permission to perform this action.';
            case 404:
                return 'The requested resource was not found.';
            case 429:
                return 'Too many requests. Please try again later.';
            case 500:
                return 'Server error. Please try again later.';
            default:
                return normalized.message;
        }
    }

    return normalized.message;
}

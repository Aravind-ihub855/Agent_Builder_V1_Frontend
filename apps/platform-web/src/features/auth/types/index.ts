// Re-export form types from validation schemas
export type { LoginFormData } from '../validation/login.schema';
export type { RegisterFormData } from '../validation/register.schema';
export type { ForgotPasswordFormData } from '../validation/forgotPassword.schema';
export type { ResetPasswordFormData } from '../validation/resetPassword.schema';

// Re-export shared types
export type { User, ApiResponse, AuthState } from '@/shared/types';

// Auth-specific response types
export interface LoginResponse {
    user: import('@/shared/types').User;
    message: string;
}

export interface MeResponse {
    user: import('@/shared/types').User;
}

export interface AuthResponse {
    success: boolean;
    data?: {
        user: import('@/shared/types').User;
    };
    message?: string;
}

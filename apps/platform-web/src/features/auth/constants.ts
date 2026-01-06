import { env } from '@/shared/utils/env';

/**
 * Auth messages
 */
export const AUTH_MESSAGES = {
    LOGIN_SUCCESS: 'Login successful! Welcome back.',
    REGISTER_SUCCESS: 'Account created! Please check your email to verify.',
    LOGOUT_SUCCESS: 'You have been logged out.',
    PASSWORD_RESET_SENT: 'Password reset email sent.',
    EMAIL_VERIFIED: 'Email verified successfully!',
} as const;

/**
 * Get dashboard URL from env
 */
export const getDashboardUrl = (): string => {
    return `${env.reactAppUrl}/dashboard`;
};

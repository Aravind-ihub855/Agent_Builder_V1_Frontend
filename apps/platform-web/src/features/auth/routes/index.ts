/**
 * Auth route paths (internal application routes)
 */
export const AUTH_ROUTES = {
    LOGIN: '/auth',
    REGISTER: '/auth?view=register',
    FORGOT_PASSWORD: '/auth?view=forgot',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
} as const;

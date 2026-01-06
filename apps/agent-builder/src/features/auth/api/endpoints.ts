/**
 * Auth API Endpoints
 * React app only needs session check (ME) and LOGOUT.
 * Login/Register happen in the Next.js app.
 */
export const AUTH_ENDPOINTS = {
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
} as const;

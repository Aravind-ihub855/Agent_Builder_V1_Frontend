import { httpClient } from '@/shared/api';
import { AUTH_ENDPOINTS } from './endpoints';
import type { User, ApiResponse } from '@/shared/types';

/**
 * Auth API Response Types
 */
export interface MeResponse {
    user: User;
}

/**
 * Authentication API Service
 * React app only needs session check (me) and logout.
 * Login/Register are handled by the Next.js app.
 */
export const authApi = {
    /**
     * Get current authenticated user
     */
    me: () =>
        httpClient.get<ApiResponse<MeResponse>>(AUTH_ENDPOINTS.ME),

    /**
     * Logout current user
     */
    logout: () =>
        httpClient.post<ApiResponse<{ message: string }>>(AUTH_ENDPOINTS.LOGOUT),
};

export default authApi;

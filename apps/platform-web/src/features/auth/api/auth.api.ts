import { httpClient } from '@/shared/api';
import { AUTH_ENDPOINTS } from '../api/endpoints';
import type { ApiResponse } from '@/shared/types';
import type { User, LoginResponse, MeResponse } from '../types';


/**
 * Authentication API Service
 */
export const authApi = {
    me: () =>
        httpClient.get<ApiResponse<MeResponse>>(AUTH_ENDPOINTS.ME),

    login: (email: string, password: string) =>
        httpClient.post<ApiResponse<LoginResponse>>(AUTH_ENDPOINTS.LOGIN, { email, password }),

    register: (data: { name: string; email: string; password: string }) =>
        httpClient.post<ApiResponse<{ message: string }>>(AUTH_ENDPOINTS.REGISTER, data),

    logout: () =>
        httpClient.post<ApiResponse<{ message: string }>>(AUTH_ENDPOINTS.LOGOUT),

    forgotPassword: (email: string) =>
        httpClient.post<ApiResponse<{ message: string }>>(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email }),

    resetPassword: (token: string, password: string) =>
        httpClient.post<ApiResponse<{ message: string }>>(AUTH_ENDPOINTS.RESET_PASSWORD, { token, password }),
};

export default authApi;

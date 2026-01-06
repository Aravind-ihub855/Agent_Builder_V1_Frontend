import axios, { type AxiosError, type AxiosResponse, type AxiosRequestConfig } from 'axios';
import { env } from '@/shared/utils/env';

/**
 * HTTP Client with Enterprise Security
 * - Cookie-based auth (no localStorage)
 * - 401 redirect to auth app
 * - Configurable timeout
 */
const axiosInstance = axios.create({
    baseURL: env.apiUrl,
    timeout: 30000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

/**
 * Response Interceptor
 * - 401: Redirect to auth app
 * - 403: Access denied logging
 */
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const status = error.response?.status;

        if (status === 401) {
            if (typeof window !== 'undefined') {
                window.location.href = `${env.authAppUrl}/auth`;
            }
            return Promise.reject(error);
        }

        if (status === 403) {
            console.warn('[HTTP] Access forbidden');
        }

        return Promise.reject(error);
    }
);

/**
 * Type-safe HTTP client
 */
export const httpClient = {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
        axiosInstance.get<T>(url, config).then((res) => res.data),

    post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        axiosInstance.post<T>(url, data, config).then((res) => res.data),

    put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        axiosInstance.put<T>(url, data, config).then((res) => res.data),

    patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
        axiosInstance.patch<T>(url, data, config).then((res) => res.data),

    delete: <T>(url: string, config?: AxiosRequestConfig) =>
        axiosInstance.delete<T>(url, config).then((res) => res.data),
};

export { axiosInstance };
export default httpClient;

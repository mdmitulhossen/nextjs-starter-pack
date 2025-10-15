import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from 'axios';
import { env } from '@/env';

/**
 * Base API configuration
 */
const apiConfig: AxiosRequestConfig = {
    baseURL: env.NEXT_PUBLIC_API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
};

/**
 * Main API client instance
 */
export const apiClient: AxiosInstance = axios.create(apiConfig);

/**
 * Request interceptor for adding authentication token
 */
apiClient.interceptors.request.use(
    (config) => {
        // Add auth token from session/storage if needed
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: Error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor for handling errors globally
 */
apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Attempt to refresh token or redirect to login
            if (typeof window !== 'undefined') {
                // Clear invalid token
                localStorage.removeItem('auth_token');

                // Redirect to login page
                window.location.href = '/auth/signin';
            }

            return Promise.reject(error);
        }

        // Handle network errors
        if (!error.response) {
            console.error('Network error:', error.message);
        }

        return Promise.reject(error);
    }
);

/**
 * Type-safe API error
 */
export interface ApiError {
    message: string;
    status?: number;
    errors?: Record<string, string[]>;
}

/**
 * Extract error message from API error
 */
export const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const apiError = error.response?.data as ApiError | undefined;
        return apiError?.message ?? error.message;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'An unexpected error occurred';
};

/**
 * API response wrapper type
 */
export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

/**
 * Paginated response type
 */
export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        page: number;
        perPage: number;
        total: number;
        totalPages: number;
    };
}

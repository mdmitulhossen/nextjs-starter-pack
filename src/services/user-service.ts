import { apiClient, type PaginatedResponse } from '@/lib/api-client';

/**
 * User interface
 */
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: 'user' | 'admin';
    createdAt: string;
    updatedAt: string;
}

/**
 * User service for API calls
 */
export const userService = {
    /**
     * Get all users with pagination
     */
    getUsers: async (page: number = 1, perPage: number = 10): Promise<PaginatedResponse<User>> => {
        const response = await apiClient.get<PaginatedResponse<User>>('/users', {
            params: { page, perPage },
        });
        return response.data;
    },

    /**
     * Get a single user by ID
     */
    getUser: async (id: string): Promise<User> => {
        const response = await apiClient.get<User>(`/users/${id}`);
        return response.data;
    },

    /**
     * Create a new user
     */
    createUser: async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
        const response = await apiClient.post<User>('/users', data);
        return response.data;
    },

    /**
     * Update an existing user
     */
    updateUser: async (id: string, data: Partial<User>): Promise<User> => {
        const response = await apiClient.patch<User>(`/users/${id}`, data);
        return response.data;
    },

    /**
     * Delete a user
     */
    deleteUser: async (id: string): Promise<void> => {
        await apiClient.delete(`/users/${id}`);
    },
};

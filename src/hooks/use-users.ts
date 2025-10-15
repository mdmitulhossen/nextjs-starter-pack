import { useQuery, useMutation, useQueryClient, type UseQueryOptions } from '@tanstack/react-query';
import { userService, type User } from '@/services/user-service';
import { useToast } from './use-toast';

/**
 * Query keys for user-related queries
 */
export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    list: (page: number, perPage: number) => [...userKeys.lists(), { page, perPage }] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id: string) => [...userKeys.details(), id] as const,
};

/**
 * Hook to fetch paginated users
 * Implements auto-retry, caching, and SWR
 */
export function useUsers(page: number = 1, perPage: number = 10) {
    return useQuery({
        queryKey: userKeys.list(page, perPage),
        queryFn: () => userService.getUsers(page, perPage),
        staleTime: 5 * 60 * 1000, // 5 minutes
        // Optionally enable placeholderData for smoother UX during pagination
        placeholderData: (previousData) => previousData,
    });
}

/**
 * Hook to fetch a single user
 */
export function useUser(id: string, options?: Omit<UseQueryOptions<User>, 'queryKey' | 'queryFn'>) {
    return useQuery({
        queryKey: userKeys.detail(id),
        queryFn: () => userService.getUser(id),
        ...options,
    });
}

/**
 * Hook to create a user with optimistic updates
 */
export function useCreateUser() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: userService.createUser,

        // Optimistic update
        onMutate: async () => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: userKeys.lists() });

            // Snapshot the previous value
            const previousUsers = queryClient.getQueryData(userKeys.lists());

            // Optimistically update to the new value
            // (This would require more complex logic in a real app)

            // Return context with previous data
            return { previousUsers };
        },

        // On error, roll back to previous value
        onError: (_err, _newUser, context) => {
            if (context?.previousUsers) {
                queryClient.setQueryData(userKeys.lists(), context.previousUsers);
            }

            toast({
                title: 'Error',
                description: 'Failed to create user',
                variant: 'destructive',
            });
        },        // On success, invalidate and refetch
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: userKeys.lists() });

            toast({
                title: 'Success',
                description: 'User created successfully',
            });
        },
    });
}

/**
 * Hook to update a user
 */
export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
            userService.updateUser(id, data),

        onSuccess: (data, variables) => {
            // Update the specific user in cache
            queryClient.setQueryData(userKeys.detail(variables.id), data);

            // Invalidate the list
            void queryClient.invalidateQueries({ queryKey: userKeys.lists() });

            toast({
                title: 'Success',
                description: 'User updated successfully',
            });
        },

        onError: () => {
            toast({
                title: 'Error',
                description: 'Failed to update user',
                variant: 'destructive',
            });
        },
    });
}

/**
 * Hook to delete a user
 */
export function useDeleteUser() {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    return useMutation({
        mutationFn: userService.deleteUser,

        onSuccess: (_, deletedId) => {
            // Remove from cache
            queryClient.removeQueries({ queryKey: userKeys.detail(deletedId) });

            // Invalidate the list
            void queryClient.invalidateQueries({ queryKey: userKeys.lists() });

            toast({
                title: 'Success',
                description: 'User deleted successfully',
            });
        },

        onError: () => {
            toast({
                title: 'Error',
                description: 'Failed to delete user',
                variant: 'destructive',
            });
        },
    });
}

/**
 * Hook to prefetch a user (useful for hover states)
 */
export function usePrefetchUser() {
    const queryClient = useQueryClient();

    return (id: string) => {
        void queryClient.prefetchQuery({
            queryKey: userKeys.detail(id),
            queryFn: () => userService.getUser(id),
            staleTime: 5 * 60 * 1000,
        });
    };
}

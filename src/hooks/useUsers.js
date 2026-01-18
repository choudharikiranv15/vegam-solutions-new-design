
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, updateUser, deleteUser, fetchUserStats } from '../services/api';

export const useUsers = ({ page, pageSize, query, status }) => {
    return useQuery({
        queryKey: ['users', { page, pageSize, query, status }],
        queryFn: () => fetchUsers({ page, pageSize, query, status }),
        keepPreviousData: true,
        staleTime: 5000,
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUser,
        onSuccess: (data, variables) => {
            // Invalidate and refetch users query to update the list
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['userStats'] }); // Also invalidate stats
        },
    });
};

export const useUserStats = () => {
    return useQuery({
        queryKey: ['userStats'],
        queryFn: fetchUserStats,
        staleTime: 30000, // 30 seconds
    });
};

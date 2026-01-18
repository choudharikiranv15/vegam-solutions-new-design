
import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchUsers = async ({ page = 1, pageSize = 10, query = '', status = 'all' }) => {
    const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
    });

    if (query) params.append('query', query);
    if (status && status !== 'all') params.append('status', status);

    const response = await api.get(`/users?${params.toString()}`);
    return response.data;
};

export const updateUser = async ({ userId, updates }) => {
    const response = await api.patch(`/users/${userId}`, updates);
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
};

export const fetchUserStats = async () => {
    const response = await api.get('/users/stats');
    return response.data;
};

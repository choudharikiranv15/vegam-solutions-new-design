
import { http, HttpResponse, delay } from 'msw';
import { getUsers, updateUser, deleteUser, getUserStats } from './data';

export const handlers = [
    // GET /api/users/stats - Fetch user statistics
    http.get('/api/users/stats', async () => {
        await delay(300);
        const stats = getUserStats();
        return HttpResponse.json({
            success: true,
            data: stats
        });
    }),

    // GET /api/users - Fetch users with pagination and filters
    http.get('/api/users', async ({ request }) => {
        // Simulate network delay
        await delay(500);

        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const pageSize = parseInt(url.searchParams.get('pageSize') || '10');
        const query = url.searchParams.get('query') || '';
        const status = url.searchParams.get('status') || 'all';

        const result = getUsers({ page, pageSize, query, status });

        return HttpResponse.json({
            data: {
                totalCount: result.totalCount,
                users: result.users,
            },
        });
    }),

    // PATCH /api/users/:id - Update user details
    http.patch('/api/users/:id', async ({ params, request }) => {
        // Simulate network delay
        await delay(300);

        const { id } = params;
        const body = await request.json();

        const updatedUser = updateUser(id, body);

        if (!updatedUser) {
            return HttpResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return HttpResponse.json({
            success: true,
            data: updatedUser,
            message: 'User updated successfully',
        });
    }),
    // DELETE /api/users/:id - Delete user
    http.delete('/api/users/:id', async ({ params }) => {
        await delay(300);
        const { id } = params;
        const success = deleteUser(id);

        if (!success) {
            return HttpResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return HttpResponse.json({
            success: true,
            message: 'User deleted successfully',
        });
    }),
];

import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useUsers, useUserStats, useUpdateUser, useDeleteUser } from './useUsers'

// Create a wrapper with QueryClientProvider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  })

  return function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }
}

describe('useUsers', () => {
  it('fetches users successfully', async () => {
    const { result } = renderHook(
      () => useUsers({ page: 1, pageSize: 10, query: '', status: 'all' }),
      { wrapper: createWrapper() }
    )

    // Initially loading
    expect(result.current.isLoading).toBe(true)

    // Wait for data to load
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    }, { timeout: 3000 })

    // Check data structure
    expect(result.current.data).toBeDefined()
    expect(result.current.data.data).toBeDefined()
    expect(result.current.data.data.users).toBeInstanceOf(Array)
    expect(result.current.data.data.totalCount).toBeGreaterThan(0)
  })

  it('respects pagination parameters', async () => {
    const { result } = renderHook(
      () => useUsers({ page: 1, pageSize: 5, query: '', status: 'all' }),
      { wrapper: createWrapper() }
    )

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    }, { timeout: 3000 })

    // Should return at most 5 users
    expect(result.current.data.data.users.length).toBeLessThanOrEqual(5)
  })

  it('filters by status', async () => {
    const { result } = renderHook(
      () => useUsers({ page: 1, pageSize: 100, query: '', status: 'active' }),
      { wrapper: createWrapper() }
    )

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    }, { timeout: 3000 })

    // All returned users should be active
    const users = result.current.data.data.users
    users.forEach(user => {
      expect(user.status).toBe('active')
    })
  })
})

describe('useUserStats', () => {
  it('fetches user statistics successfully', async () => {
    const { result } = renderHook(
      () => useUserStats(),
      { wrapper: createWrapper() }
    )

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    }, { timeout: 3000 })

    expect(result.current.data).toBeDefined()
    expect(result.current.data.data).toBeDefined()
    expect(result.current.data.data.totalUsers).toBeGreaterThan(0)
    expect(result.current.data.data.activeUsers).toBeDefined()
    expect(result.current.data.data.inactiveUsers).toBeDefined()
  })
})

describe('useUpdateUser', () => {
  it('returns mutation function', () => {
    const { result } = renderHook(
      () => useUpdateUser(),
      { wrapper: createWrapper() }
    )

    expect(result.current.mutate).toBeDefined()
    expect(result.current.mutateAsync).toBeDefined()
    expect(typeof result.current.mutate).toBe('function')
  })

  it('updates user successfully', async () => {
    const { result } = renderHook(
      () => useUpdateUser(),
      { wrapper: createWrapper() }
    )

    // Trigger mutation
    result.current.mutate({
      userId: 'user-1',
      updates: { name: 'Updated Name' }
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    }, { timeout: 3000 })

    expect(result.current.data.success).toBe(true)
  })
})

describe('useDeleteUser', () => {
  it('returns mutation function', () => {
    const { result } = renderHook(
      () => useDeleteUser(),
      { wrapper: createWrapper() }
    )

    expect(result.current.mutate).toBeDefined()
    expect(typeof result.current.mutate).toBe('function')
  })

  it('deletes user successfully', async () => {
    const { result } = renderHook(
      () => useDeleteUser(),
      { wrapper: createWrapper() }
    )

    // Trigger mutation
    result.current.mutate('user-99')

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    }, { timeout: 3000 })

    expect(result.current.data.success).toBe(true)
  })
})

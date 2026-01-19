import { describe, it, expect } from 'vitest'
import { fetchUsers, updateUser, deleteUser, fetchUserStats } from './api'

describe('API Service', () => {
  describe('fetchUsers', () => {
    it('fetches users with default parameters', async () => {
      const result = await fetchUsers({})

      expect(result).toBeDefined()
      expect(result.data).toBeDefined()
      expect(result.data.users).toBeInstanceOf(Array)
      expect(result.data.totalCount).toBeGreaterThan(0)
    })

    it('fetches users with pagination', async () => {
      const result = await fetchUsers({ page: 1, pageSize: 5 })

      expect(result.data.users.length).toBeLessThanOrEqual(5)
    })

    it('fetches users with search query', async () => {
      const result = await fetchUsers({ query: 'john', pageSize: 100 })

      // All returned users should match the query
      result.data.users.forEach(user => {
        const matchesQuery =
          user.name.toLowerCase().includes('john') ||
          user.email.toLowerCase().includes('john')
        expect(matchesQuery).toBe(true)
      })
    })

    it('fetches users filtered by active status', async () => {
      const result = await fetchUsers({ status: 'active', pageSize: 100 })

      result.data.users.forEach(user => {
        expect(user.status).toBe('active')
      })
    })

    it('fetches users filtered by inactive status', async () => {
      const result = await fetchUsers({ status: 'inactive', pageSize: 100 })

      result.data.users.forEach(user => {
        expect(user.status).toBe('inactive')
      })
    })
  })

  describe('fetchUserStats', () => {
    it('fetches user statistics', async () => {
      const result = await fetchUserStats()

      expect(result).toBeDefined()
      expect(result.data).toBeDefined()
      expect(typeof result.data.totalUsers).toBe('number')
      expect(typeof result.data.activeUsers).toBe('number')
      expect(typeof result.data.inactiveUsers).toBe('number')
      expect(result.data.roles).toBeDefined()
    })

    it('returns consistent total count', async () => {
      const stats = await fetchUserStats()

      expect(stats.data.activeUsers + stats.data.inactiveUsers).toBe(stats.data.totalUsers)
    })
  })

  describe('updateUser', () => {
    it('updates user successfully', async () => {
      const result = await updateUser({
        userId: 'user-1',
        updates: { name: 'Updated Name' }
      })

      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.message).toBe('User updated successfully')
    })

    it('returns error for non-existent user', async () => {
      try {
        await updateUser({
          userId: 'non-existent-user',
          updates: { name: 'Test' }
        })
      } catch (error) {
        expect(error.response.status).toBe(404)
      }
    })
  })

  describe('deleteUser', () => {
    it('deletes user successfully', async () => {
      const result = await deleteUser('user-98')

      expect(result.success).toBe(true)
      expect(result.message).toBe('User deleted successfully')
    })

    it('returns error for non-existent user', async () => {
      try {
        await deleteUser('non-existent-user')
      } catch (error) {
        expect(error.response.status).toBe(404)
      }
    })
  })
})

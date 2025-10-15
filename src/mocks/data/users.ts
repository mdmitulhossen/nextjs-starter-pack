/**
 * 🎭 Mock Data - Users
 *
 * Realistic user data for development and testing
 */

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  updatedAt: string
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-12-20T14:30:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    role: 'user',
    status: 'active',
    createdAt: '2024-02-10T08:15:00Z',
    updatedAt: '2024-12-19T16:45:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    role: 'user',
    status: 'active',
    createdAt: '2024-03-05T12:30:00Z',
    updatedAt: '2024-12-18T09:20:00Z',
  },
  {
    id: '4',
    name: 'Alice Williams',
    email: 'alice@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    role: 'user',
    status: 'pending',
    createdAt: '2024-12-01T14:00:00Z',
    updatedAt: '2024-12-20T10:00:00Z',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-10-15T11:30:00Z',
  },
]

// Helper to generate more users
export function generateMockUsers(count: number): User[] {
  const roles: User['role'][] = ['admin', 'user', 'guest']
  const statuses: User['status'][] = ['active', 'inactive', 'pending']

  return Array.from({ length: count }, (_, i) => ({
    id: `${mockUsers.length + i + 1}`,
    name: `User ${mockUsers.length + i + 1}`,
    email: `user${mockUsers.length + i + 1}@example.com`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`,
    role: roles[Math.floor(Math.random() * roles.length)] as User['role'],
    status: statuses[Math.floor(Math.random() * statuses.length)] as User['status'],
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  }))
}

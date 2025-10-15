/**
 * 🎭 MSW Handlers - API Mocks
 *
 * Mock API endpoints for development without a backend
 */

import { http, HttpResponse, delay } from 'msw'
import { mockUsers, generateMockUsers, type User } from './data/users'
import { mockProducts, generateMockProducts, type Product } from './data/products'

// API base URL
const API_URL = process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:3000/api'

// Simulate network delay (ms)
const NETWORK_DELAY = 300

// In-memory storage (resets on reload)
const users = [...mockUsers, ...generateMockUsers(20)]
const products = [...mockProducts, ...generateMockProducts(20)]

/**
 * ===========================================
 * 👥 USER ENDPOINTS
 * ===========================================
 */

export const userHandlers = [
  // GET /users - Get all users with pagination
  http.get(`${API_URL}/users`, async ({ request }) => {
    await delay(NETWORK_DELAY)

    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const perPage = parseInt(url.searchParams.get('perPage') || '10')
    const search = url.searchParams.get('search') || ''
    const role = url.searchParams.get('role') || ''
    const status = url.searchParams.get('status') || ''

    // Filter
    let filteredUsers = users
    if (search) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role)
    }
    if (status) {
      filteredUsers = filteredUsers.filter(user => user.status === status)
    }

    // Paginate
    const total = filteredUsers.length
    const start = (page - 1) * perPage
    const end = start + perPage
    const paginatedUsers = filteredUsers.slice(start, end)

    return HttpResponse.json({
      data: paginatedUsers,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    })
  }),

  // GET /users/:id - Get single user
  http.get(`${API_URL}/users/:id`, async ({ params }) => {
    await delay(NETWORK_DELAY)

    const userId = String(params['id'])
    const user = users.find(u => u.id === userId)

    if (!user) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({ data: user })
  }),

  // POST /users - Create user
  http.post(`${API_URL}/users`, async ({ request }) => {
    await delay(NETWORK_DELAY)

    const body = await request.json() as Partial<User>

    // Validation
    if (!body.name || !body.email) {
      return HttpResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Check duplicate email
    if (users.some(u => u.email === body.email)) {
      return HttpResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }

    const newUser: User = {
      id: String(users.length + 1),
      name: body.name,
      email: body.email,
      avatar: body.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${body.name}`,
      role: body.role || 'user',
      status: body.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    users.push(newUser)

    return HttpResponse.json(
      { data: newUser, message: 'User created successfully' },
      { status: 201 }
    )
  }),

  // PUT /users/:id - Update user
  http.put(`${API_URL}/users/:id`, async ({ params, request }) => {
    await delay(NETWORK_DELAY)

    const userId = String(params['id'])
    const userIndex = users.findIndex(u => u.id === userId)

    if (userIndex === -1) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json() as Partial<User>
    const currentUser = users[userIndex]

    if (currentUser) {
      users[userIndex] = {
        ...currentUser,
        ...body,
        id: currentUser.id,
        updatedAt: new Date().toISOString(),
      }
    }

    return HttpResponse.json({
      data: users[userIndex],
      message: 'User updated successfully',
    })
  }),

  // DELETE /users/:id - Delete user
  http.delete(`${API_URL}/users/:id`, async ({ params }) => {
    await delay(NETWORK_DELAY)

    const userId = String(params['id'])
    const userIndex = users.findIndex(u => u.id === userId)

    if (userIndex === -1) {
      return HttpResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    users.splice(userIndex, 1)

    return HttpResponse.json({
      message: 'User deleted successfully',
    })
  }),
]

/**
 * ===========================================
 * 📦 PRODUCT ENDPOINTS
 * ===========================================
 */

export const productHandlers = [
  // GET /products - Get all products
  http.get(`${API_URL}/products`, async ({ request }) => {
    await delay(NETWORK_DELAY)

    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const perPage = parseInt(url.searchParams.get('perPage') || '10')
    const search = url.searchParams.get('search') || ''
    const category = url.searchParams.get('category') || ''
    const featured = url.searchParams.get('featured')
    const minPrice = parseFloat(url.searchParams.get('minPrice') || '0')
    const maxPrice = parseFloat(url.searchParams.get('maxPrice') || '999999')

    // Filter
    let filteredProducts = products
    if (search) {
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category)
    }
    if (featured !== null && featured !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.featured === (featured === 'true'))
    }
    filteredProducts = filteredProducts.filter(p =>
      p.price >= minPrice && p.price <= maxPrice
    )

    // Paginate
    const total = filteredProducts.length
    const start = (page - 1) * perPage
    const end = start + perPage
    const paginatedProducts = filteredProducts.slice(start, end)

    return HttpResponse.json({
      data: paginatedProducts,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    })
  }),

  // GET /products/:id - Get single product
  http.get(`${API_URL}/products/:id`, async ({ params }) => {
    await delay(NETWORK_DELAY)

    const productId = String(params['id'])
    const product = products.find(p => p.id === productId)

    if (!product) {
      return HttpResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return HttpResponse.json({ data: product })
  }),

  // POST /products - Create product
  http.post(`${API_URL}/products`, async ({ request }) => {
    await delay(NETWORK_DELAY)

    const body = await request.json() as Partial<Product>

    if (!body.name || !body.price) {
      return HttpResponse.json(
        { error: 'Name and price are required' },
        { status: 400 }
      )
    }

    const newProduct: Product = {
      id: String(products.length + 1),
      name: body.name,
      description: body.description || '',
      price: body.price,
      currency: body.currency || 'USD',
      category: body.category || 'Uncategorized',
      stock: body.stock || 0,
      rating: 0,
      reviews: 0,
      featured: body.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add image if provided
    if (body.image) {
      newProduct.image = body.image
    }

    products.push(newProduct)

    return HttpResponse.json(
      { data: newProduct, message: 'Product created successfully' },
      { status: 201 }
    )
  }),

  // PUT /products/:id - Update product
  http.put(`${API_URL}/products/:id`, async ({ params, request }) => {
    await delay(NETWORK_DELAY)

    const productId = String(params['id'])
    const productIndex = products.findIndex(p => p.id === productId)

    if (productIndex === -1) {
      return HttpResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const body = await request.json() as Partial<Product>
    const currentProduct = products[productIndex]

    if (currentProduct) {
      products[productIndex] = {
        ...currentProduct,
        ...body,
        id: currentProduct.id,
        updatedAt: new Date().toISOString(),
      }
    }

    return HttpResponse.json({
      data: products[productIndex],
      message: 'Product updated successfully',
    })
  }),

  // DELETE /products/:id - Delete product
  http.delete(`${API_URL}/products/:id`, async ({ params }) => {
    await delay(NETWORK_DELAY)

    const productId = String(params['id'])
    const productIndex = products.findIndex(p => p.id === productId)

    if (productIndex === -1) {
      return HttpResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    products.splice(productIndex, 1)

    return HttpResponse.json({
      message: 'Product deleted successfully',
    })
  }),
]

/**
 * ===========================================
 * 🔐 AUTH ENDPOINTS (Simple Mock)
 * ===========================================
 */

export const authHandlers = [
  // POST /auth/login
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
    await delay(NETWORK_DELAY)

    const body = await request.json() as { email: string; password: string }

    const user = users.find(u => u.email === body.email)

    if (!user || body.password !== 'password') {
      return HttpResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    return HttpResponse.json({
      data: {
        user,
        token: `mock-jwt-token-${user.id}`,
      },
    })
  }),

  // POST /auth/register
  http.post(`${API_URL}/auth/register`, async ({ request }) => {
    await delay(NETWORK_DELAY)

    const body = await request.json() as Partial<User> & { password: string }

    if (!body.email || !body.password || !body.name) {
      return HttpResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    if (users.some(u => u.email === body.email)) {
      return HttpResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }

    const newUser: User = {
      id: String(users.length + 1),
      name: body.name,
      email: body.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${body.name}`,
      role: 'user',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    users.push(newUser)

    return HttpResponse.json(
      {
        data: {
          user: newUser,
          token: `mock-jwt-token-${newUser.id}`,
        },
        message: 'User registered successfully',
      },
      { status: 201 }
    )
  }),
]

// Combine all handlers
export const handlers = [
  ...userHandlers,
  ...productHandlers,
  ...authHandlers,
]

/**
 * 🎭 Mock Data - Products
 *
 * Realistic product data for development and testing
 */

export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  category: string
  image?: string
  stock: number
  rating: number
  reviews: number
  featured: boolean
  createdAt: string
  updatedAt: string
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation',
    price: 299.99,
    currency: 'USD',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    stock: 45,
    rating: 4.5,
    reviews: 128,
    featured: true,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-12-15T14:30:00Z',
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor',
    price: 199.99,
    currency: 'USD',
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    stock: 32,
    rating: 4.2,
    reviews: 95,
    featured: true,
    createdAt: '2024-02-05T08:15:00Z',
    updatedAt: '2024-12-14T16:45:00Z',
  },
  {
    id: '3',
    name: 'Laptop Backpack',
    description: 'Durable backpack with laptop compartment',
    price: 79.99,
    currency: 'USD',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    stock: 78,
    rating: 4.7,
    reviews: 245,
    featured: false,
    createdAt: '2024-03-12T12:30:00Z',
    updatedAt: '2024-12-13T09:20:00Z',
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical gaming keyboard',
    price: 149.99,
    currency: 'USD',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
    stock: 23,
    rating: 4.6,
    reviews: 167,
    featured: true,
    createdAt: '2024-04-08T14:00:00Z',
    updatedAt: '2024-12-12T10:00:00Z',
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 49.99,
    currency: 'USD',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
    stock: 156,
    rating: 4.3,
    reviews: 89,
    featured: false,
    createdAt: '2024-05-20T09:00:00Z',
    updatedAt: '2024-12-11T11:30:00Z',
  },
  {
    id: '6',
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI and ethernet',
    price: 59.99,
    currency: 'USD',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400',
    stock: 67,
    rating: 4.4,
    reviews: 142,
    featured: false,
    createdAt: '2024-06-15T11:00:00Z',
    updatedAt: '2024-12-10T15:20:00Z',
  },
]

export const categories = [
  'Electronics',
  'Wearables',
  'Accessories',
  'Computing',
  'Audio',
  'Gaming',
]

// Helper to generate more products
export function generateMockProducts(count: number): Product[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${mockProducts.length + i + 1}`,
    name: `Product ${mockProducts.length + i + 1}`,
    description: `Description for product ${mockProducts.length + i + 1}`,
    price: Math.floor(Math.random() * 500) + 10,
    currency: 'USD',
    category: categories[Math.floor(Math.random() * categories.length)] || 'Electronics',
    stock: Math.floor(Math.random() * 200),
    rating: Math.floor(Math.random() * 50) / 10,
    reviews: Math.floor(Math.random() * 500),
    featured: Math.random() > 0.7,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  }))
}

import { apiClient } from '@/lib/api-client'

export interface Product {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  // Add more fields as needed
}

export interface CreateProductData {
  name: string
  // Add required fields for creation
}

export interface UpdateProductData {
  name?: string
  // Add fields that can be updated
}

export interface ProductListParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  order?: 'asc' | 'desc'
}

export interface ProductListResponse {
  data: Product[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

class ProductService {
  private readonly basePath = '/products'

  /**
   * Get all products with pagination
   */
  async getAll(params?: ProductListParams): Promise<ProductListResponse> {
    const response = await apiClient.get<ProductListResponse>(this.basePath, {
      params,
    })
    return response.data
  }

  /**
   * Get a single product by ID
   */
  async getById(id: string): Promise<Product> {
    const response = await apiClient.get<Product>(`${this.basePath}/${id}`)
    return response.data
  }

  /**
   * Create a new product
   */
  async create(data: CreateProductData): Promise<Product> {
    const response = await apiClient.post<Product>(this.basePath, data)
    return response.data
  }

  /**
   * Update an existing product
   */
  async update(id: string, data: UpdateProductData): Promise<Product> {
    const response = await apiClient.put<Product>(`${this.basePath}/${id}`, data)
    return response.data
  }

  /**
   * Delete a product
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`)
  }

  /**
   * Search products
   */
  async search(query: string): Promise<Product[]> {
    const response = await apiClient.get<Product[]>(`${this.basePath}/search`, {
      params: { q: query },
    })
    return response.data
  }
}

export const productService = new ProductService()

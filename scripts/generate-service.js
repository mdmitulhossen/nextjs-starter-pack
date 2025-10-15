#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const serviceName = args[0];

if (!serviceName) {
  console.error('❌ Error: Please provide a service name');
  console.log('\n📖 Usage: npm run generate:service <service-name>');
  console.log('   Example: npm run generate:service product');
  console.log('   Creates: src/services/product.service.ts\n');
  process.exit(1);
}

const cleanName = serviceName.replace(/Service$/, '').toLowerCase();
const serviceDir = path.join(process.cwd(), 'src', 'services');
const serviceFile = path.join(serviceDir, `${cleanName}.service.ts`);

// Create directory if it doesn't exist
if (!fs.existsSync(serviceDir)) {
  fs.mkdirSync(serviceDir, { recursive: true });
}

// Check if file already exists
if (fs.existsSync(serviceFile)) {
  console.error(`❌ Error: Service already exists at ${serviceFile}`);
  process.exit(1);
}

// Capitalize first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const typeName = capitalize(cleanName);

// Template
const template = `import { apiClient } from '@/lib/api-client'

export interface ${typeName} {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  // Add more fields as needed
}

export interface Create${typeName}Data {
  name: string
  // Add required fields for creation
}

export interface Update${typeName}Data {
  name?: string
  // Add fields that can be updated
}

export interface ${typeName}ListParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  order?: 'asc' | 'desc'
}

export interface ${typeName}ListResponse {
  data: ${typeName}[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

class ${typeName}Service {
  private readonly basePath = '/${cleanName}s'

  /**
   * Get all ${cleanName}s with pagination
   */
  async getAll(params?: ${typeName}ListParams): Promise<${typeName}ListResponse> {
    const response = await apiClient.get<${typeName}ListResponse>(this.basePath, {
      params,
    })
    return response.data
  }

  /**
   * Get a single ${cleanName} by ID
   */
  async getById(id: string): Promise<${typeName}> {
    const response = await apiClient.get<${typeName}>(\`\${this.basePath}/\${id}\`)
    return response.data
  }

  /**
   * Create a new ${cleanName}
   */
  async create(data: Create${typeName}Data): Promise<${typeName}> {
    const response = await apiClient.post<${typeName}>(this.basePath, data)
    return response.data
  }

  /**
   * Update an existing ${cleanName}
   */
  async update(id: string, data: Update${typeName}Data): Promise<${typeName}> {
    const response = await apiClient.put<${typeName}>(\`\${this.basePath}/\${id}\`, data)
    return response.data
  }

  /**
   * Delete a ${cleanName}
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(\`\${this.basePath}/\${id}\`)
  }

  /**
   * Search ${cleanName}s
   */
  async search(query: string): Promise<${typeName}[]> {
    const response = await apiClient.get<${typeName}[]>(\`\${this.basePath}/search\`, {
      params: { q: query },
    })
    return response.data
  }
}

export const ${cleanName}Service = new ${typeName}Service()
`;

// Write file
fs.writeFileSync(serviceFile, template);

console.log('✅ Successfully created service!');
console.log(`   📁 ${serviceFile}`);
console.log('\n📝 Usage:');
console.log(`   import { ${cleanName}Service } from '@/services/${cleanName}.service'`);
console.log(`   `);
console.log(`   const ${cleanName}s = await ${cleanName}Service.getAll()`);
console.log(`   const ${cleanName} = await ${cleanName}Service.getById('1')`);
console.log(`   `);
console.log('📝 Next steps:');
console.log('   1. Update interfaces with your actual fields');
console.log('   2. Adjust API endpoints to match your backend');
console.log('   3. Create TanStack Query hooks for this service\n');

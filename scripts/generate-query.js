#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const queryName = args[0];

if (!queryName) {
  console.error('❌ Error: Please provide a query hook name');
  console.log('\n📖 Usage: npm run generate:query <hook-name>');
  console.log('   Example: npm run generate:query useProducts');
  console.log('   Creates: src/hooks/use-products.ts\n');
  process.exit(1);
}

// Remove 'use' prefix if present
const cleanName = queryName.replace(/^use/, '').toLowerCase();
const hookName = `use${cleanName.charAt(0).toUpperCase()}${cleanName.slice(1)}`;

const hookDir = path.join(process.cwd(), 'src', 'hooks');
const hookFile = path.join(hookDir, `${hookName.toLowerCase().replace(/use/, 'use-')}.ts`);

// Create directory if it doesn't exist
if (!fs.existsSync(hookDir)) {
  fs.mkdirSync(hookDir, { recursive: true });
}

// Check if file already exists
if (fs.existsSync(hookFile)) {
  console.error(`❌ Error: Hook already exists at ${hookFile}`);
  process.exit(1);
}

// Capitalize first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const singular = cleanName.replace(/s$/, '');
const typeName = capitalize(singular);

// Template
const template = `import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import { ${singular}Service, type ${typeName}, type Create${typeName}Data, type Update${typeName}Data } from '@/services/${singular}.service'
import { useToast } from '@/hooks/use-toast'

// Query Keys
export const ${cleanName}Keys = {
  all: ['${cleanName}'] as const,
  lists: () => [...${cleanName}Keys.all, 'list'] as const,
  list: (params?: any) => [...${cleanName}Keys.lists(), params] as const,
  details: () => [...${cleanName}Keys.all, 'detail'] as const,
  detail: (id: string) => [...${cleanName}Keys.details(), id] as const,
}

/**
 * Hook to fetch all ${cleanName}
 */
export function ${hookName}(
  params?: any,
  options?: Omit<UseQueryOptions<any, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ${cleanName}Keys.list(params),
    queryFn: () => ${singular}Service.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

/**
 * Hook to fetch a single ${singular}
 */
export function ${hookName.replace(/s$/, '')}(
  id: string,
  options?: Omit<UseQueryOptions<${typeName}, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ${cleanName}Keys.detail(id),
    queryFn: () => ${singular}Service.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  })
}

/**
 * Hook to create a ${singular}
 */
export function useCreate${typeName}(
  options?: UseMutationOptions<${typeName}, Error, Create${typeName}Data>
) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ${singular}Service.create,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ${cleanName}Keys.lists() })

      // Optimistically update cache
      queryClient.setQueryData(${cleanName}Keys.detail(data.id), data)

      toast({
        title: 'Success',
        description: '${typeName} created successfully',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create ${singular}',
        variant: 'destructive',
      })
    },
    ...options,
  })
}

/**
 * Hook to update a ${singular}
 */
export function useUpdate${typeName}(
  options?: UseMutationOptions<${typeName}, Error, { id: string; data: Update${typeName}Data }>
) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({ id, data }) => ${singular}Service.update(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ${cleanName}Keys.detail(id) })

      // Snapshot previous value
      const previous = queryClient.getQueryData<${typeName}>(${cleanName}Keys.detail(id))

      // Optimistically update
      if (previous) {
        queryClient.setQueryData<${typeName}>(${cleanName}Keys.detail(id), {
          ...previous,
          ...data,
        })
      }

      return { previous, id }
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previous) {
        queryClient.setQueryData(${cleanName}Keys.detail(context.id), context.previous)
      }

      toast({
        title: 'Error',
        description: error.message || 'Failed to update ${singular}',
        variant: 'destructive',
      })
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ${cleanName}Keys.lists() })
      queryClient.invalidateQueries({ queryKey: ${cleanName}Keys.detail(variables.id) })

      toast({
        title: 'Success',
        description: '${typeName} updated successfully',
      })
    },
    ...options,
  })
}

/**
 * Hook to delete a ${singular}
 */
export function useDelete${typeName}(
  options?: UseMutationOptions<void, Error, string>
) {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ${singular}Service.delete,
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: ${cleanName}Keys.detail(id) })
      queryClient.invalidateQueries({ queryKey: ${cleanName}Keys.lists() })

      toast({
        title: 'Success',
        description: '${typeName} deleted successfully',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete ${singular}',
        variant: 'destructive',
      })
    },
    ...options,
  })
}

/**
 * Hook to prefetch a ${singular}
 */
export function usePrefetch${typeName}() {
  const queryClient = useQueryClient()

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ${cleanName}Keys.detail(id),
      queryFn: () => ${singular}Service.getById(id),
      staleTime: 5 * 60 * 1000, // 5 minutes
    })
  }
}
`;

// Write file
fs.writeFileSync(hookFile, template);

console.log('✅ Successfully created TanStack Query hooks!');
console.log(`   📁 ${hookFile}`);
console.log('\n📝 Usage:');
console.log(
  `   import { ${hookName}, useCreate${typeName} } from '@/hooks/${hookName.toLowerCase().replace(/use/, 'use-')}'`
);
console.log(`   `);
console.log(`   const { data, isLoading } = ${hookName}()`);
console.log(`   const createMutation = useCreate${typeName}()`);
console.log(`   `);
console.log('📝 Next steps:');
console.log(`   1. Make sure ${singular}.service.ts exists`);
console.log('   2. Update interfaces to match your data structure');
console.log('   3. Use the hooks in your components\n');

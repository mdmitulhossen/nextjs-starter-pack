#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const storeName = args[0];

if (!storeName) {
  console.error('❌ Error: Please provide a store name');
  console.log('\n📖 Usage: npm run generate:store <store-name>');
  console.log('   Example: npm run generate:store useUserStore');
  console.log('   Creates: src/lib/stores/user.store.ts\n');
  process.exit(1);
}

// Remove 'use' prefix and 'Store' suffix if present
const cleanName = storeName
  .replace(/^use/, '')
  .replace(/Store$/, '')
  .toLowerCase();

const storeDir = path.join(process.cwd(), 'src', 'lib', 'stores');
const storeFile = path.join(storeDir, `${cleanName}.store.ts`);

// Create directory if it doesn't exist
if (!fs.existsSync(storeDir)) {
  fs.mkdirSync(storeDir, { recursive: true });
}

// Check if file already exists
if (fs.existsSync(storeFile)) {
  console.error(`❌ Error: Store already exists at ${storeFile}`);
  process.exit(1);
}

// Capitalize first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const typeName = capitalize(cleanName);

// Template
const template = `import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface ${typeName} {
  id: string
  name: string
  // Add more fields as needed
}

interface ${typeName}StoreState {
  ${cleanName}: ${typeName} | null
  ${cleanName}s: ${typeName}[]
  isLoading: boolean
  error: string | null

  // Actions
  set${typeName}: (${cleanName}: ${typeName}) => void
  set${typeName}s: (${cleanName}s: ${typeName}[]) => void
  add${typeName}: (${cleanName}: ${typeName}) => void
  update${typeName}: (id: string, updates: Partial<${typeName}>) => void
  remove${typeName}: (id: string) => void
  clear${typeName}s: () => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

const initialState = {
  ${cleanName}: null,
  ${cleanName}s: [],
  isLoading: false,
  error: null,
}

export const use${typeName}Store = create<${typeName}StoreState>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,

        set${typeName}: (${cleanName}) =>
          set((state) => {
            state.${cleanName} = ${cleanName}
          }),

        set${typeName}s: (${cleanName}s) =>
          set((state) => {
            state.${cleanName}s = ${cleanName}s
          }),

        add${typeName}: (${cleanName}) =>
          set((state) => {
            state.${cleanName}s.push(${cleanName})
          }),

        update${typeName}: (id, updates) =>
          set((state) => {
            const index = state.${cleanName}s.findIndex((item) => item.id === id)
            if (index !== -1) {
              state.${cleanName}s[index] = { ...state.${cleanName}s[index], ...updates }
            }
          }),

        remove${typeName}: (id) =>
          set((state) => {
            state.${cleanName}s = state.${cleanName}s.filter((item) => item.id !== id)
          }),

        clear${typeName}s: () =>
          set((state) => {
            state.${cleanName}s = []
          }),

        setLoading: (isLoading) =>
          set((state) => {
            state.isLoading = isLoading
          }),

        setError: (error) =>
          set((state) => {
            state.error = error
          }),

        reset: () => set(initialState),
      })),
      {
        name: '${cleanName}-storage',
        // Optionally, you can specify which properties to persist
        // partialize: (state) => ({ ${cleanName}s: state.${cleanName}s }),
      }
    ),
    {
      name: '${typeName}Store',
    }
  )
)

// Selectors (optional but recommended)
export const select${typeName} = (state: ${typeName}StoreState) => state.${cleanName}
export const select${typeName}s = (state: ${typeName}StoreState) => state.${cleanName}s
export const selectIsLoading = (state: ${typeName}StoreState) => state.isLoading
export const selectError = (state: ${typeName}StoreState) => state.error
`;

// Write file
fs.writeFileSync(storeFile, template);

console.log('✅ Successfully created Zustand store!');
console.log(`   📁 ${storeFile}`);
console.log('\n📝 Usage:');
console.log(`   import { use${typeName}Store } from '@/lib/stores/${cleanName}.store'`);
console.log(`   `);
console.log(`   const { ${cleanName}s, add${typeName} } = use${typeName}Store()`);
console.log(`   `);
console.log('📝 Next steps:');
console.log('   1. Update the interface with your fields');
console.log('   2. Add custom actions if needed');
console.log('   3. Use the store in your components\n');

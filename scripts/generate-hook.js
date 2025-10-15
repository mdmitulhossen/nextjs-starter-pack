#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const hookName = process.argv[2];

if (!hookName) {
  console.error('Please provide a hook name (e.g., use-counter)');
  process.exit(1);
}

const hooksDir = path.join(process.cwd(), 'src', 'hooks');
const hookFile = path.join(hooksDir, `${hookName}.ts`);
const testFile = path.join(hooksDir, `__tests__`, `${hookName}.test.ts`);

// Convert kebab-case to camelCase
const camelCaseName = hookName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

const hookTemplate = `import { useState } from 'react';

/**
 * Custom hook: ${camelCaseName}
 * Add description here
 */
export function ${camelCaseName}() {
  const [state, setState] = useState(null);

  // Add your hook logic here

  return { state, setState };
}
`;

const testTemplate = `import { renderHook, act } from '@testing-library/react';
import { ${camelCaseName} } from '../${hookName}';

describe('${camelCaseName}', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => ${camelCaseName}());
    expect(result.current.state).toBeNull();
  });
});
`;

// Ensure directories exist
if (!fs.existsSync(hooksDir)) {
  fs.mkdirSync(hooksDir, { recursive: true });
}

const testDir = path.join(hooksDir, '__tests__');
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

// Create files
fs.writeFileSync(hookFile, hookTemplate);
fs.writeFileSync(testFile, testTemplate);

console.log(`✅ Hook ${hookName} created successfully!`);
console.log(`📁 Location: ${hookFile}`);

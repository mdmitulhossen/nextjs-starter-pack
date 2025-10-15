#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to generate a new Next.js page with TypeScript
 * Usage: npm run generate:page <page-name>
 * Example: npm run generate:page about
 */

const pageName = process.argv[2];

if (!pageName) {
  console.error('❌ Error: Please provide a page name');
  console.log('Usage: npm run generate:page <page-name>');
  console.log('Example: npm run generate:page about');
  process.exit(1);
}

// Convert kebab-case to PascalCase for component name
function toPascalCase(str) {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Convert to kebab-case for folder name
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-');
}

const componentName = toPascalCase(pageName);
const folderName = toKebabCase(pageName);
const pagePath = path.join(process.cwd(), 'src', 'app', folderName);

// Check if page already exists
if (fs.existsSync(pagePath)) {
  console.error(`❌ Error: Page ${folderName} already exists at ${pagePath}`);
  process.exit(1);
}

// Create page directory
fs.mkdirSync(pagePath, { recursive: true });

// Page template
const pageTemplate = `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${componentName}',
  description: '${componentName} page',
};

export default function ${componentName}Page() {
  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold">${componentName}</h1>
      <p className="mt-4 text-muted-foreground">
        This is the ${componentName.toLowerCase()} page.
      </p>
    </div>
  );
}
`;

// Create page.tsx
fs.writeFileSync(path.join(pagePath, 'page.tsx'), pageTemplate);

console.log(`✅ Page ${componentName} created successfully!`);
console.log(`📁 Location: ${pagePath}`);
console.log(`🔗 Route: /${folderName}`);
console.log('');
console.log('You can now:');
console.log(`1. Navigate to http://localhost:3000/${folderName}`);
console.log(`2. Edit the page at src/app/${folderName}/page.tsx`);

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name');
  process.exit(1);
}

const componentDir = path.join(process.cwd(), 'src', 'components', componentName);
const componentFile = path.join(componentDir, `${componentName}.tsx`);
const indexFile = path.join(componentDir, 'index.ts');
const testFile = path.join(componentDir, `${componentName}.test.tsx`);

const componentTemplate = `import type { FC } from 'react';

interface ${componentName}Props {
  // Add your props here
}

export const ${componentName}: FC<${componentName}Props> = (props) => {
  return (
    <div>
      {/* Add your component JSX here */}
      <h1>${componentName}</h1>
    </div>
  );
};
`;

const indexTemplate = `export { ${componentName} } from './${componentName}';
`;

const testTemplate = `import { render, screen } from '@testing-library/react';
import { ${componentName} } from './${componentName}';

describe('${componentName}', () => {
  it('renders without crashing', () => {
    render(<${componentName} />);
    expect(screen.getByText('${componentName}')).toBeInTheDocument();
  });
});
`;

// Create directory
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
}

// Create files
fs.writeFileSync(componentFile, componentTemplate);
fs.writeFileSync(indexFile, indexTemplate);
fs.writeFileSync(testFile, testTemplate);

console.log(`✅ Component ${componentName} created successfully!`);
console.log(`📁 Location: ${componentDir}`);

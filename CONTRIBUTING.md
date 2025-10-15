# Contributing Guidelines

Thank you for considering contributing to this project! This document outlines the process and guidelines.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on collaboration

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch
4. Make your changes
5. Submit a pull request

## Development Process

### 1. Setup Your Environment

```bash
npm install
cp .env.example .env
npm run dev
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Make Changes

- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation

### 4. Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance
```

Examples:
```bash
git commit -m "feat: add user profile page"
git commit -m "fix: resolve authentication bug"
git commit -m "docs: update API documentation"
```

### 5. Testing

```bash
# Run all tests
npm test
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

### 6. Pull Request

1. Push your branch to your fork
2. Open a Pull Request
3. Provide a clear description
4. Link related issues
5. Wait for review

## Code Style

### TypeScript

- Use strict type checking
- Avoid `any` type
- Export types and interfaces
- Use type inference when possible

```typescript
// Good
interface User {
  id: string;
  name: string;
}

const user: User = { id: '1', name: 'John' };

// Avoid
const user: any = { id: '1', name: 'John' };
```

### Components

- Use functional components
- Props should be typed
- Use meaningful names
- Keep components small and focused

```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
```

### File Structure

- One component per file
- Co-locate related files
- Use index.ts for exports

```
components/
  Button/
    Button.tsx
    Button.test.tsx
    index.ts
```

### Naming Conventions

- Components: PascalCase
- Files: kebab-case or PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase

## Testing Guidelines

### Unit Tests

- Test component behavior
- Test edge cases
- Mock external dependencies

```typescript
describe('Button', () => {
  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### E2E Tests

- Test critical user flows
- Test authentication
- Test form submissions

```typescript
test('user can sign in', async ({ page }) => {
  await page.goto('/auth/signin');
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

## Documentation

- Update README for new features
- Add JSDoc comments for complex functions
- Update ARCHITECTURE.md for structural changes
- Include examples in documentation

```typescript
/**
 * Fetches user data from the API
 * @param userId - The ID of the user to fetch
 * @returns Promise resolving to User object
 * @throws {Error} If user not found
 */
export async function getUser(userId: string): Promise<User> {
  // ...
}
```

## Performance

- Use React.memo for expensive components
- Implement code splitting
- Optimize images
- Minimize bundle size

## Accessibility

- Use semantic HTML
- Add ARIA labels
- Ensure keyboard navigation
- Test with screen readers

## Security

- Sanitize user inputs
- Validate on both client and server
- Use environment variables for secrets
- Follow OWASP guidelines

## Pull Request Checklist

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] New tests added for new features
- [ ] Documentation updated
- [ ] No linting errors
- [ ] Commit messages follow convention
- [ ] PR description is clear
- [ ] Screenshots added (if UI changes)

## Review Process

1. Automated checks run on PR
2. Code review by maintainers
3. Address feedback
4. Approval and merge

## Questions?

- Open an issue for discussion
- Check existing issues/PRs
- Read documentation

Thank you for contributing! 🎉

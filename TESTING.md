# Testing Documentation

> **📚 Quick Navigation:**
>
> - New to testing? Start with [Getting Started Guide](./docs/getting-started.md#step-5-understanding-key-patterns)
> - Need help with test issues? See [Troubleshooting Guide](./docs/troubleshooting.md#testing-problems)
> - Contributing tests? Check [Contributing Guidelines](./CONTRIBUTING.md#testing-requirements)

## Overview

This document outlines the comprehensive testing strategy implemented for the Bidwell website. Our testing approach covers unit tests, integration tests, accessibility tests, performance tests, and security tests.

## Testing Structure

```text
__tests__/
├── api/                    # API route tests
│   └── rss.test.ts
├── components/             # Component unit tests
│   ├── footer.test.tsx
│   ├── nav.test.tsx
│   └── posts.test.tsx
├── integration/            # Integration tests
│   └── home-page.test.tsx
├── utils/                  # Testing utilities
│   ├── performance-utils.tsx
│   └── test-utils.tsx
└── ...
```

## Testing Categories

### 1. Unit Tests

- **Component Tests**: Individual component functionality and rendering
- **Utility Function Tests**: Pure function testing
- **API Route Tests**: Server-side logic testing

### 2. Integration Tests

- **Page Component Tests**: Full page rendering and component interaction
- **User Journey Tests**: Multi-component workflows
- **Data Flow Tests**: Props and state management

### 3. Accessibility Tests

- **Axe Core Integration**: Automated a11y violation detection
- **Keyboard Navigation**: Tab order and focus management
- **Screen Reader Compatibility**: ARIA labels and semantic HTML
- **Color Contrast**: Visual accessibility standards

### 4. Performance Tests

- **Render Performance**: Component rendering speed
- **Memory Usage**: JavaScript heap size monitoring
- **Bundle Size**: Code splitting and optimization
- **Stress Testing**: High-load component behavior

### 5. Security Tests

- **Dependency Audits**: Known vulnerability scanning
- **Input Validation**: XSS and injection prevention
- **Header Security**: Security header implementation

## Running Tests

### All Tests

```bash
npm test
```

### With Coverage

```bash
npm run test:coverage
```

### Watch Mode

```bash
npm run test:watch
```

### Type Checking

```bash
npm run type-check
```

## Test Configuration

### Jest Configuration

- **Coverage Thresholds**: 70% minimum coverage for branches, functions, lines, and statements
- **Test Environment**: jsdom for browser-like testing
- **Module Mapping**: Simplified imports with path aliases
- **Timeout**: 10-second timeout for async operations

### Test Setup

- **Global Mocks**: Next.js router, window.matchMedia, IntersectionObserver
- **Custom Matchers**: Accessibility and performance assertions
- **Test Utilities**: Reusable render functions and helpers

## Coverage Requirements

| Metric     | Minimum Coverage |
| ---------- | ---------------- |
| Branches   | 70%              |
| Functions  | 70%              |
| Lines      | 70%              |
| Statements | 70%              |

## Test Utilities

### Custom Render Function

```typescript
import { render } from '__tests__/utils/test-utils'

// Includes common providers and mocks
const { container } = render(<MyComponent />)
```

### Accessibility Testing

```typescript
import { axeTest } from '__tests__/utils/test-utils'

await axeTest(container) // Automatic a11y testing
```

### Performance Testing

```typescript
import { PerformanceTestHelper } from '__tests__/utils/performance-utils'

const renderTime = PerformanceTestHelper.measureRenderTime(<Component />)
PerformanceTestHelper.expectFastRender(renderTime)
```

## CI/CD Integration

### GitHub Actions Workflow

Our testing pipeline runs on every push and pull request:

1. **Unit & Integration Tests**: Run across Node.js 18.x and 20.x
2. **Accessibility Tests**: Automated axe-core scanning
3. **Performance Tests**: Lighthouse CI performance audits
4. **Security Tests**: Dependency audits and vulnerability scanning

### Test Environments

- **Development**: `npm test` for local development
- **CI/CD**: Automated testing with coverage reporting
- **Production**: Build verification and smoke tests

## Best Practices

### Writing Tests

1. **Descriptive Names**: Clear test descriptions
2. **Arrange-Act-Assert**: Structured test organization
3. **Single Responsibility**: One concept per test
4. **Mock External Dependencies**: Isolated unit testing
5. **Test User Behavior**: Focus on user interactions

### Component Testing

1. **Render Testing**: Verify component renders without errors
2. **Props Testing**: Test different prop combinations
3. **Interaction Testing**: User events and state changes
4. **Accessibility Testing**: Include a11y tests for all components
5. **Error Boundary Testing**: Handle error states gracefully

### Performance Considerations

1. **Render Speed**: Keep render times under 100ms
2. **Memory Usage**: Monitor JavaScript heap size
3. **Bundle Size**: Track component size impact
4. **Async Operations**: Test loading states and timeouts

## Debugging Tests

### Common Issues

1. **Async Testing**: Use `waitFor` for asynchronous operations
2. **Mock Issues**: Ensure mocks are properly reset between tests
3. **DOM Queries**: Use appropriate queries (`getByRole`, `getByLabelText`)
4. **Accessibility**: Check for proper ARIA attributes and semantic HTML

### Debug Commands

```bash
# Run specific test file
npm test -- nav.test.tsx

# Debug mode with Node inspector
npm test -- --inspect-brk nav.test.tsx

# Verbose output
npm test -- --verbose

# Update snapshots
npm test -- --updateSnapshot
```

## Future Enhancements

### Planned Improvements

1. **Visual Regression Testing**: Screenshot comparison testing
2. **E2E Testing**: Full user journey automation with Playwright
3. **API Testing**: Contract testing for external APIs
4. **Mobile Testing**: Device-specific testing scenarios
5. **Load Testing**: High-traffic simulation

### Monitoring Integration

1. **Real User Monitoring**: Performance tracking in production
2. **Error Tracking**: Automated error reporting
3. **Accessibility Monitoring**: Continuous a11y compliance checking

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/)
- [Axe Accessibility Testing](https://github.com/dequelabs/axe-core)
- [Next.js Testing Guide](https://nextjs.org/docs/testing)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Related Documentation:**

- [← Back to README](./README.md) - Project overview and navigation
- [Development Guide](./DEVELOPMENT.md) - Development workflows and CI/CD
- [Contributing Guidelines](./CONTRIBUTING.md) - How to write tests and maintain quality
- [Troubleshooting Guide](./docs/troubleshooting.md) - Testing issues and solutions
- [Getting Started Guide](./docs/getting-started.md) - How to run tests as a new developer

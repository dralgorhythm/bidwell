# Troubleshooting Guide

## Build Issues

### Node.js Version
**Error**: `Unsupported Node.js version`
**Solution**: Use Node.js 18.x or 20.x (LTS).
```bash
nvm use 20
```

### Install Issues
**Error**: `Module not found`
**Solution**: Clear cache and reinstall.
```bash
rm -rf node_modules package-lock.json
npm install
```

## Development

### Environment Variables
**Issue**: Variables undefined.
**Solution**: Ensure `.env.local` exists and client-side vars start with `NEXT_PUBLIC_`.

## Testing

### Coverage Failures
**Issue**: Coverage < 70%.
**Solution**: Run `npm run test:coverage` to identify gaps and add tests.

### Accessibility Violations
**Issue**: `jest-axe` errors.
**Solution**: Ensure all form elements have labels and images have alt text.

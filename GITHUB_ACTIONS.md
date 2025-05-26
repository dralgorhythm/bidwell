# GitHub Actions Documentation

This repository uses GitHub Actions for automated testing, linting, and formatting to maintain code quality.

## Workflows

### Quality Checks Workflow (`quality-checks.yml`)

This workflow handles code quality enforcements with automatic fixes:

1. **Lint and Format**:
   - Runs ESLint with auto-fixing (`npm run lint:fix`)
   - Runs Prettier formatting (`npm run format:fix`)
   - Automatically commits any fixes back to the PR

2. **Tests**:
   - Runs TypeScript type checking
   - Runs Jest tests
   - Builds the Next.js application

### When It Runs

- On pull requests to the `main` branch
- On pushes to the `main` branch

### Auto-fixing Behavior

When the workflow runs on a PR:
1. It fixes linting and formatting issues automatically
2. Commits those changes back to your PR branch
3. You don't need to make manual fixes for style issues

### Required Permissions

The workflow requires:
- `contents: write` - To commit fixes back to the branch
- `pull-requests: write` - To update the PR with the fixes

## Local Development

Before pushing your changes, run these commands locally to catch issues:

```bash
# Check and fix linting issues
npm run lint:fix

# Check and fix formatting issues
npm run format:fix

# Run tests
npm run test
```

## Troubleshooting

If the auto-fix workflow fails:
1. Check the workflow logs in the GitHub Actions tab
2. Make manual fixes based on the error messages
3. Push your changes to trigger the workflow again

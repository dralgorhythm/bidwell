# Copilot Instructions for Next.js Development

## Project Context
This is a Next.js application using the App Router architecture. Always consider the following when providing assistance:

### Tech Stack
- **Framework**: Next.js 13+ with App Router
- **Language**: TypeScript
- **Package Manager**: npm
- **Styling**: CSS Modules or Tailwind CSS

### Code Standards
- Use TypeScript for all new files
- Follow Next.js App Router conventions
- Use server components by default, only add 'use client' when necessary
- Prefer modern React patterns (hooks, functional components)
- Use semantic HTML and proper accessibility practices

### File Structure Conventions
- Pages go in `app/` directory with `page.tsx` files
- API routes in `app/api/` with `route.ts` files
- Components in `app/components/` directory
- Utilities in `utils/` directory

### Next.js Best Practices
1. **Performance**
   - Use Next.js Image component for images
   - Implement proper loading states
   - Use dynamic imports for heavy components
   - Optimize bundle size with proper imports

2. **SEO & Metadata**
   - Include metadata in page.tsx files using generateMetadata
   - Use proper OpenGraph tags
   - Implement structured data when relevant

3. **Routing**
   - Use App Router file-based routing
   - Implement proper error boundaries (error.tsx)
   - Use loading.tsx for loading states
   - Follow nested layout patterns

4. **Server vs Client Components**
   - Default to server components
   - Use 'use client' only for interactivity, state, or browser APIs
   - Pass data down from server to client components

### Component Patterns
- Create reusable, composable components
- Use proper TypeScript interfaces for props
- Implement proper error handling
- Follow the principle of least privilege for client components

### API Development
- Use Next.js API routes in `app/api/`
- Implement proper error handling and status codes
- Use TypeScript for request/response types
- Follow RESTful conventions

### Content Management
- Implement proper content validation

### Development Workflow
- Test changes locally before committing
- Always check that package versions are up to date
- Always make sure packages exist before using them
- Use `npm run lint` to check for linting errors
- Use ESLint and Prettier for code formatting
- Run tests before pushing changes
- Use Git for version control
- Use TypeScript strict mode
- Follow conventional commit messages
- Consider mobile-first responsive design

### Common Tasks
When asked to:
- **Add a new page**: Create in `app/` with proper metadata
- **Add an API endpoint**: Create in `app/api/` with proper types
- **Create components**: Use TypeScript, proper naming, and reusability
- **Style components**: Use consistent styling approach
- **Optimize performance**: Consider Next.js built-in optimizations

### Security Considerations
- Validate all inputs
- Use environment variables for sensitive data
- Implement proper CORS policies
- Follow Next.js security best practices

Always prioritize user experience, performance, and maintainability in your suggestions.
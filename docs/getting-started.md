# Getting Started

Welcome to the Bidwell Consulting project!

## Prerequisites

- **Node.js**: 18.x or 20.x (LTS)
- **npm**: 8.x or higher

## Quick Start

1.  **Clone and Install**:
    ```bash
    git clone <repository-url>
    cd bidwell
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Visit [http://localhost:3000](http://localhost:3000).

## Development Workflow

### Key Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start local dev server |
| `npm run test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run build` | Build for production |
| `npm run lint:fix` | Fix linting issues |

### Quality Standards

Before committing, ensure:
1.  **Tests Pass**: `npm run test` (Coverage ≥ 70%)
2.  **Type Check**: `npm run type-check`
3.  **Linting**: `npm run lint:fix`

## Project Structure

- `app/`: Next.js App Router pages and layouts.
- `lib/`: Utilities (Performance, Security, Validation).
- `__tests__/`: Unit and integration tests.
- `docs/`: Project documentation.

## Next Steps

- Read the **[Architecture Guide](./architecture.md)**.
- Check the **[UI Design Guide](./ui-design.md)**.

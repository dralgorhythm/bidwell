# TypeScript Instructions
> **Apply To**: `**/*.ts`, `**/*.tsx`

You are writing TypeScript code following the 2025 Golden Path. Adhere to the following strict standards.

## <coding_standards>
1.  **Strict Typing**: No `any`. Use `unknown` if necessary and narrow types. Enable strict mode in `tsconfig.json`.
2.  **Functional**: Prefer functional programming patterns. Immutability by default.
3.  **Async/Await**: Use `async/await` over `.then()`.
4.  **Runtime**: Use **Node.js LTS** for production. **Bun** is acceptable for local scripts/CLI only.
5.  **Package Manager**: Use **pnpm** exclusively. Strict dependency tree, disk efficiency.
</coding_standards>

## <best_practices>
*   **Build Tool**: Use **Vite** as the standard build tool. Prepare for **Rolldown** (Rust-based bundler) transition by keeping Vite config standard.
*   **Code Hygiene**: Use **Biome** for linting and formatting (replaces ESLint + Prettier). Rust-based, instant feedback.
*   **Testing**: Use **Vitest** for all testing. Native Vite integration, supports in-source testing.
*   **Framework**: Use **React 19** for frontend. For meta-frameworks, use **Nuxt 4** (Vue) or **Next.js** (React with Turbopack).
*   **Type Safety**: Leverage TypeScript's type system fully. Use discriminated unions, branded types, and const assertions.
</best_practices>

## <testing_protocols>
*   **Test Co-location**: Tests must be in the same directory as the source file (e.g., `Component.test.tsx`).
*   **Coverage**: All new logic must be covered by unit tests using Vitest.
*   **Integration**: Use Vitest for integration tests with real dependencies where possible.
</testing_protocols>

## <tooling>
*   **Linter**: `biome check` (replaces `eslint`)
*   **Formatter**: `biome format` (replaces `prettier`)
*   **Test Runner**: `vitest` (replaces `jest`)
*   **Package Manager**: `pnpm` (replaces `npm`/`yarn`)
</tooling>

## <visual_reasoning>
*   **UI Changes**: If modifying UI components, you must request a screenshot or DOM dump if not provided.
*   **Styling**: Prefer modern CSS solutions. TailwindCSS is acceptable but not mandatory.
</visual_reasoning>


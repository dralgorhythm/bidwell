# PRD: Experiments Hub

> **Author**: Product Manager  
> **Status**: Draft  
> **Created**: 2025-12-06  
> **Version**: 1.0

---

## 1. Problem Statement

- **What**: The site currently lacks a dedicated space for hosting experimental features, interactive tools, and prototypes. Experiments need their own visual layouts and should not be constrained by the base site layout (`max-w-xl` container).
- **Who**: Site visitors interested in exploring interactive demonstrations, prototypes, and experimental tools built by Bidwell Consulting.
- **Why**: Enable rapid iteration on multiple experiments in parallel while maintaining seamless integration with the existing build/test/deploy framework.

## 2. Economic Framework

- **Cost of Delay**: **Medium-High**
  - Without an experiments framework, new interactive work either gets constrained by the existing layout or requires significant refactoring each time.
  - Blocking rapid exploration reduces time-to-value for experimental ideas.
- **Value Proposition**:
  - **Innovation Velocity**: Enable fast iteration on experimental features without impacting the core site.
  - **Portfolio Enhancement**: Showcase technical capabilities through interactive demonstrations.
  - **Isolation**: Keep experimental code separate from production-quality content.

## 3. User Stories

| ID | As a... | I want to... | So that... |
| :--- | :--- | :--- | :--- |
| US-1 | Site visitor | Navigate to an "Experiments" page from the main navigation | I can discover and explore available experiments |
| US-2 | Site visitor | Browse a catalog of available experiments with descriptions | I can choose which experiment to explore |
| US-3 | Site visitor | Open an experiment in its own dedicated layout | I can experience the experiment without the constraints of the base site layout |
| US-4 | Developer | Create a new experiment with its own layout and styles | I can build isolated features rapidly without affecting other experiments or the main site |
| US-5 | Developer | Run experiments through the existing build/test/deploy pipeline | I don't need to maintain separate tooling for experiments |
| US-6 | Developer | Work on multiple experiments in parallel on different branches | I can iterate on multiple ideas simultaneously |

## 4. Functional Requirements

### 4.1 Experiments Hub Page (`/experiments`)
1. **FR-1**: Create a new route `/experiments` accessible from the main navigation.
2. **FR-2**: The hub page SHALL display a grid/list of available experiments with:
   - Title
   - Brief description
   - Visual preview/thumbnail (optional for v1)
   - Link to the experiment
3. **FR-3**: The hub page MAY use the base site layout (Navbar + Footer).

### 4.2 Experiment Layout System
4. **FR-4**: Create a Route Group `(experiments)` or dedicated layout for `/experiments/*` that bypasses the base layout constraints.
5. **FR-5**: Each experiment MUST be able to define its own:
   - Layout (full-width, custom containers, etc.)
   - Styles (scoped CSS/Tailwind)
   - Components (isolated from base components)
6. **FR-6**: Experiments SHALL still have access to shared utilities (fonts, base CSS variables).

### 4.3 Framework Integration
7. **FR-7**: Experiments MUST work with the existing static export (`output: 'export'`).
8. **FR-8**: Experiments MUST be lintable via Biome (`npm run lint`).
9. **FR-9**: Experiments MUST be testable via Vitest/Playwright (`npm run test`, `npm run test:e2e`).
10. **FR-10**: Experiments MUST be type-checked via TypeScript (`npm run type-check`).

### 4.4 Developer Experience
11. **FR-11**: Provide a template/scaffold for creating new experiments.
12. **FR-12**: Document the process for creating, testing, and deploying experiments.

## 5. Non-Functional Requirements

- **Performance**: Experiments SHOULD NOT impact the bundle size of the main site pages (code splitting).
- **Isolation**: Bugs or issues in one experiment SHOULD NOT affect other experiments or the main site.
- **Maintainability**: Each experiment SHOULD be self-contained in its own directory.
- **SEO**: Experiments MAY have reduced SEO requirements (noindex is acceptable).

## 6. Acceptance Criteria (Gherkin)

```gherkin
Scenario: User navigates to Experiments Hub
  Given I am on the home page
  When I click the "experiments" link in the navigation
  Then I am taken to the "/experiments" page
  And I see a list of available experiments

Scenario: User opens an experiment
  Given I am on the "/experiments" page
  When I click on an experiment card
  Then I am taken to the experiment's dedicated page
  And the experiment has its own layout (no base Navbar/Footer constraints)

Scenario: Developer creates a new experiment
  Given I want to create a new experiment called "budget-simulator"
  When I create a new directory at "app/(experiments)/budget-simulator/"
  And I add a page.tsx and optional layout.tsx
  Then the experiment is accessible at "/budget-simulator"
  And the experiment builds successfully with "npm run build"
  And the experiment passes linting with "npm run lint"

Scenario: Experiments work with static export
  Given experiments exist in the codebase
  When I run "npm run build"
  Then all experiment pages are exported to the "out/" directory
  And no build errors occur
```

## 7. Out of Scope (v1)

- **Authentication/Authorization**: No gated access to experiments.
- **Experiment Analytics**: Tracking which experiments are most visited.
- **A/B Testing Framework**: Experiments are discrete features, not A/B variants.
- **Experiment Versioning**: No version history within a single experiment.
- **Comments/Feedback System**: Users cannot leave feedback on experiments.

## 8. Technical Considerations (For Architect)

The following are notes for the Architect to consider during system design:

1. **Route Groups**: Next.js App Router supports route groups `(folder-name)` for layout segregation.
2. **Layout Hierarchy**: Experiments may need to opt-out of the root layout's constrained container.
3. **Wide Layout**: Consider a `(wide)` or `(experiments)` route group with its own minimal layout.
4. **Code Splitting**: Next.js automatically code-splits by route; experiments will be lazy-loaded.
5. **CSS Isolation**: Tailwind CSS is globally scoped; consider CSS modules or scoped styles if needed.

## 9. Success Metrics

| Metric | Target | Measurement |
| :--- | :--- | :--- |
| Build Success | 100% | All experiments build without errors |
| Lint Success | 100% | All experiments pass Biome linting |
| Type Safety | 100% | All experiments pass TypeScript checks |
| Layout Independence | Verified | Experiments bypass base layout constraints |
| Time to New Experiment | < 15 min | Developer can scaffold new experiment quickly |

---

## Handoff

> **Next Step**: Hand off to **Architect** for System Design Blueprint.
> 
> **Artifact Path**: `./artifacts/prd_experiments_hub.md`

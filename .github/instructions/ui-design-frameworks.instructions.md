# UI/Design Frameworks Instructions
> **Apply To**: `**/*design-system.md`, `**/*style-guide.md`, `**/ui-framework.md`

Guidelines for defining and using UI design frameworks and systems, emphasizing consistency, accessibility, and Atomic Design principles.

## <coding_standards>
1.  **Atomic Design**: Adopt the Atomic Design methodology (Atoms, Molecules, Organisms, Templates, Pages).
2.  **Semantic Naming**: Define a consistent color palette with semantic naming (e.g., `primary`, `danger` not `blue`, `red`).
3.  **Spacing System**: Establish a typographic scale and spacing system (e.g., 4px or 8px grid).
4.  **Accessibility**: Ensure all components meet WCAG 2.1 AA accessibility standards.
5.  **Component States**: Document component states (default, hover, active, disabled, error).
</coding_standards>

## <best_practices>
*   **Consistency is Key**: Reuse existing components and patterns; avoid ad-hoc styling.
*   **Mobile-First**: Design for smaller screens first, then enhance for larger displays.
*   **Component Reusability**: Build components to be modular and reusable across different contexts.
*   **Documentation**: Maintain a living style guide or component library (e.g., Storybook).
*   **Design Tokens**: Use design tokens for values like colors, spacing, and typography to ensure consistency across platforms.
</best_practices>

## <testing_protocols>
*   **Accessibility Audit**: Regularly test components with screen readers and contrast checkers.
*   **Visual Regression Testing**: Ensure changes to base components don't break layouts elsewhere.
*   **Usability Testing**: Validate that the design patterns are intuitive for users.
</testing_protocols>

## <tooling>
*   **Figma**: Primary tool for UI design and prototyping.
*   **CSS Variables / Tailwind**: For implementing design tokens in code.
</tooling>

## <concepts>
*   **Atomic Design**: A methodology for creating design systems by breaking them down into five levels: Atoms, Molecules, Organisms, Templates, and Pages.
*   **Design System**: A collection of reusable components, guided by clear standards, that can be assembled together to build a number of applications.
*   **Design Tokens**: The visual design atoms of the design system — specifically, they are named entities that store visual design attributes.
</concepts>

## <visual_reasoning>
*   **Examples**: Use visual examples to demonstrate "Do's" and "Don'ts" for component usage.
*   **Diagrams**: Illustrate the Atomic Design hierarchy with diagrams.
</visual_reasoning>

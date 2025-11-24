# UI/UX Design Instructions

## Overview

These instructions define the organization's standards for User Interface (UI) and User Experience (UX) design. They serve as the "Golden Path" for creating visually appealing, highly usable, and accessible applications.

## Design Philosophy

-   **User-Centric**: All design decisions must be grounded in user needs and behaviors.
-   **Simplicity**: Strive for simplicity and clarity. Remove unnecessary elements.
-   **Premium Aesthetics**: Aim for a polished, high-quality look and feel. Use modern design trends (e.g., glassmorphism, subtle gradients) where appropriate, but prioritize usability.
-   **Responsiveness**: Designs must work seamlessly across all device sizes (Mobile, Tablet, Desktop).

## Design System

### Typography
-   **Primary Font**: Inter (or system sans-serif).
-   **Headings**: Bold, high contrast.
-   **Body**: Readable, comfortable line height (1.5 - 1.6).

### Color Palette
-   **Primary**: Define a brand color.
-   **Secondary**: Complementary color for accents.
-   **Neutral**: Grays for text, borders, and backgrounds.
-   **Semantic**: Red (Error), Green (Success), Yellow (Warning), Blue (Info).

### Spacing
-   **Base Unit**: 4px or 8px.
-   **Scale**: 4, 8, 16, 24, 32, 48, 64, etc.

## Interaction Design

-   **Hover Effects**: Provide visual feedback on hover for interactive elements.
-   **Transitions**: Use smooth, subtle transitions (e.g., `ease-in-out`, `200ms`) for state changes.
-   **Loading States**: Use skeletons or spinners to indicate loading; never leave the user wondering if the app is frozen.

## Accessibility (A11y)

-   **Mandatory**: All designs must meet WCAG 2.1 AA standards.
-   **Checklist**:
    -   [ ] Color contrast checked.
    -   [ ] Keyboard navigable.
    -   [ ] Alt text for images.
    -   [ ] Semantic HTML structure.

## Tools & Workflow

1.  **Conceptualize**: Sketch or wireframe ideas first.
2.  **Prototype**: Create high-fidelity mockups (mental or actual).
3.  **Implement**: Translate designs into code using the project's CSS framework (e.g., Tailwind, CSS Modules).
4.  **Review**: Verify against accessibility and design standards.

# Ensuring Accessibility

## Overview

This skill ensures that digital products are usable by people with a wide range of abilities and disabilities. It focuses on adherence to WCAG (Web Content Accessibility Guidelines) standards.

## Principles

1.  **Perceivable**: Information and user interface components must be presentable to users in ways they can perceive.
2.  **Operable**: User interface components and navigation must be operable.
3.  **Understandable**: Information and the operation of user interface must be understandable.
4.  **Robust**: Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies.

## Practices

### Visual Accessibility
-   **Color Contrast**: Ensure a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (WCAG AA).
-   **Color Independence**: Do not use color as the only visual means of conveying information.
-   **Text Resizing**: Ensure text can be resized up to 200% without loss of content or functionality.

### Semantic HTML
-   **Headings**: Use proper heading hierarchy (`h1` -> `h6`) to structure content.
-   **Landmarks**: Use semantic landmarks (`<nav>`, `<main>`, `<aside>`, `<footer>`) to aid navigation.
-   **Buttons vs. Links**: Use `<button>` for actions and `<a>` for navigation.

### Assistive Technology
-   **Alt Text**: Provide descriptive alternative text for all meaningful images.
-   **ARIA**: Use ARIA attributes only when standard HTML elements are insufficient.
-   **Keyboard Navigation**: Ensure all interactive elements are focusable and operable via keyboard.
-   **Focus Indicators**: Ensure focus indicators are clearly visible.

## Verification
-   **Automated Testing**: Use tools like Axe or Lighthouse to catch common issues.
-   **Manual Testing**: Test with keyboard-only navigation and screen readers (e.g., VoiceOver, NVDA).

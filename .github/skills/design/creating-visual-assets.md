# Creating Visual Assets

## Overview

This skill involves generating and managing visual assets such as icons, illustrations, and images to enhance the user interface and brand identity.

## Principles

1.  **Relevance**: Assets should support the content and context, not distract from it.
2.  **Quality**: Use high-resolution and properly optimized assets.
3.  **Consistency**: Maintain a consistent visual style across all assets.
4.  **Performance**: Optimize assets for fast loading times.

## Practices

### Iconography
-   **SVG First**: Use SVGs for icons whenever possible for scalability and crispness.
-   **Consistency**: Use a consistent icon set (e.g., Heroicons, Lucide, Material Icons).
-   **Meaning**: Ensure icons clearly represent their function.

### Image Generation
-   **AI Tools**: Use AI tools (like DALL-E 3 or Midjourney via `generate_image`) to create custom illustrations or placeholders.
-   **Prompts**: Write descriptive prompts specifying style, subject, color palette, and mood.
    -   *Example*: "A modern, flat vector illustration of a rocket ship launching, using a blue and purple gradient, white background."

### Asset Management
-   **Optimization**: Compress images (WebP, AVIF) to reduce file size without significant quality loss.
-   **Naming**: Use descriptive, kebab-case filenames (e.g., `hero-banner-mobile.webp`).
-   **Organization**: Store assets in a dedicated directory (e.g., `/public/images` or `/assets`).

## Tools
-   **generate_image**: Agent tool for creating AI-generated images.
-   **Image Editors**: Photoshop, GIMP, or online tools for manual adjustments.
-   **Optimizers**: TinyPNG, ImageOptim, or build tools (Sharp).

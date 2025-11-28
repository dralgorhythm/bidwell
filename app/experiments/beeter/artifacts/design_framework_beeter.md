# Design Framework: Beeter

**Status:** Draft
**Date:** 2025-11-28
**Author:** UI/UX Designer Agent

## 1. Design Philosophy
**"Organic Precision"**
Beeter bridges the gap between the raw, mathematical precision of code and the warm, tactile nature of music. The interface should feel like a clean sheet of high-quality paper—inviting, textured, and professional. It rejects the "cyberpunk/sci-fi" aesthetic common in DAWs (dark greys, neon blues) in favor of a "Farmers Market" aesthetic: fresh, curated, and grounded.

### Core Pillars
1.  **Paper White**: The default canvas is bright and clean, like a fresh notebook. Dark mode is a deep, warm "Loam" (rich soil), not #000000.
2.  **Cozy & Curvy**: Buttons are pill-shaped or soft squares (super-ellipses). No sharp 90-degree corners. Interactions have a "squishy" spring animation.
3.  **Professional Whimsy**: The metaphors are organic (Seeds, Harvest, Roots), but the execution is Swiss Style—grid-based, legible, and uncluttered.

## 2. Color Palette ("The Root Cellar")

### Primary
*   **Beet Red**: `#D93846` (Active states, Playhead, Recording)
*   **Paper White**: `#F9F8F6` (Background - Light Mode)
*   **Loam Dark**: `#2C2424` (Background - Dark Mode)

### Secondary
*   **Stem Green**: `#6B8E23` (Success, Playback active)
*   **Turnip Purple**: `#5D4C86` (Code syntax highlighting, Accents)
*   **Golden Root**: `#E5B355` (Warnings, Selection)

### Neutrals
*   **Ink Black**: `#1A1A1A` (Text on Light)
*   **Chalk White**: `#F0F0F0` (Text on Dark)
*   **Stone Grey**: `#9E9E9E` (Borders, Inactive states)

## 3. Typography
**Primary Font**: `Inter` or `Geist Sans` (System stack).
*   Clean, legible, and neutral. It lets the color and spacing do the work.
**Code Font**: `JetBrains Mono` or `Fira Code`.
*   Essential for the "Live Coding" aspect. Must support ligatures.

## 4. Metaphors & Iconography
*   **The Grid**: A "Garden Bed". Steps are "Seeds".
*   **Active Step**: A "Sprouted" seed (filled color).
*   **Parameter Lock**: A "Grafted" step (small indicator dot).
*   **Tracks**: "Rows".
*   **Playhead**: The "Watering Can" (or just a clean line, don't get too cheesy).

## 5. Interaction Design
*   **The "Squish"**: Buttons scale down slightly (0.95x) on click.
*   **The "Spring"**: Knobs have resistance.
*   **Hover States**: Subtle lift (shadow) or glow.

## 6. Accessibility
*   **Contrast**: All text must meet AA standards on both Paper White and Loam Dark backgrounds.
*   **Touch Targets**: All interactive elements must be at least 44x44px.
*   **Focus States**: Clear, high-contrast rings for keyboard navigation.

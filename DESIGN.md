---
name: NorthLite Solar Design System
description: The Solar Grid Spec — A restrained, engineering-led tech-spec brand design system.
colors:
  primary: "#795900"
  neutral-bg: "#FDFBF7"
  neutral-text: "#1E293B"
  neutral-muted: "#515F79"
  border: "#E6E2DA"
  surface-card: "#FFFFFF"
typography:
  display:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.neutral-text}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.sm}"
    border: "1px solid {colors.border}"
    padding: "12px 24px"
---

# Design System: NorthLite Solar

## 1. Overview

**Creative North Star: "The Solar Grid Spec"**

The NorthLite Solar visual system is built upon the aesthetic principles of structured technical manuals, physical blueprints, and modern engineering spec sheets. It rejects generic marketing templates in favor of sharp typographic hierarchy, clear functional grids, and generous breathing room. The interface must communicate professional competence and structured stability.

Key Characteristics:
- **Strict Grid Alignment**: All elements are aligned to a clear, visible layout system.
- **Extreme Restraint**: Visual styling and color are used only where they serve a communicative purpose. No decorative shapes, particles, or shadows.
- **Warm Industrial Tone**: Clean geometric typography paired with warm, natural neutrals that feel solid and physical.

## 2. Colors

The color strategy is strictly **Restrained**. The brand relies on tinted warm neutrals for background structures, using a single solar gold accent sparingly to draw attention to interactive elements or primary calls-to-action.

### Primary
- **Solar Gold** (#795900): Used strictly as an accent color for key interactive states and highlights. 

### Neutral
- **Warm Clay White** (#FDFBF7): The primary background color. Tinted warm towards natural stone to feel solid and tactile.
- **Slate Deep** (#1E293B): The primary typography and dark background element color.
- **Muted Slate** (#515F79): Secondary text, labels, and metadata.
- **Clay Border** (#E6E2DA): 1px structural grid lines, divider rules, and input outlines.
- **Solid White** (#FFFFFF): Container backgrounds.

**The Less-Than-10 Rule.** The primary accent (Solar Gold) must never cover more than 10% of any given viewport. Its rarity is what gives it visual strength.

## 3. Typography

**Display Font:** Sora (sans-serif)
**Body Font:** Manrope (sans-serif)
**Label/Mono Font:** JetBrains Mono (monospace)

The typography pairing uses **Sora** for technical, geometric display weight and **Manrope** for highly readable, structured body copy. Metadata and labels use **JetBrains Mono** to reinforce the technical, specification-based tone.

### Hierarchy
- **Display** (Bold, clamp(2rem, 5vw, 3.5rem), 1.15): Hero headlines.
- **Headline** (Semi-Bold, 1.75rem, 1.3): Section titles.
- **Title** (Medium, 1.25rem, 1.4): Card and grid titles.
- **Body** (Regular, 1rem, 1.6): Main text copy. Maximum line length of 70ch.
- **Label** (Medium, 0.75rem, 0.05em tracking, uppercase): Technical labels, categories, and tags.

## 4. Elevation

The system is flat by default. Depth is communicated strictly via 1px border lines and tonal layering (transitioning from Warm Clay White `#FDFBF7` to Solid White `#FFFFFF` surfaces), never through shadows or blurs.

**The Flat-By-Default Rule.** Surfaces are entirely flat. There are no box shadows, drop shadows, or background blurs in this system.

## 5. Components

### Buttons
- **Shape**: Slightly rounded corners (4px radius).
- **Primary**: Solid Slate Deep background with Warm Clay White text. On hover, background shifts to Solar Gold.
- **Secondary**: Transparent background with Slate Deep text and a 1px border.

### Cards / Containers
- **Corner Style**: Minimal corner radius (6px or 8px).
- **Background**: Solid White or transparent with border.
- **Border**: Thin 1px solid Clay Border (#E6E2DA).

### Inputs / Fields
- **Style**: Solid white background, 1px Clay Border, minimal radius (4px).
- **Focus**: Border shifts to Slate Deep with zero glowing shadows.

### Navigation
- **Style**: Plain text links using JetBrains Mono, left-aligned, transitioning to Slate Deep on hover. Active links use a crisp 1px underline.

## 6. Do's and Don'ts

### Do:
- **Do** align all margins, paddings, and column structures to strict grid parameters.
- **Do** use generous whitespace (minimum 48px between sections) to give elements breathing room.
- **Do** display technical specifications, SPV financial charts, and text content in clear, left-aligned layout tables.

### Don't:
- **Don't** use neon gradients, glassmorphism, glowing borders, or background blurs.
- **Don't** use floating canvas particles or interactive background simulations.
- **Don't** use 3D flip card boxes or cards that rotate to reveal info.
- **Don't** use large rounded icons in circles above section headings.
- **Don't** use gradient text under any circumstances.

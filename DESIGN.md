# 1DAY — Design System

A comprehensive guide to the visual language and design principles of 1DAY.

---

## Brand Overview

**1DAY** is a minimalistic habit tracking app built around the philosophy of taking life one day at a time. The design reflects this through restraint, clarity, and quiet confidence.

### Tagline
> *One day at a time.*

### Brand Personality
- **Minimal** — No clutter, no distractions
- **Calm** — Dark, ambient, focused
- **Honest** — Shows progress without judgment
- **Premium** — Refined details, subtle polish

---

## Color Palette

### Primary Colors (Duochrome)

The palette is intentionally limited to whites and grays on a deep dark background, creating a sophisticated, distraction-free interface.

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Background Primary** | `#030405` | 3, 4, 5 | Main app background |
| **Background Secondary** | `#0a0b0c` | 10, 11, 12 | Cards, elevated surfaces |
| **Background Tertiary** | `#111213` | 17, 18, 19 | Nested elements |
| **Background Elevated** | `#161718` | 22, 23, 24 | Buttons, interactive elements |

### Border Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Border Default** | `#1e1f20` | Standard borders |
| **Border Subtle** | `#141516` | Subtle separators |
| **Border Hover** | `#2e2f30` | Hover states |
| **Border Active** | `#3e3f40` | Active/focus states |

### Text Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Text Primary** | `#ffffff` | Headings, important text |
| **Text Secondary** | `#a1a1a1` | Body text, descriptions |
| **Text Muted** | `#5a5a5a` | Labels, hints, metadata |

### Accent Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Accent** | `#ffffff` | Primary actions, highlights |
| **Accent Muted** | `#888888` | Secondary emphasis |
| **Accent Hover** | `#e0e0e0` | Hover states |

### Semantic Colors

| Purpose | Color | Hex |
|---------|-------|-----|
| **Success / Completed** | Green | `#22c55e` / `#4ade80` |
| **Error** | Red | `#ef4444` |

---

## Typography

### Font Family

**Plus Jakarta Sans** — A geometric sans-serif with a modern, clean aesthetic.

```
font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
```

Google Fonts: `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap`

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Light | 300 | Large headings, hero text |
| Regular | 400 | Body text, UI elements |
| Medium | 500 | Buttons, emphasis |
| Semibold | 600 | Section headers |

### Type Scale

| Size | Pixels | Usage |
|------|--------|-------|
| Hero | 72px (4.5rem) | Landing page headline |
| H1 | 24px (1.5rem) | Page titles |
| H2 | 18px (1.125rem) | Section titles |
| Body | 16px (1rem) | Default text |
| Small | 14px (0.875rem) | Descriptions, UI text |
| Caption | 12px (0.75rem) | Labels, metadata |
| Micro | 10-11px | Badges, uppercase labels |

### Letter Spacing

| Style | Value | Usage |
|-------|-------|-------|
| Tight | -0.025em | Headings |
| Tighter | -0.05em | Large display text |
| Wide | 0.05em | Small caps |
| Widest | 0.15em - 0.3em | Uppercase labels, badges |

---

## Spacing System

Based on a 4px grid:

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px (0.25rem) | Tight gaps |
| `sm` | 8px (0.5rem) | Component internal spacing |
| `md` | 16px (1rem) | Standard gaps |
| `lg` | 24px (1.5rem) | Section spacing |
| `xl` | 32px (2rem) | Large sections |
| `2xl` | 48px (3rem) | Page padding |
| `3xl` | 64px (4rem) | Hero sections |

---

## Border Radius

Minimal, almost sharp:

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 2px | Small elements |
| `default` | 4px | Buttons, cards |
| `md` | 6-8px | Larger cards, CTAs |
| `lg` | 10-12px | Feature cards |
| `full` | 100px | Pills, badges |

---

## Shadows & Depth

Shadows are used sparingly and are subtle:

```css
/* Card shadow */
box-shadow: 
  0 0 0 1px rgba(255, 255, 255, 0.03),
  0 20px 50px -12px rgba(0, 0, 0, 0.5);
```

Depth is primarily achieved through:
- Background color layering (primary → secondary → tertiary → elevated)
- Subtle 1px borders
- Transparency effects

---

## Iconography

### Library
**Lucide React** — Clean, consistent stroke icons.

### Style Guidelines
- Stroke width: 2px (default) or 2.5px (emphasis)
- Size: 16-24px for UI, 20px standard
- Color: Inherits from text color

### Common Icons

| Icon | Usage |
|------|-------|
| `Check` | Completed habits |
| `Plus` | Add new |
| `Calendar` | Date/history |
| `Cloud` | Sync status |
| `ArrowRight` | CTAs, navigation |
| `Loader2` | Loading states (animated) |

---

## Motion & Animation

### Timing

| Duration | Usage |
|----------|-------|
| 150ms | Micro-interactions (hover, focus) |
| 200ms | Standard transitions |
| 400-600ms | Page/component entrances |
| 800ms | Hero animations |

### Easing

```css
transition-timing-function: ease;
```

### Animation Patterns

**Fade + Rise** — Primary entrance animation:
```js
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```

**Scale** — Button interactions:
```js
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```

**Stagger** — List items:
```js
transition={{ delay: index * 0.03 }}
```

---

## Component Patterns

### Buttons

**Primary (CTA)**
- Background: White (`#ffffff`)
- Text: Near-black (`#0a0a0a`)
- Padding: 14px 28px
- Border radius: 8px

**Secondary/Ghost**
- Background: Transparent
- Border: 1px solid border color
- Text: Secondary text color

**Icon Button**
- Size: 40x40px
- Background: Elevated
- Border: 1px solid border

### Cards

- Background: `--color-bg-secondary`
- Border: 1px solid `--color-border`
- Padding: 16-20px
- Border radius: 4-12px

### Badges/Pills

- Background: Elevated or transparent
- Border: 1px solid border
- Padding: 6px 14px
- Border radius: 100px
- Font: 11px uppercase, wide letter-spacing

### Form Inputs

- Background: Tertiary
- Border: 1px solid border, focus → border-active
- Padding: 12px 16px
- Border radius: 4px

---

## Layout Principles

### Max Widths

| Context | Width |
|---------|-------|
| Content (text) | 400-540px |
| Cards/Features | 1000px |
| Full layout | 1200px |

### Responsive Breakpoints

| Name | Width |
|------|-------|
| Mobile | < 480px |
| Small | 480px+ |
| Medium | 640px+ |
| Tablet | 768px+ |
| Desktop | 1024px+ |

### Grid

- Features: 3-column on desktop, 1-column on mobile
- Habit grid: Responsive, wrapping cards
- Contribution grid: 7 columns (days of week)

---

## Visual Motifs

### Contribution Grid
A GitHub-style activity heatmap showing daily completions. Uses green intensity to show activity levels.

```
Cell colors:
- Empty: Background tertiary
- Low: rgba(74, 222, 128, 0.2)
- Medium: rgba(74, 222, 128, 0.4)
- High: rgba(74, 222, 128, 0.6)
- Full: #22c55e
```

### Ambient Backgrounds
Subtle radial gradients create depth without distraction:

```css
background: 
  radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.12), transparent),
  radial-gradient(ellipse 60% 40% at 100% 100%, rgba(60, 90, 140, 0.08), transparent);
```

### Grid Pattern
Optional subtle grid overlay for landing pages:

```css
background-image: 
  linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
background-size: 60px 60px;
```

---

## Logo Usage

### Wordmark
**1DAY** — uppercase, light weight (300)

### Logo Mark
Circle outline: `○` — represents a single day, a cycle, completion

### Lockup
```
○ 1DAY
```

### Clear Space
Maintain padding equal to the height of the "o" character on all sides.

---

## Do's and Don'ts

### ✅ Do
- Use generous whitespace
- Keep text concise and direct
- Use subtle animations that enhance, not distract
- Maintain high contrast for readability
- Layer backgrounds for depth

### ❌ Don't
- Add unnecessary color (stick to the duochrome palette)
- Use heavy drop shadows
- Overcrowd layouts
- Use decorative fonts
- Add gratuitous animations

---

## Asset Export Guidelines

### For Graphics/Marketing

| Asset | Format | Background |
|-------|--------|------------|
| Screenshots | PNG | App background (`#030405`) |
| Icons | SVG | Transparent |
| Social cards | PNG | Dark gradient |
| App previews | PNG/WebP | In-context mockups |

### Color Modes
The app is dark-mode only. All graphics should reflect this.

---

## Quick Reference

```css
:root {
  /* Backgrounds */
  --color-bg-primary: #030405;
  --color-bg-secondary: #0a0b0c;
  --color-bg-tertiary: #111213;
  --color-bg-elevated: #161718;
  
  /* Borders */
  --color-border: #1e1f20;
  --color-border-hover: #2e2f30;
  
  /* Text */
  --color-text-primary: #ffffff;
  --color-text-secondary: #a1a1a1;
  --color-text-muted: #5a5a5a;
  
  /* Typography */
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
  
  /* Radius */
  --radius: 4px;
  --radius-sm: 2px;
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
}
```

---

*Last updated: December 2024*


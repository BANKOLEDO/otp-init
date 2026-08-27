# otp-Init Design System

## Philosophy
Minimal, warm, editorial. Nearly achromatic with ember (#e8590c) as the only action color.
No fintech blue, no crypto neon, no purple. No gradients. No decorative shadows.
Elevation through hairline borders and background tint.
Tight tracking, weight 400 headings, pill controls, generous card radii.

## Color Palette

### Canvas / Surfaces
| Token         | Hex       | Usage                          |
|---------------|-----------|--------------------------------|
| --canvas      | #f5f5f0   | Page background (warm off-white)|
| --surface     | #ffffff   | Cards, elevated panels         |
| --surface-2   | #fafaf8   | Subtle nesting, hover states   |
| --ink         | #1a1816   | Primary text (warm near-black) |
| --ink-secondary | #5a5652 | Secondary text, labels         |
| --ink-muted   | #8a8680   | Captions, placeholders         |
| --hairline    | rgba(26,24,22,0.10) | Borders, dividers     |
| --hairline-strong | rgba(26,24,22,0.18) | Emphasis borders  |

### Accent (the ONE color)
| Token           | Hex       | Usage                     |
|-----------------|-----------|---------------------------|
| --ember         | #e8590c   | Primary actions, links    |
| --ember-hover   | #d9480f   | Hover state               |
| --ember-soft    | #fff4e6   | Tinted backgrounds        |
| --ember-text    | #e8590c   | Interactive text          |

### Semantic (functional only)
| Token           | Hex       | Usage                     |
|-----------------|-----------|---------------------------|
| --green         | #2b8a3e   | WhatsApp, success states  |
| --green-soft    | #ebfbee   | Success backgrounds       |
| --red           | #c92a2a   | Error, expired            |
| --red-soft      | #fff5f5   | Error backgrounds         |
| --amber         | #e67700   | Warning, pending          |
| --amber-soft    | #fff9db   | Warning backgrounds       |

### Dark Mode (secondary, NOT default)
| Token           | Hex       |
|-----------------|-----------|
| --canvas        | #111110   |
| --surface       | #1c1b1a   |
| --surface-2     | #242322   |
| --ink           | #eeede8   |
| --ink-secondary | #a09a92   |
| --hairline      | rgba(238,237,232,0.08) |

## Typography

### Font Stack
- **Primary**: "DM Sans", "Inter", -apple-system, sans-serif
- **Mono**: "DM Mono", "JetBrains Mono", monospace

### Scale
| Class         | Size     | Weight | Line-height | Letter-spacing |
|---------------|----------|--------|-------------|----------------|
| .display      | clamp(40px, 5vw, 64px) | 400 | 1.08 | -0.03em |
| .h-lg         | clamp(28px, 3.5vw, 44px) | 400 | 1.12 | -0.02em |
| .h            | clamp(22px, 2.5vw, 30px) | 500 | 1.2 | -0.01em |
| .sub          | 20px     | 500    | 1.4         | 0              |
| .body-lg      | 18px     | 400    | 1.55        | 0              |
| .body         | 16px     | 400    | 1.6         | 0              |
| .caption      | 14px     | 400    | 1.5         | 0              |
| .micro        | 12px     | 500    | 1.2         | 0.06em (uppercase) |

### Rules
- Headings use weight 400-500, NEVER 700
- Display/h-lg get negative tracking (-0.02 to -0.03em)
- Micro labels are uppercase with positive tracking
- All numeric content uses font-variant-numeric: tabular-nums

## Spacing
- Section vertical: clamp(56px, 8vw, 96px)
- Card padding: 24px
- Stack gap: 16px
- Stack-sm gap: 8px
- Page max-width: 1200px
- Page padding: 24px (sides)

## Border Radius
| Token        | Value  | Usage                    |
|--------------|--------|--------------------------|
| --r-card     | 20px   | Cards, panels            |
| --r-input    | 12px   | Inputs, text fields      |
| --r-control  | 10px   | Small controls           |
| --r-pill     | 999px  | Buttons, tags, badges    |

## Elevation (NO shadows on cards)
- Depth via: background tint + hairline borders
- Only shadows allowed: floating elements (tooltips, dropdowns)
- Cards: white bg + 1px hairline border + 20px radius = done

## Component Patterns

### Cards
```
background: var(--surface)
border: 1px solid var(--hairline)
border-radius: var(--r-card)  /* 20px */
padding: 24px
```

### Buttons
- **Primary**: Ember fill, pill shape (999px), white text, min-height 44px
- **Secondary/ghost**: Transparent, hairline border, ink text, pill shape
- **Transition**: 120ms ease on all properties
- **Active**: translateY(1px) press effect

### Inputs
```
background: var(--surface-2)
border: 1px solid var(--hairline)
border-radius: var(--r-input)  /* 12px */
padding: 14px 16px
font-size: 16px
```
Focus: border-color changes to --ember (no blue ring)

### Tags/Pills
```
background: var(--ember-soft)  or  var(--surface-2)
color: var(--ember)  or  var(--ink-secondary)
border-radius: 999px
padding: 4px 12px
font-size: 12px
```

## Icons
- All 24x24, 1.5px stroke, butt caps, no fills
- Geometric: rectangles, circles, straight lines
- Consistent family (MUI icons or custom SVG, never mixed)

## Dark Mode
- Light theme is DEFAULT and primary
- Dark mode is an option, not the starting point
- Uses same structure, swapped canvas/surface tokens
- Green channel icons keep their color in both modes

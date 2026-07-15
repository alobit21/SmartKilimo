---
name: KilimoSmart Design System
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#3f4942'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#707a71'
  outline-variant: '#bfc9bf'
  surface-tint: '#1e6b45'
  primary: '#005230'
  on-primary: '#ffffff'
  primary-container: '#1e6b45'
  on-primary-container: '#9de9b9'
  inverse-primary: '#8bd6a8'
  secondary: '#006c44'
  on-secondary: '#ffffff'
  secondary-container: '#9cf5c2'
  on-secondary-container: '#0f734a'
  tertiary: '#693c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#8b5000'
  on-tertiary-container: '#ffd0a4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a7f3c3'
  primary-fixed-dim: '#8bd6a8'
  on-primary-fixed: '#002111'
  on-primary-fixed-variant: '#005230'
  secondary-fixed: '#9cf5c2'
  secondary-fixed-dim: '#81d8a7'
  on-secondary-fixed: '#002111'
  on-secondary-fixed-variant: '#005232'
  tertiary-fixed: '#ffdcbe'
  tertiary-fixed-dim: '#ffb870'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#693c00'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container_padding: 16px
  card_padding: 24px
  gutter: 16px
---

## Brand & Style
The design system is built for the Tanzanian agricultural sector, prioritizing utility, clarity, and professionalism. The brand personality is grounded and respectful, acknowledging the vital role of farming in the local economy. It avoids high-tech abstractions in favor of a "tools-of-the-trade" aesthetic that feels as reliable as a well-maintained tractor.

The visual style is **Professional & High-Contrast**, leaning into a structured, editorial layout that ensures legibility under varied lighting conditions (e.g., direct sunlight in the field). The interface uses heavy vertical rhythm and "thumb-friendly" touch targets to accommodate outdoor use. The aesthetic is clean and institutional, signaling a platform that handles serious business—contracts, weather data, and market pricing—with precision.

## Colors
The palette is rooted in the Tanzanian landscape. **Harvest Green** is the anchor, used exclusively for primary actions and active indicators to maintain a clear visual hierarchy. **Field Green** and **Sprout Tint** provide tonal support for iconography and secondary accents.

The background surfaces use warm neutrals (**Canvas** and **Cloud**) to reduce eye strain compared to pure stark white, while **Steel** borders provide structural definition. Status colors are high-chroma for instant recognition: **Amber Ochre** for pending items and **Bloom Deep** for rejections. The **Sky Set** is reserved for weather-related data visualizations and meteorological modules.

## Typography
The system uses **Inter** exclusively to ensure maximum legibility and a systematic, utilitarian feel. 
- **Display & Headlines:** Use weight 500 for a professional, balanced presence. For smaller headlines requiring more emphasis, weight 600 is permitted.
- **Body Text:** Always use weight 400. Line heights are generous (1.5x) to aid reading for users who may be scanning data quickly.
- **Labels:** Small labels use weight 500 or 600 to ensure they remain legible even at 12px.
- **Currency & Units:** When displaying TZS or metric units (kg, ha), use `label-lg` to ensure the data stands out from the descriptive text.

## Layout & Spacing
This design system employs an **8px base unit** to ensure a rigorous and predictable rhythm. 
- **Mobile First:** The layout uses a fluid 4-column grid on mobile with 16px side margins. 
- **Touch Targets:** Buttons and interactive elements must maintain a minimum height of 48px to be "thumb-friendly" for field workers.
- **Card Spacing:** All cards must utilize a 24px (`lg`) internal padding to provide enough "breathable" space around critical agricultural data.
- **Density:** While mobile views are spacious, desktop dashboard views can increase density by reducing vertical gaps between list items to 8px, provided the horizontal hit area remains large.

## Elevation & Depth
Depth in this design system is primarily communicated through structural containment rather than dramatic shadows.
- **Flat Surface Strategy:** Most containers use a 1px hairline border in `Steel` (#c7c2b8) against the `Cloud` (#f7f7f5) background. This creates a "sheet-on-sheet" look that feels organized and tactile without unnecessary decoration.
- **Soft Lift:** For floating elements or primary cards that require emphasis (e.g., a current weather alert or a pending payment), a subtle "Soft Lift" is applied: `0 2px 8px rgba(26,26,26,0.08)`.
- **Active States:** No elevation increase on hover. Instead, use tonal shifts or 2px inset borders to indicate interaction.

## Shapes
The shape language balances modern efficiency with organic softness. 
- **Functional Elements:** Buttons, input fields, and checkboxes use a **4px radius** (`rounded-sm`). This "sharp-soft" corner conveys precision and professional rigor.
- **Containers:** Large UI blocks and cards use a **16px radius** (`rounded-xl`). This softer exterior helps the platform feel approachable and trustworthy.
- **Selection Indicators:** Small badges or chips may use a full pill radius to differentiate them from actionable buttons.

## Components
- **Buttons:** Primary buttons use `Harvest Green` with white text, 4px corners, and a 48px minimum height. Secondary buttons use the `Steel` border with `Ink` text.
- **Cards:** The foundation of the system. Cards must have a 16px corner radius, 24px padding, and either a 1px `Steel` border or the `Soft Lift` shadow.
- **Input Fields:** 4px radius, `Cloud` background, and `Steel` border. Labels must always be visible (never placeholder-only) for accessibility.
- **Status Chips:** High-contrast text on `Sprout Tint` (for Accepted) or equivalent light backgrounds. Use `label-sm` for chip text.
- **Lists:** Data-heavy lists (e.g., "Market Prices - Morogoro") should use 16px vertical padding and a 1px `Steel` bottom divider.
- **Weather Widgets:** Use the `Sky Set` colors to create gradient backgrounds or icon accents for forecast modules.
- **Agricultural Specifics:** Specialized components for "Crop Cycle Progress" (steppers) and "Land Area" (input with TZS/Hectare suffixes).
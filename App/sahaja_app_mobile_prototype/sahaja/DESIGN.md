---
name: Sahaja
colors:
  surface: '#f7f9ff'
  surface-dim: '#d1dbe8'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#edf4ff'
  surface-container: '#e4effd'
  surface-container-high: '#dfe9f7'
  surface-container-highest: '#d9e3f1'
  on-surface: '#121d26'
  on-surface-variant: '#3d4949'
  inverse-surface: '#27313c'
  inverse-on-surface: '#e8f2ff'
  outline: '#6d7979'
  outline-variant: '#bcc9c8'
  surface-tint: '#006a69'
  primary: '#006766'
  on-primary: '#ffffff'
  primary-container: '#008281'
  on-primary-container: '#f3fffe'
  inverse-primary: '#6bd7d6'
  secondary: '#0055c7'
  on-secondary: '#ffffff'
  secondary-container: '#316fe2'
  on-secondary-container: '#fefcff'
  tertiary: '#8f481f'
  on-tertiary: '#ffffff'
  tertiary-container: '#ae6035'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#88f4f2'
  primary-fixed-dim: '#6bd7d6'
  on-primary-fixed: '#002020'
  on-primary-fixed-variant: '#00504f'
  secondary-fixed: '#d9e2ff'
  secondary-fixed-dim: '#b0c6ff'
  on-secondary-fixed: '#001945'
  on-secondary-fixed-variant: '#00429c'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb691'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#75340b'
  background: '#f7f9ff'
  on-background: '#121d26'
  surface-variant: '#d9e3f1'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  subtitle-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 20px
---

## Brand & Style
The design system is crafted for middle schoolers (ages 13-15) in Central Java, Indonesia. The brand personality is that of a "wise older sibling"—supportive, approachable, and entirely non-judgmental. It balances the clinical reliability of health education with the warmth of a social companion app.

The aesthetic follows a **Modern-Friendly** approach, characterized by:
- **Softness:** Using high-radius corners and organic shapes to reduce anxiety surrounding sensitive topics.
- **Clarity:** Leveraging heavy whitespace and a clean mobile-first layout to prevent cognitive overload.
- **Cultural Sensitivity:** Utilizing "Saja," a neutral teenage mascot in a teal hoodie, to guide users through the interface, ensuring illustrations remain relatable yet non-explicit.

## Colors
The palette is rooted in a sense of calm and institutional trust, brightened by youthful accents. 

- **Primary (Teal):** Used for main actions, brand identity, and the "Saja" mascot. It evokes health and safety.
- **Secondary (Blue):** Used for educational content modules and progress tracking.
- **Accent (Warm Yellow):** Reserved for highlights, tips, and guiding the user's eye to important "Did you know?" moments.
- **Success & Warning:** Employed for feedback loops in quizzes and form validation, using softer tones to maintain a non-punitive atmosphere.
- **Background:** A cool-tinted grey-blue keeps the interface feeling fresh and expansive compared to pure white.

## Typography
This design system utilizes **Plus Jakarta Sans** for its contemporary, geometric, and friendly characteristics. The font's open counters and rounded terminals ensure high legibility for young users.

- **Headlines:** Use Bold weights to create a strong hierarchy.
- **Body:** Primarily 16px for long-form educational content to ensure readability, scaling down to 14px for secondary descriptions and metadata.
- **Labels:** Uppercase or semi-bold variants are used for navigation items and category chips to differentiate them from body text.

## Layout & Spacing
The layout follows a **Fluid Grid** model optimized for mobile devices, as this is the primary touchpoint for the target demographic.

- **Grid:** A 4-column grid for mobile with 16px gutters and 20px side margins.
- **Rhythm:** An 8px linear scale is used for most spacing (8, 16, 24, 32), with a 4px "half-step" used for tight internal component spacing (e.g., icon to text).
- **Touch Targets:** All interactive elements maintain a minimum size of 48x48px to accommodate varying levels of motor coordination in early adolescence.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Soft Ambient Shadows**. This avoids the "flatness" that can feel overly clinical, adding a tactile quality that feels modern and playful.

- **Level 0 (Background):** Light Grey-Blue (#F7F9FB).
- **Level 1 (Cards/Surface):** Pure White (#FFFFFF) with a very soft, diffused shadow (0px 4px 20px, 5% opacity of the Text color).
- **Level 2 (Interactive/Active):** Slightly more pronounced shadow (0px 8px 24px, 8% opacity) to indicate pressability or focus.
- **Outlines:** Low-contrast 1px borders in a lighter shade of the background color are used for input fields and inactive states.

## Shapes
The shape language is defined by high-radius "Super-Ellipses." 

- **Containers & Cards:** Use a 20px radius (`rounded-xl` equivalent) to feel safe and friendly.
- **Buttons:** Use a 16px radius for a modern look, or fully pill-shaped (500px) for primary "Call to Action" buttons.
- **Input Fields:** 12px radius to balance structure with the overall rounded aesthetic.

## Components
- **Buttons:** Primary buttons are Teal with white text, using a semi-bold weight. Secondary buttons use a Teal outline with a light teal tinted background.
- **Cards:** White surfaces with 20px padding. Content within cards (like forum posts or lesson previews) should be spaced generously to prevent the UI from feeling "crowded."
- **Bottom Navigation:** A fixed bar with 4 tabs (Beranda, Belajar, Forum, Profil). Active states are indicated by the Primary Teal color and a soft background highlight or a small dot indicator below the icon.
- **Chips/Badges:** Used for categories in the 'Belajar' section (e.g., "Puberty," "Nutrition"). These should use the Secondary Blue or Accent Yellow with low-opacity backgrounds.
- **Input Fields:** Large, 56px height fields with 16px horizontal padding. The label should remain visible or float when the field is active to assist users with short-term memory during form entry.
- **Mascot Integration:** 'Saja' appears in "Empty States," "Onboarding," and "Success Dialogs." The mascot should always have a friendly expression and be positioned to "point" or "look" toward the primary action button.
- **Icons:** Use Lucide-style icons with a 2px stroke and rounded ends to match the typography's terminal shapes.
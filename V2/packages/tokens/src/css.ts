// Mengubah token menjadi CSS. Dipakai skrip pembuat berkas dan uji.
import { breakpoints, colors, elevation, layout, motion, radius, spacing, typography } from './index.ts'

const rem = (px: number): string => `${px / 16}rem`

/** Variabel CSS polos untuk Blade (S3) dan untuk nilai responsif. */
export function buatTokensCss(): string {
  const baris: string[] = []
  for (const [nama, nilai] of Object.entries(colors)) baris.push(`  --sj-color-${nama}: ${nilai};`)
  for (const [nama, gaya] of Object.entries(typography.styles)) {
    baris.push(`  --sj-text-${nama}: ${rem(gaya.mobile[0])};`)
    baris.push(`  --sj-text-${nama}-lh: ${rem(gaya.mobile[1])};`)
    baris.push(`  --sj-text-${nama}-weight: ${gaya.weight};`)
  }
  baris.push(`  --sj-font-sans: ${typography.fontFamily};`)
  for (const [nama, nilai] of Object.entries(radius)) baris.push(`  --sj-radius-${nama}: ${rem(nilai)};`)
  baris.push(`  --sj-screen-margin: ${rem(spacing['screen-mobile'])};`)
  baris.push(`  --sj-touch-min: ${rem(spacing['touch-min'])};`)
  for (const [nama, nilai] of Object.entries(elevation)) baris.push(`  --sj-elevation-${nama}: ${nilai};`)
  baris.push(`  --sj-motion-fast: ${motion.fast}ms;`)
  baris.push(`  --sj-motion-base: ${motion.base}ms;`)
  baris.push(`  --sj-motion-slow: ${motion.slow}ms;`)
  baris.push(`  --sj-easing: ${motion.easing};`)

  const tablet = [`    --sj-screen-margin: ${rem(spacing['screen-tablet'])};`]
  const desktop = [`    --sj-screen-margin: ${rem(spacing['screen-desktop'])};`]
  for (const [nama, gaya] of Object.entries(typography.styles)) {
    if (gaya.desktop[0] !== gaya.mobile[0] || gaya.desktop[1] !== gaya.mobile[1]) {
      desktop.push(`    --sj-text-${nama}: ${rem(gaya.desktop[0])};`)
      desktop.push(`    --sj-text-${nama}-lh: ${rem(gaya.desktop[1])};`)
    }
  }

  return [
    '/* Dibuat otomatis dari packages/tokens/src/index.ts. Jangan diubah langsung. */',
    ':root {',
    ...baris,
    '}',
    `@media (min-width: ${breakpoints.tablet}px) {`,
    '  :root {',
    ...tablet,
    '  }',
    '}',
    `@media (min-width: ${breakpoints.desktop}px) {`,
    '  :root {',
    ...desktop,
    '  }',
    '}',
    '@media (prefers-reduced-motion: reduce) {',
    '  :root {',
    '    --sj-motion-fast: 0ms;',
    '    --sj-motion-base: 0ms;',
    '    --sj-motion-slow: 0ms;',
    '  }',
    '}',
    '',
  ].join('\n')
}

/** Tema Tailwind v4. Kelas utilitas hanya memakai nama token, misalnya bg-primary-strong. */
export function buatThemeCss(): string {
  const baris: string[] = [
    '  --color-*: initial;',
    '  --breakpoint-*: initial;',
    '  --radius-*: initial;',
    '  --shadow-*: initial;',
    '  --font-*: initial;',
    '  --text-*: initial;',
  ]
  for (const nama of Object.keys(colors)) baris.push(`  --color-${nama}: var(--sj-color-${nama});`)
  baris.push('  --color-transparent: transparent;')
  baris.push('  --color-current: currentColor;')
  for (const [nama, nilai] of Object.entries(breakpoints)) baris.push(`  --breakpoint-${nama}: ${rem(nilai)};`)
  for (const nama of Object.keys(radius)) baris.push(`  --radius-${nama}: var(--sj-radius-${nama});`)
  baris.push('  --radius-pill: 9999px;')
  for (const nama of Object.keys(elevation)) baris.push(`  --shadow-elevation-${nama}: var(--sj-elevation-${nama});`)
  baris.push('  --font-sans: var(--sj-font-sans);')
  for (const nama of Object.keys(typography.styles)) {
    baris.push(`  --text-${nama}: var(--sj-text-${nama});`)
    baris.push(`  --text-${nama}--line-height: var(--sj-text-${nama}-lh);`)
    baris.push(`  --text-${nama}--font-weight: var(--sj-text-${nama}-weight);`)
  }
  for (const [nama, nilai] of Object.entries(layout)) baris.push(`  --container-${nama}: ${rem(nilai)};`)
  baris.push('  --spacing-screen: var(--sj-screen-margin);')
  baris.push('  --spacing-touch: var(--sj-touch-min);')
  baris.push(`  --spacing: ${rem(spacing.unit)};`)
  baris.push('  --ease-standard: var(--sj-easing);')

  return [
    '/* Dibuat otomatis dari packages/tokens/src/index.ts. Jangan diubah langsung. */',
    '@import "./tokens.css";',
    '',
    '@theme inline {',
    ...baris,
    '}',
    '',
  ].join('\n')
}

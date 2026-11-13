// Design tokens SAHAJA. Sumber: "Rencana Apps/02 Desain UI dan Prompt.md" bagian 2 dan 3.
// Satu-satunya tempat nilai warna, ukuran, radius, bayangan, dan gerak ditulis.
// Ubah nilai di sini, lalu jalankan `pnpm --filter @sahaja/tokens css`.

export const colors = {
  primary: '#0E9594',
  'primary-strong': '#006766',
  'primary-soft': '#E3F4F4',
  secondary: '#2D6CDF',
  'secondary-soft': '#E7EFFC',
  accent: '#F5B841',
  success: '#2FBF71',
  'success-strong': '#1B7F4B',
  caution: '#E8871E',
  'caution-soft': '#FCEFDD',
  danger: '#C2410C',
  bg: '#F7F9FB',
  surface: '#FFFFFF',
  border: '#E3E8EE',
  text: '#1F2933',
  'text-muted': '#5B6770',
  'on-primary': '#FFFFFF',
} as const

export type ColorToken = keyof typeof colors

/** Ukuran dalam piksel: [ukuran huruf, tinggi baris]. Ditulis ke CSS dalam rem. */
type TextSize = readonly [number, number]

export const typography = {
  fontFamily: "'Plus Jakarta Sans Variable', system-ui, sans-serif",
  styles: {
    display: { mobile: [28, 34], desktop: [36, 44], weight: 800 },
    title: { mobile: [22, 28], desktop: [26, 32], weight: 700 },
    heading: { mobile: [18, 24], desktop: [20, 28], weight: 700 },
    body: { mobile: [16, 24], desktop: [16, 26], weight: 400 },
    'body-strong': { mobile: [16, 24], desktop: [16, 26], weight: 600 },
    small: { mobile: [14, 20], desktop: [14, 20], weight: 400 },
    label: { mobile: [13, 16], desktop: [13, 16], weight: 600 },
    'kelas-judul': { mobile: [48, 56], desktop: [64, 72], weight: 800 },
  } satisfies Record<string, { mobile: TextSize; desktop: TextSize; weight: number }>,
} as const

export const radius = {
  card: 20,
  button: 16,
  input: 12,
} as const

/** Jarak dasar kelipatan 4 px. Margin layar per kelas lebar. */
export const spacing = {
  unit: 4,
  'screen-mobile': 20,
  'screen-tablet': 24,
  'screen-desktop': 32,
  'touch-min': 48,
} as const

/** Lebar bagian tata letak (piksel). */
export const layout = {
  sidebar: 264,
  'sidebar-collapsed': 72,
  rail: 80,
  context: 320,
  content: 720,
  questionnaire: 560,
  reading: 640,
  line: 680,
} as const

export const breakpoints = {
  tablet: 600,
  desktop: 1024,
  wide: 1280,
} as const

export const elevation = {
  1: '0 4px 20px rgba(31, 41, 51, 0.05)',
  2: '0 8px 28px rgba(31, 41, 51, 0.10)',
} as const

export const motion = {
  fast: 120,
  base: 220,
  slow: 600,
  easing: 'cubic-bezier(0.2, 0, 0, 1)',
} as const

export const tokens = { colors, typography, radius, spacing, layout, breakpoints, elevation, motion }

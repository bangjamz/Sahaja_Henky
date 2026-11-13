import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { buatThemeCss, buatTokensCss } from './css.ts'
import { colors } from './index.ts'

function luminans(hex: string): number {
  const kanal = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const [r, g, b] = kanal.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)) as [
    number,
    number,
    number,
  ]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function rasio(a: string, b: string): number {
  const [terang, gelap] = [luminans(a), luminans(b)].sort((x, y) => y - x) as [number, number]
  return (terang + 0.05) / (gelap + 0.05)
}

describe('token warna', () => {
  it('teks putih di atas primary-strong memenuhi WCAG AA (4,5:1)', () => {
    expect(rasio(colors['on-primary'], colors['primary-strong'])).toBeGreaterThanOrEqual(4.5)
  })

  it('teks utama dan teks sekunder terbaca di latar aplikasi dan kartu', () => {
    for (const latar of [colors.bg, colors.surface]) {
      expect(rasio(colors.text, latar)).toBeGreaterThanOrEqual(4.5)
      expect(rasio(colors['text-muted'], latar)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('teks status selesai terbaca di latar kartu', () => {
    expect(rasio(colors['success-strong'], colors.surface)).toBeGreaterThanOrEqual(4.5)
  })

  it('success-strong tidak dipakai di atas primary-soft karena kurang dari 4,5:1', () => {
    expect(rasio(colors['success-strong'], colors['primary-soft'])).toBeLessThan(4.5)
  })

  it('teks utama terbaca di latar umpan balik caution-soft dan secondary-soft', () => {
    expect(rasio(colors.text, colors['caution-soft'])).toBeGreaterThanOrEqual(4.5)
    expect(rasio(colors.text, colors['secondary-soft'])).toBeGreaterThanOrEqual(4.5)
  })

  it('primary-strong terbaca sebagai tautan di atas primary-soft', () => {
    expect(rasio(colors['primary-strong'], colors['primary-soft'])).toBeGreaterThanOrEqual(4.5)
  })

  it('primary saja tidak cukup untuk teks putih, sesuai catatan dokumen 02', () => {
    expect(rasio(colors['on-primary'], colors.primary)).toBeLessThan(4.5)
  })
})

describe('berkas CSS hasil', () => {
  const folder = join(import.meta.dirname, '..', 'dist-css')

  it('tokens.css sama dengan hasil pembuat (jalankan pnpm --filter @sahaja/tokens css)', () => {
    expect(readFileSync(join(folder, 'tokens.css'), 'utf8')).toBe(buatTokensCss())
  })

  it('theme.css sama dengan hasil pembuat', () => {
    expect(readFileSync(join(folder, 'theme.css'), 'utf8')).toBe(buatThemeCss())
  })
})

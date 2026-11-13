import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

// Tiga kelas lebar dari dokumen 02 bagian 3.1, diuji pada 360, 768, 1024, dan 1440 px.
const ukuran = [
  { lebar: 360, bawah: true, rel: false, sidebar: false, panel: false },
  { lebar: 768, bawah: false, rel: true, sidebar: false, panel: false },
  { lebar: 1024, bawah: false, rel: false, sidebar: true, panel: false },
  { lebar: 1440, bawah: false, rel: false, sidebar: true, panel: true },
] as const

const aplikasi = [
  { nama: 'siswa', url: 'http://localhost:5173/', punyaPanel: true },
  { nama: 'pendamping', url: 'http://localhost:5174/', punyaPanel: false },
] as const

async function bersihkan(page: Page) {
  await page.addInitScript(() => {
    try {
      // Bersihkan sekali per tab, supaya pilihan yang disimpan tetap ada setelah muat ulang.
      if (!sessionStorage.getItem('uji.dibersihkan')) {
        localStorage.clear()
        sessionStorage.setItem('uji.dibersihkan', '1')
      }
    } catch {
      // abaikan
    }
  })
}

for (const app of aplikasi) {
  for (const u of ukuran) {
    test(`${app.nama}: navigasi benar di ${u.lebar} px`, async ({ page }) => {
      await bersihkan(page)
      await page.setViewportSize({ width: u.lebar, height: 800 })
      await page.goto(app.url)
      await expect(page.locator('[data-nav="bawah"]')).toBeVisible({ visible: u.bawah })
      await expect(page.locator('[data-nav="rel"]')).toBeVisible({ visible: u.rel })
      await expect(page.locator('[data-nav="sidebar"]')).toBeVisible({ visible: u.sidebar })
      if (app.punyaPanel) {
        await expect(page.locator('[data-panel="konteks"]')).toBeVisible({ visible: u.panel })
      }
      // Tidak ada gulir mendatar di ukuran mana pun.
      const lebarGulir = await page.evaluate(() => document.documentElement.scrollWidth)
      expect(lebarGulir).toBeLessThanOrEqual(u.lebar)
    })

    test(`${app.nama}: tanpa pelanggaran aksesibilitas serius di ${u.lebar} px`, async ({
      page,
    }) => {
      await bersihkan(page)
      await page.setViewportSize({ width: u.lebar, height: 800 })
      await page.goto(app.url)
      const hasil = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
      const serius = hasil.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
      expect(serius.map((v) => `${v.id}: ${v.help}`)).toEqual([])
    })
  }
}

test('siswa: sidebar diciutkan dengan tombol hamburger dan pilihannya diingat', async ({ page }) => {
  await bersihkan(page)
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('http://localhost:5173/')
  const sidebar = page.locator('[data-nav="sidebar"]')
  await page.getByRole('button', { name: 'Ciutkan menu' }).click()
  await expect(sidebar).toHaveAttribute('data-ciut', '1')
  await page.reload()
  await expect(sidebar).toHaveAttribute('data-ciut', '1')
  await expect(page.getByRole('button', { name: 'Bentangkan menu' })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
})

test('siswa: navigasi bisa dipakai dengan papan ketik', async ({ page }) => {
  await bersihkan(page)
  await page.setViewportSize({ width: 360, height: 800 })
  await page.goto('http://localhost:5173/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Lompat ke isi' })).toBeFocused()
  const tabBelajar = page.locator('[data-nav="bawah"]').getByRole('link', { name: 'Belajar' })
  await tabBelajar.focus()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/belajar$/)
  await expect(tabBelajar).toHaveAttribute('aria-current', 'page')
})

test('siswa: pita offline muncul saat perangkat offline', async ({ page, context }) => {
  await page.goto('http://localhost:5173/')
  await context.setOffline(true)
  await expect(page.getByText('Kamu sedang offline.', { exact: false }).first()).toBeVisible()
  await context.setOffline(false)
})

for (const lebar of [360, 1440]) {
  test(`siswa: katalog komponen tanpa pelanggaran aksesibilitas serius di ${lebar} px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: lebar, height: 900 })
    await page.goto('http://localhost:5173/katalog')
    const hasil = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    const serius = hasil.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(serius.map((v) => `${v.id}: ${v.help}`)).toEqual([])
  })
}

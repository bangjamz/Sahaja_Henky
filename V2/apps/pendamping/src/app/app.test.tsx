import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import kamus from '../teks/id.json'
import { navSamping, navUtama } from './nav'
import { rute } from './router'

function buka(jalur: string) {
  render(<RouterProvider router={createMemoryRouter(rute, { initialEntries: [jalur] })} />)
}

describe('cangkang pendamping', () => {
  it('bilah bawah fasilitator berisi lima tujuan sesuai dokumen 02', () => {
    expect(navUtama.map((n) => n.ke)).toEqual(['/', '/sesi', '/kelas', '/moderasi', '/lainnya'])
  })

  it('setiap tujuan navigasi punya rute', () => {
    const jalur = new Set(['/', ...(rute[0]?.children ?? []).map((r) => `/${r.path ?? ''}`)])
    for (const item of [...navUtama, ...navSamping.flatMap((k) => k.item)]) {
      expect(jalur).toContain(item.ke)
    }
  })

  it('halaman Lainnya memuat semua tujuan yang tidak ada di bilah bawah', () => {
    buka('/lainnya')
    const diBilah = new Set(navUtama.map((n) => n.ke))
    const sisa = navSamping.flatMap((k) => k.item).filter((i) => !diBilah.has(i.ke))
    const utama = screen.getByRole('main')
    for (const item of sisa) {
      expect(utama.querySelector(`a[href="${item.ke}"]`)).not.toBeNull()
    }
  })

  it('memakai sapaan Anda di pesan offline', () => {
    expect(kamus['umum.offline']).toMatch(/\bAnda\b/)
  })
})

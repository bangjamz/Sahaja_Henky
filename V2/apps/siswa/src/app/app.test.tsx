import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import kamus from '../teks/id.json'
import { navSamping, navUtama } from './nav'
import { rute } from './router'

function buka(jalur: string) {
  render(<RouterProvider router={createMemoryRouter(rute, { initialEntries: [jalur] })} />)
}

describe('cangkang siswa', () => {
  it('bilah bawah ponsel berisi empat tab sesuai dokumen 02', () => {
    expect(navUtama.map((n) => n.ke)).toEqual(['/', '/belajar', '/forum', '/aku'])
  })

  it('setiap tujuan navigasi punya rute', () => {
    const jalur = new Set(['/', ...(rute[0]?.children ?? []).map((r) => `/${r.path ?? ''}`)])
    for (const item of [...navUtama, ...navSamping.flatMap((k) => k.item)]) {
      expect(jalur).toContain(item.ke)
    }
  })

  it('menampilkan halaman sementara dengan judul dari kamus', () => {
    buka('/belajar')
    expect(screen.getByRole('heading', { level: 1, name: kamus['nav.belajar'] })).toBeInTheDocument()
  })

  it('menampilkan pesan untuk jalur yang tidak ada', () => {
    buka('/tidak-ada')
    expect(screen.getByText(kamus['umum.tidak_ditemukan'])).toBeInTheDocument()
  })

  it('tombol bantuan selalu ada di bilah atas', () => {
    buka('/forum')
    expect(screen.getByRole('link', { name: kamus['cangkang.bantuan'] })).toHaveAttribute(
      'href',
      '/bantuan',
    )
  })
})

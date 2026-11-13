import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Home, Users } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Cangkang, Chip, Isian, Tombol, buatTeks, type PropsTautan } from './index'

describe('buatTeks', () => {
  const t = buatTeks({ 'beranda.sapaan': 'Halo, {nama}!', 'umum.lanjut': 'Lanjut' })

  it('mengisi tempat isian', () => {
    expect(t('beranda.sapaan', { nama: 'Bintang27' })).toBe('Halo, Bintang27!')
  })

  it('mengembalikan teks apa adanya tanpa isian', () => {
    expect(t('umum.lanjut')).toBe('Lanjut')
  })
})

describe('Tombol', () => {
  it('nonaktif dan menandai sibuk saat memuat', () => {
    render(<Tombol memuat>Simpan</Tombol>)
    const tombol = screen.getByRole('button', { name: 'Simpan' })
    expect(tombol).toBeDisabled()
    expect(tombol).toHaveAttribute('aria-busy', 'true')
  })

  it('memakai primary-strong untuk tombol utama', () => {
    render(<Tombol>Lanjut</Tombol>)
    expect(screen.getByRole('button')).toHaveClass('bg-primary-strong')
  })
})

describe('Chip', () => {
  it('mengubah status terpilih dan menampilkannya lewat aria-pressed', async () => {
    function Uji() {
      const [pilih, setPilih] = useState(false)
      return (
        <Chip terpilih={pilih} onUbah={setPilih}>
          Sekolah
        </Chip>
      )
    }
    render(<Uji />)
    const chip = screen.getByRole('button', { name: 'Sekolah' })
    expect(chip).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(chip)
    expect(chip).toHaveAttribute('aria-pressed', 'true')
  })
})

describe('Isian', () => {
  it('menghubungkan label, bantuan, dan galat', () => {
    render(<Isian label="Kode" bantuan="Ada di kartu" galat="Kode belum cocok" />)
    const isian = screen.getByLabelText('Kode')
    expect(isian).toHaveAttribute('aria-invalid', 'true')
    expect(isian).toHaveAccessibleDescription('Ada di kartu Kode belum cocok')
  })
})

describe('Cangkang', () => {
  function Tautan({ href, children, ...sisa }: PropsTautan) {
    return (
      <a href={href} {...sisa}>
        {children}
      </a>
    )
  }

  function pasang(isi?: ReactNode) {
    const nav = [
      { ke: '/', label: 'Beranda', ikon: Home },
      { ke: '/kelas', label: 'Kelas', ikon: Users, jumlah: 3 },
    ]
    return render(
      <Cangkang
        merek="SAHAJA"
        navUtama={nav}
        navSamping={[{ item: nav }]}
        jalurAktif="/kelas/8a"
        Tautan={Tautan}
        kunciSimpan="uji.ciut"
        label={{
          navUtama: 'Navigasi utama',
          ciutkan: 'Ciutkan menu',
          bentangkan: 'Bentangkan menu',
          lompatKeIsi: 'Lompat ke isi',
        }}
      >
        {isi}
      </Cangkang>,
    )
  }

  beforeEach(() => localStorage.clear())

  it('menandai tujuan aktif termasuk subhalaman', () => {
    pasang()
    const aktif = screen.getAllByRole('link', { current: 'page' })
    expect(aktif.length).toBeGreaterThan(0)
    for (const tautan of aktif) expect(tautan).toHaveAttribute('href', '/kelas')
  })

  it('menciutkan sidebar dan mengingat pilihannya', async () => {
    const { unmount } = pasang()
    await userEvent.click(screen.getByRole('button', { name: 'Ciutkan menu' }))
    expect(screen.getByRole('button', { name: 'Bentangkan menu' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(localStorage.getItem('uji.ciut')).toBe('1')
    unmount()
    pasang()
    expect(screen.getByRole('button', { name: 'Bentangkan menu' })).toBeInTheDocument()
  })
})

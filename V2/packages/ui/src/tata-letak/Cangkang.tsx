import { Menu, type LucideIcon } from 'lucide-react'
import { useEffect, useState, type ComponentType, type ReactNode } from 'react'
import { cx } from '../cx'

export interface ItemNav {
  ke: string
  label: string
  ikon: LucideIcon
  /** Jumlah yang menunggu, misalnya antrean moderasi. Selalu tampil sebagai angka, bukan hanya titik warna. */
  jumlah?: number
}

export interface KelompokNav {
  judul?: string
  item: ItemNav[]
}

export interface PropsTautan {
  href: string
  className: string
  children: ReactNode
  'aria-current'?: 'page'
  title?: string
}

export interface LabelCangkang {
  navUtama: string
  ciutkan: string
  bentangkan: string
  lompatKeIsi: string
}

export interface CangkangProps {
  merek: ReactNode
  /** Tujuan utama: bilah bawah di ponsel (maksimum 5) dan rel di tablet. */
  navUtama: ItemNav[]
  /** Tujuan lengkap untuk sidebar desktop, boleh dikelompokkan. */
  navSamping: KelompokNav[]
  jalurAktif: string
  Tautan: ComponentType<PropsTautan>
  label: LabelCangkang
  aksiAtas?: ReactNode
  /** Panel kanan di 1280 px ke atas. Di bawahnya, aplikasi menampilkan isinya sebagai kartu di kolom isi. */
  panelKonteks?: ReactNode
  /** Kunci penyimpanan pilihan ciut sidebar. */
  kunciSimpan: string
  children: ReactNode
}

function aktif(ke: string, jalur: string): boolean {
  return ke === '/' ? jalur === '/' : jalur === ke || jalur.startsWith(`${ke}/`)
}

function bacaCiut(kunci: string): boolean {
  try {
    return globalThis.localStorage?.getItem(kunci) === '1'
  } catch {
    return false
  }
}

function simpanCiut(kunci: string, ciut: boolean): void {
  try {
    globalThis.localStorage?.setItem(kunci, ciut ? '1' : '0')
  } catch {
    // Penyimpanan tidak tersedia (mode privat). Pilihan hanya berlaku di sesi ini.
  }
}

function Jumlah({ n }: { n: number | undefined }) {
  if (!n) return null
  return (
    <span className="ml-auto inline-flex min-w-6 items-center justify-center rounded-pill bg-primary-strong px-2 text-label text-on-primary">
      {n}
    </span>
  )
}

export function Cangkang({
  merek,
  navUtama,
  navSamping,
  jalurAktif,
  Tautan,
  label,
  aksiAtas,
  panelKonteks,
  kunciSimpan,
  children,
}: CangkangProps) {
  const [ciut, setCiut] = useState(() => bacaCiut(kunciSimpan))
  useEffect(() => simpanCiut(kunciSimpan, ciut), [kunciSimpan, ciut])

  const kelasItem = (ke: string) =>
    cx(
      'flex items-center rounded-button text-label transition duration-(--sj-motion-fast) ease-standard',
      aktif(ke, jalurAktif)
        ? 'bg-primary-soft text-primary-strong'
        : 'text-text-muted hover:bg-bg hover:text-text',
    )

  return (
    <div className="flex min-h-dvh bg-bg" data-cangkang>
      <a
        href="#isi"
        className="sr-only z-50 rounded-button bg-surface p-3 text-body-strong focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        {label.lompatKeIsi}
      </a>

      {/* Rel navigasi: 600 sampai 1023 px */}
      <nav
        aria-label={label.navUtama}
        data-nav="rel"
        className="sticky top-0 hidden h-dvh w-rail shrink-0 flex-col items-center gap-2 border-r border-border bg-surface py-4 tablet:flex desktop:hidden"
      >
        {navUtama.map((item) => {
          const Ikon = item.ikon
          return (
            <Tautan
              key={item.ke}
              href={item.ke}
              aria-current={aktif(item.ke, jalurAktif) ? 'page' : undefined}
              className={cx(kelasItem(item.ke), 'w-16 flex-col gap-1 py-2 text-center')}
            >
              <span className="relative">
                <Ikon aria-hidden className="size-6" />
                {item.jumlah ? (
                  <span className="absolute -top-2 -right-3 rounded-pill bg-primary-strong px-1 text-label text-on-primary">
                    {item.jumlah}
                  </span>
                ) : null}
              </span>
              <span>{item.label}</span>
            </Tautan>
          )
        })}
      </nav>

      {/* Sidebar: 1024 px ke atas, bisa diciutkan */}
      <nav
        aria-label={label.navUtama}
        data-nav="sidebar"
        data-ciut={ciut ? '1' : '0'}
        className={cx(
          'sticky top-0 hidden h-dvh shrink-0 flex-col gap-1 overflow-y-auto border-r border-border bg-surface p-3 desktop:flex',
          'transition-[width] duration-(--sj-motion-base) ease-standard',
          ciut ? 'w-sidebar-collapsed' : 'w-sidebar',
        )}
      >
        <div className="mb-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCiut((c) => !c)}
            aria-expanded={!ciut}
            aria-label={ciut ? label.bentangkan : label.ciutkan}
            className="inline-flex size-touch shrink-0 items-center justify-center rounded-button text-text hover:bg-bg"
          >
            <Menu aria-hidden className="size-6" />
          </button>
          {!ciut && <div className="truncate">{merek}</div>}
        </div>
        {navSamping.map((kelompok, i) => (
          <div key={kelompok.judul ?? i} className="flex flex-col gap-1 pb-3">
            {kelompok.judul && !ciut && (
              <p className="m-0 px-3 pt-2 pb-1 text-label tracking-wide text-text-muted uppercase">
                {kelompok.judul}
              </p>
            )}
            {kelompok.item.map((item) => {
              const Ikon = item.ikon
              return (
                <Tautan
                  key={item.ke}
                  href={item.ke}
                  title={ciut ? item.label : undefined}
                  aria-current={aktif(item.ke, jalurAktif) ? 'page' : undefined}
                  className={cx(kelasItem(item.ke), 'min-h-touch gap-3 px-3', ciut && 'justify-center')}
                >
                  <Ikon aria-hidden className="size-6 shrink-0" />
                  {ciut ? <span className="sr-only">{item.label}</span> : <span>{item.label}</span>}
                  {!ciut && <Jumlah n={item.jumlah} />}
                </Tautan>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between gap-2 border-b border-border bg-surface px-screen">
          <div className="desktop:invisible">{merek}</div>
          <div className="flex items-center gap-1">{aksiAtas}</div>
        </header>
        <div className="flex flex-1">
          <main
            id="isi"
            tabIndex={-1}
            className="mx-auto w-full max-w-content min-w-0 flex-1 px-screen pt-6 pb-28 tablet:pb-10"
          >
            {children}
          </main>
          {panelKonteks && (
            <aside
              data-panel="konteks"
              className="hidden w-context shrink-0 border-l border-border bg-surface p-6 wide:block"
            >
              {panelKonteks}
            </aside>
          )}
        </div>
      </div>

      {/* Bilah bawah: di bawah 600 px */}
      <nav
        aria-label={label.navUtama}
        data-nav="bawah"
        className="fixed inset-x-0 bottom-0 z-20 flex border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] tablet:hidden"
      >
        {navUtama.map((item) => {
          const Ikon = item.ikon
          return (
            <Tautan
              key={item.ke}
              href={item.ke}
              aria-current={aktif(item.ke, jalurAktif) ? 'page' : undefined}
              className={cx(kelasItem(item.ke), 'min-h-16 flex-1 flex-col justify-center gap-1')}
            >
              <span className="relative">
                <Ikon aria-hidden className="size-6" />
                {item.jumlah ? (
                  <span className="absolute -top-2 -right-3 rounded-pill bg-primary-strong px-1 text-label text-on-primary">
                    {item.jumlah}
                  </span>
                ) : null}
              </span>
              <span>{item.label}</span>
            </Tautan>
          )
        })}
      </nav>
    </div>
  )
}

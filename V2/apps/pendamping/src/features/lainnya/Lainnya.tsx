import { Kartu } from '@sahaja/ui'
import { ChevronRight } from 'lucide-react'
import { navSamping, navUtama } from '../../app/nav'
import { Tautan } from '../../app/Tautan'
import { t } from '../../teks'

/** Di ponsel, tujuan yang tidak muat di bilah bawah dibuka dari sini. */
export function Lainnya() {
  const diBilah = new Set(navUtama.map((n) => n.ke))
  return (
    <section aria-labelledby="judul-halaman" className="flex flex-col gap-4">
      <h1 id="judul-halaman" className="m-0 text-title">
        {t('nav.lainnya')}
      </h1>
      {navSamping.map((kelompok) => {
        const item = kelompok.item.filter((i) => !diBilah.has(i.ke))
        if (item.length === 0) return null
        return (
          <Kartu key={kelompok.judul} className="p-2">
            <h2 className="m-0 px-3 pt-2 pb-1 text-label text-text-muted uppercase">
              {kelompok.judul}
            </h2>
            <ul className="m-0 list-none p-0">
              {item.map((i) => {
                const Ikon = i.ikon
                return (
                  <li key={i.ke}>
                    <Tautan
                      href={i.ke}
                      className="flex min-h-touch items-center gap-3 rounded-button px-3 text-body text-text hover:bg-bg"
                    >
                      <Ikon aria-hidden className="size-6 text-primary-strong" />
                      <span className="flex-1">{i.label}</span>
                      <ChevronRight aria-hidden className="size-5 text-text-muted" />
                    </Tautan>
                  </li>
                )
              })}
            </ul>
          </Kartu>
        )
      })}
    </section>
  )
}

import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cx } from '../cx'

export interface ImersifProps {
  /** `kuesioner` untuk kuesioner dan kuis (560 px), `bacaan` untuk materi dan aktivitas (640 px). */
  lebar: 'kuesioner' | 'bacaan'
  progres?: { sekarang: number; total: number; label: string }
  keluar?: { label: string; onKlik: () => void }
  children: ReactNode
}

/** Layar imersif tanpa navigasi: hanya progres, tombol keluar, dan satu kartu tengah (dokumen 02 bagian 3.4). */
export function Imersif({ lebar, progres, keluar, children }: ImersifProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-bg" data-imersif>
      <header className="mx-auto flex w-full max-w-reading items-center gap-4 px-screen pt-4">
        {progres && (
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-label text-text-muted">{progres.label}</span>
            <progress
              value={progres.sekarang}
              max={progres.total}
              aria-label={progres.label}
              className="h-2 w-full overflow-hidden rounded-pill [&::-moz-progress-bar]:bg-primary [&::-webkit-progress-bar]:bg-border [&::-webkit-progress-value]:bg-primary"
            />
          </div>
        )}
        {keluar && (
          <button
            type="button"
            onClick={keluar.onKlik}
            aria-label={keluar.label}
            className="ml-auto inline-flex size-touch items-center justify-center rounded-pill text-text-muted hover:bg-surface"
          >
            <X aria-hidden className="size-6" />
          </button>
        )}
      </header>
      <main
        id="isi"
        className={cx(
          'mx-auto flex w-full flex-1 items-start px-screen py-6 tablet:items-center',
          lebar === 'kuesioner' ? 'max-w-questionnaire' : 'max-w-reading',
        )}
      >
        <div className="w-full rounded-card bg-surface p-6 shadow-elevation-1">{children}</div>
      </main>
    </div>
  )
}

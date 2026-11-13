import { CircleAlert, Inbox, LoaderCircle, WifiOff } from 'lucide-react'
import type { ReactNode } from 'react'
import { Tombol } from './Tombol'

export type JenisKeadaan = 'memuat' | 'kosong' | 'galat' | 'offline'

export interface KeadaanLayarProps {
  jenis: JenisKeadaan
  pesan: string
  /** Aksi opsional, misalnya Coba lagi pada keadaan galat. */
  aksi?: { label: string; onKlik: () => void }
  children?: ReactNode
}

const ikon = { memuat: LoaderCircle, kosong: Inbox, galat: CircleAlert, offline: WifiOff } as const
const warnaIkon: Record<JenisKeadaan, string> = {
  memuat: 'text-primary animate-spin',
  kosong: 'text-text-muted',
  galat: 'text-caution',
  offline: 'text-caution',
}

/** Keadaan memuat, kosong, galat, dan offline yang wajib ada di setiap layar. */
export function KeadaanLayar({ jenis, pesan, aksi, children }: KeadaanLayarProps) {
  const Ikon = ikon[jenis]
  return (
    <div
      role={jenis === 'galat' ? 'alert' : 'status'}
      aria-live="polite"
      className="flex flex-col items-center gap-3 px-screen py-10 text-center"
    >
      <Ikon aria-hidden className={`size-10 ${warnaIkon[jenis]}`} />
      <p className="m-0 max-w-line text-body text-text">{pesan}</p>
      {children}
      {aksi && (
        <Tombol varian="kedua" onClick={aksi.onKlik}>
          {aksi.label}
        </Tombol>
      )}
    </div>
  )
}

import { Check, Clock, HardDrive, WifiOff } from 'lucide-react'
import { cx } from '../cx'

export type JenisStatus = 'menunggu' | 'tersimpan_lokal' | 'terkirim' | 'offline'

const ikon = {
  menunggu: Clock,
  tersimpan_lokal: HardDrive,
  terkirim: Check,
  offline: WifiOff,
} as const

const gaya: Record<JenisStatus, string> = {
  menunggu: 'bg-secondary-soft text-text',
  tersimpan_lokal: 'bg-bg text-text',
  // success-strong di atas primary-soft hanya 4,42:1, jadi latarnya putih dengan garis tepi.
  terkirim: 'border border-border bg-surface text-success-strong',
  offline: 'bg-caution-soft text-text',
}

export interface LabelStatusProps {
  jenis: JenisStatus
  /** Teks dari kamus, misalnya umum.terkirim. Status selalu berupa ikon dan kata. */
  teks: string
  className?: string
}

export function LabelStatus({ jenis, teks, className }: LabelStatusProps) {
  const Ikon = ikon[jenis]
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-pill px-3 py-1 text-label',
        gaya[jenis],
        className,
      )}
    >
      <Ikon aria-hidden className="size-4" />
      {teks}
    </span>
  )
}

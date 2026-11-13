import { LoaderCircle } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from '../cx'

export type VarianTombol = 'utama' | 'kedua' | 'teks'

export interface TombolProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  varian?: VarianTombol
  /** Tampilkan pemutar dan nonaktifkan tombol. Isi teks tetap terbaca oleh pembaca layar. */
  memuat?: boolean
  ikon?: ReactNode
  penuh?: boolean
}

const gayaVarian: Record<VarianTombol, string> = {
  // Tombol berisi memakai primary-strong karena kontras teks putih (dokumen 02 bagian 2.1).
  utama: 'bg-primary-strong text-on-primary hover:brightness-110 active:brightness-95',
  kedua: 'bg-surface text-primary-strong border-2 border-primary-strong hover:bg-primary-soft',
  teks: 'bg-transparent text-primary-strong hover:bg-primary-soft',
}

export function Tombol({
  varian = 'utama',
  memuat = false,
  ikon,
  penuh = false,
  disabled,
  className,
  children,
  type = 'button',
  ...sisa
}: TombolProps) {
  return (
    <button
      type={type}
      disabled={disabled || memuat}
      aria-busy={memuat || undefined}
      className={cx(
        'inline-flex min-h-touch items-center justify-center gap-2 rounded-button px-5 text-body-strong',
        'transition duration-(--sj-motion-fast) ease-standard',
        'disabled:cursor-not-allowed disabled:opacity-50',
        gayaVarian[varian],
        penuh && 'w-full',
        className,
      )}
      {...sisa}
    >
      {memuat ? <LoaderCircle aria-hidden className="size-5 animate-spin" /> : ikon}
      {children}
    </button>
  )
}

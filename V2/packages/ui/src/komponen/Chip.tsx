import { Check } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'
import { cx } from '../cx'

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  terpilih?: boolean
  onUbah?: (terpilih: boolean) => void
}

/** Chip pilihan. Status terpilih ditandai ikon centang, bukan hanya warna. */
export function Chip({ terpilih = false, onUbah, className, children, ...sisa }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={terpilih}
      onClick={() => onUbah?.(!terpilih)}
      className={cx(
        'inline-flex min-h-touch items-center gap-1 rounded-pill border-2 px-4 text-label',
        'transition duration-(--sj-motion-fast) ease-standard',
        terpilih
          ? 'border-primary-strong bg-primary-soft text-primary-strong'
          : 'border-border bg-surface text-text hover:border-primary',
        className,
      )}
      {...sisa}
    >
      {terpilih && <Check aria-hidden className="size-4" />}
      {children}
    </button>
  )
}

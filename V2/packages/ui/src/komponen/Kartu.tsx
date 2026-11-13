import type { HTMLAttributes } from 'react'
import { cx } from '../cx'

export interface KartuProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'article' | 'div'
  aktif?: boolean
}

export function Kartu({ as: Elemen = 'section', aktif = false, className, ...sisa }: KartuProps) {
  return (
    <Elemen
      className={cx(
        'rounded-card border border-border p-5 shadow-elevation-1',
        aktif ? 'bg-primary-soft' : 'bg-surface',
        className,
      )}
      {...sisa}
    />
  )
}

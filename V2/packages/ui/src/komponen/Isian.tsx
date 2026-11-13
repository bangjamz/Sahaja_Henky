import { CircleAlert } from 'lucide-react'
import { useId, type InputHTMLAttributes } from 'react'
import { cx } from '../cx'

export interface IsianProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  bantuan?: string
  galat?: string
}

export function Isian({ label, bantuan, galat, className, id, ...sisa }: IsianProps) {
  const idBawaan = useId()
  const idIsian = id ?? idBawaan
  const idBantuan = `${idIsian}-bantuan`
  const idGalat = `${idIsian}-galat`
  const keterangan = [bantuan && idBantuan, galat && idGalat].filter(Boolean).join(' ') || undefined

  return (
    <div className={cx('flex flex-col gap-1', className)}>
      <label htmlFor={idIsian} className="text-label text-text">
        {label}
      </label>
      <input
        id={idIsian}
        aria-invalid={galat ? true : undefined}
        aria-describedby={keterangan}
        className={cx(
          'min-h-touch rounded-input border-2 bg-surface px-4 text-body text-text',
          galat ? 'border-caution' : 'border-border focus:border-primary',
        )}
        {...sisa}
      />
      {bantuan && (
        <p id={idBantuan} className="text-small text-text-muted">
          {bantuan}
        </p>
      )}
      {galat && (
        <p id={idGalat} className="flex items-center gap-1 text-small text-text">
          <CircleAlert aria-hidden className="size-4 shrink-0 text-caution" />
          {galat}
        </p>
      )}
    </div>
  )
}

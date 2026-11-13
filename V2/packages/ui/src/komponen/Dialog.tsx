import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cx } from '../cx'

export interface DialogProps {
  terbuka: boolean
  onUbahTerbuka: (terbuka: boolean) => void
  judul: string
  deskripsi?: string
  labelTutup: string
  children?: ReactNode
  /** `tengah` untuk dialog biasa; `bawah` menjadi lembar bawah di ponsel dan dialog tengah di layar lebar. */
  bentuk?: 'tengah' | 'bawah'
}

export function Dialog({
  terbuka,
  onUbahTerbuka,
  judul,
  deskripsi,
  labelTutup,
  children,
  bentuk = 'tengah',
}: DialogProps) {
  return (
    <RadixDialog.Root open={terbuka} onOpenChange={onUbahTerbuka}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-40 bg-text/40" />
        <RadixDialog.Content
          className={cx(
            'fixed z-50 bg-surface p-6 shadow-elevation-2 focus:outline-none',
            bentuk === 'bawah'
              ? 'inset-x-0 bottom-0 rounded-t-card tablet:inset-x-screen tablet:top-1/2 tablet:bottom-auto tablet:mx-auto tablet:max-w-questionnaire tablet:-translate-y-1/2 tablet:rounded-card'
              : 'inset-x-screen top-1/2 mx-auto max-w-questionnaire -translate-y-1/2 rounded-card',
          )}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <RadixDialog.Title className="m-0 text-heading">{judul}</RadixDialog.Title>
            <RadixDialog.Close
              aria-label={labelTutup}
              className="-m-2 inline-flex size-touch shrink-0 items-center justify-center rounded-pill text-text-muted hover:bg-bg"
            >
              <X aria-hidden className="size-6" />
            </RadixDialog.Close>
          </div>
          {deskripsi ? (
            <RadixDialog.Description className="mb-4 text-body text-text-muted">
              {deskripsi}
            </RadixDialog.Description>
          ) : (
            <RadixDialog.Description className="sr-only">{judul}</RadixDialog.Description>
          )}
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

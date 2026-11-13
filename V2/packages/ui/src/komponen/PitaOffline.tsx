import { WifiOff } from 'lucide-react'
import { useDaring } from '../daring'

/** Pita di atas layar saat perangkat offline. Teks dari kamus `umum.offline`. */
export function PitaOffline({ teks }: { teks: string }) {
  const daring = useDaring()
  if (daring) return null
  return (
    <div
      role="status"
      className="flex items-center justify-center gap-2 bg-caution-soft px-screen py-2 text-small text-text"
    >
      <WifiOff aria-hidden className="size-4 shrink-0 text-caution" />
      {teks}
    </div>
  )
}

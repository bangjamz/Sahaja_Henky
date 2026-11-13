import { useSyncExternalStore } from 'react'

function langgan(panggil: () => void): () => void {
  window.addEventListener('online', panggil)
  window.addEventListener('offline', panggil)
  return () => {
    window.removeEventListener('online', panggil)
    window.removeEventListener('offline', panggil)
  }
}

/** Status jaringan perangkat. Dipakai untuk menampilkan keadaan offline. */
export function useDaring(): boolean {
  return useSyncExternalStore(
    langgan,
    () => navigator.onLine,
    () => true,
  )
}

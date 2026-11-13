import { KeadaanLayar } from '@sahaja/ui'
import { t } from '../../teks'

/** Halaman sementara untuk tujuan yang fiturnya belum dikerjakan. */
export function Disiapkan({ judul }: { judul: string }) {
  return (
    <section aria-labelledby="judul-halaman">
      <h1 id="judul-halaman" className="m-0 mb-4 text-title">
        {judul}
      </h1>
      <KeadaanLayar jenis="kosong" pesan={t('umum.disiapkan')} />
    </section>
  )
}

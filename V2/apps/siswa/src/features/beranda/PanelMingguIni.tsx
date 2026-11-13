import { KeadaanLayar } from '@sahaja/ui'
import { t } from '../../teks'

// Tempat Tiga Lingkaran, tugas rumah, dan pintasan bantuan (dokumen 02 bagian 3.3). Isinya dikerjakan di M2-01.
export function PanelMingguIni() {
  return (
    <section aria-labelledby="minggu-ini">
      <h2 id="minggu-ini" className="m-0 text-heading">
        {t('beranda.minggu_ini')}
      </h2>
      <KeadaanLayar jenis="kosong" pesan={t('beranda.minggu_ini_kosong')} />
    </section>
  )
}

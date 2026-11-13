import { KeadaanLayar } from '@sahaja/ui'
import { t } from '../../teks'

export function TidakDitemukan() {
  return <KeadaanLayar jenis="kosong" pesan={t('umum.tidak_ditemukan')} />
}

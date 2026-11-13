import { Kartu } from '@sahaja/ui'
import { t } from '../../teks'
import { Disiapkan } from '../umum/Disiapkan'
import { PanelMingguIni } from './PanelMingguIni'

export function Beranda() {
  return (
    <div className="flex flex-col gap-4">
      <Disiapkan judul={t('nav.beranda')} />
      {/* Di bawah 1280 px panel konteks turun menjadi kartu di kolom isi (dokumen 02 bagian 3.3). */}
      <Kartu className="wide:hidden">
        <PanelMingguIni />
      </Kartu>
    </div>
  )
}

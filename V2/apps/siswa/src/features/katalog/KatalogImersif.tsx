import { Imersif, Tombol } from '@sahaja/ui'
import { useNavigate } from 'react-router'
import { t } from '../../teks'

/** Contoh tata letak imersif. Bukan butir instrumen. */
export function KatalogImersif() {
  const pergi = useNavigate()
  return (
    <Imersif
      lebar="kuesioner"
      progres={{ sekarang: 3, total: 10, label: t('katalog.imersif_progres', { n: 3, total: 10 }) }}
      keluar={{ label: t('umum.keluar'), onKlik: () => pergi('/katalog') }}
    >
      <p className="m-0 mb-6 text-body">{t('katalog.imersif_isi')}</p>
      <Tombol penuh>{t('umum.lanjut')}</Tombol>
    </Imersif>
  )
}

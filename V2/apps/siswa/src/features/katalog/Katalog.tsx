import { Chip, Dialog, Isian, KeadaanLayar, Kartu, LabelStatus, Tombol } from '@sahaja/ui'
import { ArrowRight } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { t } from '../../teks'

function Bagian({ judul, children }: { judul: string; children: ReactNode }) {
  return (
    <Kartu>
      <h2 className="m-0 mb-4 text-heading">{judul}</h2>
      <div className="flex flex-wrap items-start gap-3">{children}</div>
    </Kartu>
  )
}

/** Katalog komponen untuk diperiksa di ponsel, tablet, dan desktop (M0-04). Hanya ada di mode pengembangan. */
export function Katalog() {
  const [dialog, setDialog] = useState(false)
  const [lembar, setLembar] = useState(false)
  const [pilihan, setPilihan] = useState<string[]>(['katalog.chip_contoh_1'])
  const pergi = useNavigate()
  const chip = ['katalog.chip_contoh_1', 'katalog.chip_contoh_2', 'katalog.chip_contoh_3'] as const

  return (
    <div className="flex flex-col gap-4">
      <h1 className="m-0 text-title">{t('katalog.judul')}</h1>

      <Bagian judul={t('katalog.tombol')}>
        <Tombol>{t('umum.lanjut')}</Tombol>
        <Tombol varian="kedua">{t('umum.kembali')}</Tombol>
        <Tombol varian="teks">{t('umum.lewati')}</Tombol>
        <Tombol memuat>{t('umum.simpan')}</Tombol>
        <Tombol disabled>{t('umum.lanjut')}</Tombol>
        <Tombol penuh ikon={<ArrowRight aria-hidden className="size-5" />}>
          {t('umum.lanjut')}
        </Tombol>
      </Bagian>

      <Bagian judul={t('katalog.isian')}>
        <Isian className="w-full" label={t('katalog.isian_label')} bantuan={t('katalog.isian_bantuan')} />
        <Isian className="w-full" label={t('katalog.isian_label')} galat={t('katalog.isian_galat')} />
      </Bagian>

      <Bagian judul={t('katalog.chip')}>
        {chip.map((k) => (
          <Chip
            key={k}
            terpilih={pilihan.includes(k)}
            onUbah={(ya) => setPilihan((p) => (ya ? [...p, k] : p.filter((x) => x !== k)))}
          >
            {t(k)}
          </Chip>
        ))}
      </Bagian>

      <Bagian judul={t('katalog.status')}>
        <LabelStatus jenis="menunggu" teks={t('umum.menunggu')} />
        <LabelStatus jenis="tersimpan_lokal" teks={t('umum.tersimpan_lokal')} />
        <LabelStatus jenis="terkirim" teks={t('umum.terkirim')} />
        <LabelStatus jenis="offline" teks={t('umum.offline')} />
      </Bagian>

      <Bagian judul={t('katalog.keadaan')}>
        <div className="grid w-full gap-3 tablet:grid-cols-2">
          <KeadaanLayar jenis="memuat" pesan={t('umum.memuat')} />
          <KeadaanLayar jenis="kosong" pesan={t('umum.disiapkan')} />
          <KeadaanLayar
            jenis="galat"
            pesan={t('umum.galat')}
            aksi={{ label: t('umum.coba_lagi'), onKlik: () => undefined }}
          />
          <KeadaanLayar jenis="offline" pesan={t('umum.offline')} />
        </div>
      </Bagian>

      <Bagian judul={t('katalog.dialog')}>
        <Tombol varian="kedua" onClick={() => setDialog(true)}>
          {t('katalog.buka_dialog')}
        </Tombol>
        <Tombol varian="kedua" onClick={() => setLembar(true)}>
          {t('katalog.buka_lembar')}
        </Tombol>
        <Tombol varian="kedua" onClick={() => pergi('/katalog/imersif')}>
          {t('katalog.imersif')}
        </Tombol>
      </Bagian>

      <Dialog
        terbuka={dialog}
        onUbahTerbuka={setDialog}
        judul={t('katalog.dialog_judul')}
        deskripsi={t('katalog.dialog_isi')}
        labelTutup={t('umum.tutup')}
      >
        <Tombol penuh onClick={() => setDialog(false)}>
          {t('umum.lanjut')}
        </Tombol>
      </Dialog>
      <Dialog
        bentuk="bawah"
        terbuka={lembar}
        onUbahTerbuka={setLembar}
        judul={t('katalog.dialog_judul')}
        deskripsi={t('katalog.dialog_isi')}
        labelTutup={t('umum.tutup')}
      >
        <Tombol penuh onClick={() => setLembar(false)}>
          {t('umum.lanjut')}
        </Tombol>
      </Dialog>
    </div>
  )
}

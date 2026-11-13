import type { ItemNav, KelompokNav } from '@sahaja/ui'
import { Award, BookOpen, Home, LifeBuoy, MessagesSquare, NotebookPen, Settings, User } from 'lucide-react'
import { t } from '../teks'

// Ponsel: empat tab. Jurnalku, lencana, sertifikat, dan pengaturan ada di dalam Aku (dokumen 02 bagian 3.2).
export const navUtama: ItemNav[] = [
  { ke: '/', label: t('nav.beranda'), ikon: Home },
  { ke: '/belajar', label: t('nav.belajar'), ikon: BookOpen },
  { ke: '/forum', label: t('nav.forum'), ikon: MessagesSquare },
  { ke: '/aku', label: t('nav.aku'), ikon: User },
]

// Desktop: sidebar memunculkan tujuan yang di ponsel tersimpan di dalam Aku (dokumen 02 bagian 3.3).
export const navSamping: KelompokNav[] = [
  {
    item: [
      { ke: '/', label: t('nav.beranda'), ikon: Home },
      { ke: '/belajar', label: t('nav.belajar'), ikon: BookOpen },
      { ke: '/forum', label: t('nav.forum'), ikon: MessagesSquare },
      { ke: '/aku', label: t('nav.aku'), ikon: User },
      { ke: '/aku/jurnal', label: t('nav.jurnalku'), ikon: NotebookPen },
      { ke: '/aku/lencana', label: t('nav.lencana'), ikon: Award },
    ],
  },
  {
    item: [
      { ke: '/bantuan', label: t('nav.bantuan'), ikon: LifeBuoy },
      { ke: '/aku/pengaturan', label: t('nav.pengaturan'), ikon: Settings },
    ],
  },
]

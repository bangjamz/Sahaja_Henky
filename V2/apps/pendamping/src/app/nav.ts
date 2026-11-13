import type { ItemNav, KelompokNav } from '@sahaja/ui'
import {
  BarChart3,
  BookOpenCheck,
  ClipboardCheck,
  Download,
  FileStack,
  Home,
  MoreHorizontal,
  NotebookPen,
  School,
  ShieldAlert,
  ShieldCheck,
  UserCog,
  Users,
} from 'lucide-react'
import { t } from '../teks'

// Sidebar dikelompokkan menurut pekerjaan (dokumen 02 bagian 3.5).
// Penyaringan kelompok menurut peran dikerjakan di M1-05 bersama masuk staf dan peran bercakupan.
export const navSamping: KelompokNav[] = [
  {
    judul: t('kelompok.pendampingan'),
    item: [
      { ke: '/', label: t('nav.beranda'), ikon: Home },
      { ke: '/sesi', label: t('nav.sesi'), ikon: BookOpenCheck },
      { ke: '/kelas', label: t('nav.kelas'), ikon: Users },
      { ke: '/moderasi', label: t('nav.moderasi'), ikon: ShieldCheck },
      { ke: '/eskalasi', label: t('nav.eskalasi'), ikon: ShieldAlert },
      { ke: '/logbook', label: t('nav.logbook'), ikon: NotebookPen },
    ],
  },
  {
    judul: t('kelompok.penelitian'),
    item: [
      { ke: '/dasbor', label: t('nav.dasbor'), ikon: BarChart3 },
      { ke: '/kelengkapan', label: t('nav.kelengkapan'), ikon: ClipboardCheck },
      { ke: '/ekspor', label: t('nav.ekspor'), ikon: Download },
    ],
  },
  {
    judul: t('kelompok.kelola'),
    item: [
      { ke: '/kelola/sekolah', label: t('nav.sekolah'), ikon: School },
      { ke: '/kelola/siswa', label: t('nav.siswa'), ikon: Users },
      { ke: '/kelola/konten', label: t('nav.konten'), ikon: FileStack },
      { ke: '/kelola/pengguna', label: t('nav.pengguna'), ikon: UserCog },
    ],
  },
]

// Bilah bawah ponsel untuk fasilitator: Beranda, Sesi, Kelas, Moderasi, Lainnya (dokumen 02 bagian 3.5).
export const navUtama: ItemNav[] = [
  { ke: '/', label: t('nav.beranda'), ikon: Home },
  { ke: '/sesi', label: t('nav.sesi_pendek'), ikon: BookOpenCheck },
  { ke: '/kelas', label: t('nav.kelas_pendek'), ikon: Users },
  { ke: '/moderasi', label: t('nav.moderasi'), ikon: ShieldCheck },
  { ke: '/lainnya', label: t('nav.lainnya'), ikon: MoreHorizontal },
]

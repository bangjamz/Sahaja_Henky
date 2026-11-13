import { createBrowserRouter, type RouteObject } from 'react-router'
import { Lainnya } from '../features/lainnya/Lainnya'
import { Disiapkan } from '../features/umum/Disiapkan'
import { TidakDitemukan } from '../features/umum/TidakDitemukan'
import { t, type KunciTeks } from '../teks'
import { CangkangPendamping } from './CangkangPendamping'

const sementara = (path: string, judul: KunciTeks): RouteObject => ({
  path,
  element: <Disiapkan judul={t(judul)} />,
})

export const rute: RouteObject[] = [
  {
    path: '/',
    element: <CangkangPendamping />,
    children: [
      { index: true, element: <Disiapkan judul={t('nav.beranda')} /> },
      sementara('sesi', 'nav.sesi'),
      sementara('kelas', 'nav.kelas'),
      sementara('moderasi', 'nav.moderasi'),
      sementara('eskalasi', 'nav.eskalasi'),
      sementara('logbook', 'nav.logbook'),
      sementara('dasbor', 'nav.dasbor'),
      sementara('kelengkapan', 'nav.kelengkapan'),
      sementara('ekspor', 'nav.ekspor'),
      sementara('kelola/sekolah', 'nav.sekolah'),
      sementara('kelola/siswa', 'nav.siswa'),
      sementara('kelola/konten', 'nav.konten'),
      sementara('kelola/pengguna', 'nav.pengguna'),
      sementara('notifikasi', 'nav.notifikasi'),
      sementara('akun', 'nav.akun'),
      { path: 'lainnya', element: <Lainnya /> },
      { path: '*', element: <TidakDitemukan /> },
    ],
  },
]

export const router = createBrowserRouter(rute)

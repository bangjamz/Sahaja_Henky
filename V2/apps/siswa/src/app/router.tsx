import { createBrowserRouter, type RouteObject } from 'react-router'
import { Beranda } from '../features/beranda/Beranda'
import { Katalog } from '../features/katalog/Katalog'
import { KatalogImersif } from '../features/katalog/KatalogImersif'
import { Disiapkan } from '../features/umum/Disiapkan'
import { TidakDitemukan } from '../features/umum/TidakDitemukan'
import { t, type KunciTeks } from '../teks'
import { CangkangSiswa } from './CangkangSiswa'

const sementara = (path: string, judul: KunciTeks): RouteObject => ({
  path,
  element: <Disiapkan judul={t(judul)} />,
})

// Katalog komponen hanya untuk pengembangan dan uji tampilan, tidak ikut ke build produksi.
const ruteKatalog: RouteObject[] = import.meta.env.DEV || import.meta.env.MODE === 'test'
  ? [{ path: '/katalog/imersif', element: <KatalogImersif /> }]
  : []
const ruteKatalogDalam: RouteObject[] = import.meta.env.DEV || import.meta.env.MODE === 'test'
  ? [{ path: 'katalog', element: <Katalog /> }]
  : []

export const rute: RouteObject[] = [
  {
    path: '/',
    element: <CangkangSiswa />,
    children: [
      { index: true, element: <Beranda /> },
      sementara('belajar', 'nav.belajar'),
      sementara('forum', 'nav.forum'),
      sementara('aku', 'nav.aku'),
      sementara('aku/jurnal', 'nav.jurnalku'),
      sementara('aku/lencana', 'nav.lencana'),
      sementara('aku/pengaturan', 'nav.pengaturan'),
      sementara('bantuan', 'bantuan.judul'),
      sementara('notifikasi', 'nav.notifikasi'),
      ...ruteKatalogDalam,
      { path: '*', element: <TidakDitemukan /> },
    ],
  },
  ...ruteKatalog,
]

export const router = createBrowserRouter(rute)

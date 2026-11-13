// Menentukan berkas mana yang diperiksa dan dengan aturan apa.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { periksaBlade, periksaKamus, periksaMarkdown } from './aturan.mjs'

const ABAIKAN = new Set(['node_modules', 'vendor', 'dist', '.turbo', 'storage', '.git', 'coverage', 'test-results', 'playwright-report'])

/** Folder dan pola berkas yang diperiksa, relatif terhadap folder V2. */
export const SASARAN = [
  { folder: '.', kedalaman: 0, cocok: (n) => n.endsWith('.md') },
  { folder: 'Rencana Apps', cocok: (n) => n.endsWith('.md') },
  { folder: 'agen', cocok: (n) => n.endsWith('.md') },
  { folder: 'backend', kedalaman: 0, cocok: (n) => n.endsWith('.md') },
  { folder: 'apps', cocok: (n, jalur) => n.endsWith('.json') && jalur.includes('/teks/') },
  { folder: 'packages/content', cocok: (n) => n.endsWith('.md') || n.endsWith('.json') },
  { folder: 'backend/resources/views', cocok: (n) => n.endsWith('.blade.php') },
]

function jelajah(folder, kedalaman, cocok, akar, hasil) {
  let isi
  try {
    isi = readdirSync(folder)
  } catch {
    return
  }
  for (const nama of isi) {
    if (ABAIKAN.has(nama)) continue
    const jalur = join(folder, nama)
    const st = statSync(jalur)
    if (st.isDirectory()) {
      if (kedalaman !== 0) jelajah(jalur, kedalaman === undefined ? undefined : kedalaman - 1, cocok, akar, hasil)
    } else if (cocok(nama, relative(akar, jalur).split('\\').join('/'))) {
      hasil.push(jalur)
    }
  }
}

export function daftarBerkas(akar) {
  const hasil = []
  for (const s of SASARAN) jelajah(join(akar, s.folder), s.kedalaman, s.cocok, akar, hasil)
  return [...new Set(hasil)].sort()
}

export function periksaBerkas(jalur) {
  const isi = readFileSync(jalur, 'utf8')
  if (jalur.endsWith('.blade.php')) return periksaBlade(isi)
  if (jalur.endsWith('.json')) return periksaKamus(isi)
  return periksaMarkdown(isi)
}

#!/usr/bin/env node
// Pemeriksa aturan tulis (M0-07). Gagal bila ada ampersand, em dash, atau garis pemisah horizontal
// di kamus teks, konten, dokumen, atau tampilan Blade. Blok kode di dokumen dilewati.
import { dirname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { daftarBerkas, periksaBerkas } from './src/berkas.mjs'

const akar = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const pesan = {
  ampersand: 'ampersand, tulis "dan"',
  'em-dash': 'em dash, pakai koma, titik dua, atau kalimat baru',
  'garis-pemisah': 'garis pemisah horizontal tidak dipakai di dokumen',
}

const berkas = daftarBerkas(akar)
let jumlah = 0
for (const jalur of berkas) {
  for (const p of periksaBerkas(jalur)) {
    jumlah++
    console.error(`${relative(akar, jalur)}:${p.baris}:${p.kolom}  ${pesan[p.aturan]}  [${p.cuplikan}]`)
  }
}

if (jumlah > 0) {
  console.error(`\ncek-teks: ${jumlah} pelanggaran di ${berkas.length} berkas yang diperiksa.`)
  process.exit(1)
}
console.warn(`cek-teks: ${berkas.length} berkas bersih.`)

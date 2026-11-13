// Aturan tulis SAHAJA (AGENTS.md bagian 5, dokumen 10 bagian 6).
// Fungsi murni: menerima isi berkas, mengembalikan daftar pelanggaran.

const EM_DASH = '\u2014'

/** @typedef {{ baris: number, kolom: number, aturan: 'ampersand' | 'em-dash' | 'garis-pemisah', cuplikan: string }} Pelanggaran */

/**
 * Memeriksa satu potong teks bebas (bukan kode).
 * @param {string} teks
 * @param {number} baris
 * @param {{ entitasHtml?: boolean }} [opsi]
 * @returns {Pelanggaran[]}
 */
export function periksaTeks(teks, baris, opsi = {}) {
  const hasil = []
  const bersih = opsi.entitasHtml ? teks.replace(/&(#\d+|#x[0-9a-f]+|[a-z][a-z0-9]*);/gi, (m) => ' '.repeat(m.length)) : teks
  for (let i = 0; i < bersih.length; i++) {
    const c = bersih[i]
    if (c === '&') hasil.push({ baris, kolom: i + 1, aturan: 'ampersand', cuplikan: cuplik(teks, i) })
    if (c === EM_DASH) hasil.push({ baris, kolom: i + 1, aturan: 'em-dash', cuplikan: cuplik(teks, i) })
  }
  return hasil
}

function cuplik(teks, i) {
  return teks.slice(Math.max(0, i - 20), i + 20).trim()
}

/** Menghapus potongan kode sebaris (`...`) supaya isinya tidak diperiksa, tanpa menggeser kolom. */
function tanpaKodeSebaris(baris) {
  return baris.replace(/`[^`]*`/g, (m) => ' '.repeat(m.length))
}

/**
 * Memeriksa dokumen Markdown. Blok kode dan kode sebaris dilewati. Frontmatter di awal berkas dilewati.
 * @param {string} isi
 * @returns {Pelanggaran[]}
 */
export function periksaMarkdown(isi) {
  const hasil = []
  const semua = isi.split(/\r?\n/)
  let dalamKode = false
  let pagarKode = ''
  let mulai = 0

  if (semua[0]?.trim() === '---') {
    const tutup = semua.findIndex((b, i) => i > 0 && b.trim() === '---')
    if (tutup > 0) mulai = tutup + 1
  }

  for (let i = mulai; i < semua.length; i++) {
    const baris = semua[i] ?? ''
    const pagar = baris.match(/^\s{0,3}(`{3,}|~{3,})/)
    if (pagar) {
      if (!dalamKode) {
        dalamKode = true
        pagarKode = pagar[1][0]
      } else if (pagar[1][0] === pagarKode) {
        dalamKode = false
      }
      continue
    }
    if (dalamKode) continue

    if (/^\s{0,3}([-*_])(\s*\1){2,}\s*$/.test(baris)) {
      hasil.push({ baris: i + 1, kolom: 1, aturan: 'garis-pemisah', cuplikan: baris.trim() })
      continue
    }
    hasil.push(...periksaTeks(tanpaKodeSebaris(baris), i + 1))
  }
  return hasil
}

/**
 * Memeriksa kamus teks JSON datar. Hanya nilai yang diperiksa.
 * @param {string} isi
 * @returns {Pelanggaran[]}
 */
export function periksaKamus(isi) {
  const kamus = JSON.parse(isi)
  const baris = isi.split(/\r?\n/)
  const hasil = []
  for (const [kunci, nilai] of Object.entries(kamus)) {
    if (typeof nilai !== 'string') continue
    const nomor = baris.findIndex((b) => b.includes(`"${kunci}"`)) + 1
    for (const p of periksaTeks(nilai, nomor)) hasil.push({ ...p, cuplikan: `${kunci}: ${p.cuplikan}` })
  }
  return hasil
}

/**
 * Memeriksa tampilan Blade. Entitas HTML seperti &nbsp; diizinkan.
 * @param {string} isi
 * @returns {Pelanggaran[]}
 */
export function periksaBlade(isi) {
  return isi
    .split(/\r?\n/)
    .flatMap((baris, i) => periksaTeks(baris.replace(/\{\{.*?\}\}|@\w+(\(.*?\))?/g, (m) => ' '.repeat(m.length)), i + 1, { entitasHtml: true }))
}

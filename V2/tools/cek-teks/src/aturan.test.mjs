import { describe, expect, it } from 'vitest'
import { periksaBlade, periksaKamus, periksaMarkdown } from './aturan.mjs'

const aturan = (daftar) => daftar.map((p) => p.aturan)

describe('periksaMarkdown', () => {
  it('menandai ampersand dan em dash di teks biasa', () => {
    expect(aturan(periksaMarkdown('Guru & siswa\nSesi pertama \u2014 pembuka'))).toEqual(['ampersand', 'em-dash'])
  })

  it('melewati blok kode dan kode sebaris', () => {
    const isi = ['Jalankan `a && b` di terminal.', '```bash', 'cd V2 && pnpm cek', '```', 'Selesai.'].join('\n')
    expect(periksaMarkdown(isi)).toEqual([])
  })

  it('menandai garis pemisah horizontal di luar blok kode', () => {
    expect(aturan(periksaMarkdown('Atas\n\n---\n\nBawah\n***'))).toEqual(['garis-pemisah', 'garis-pemisah'])
  })

  it('melewati frontmatter di awal berkas', () => {
    expect(periksaMarkdown('---\nname: penguji\n---\n\nIsi.')).toEqual([])
  })

  it('tidak menganggap baris tabel sebagai garis pemisah', () => {
    expect(periksaMarkdown('| A | B |\n|---|---|\n| 1 | 2 |')).toEqual([])
  })

  it('melaporkan nomor baris dan kolom', () => {
    expect(periksaMarkdown('Baris satu\nIni & itu')[0]).toMatchObject({ baris: 2, kolom: 5 })
  })

  it('membolehkan en dash dan tanda hubung biasa', () => {
    expect(periksaMarkdown('Halaman 3\u20135, kata-kata, 13 sampai 15')).toEqual([])
  })
})

describe('periksaKamus', () => {
  it('hanya memeriksa nilai, dengan kunci di cuplikan', () => {
    const hasil = periksaKamus('{\n  "a.b": "Kamu & aku",\n  "a.c": "Aman"\n}')
    expect(hasil).toHaveLength(1)
    expect(hasil[0]).toMatchObject({ aturan: 'ampersand', baris: 2 })
    expect(hasil[0]?.cuplikan).toContain('a.b')
  })
})

describe('periksaBlade', () => {
  it('membolehkan entitas HTML tetapi menandai ampersand telanjang', () => {
    expect(periksaBlade('<p>Bapak&nbsp;Ibu</p>')).toEqual([])
    expect(aturan(periksaBlade('<p>Bapak & Ibu</p>'))).toEqual(['ampersand'])
  })

  it('melewati ekspresi Blade', () => {
    expect(periksaBlade("<p>{{ $a && $b }}</p>")).toEqual([])
  })
})

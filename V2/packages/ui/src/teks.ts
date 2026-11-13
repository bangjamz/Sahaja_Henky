// Pembantu kamus teks. Kamus berupa JSON datar dengan kunci `area.layar.elemen` (dokumen 11 bagian 5).

export type Kamus = Record<string, string>

/** Membuat fungsi `t` bertipe dari kamus. Kunci yang tidak ada menjadi galat tipe. */
export function buatTeks<K extends Kamus>(kamus: K) {
  return function t(kunci: keyof K & string, isian?: Record<string, string | number>): string {
    const teks = kamus[kunci] ?? kunci
    if (!isian) return teks
    return teks.replace(/\{(\w+)\}/g, (asli, nama: string) =>
      nama in isian ? String(isian[nama]) : asli,
    )
  }
}

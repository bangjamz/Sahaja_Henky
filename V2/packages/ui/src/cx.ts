/** Menggabungkan nama kelas, melewati nilai kosong. */
export function cx(...kelas: Array<string | false | null | undefined>): string {
  return kelas.filter(Boolean).join(' ')
}

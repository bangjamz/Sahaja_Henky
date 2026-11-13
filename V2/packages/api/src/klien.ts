// Klien API SAHAJA. Komponen tidak memanggil fetch langsung (dokumen 10 bagian 3).
// Tipe jalur dan respons berasal dari OpenAPI Laravel (`pnpm api:tipe`), tidak ditulis tangan.
import type { paths } from './schema'

type JalurGet = {
  [P in keyof paths]: paths[P] extends { get: unknown } ? P : never
}[keyof paths]

type ResponsOk<P extends JalurGet> = paths[P] extends {
  get: { responses: { 200: { content: { 'application/json': infer R } } } }
}
  ? R
  : never

type ParameterJalur<P extends JalurGet> = paths[P] extends {
  get: { parameters: { path: infer J } }
}
  ? J
  : never

export class GalatApi extends Error {
  constructor(
    readonly status: number,
    readonly jalur: string,
  ) {
    super(`Permintaan ${jalur} gagal dengan status ${status}`)
    this.name = 'GalatApi'
  }
}

export interface OpsiKlien {
  /** Alamat dasar API, misalnya `/api`. */
  dasar: string
  /** Token Sanctum. Tidak pernah dicatat ke log. */
  token?: () => string | null
  fetch?: typeof fetch
}

function isiJalur(templat: string, parameter: Record<string, string | number> | undefined): string {
  if (!parameter) return templat
  return templat.replace(/\{(\w+)\}/g, (_, nama: string) => {
    const nilai = parameter[nama]
    if (nilai === undefined) throw new Error(`Parameter jalur ${nama} belum diisi`)
    return encodeURIComponent(String(nilai))
  })
}

export function buatKlien(opsi: OpsiKlien) {
  const ambil = opsi.fetch ?? globalThis.fetch.bind(globalThis)

  async function get<P extends JalurGet>(
    jalur: P,
    ...parameter: ParameterJalur<P> extends never ? [] : [ParameterJalur<P>]
  ): Promise<ResponsOk<P>> {
    const url = opsi.dasar + isiJalur(jalur, parameter[0] as Record<string, string | number> | undefined)
    const token = opsi.token?.()
    const respons = await ambil(url, {
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
    if (!respons.ok) throw new GalatApi(respons.status, jalur)
    return (await respons.json()) as ResponsOk<P>
  }

  return { get }
}

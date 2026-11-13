import { describe, expect, expectTypeOf, it, vi } from 'vitest'
import { buatKlien, GalatApi } from './klien'

function fetchTiruan(status: number, isi: unknown) {
  return vi.fn(async () => new Response(JSON.stringify(isi), { status }))
}

describe('klien API', () => {
  it('mengisi parameter jalur dan mengirim token sebagai Bearer', async () => {
    const f = fetchTiruan(200, { data: { id: 7 } })
    const klien = buatKlien({ dasar: '/api', token: () => 'token-uji', fetch: f })

    await klien.get('/kelas/{kelas}', { kelas: 7 })

    expect(f).toHaveBeenCalledWith('/api/kelas/7', {
      headers: { Accept: 'application/json', Authorization: 'Bearer token-uji' },
    })
  })

  it('tidak mengirim header Authorization tanpa token', async () => {
    const f = fetchTiruan(200, { data: {} })
    await buatKlien({ dasar: '/api', fetch: f }).get('/siswa/saya')

    expect(f).toHaveBeenCalledWith('/api/siswa/saya', { headers: { Accept: 'application/json' } })
  })

  it('melempar GalatApi dengan status untuk respons gagal', async () => {
    const klien = buatKlien({ dasar: '/api', fetch: fetchTiruan(403, {}) })

    await expect(klien.get('/siswa/saya')).rejects.toEqual(new GalatApi(403, '/siswa/saya'))
  })

  it('respons bertipe dari OpenAPI Laravel', async () => {
    const klien = buatKlien({ dasar: '/api', fetch: fetchTiruan(200, { data: {} }) })
    const hasil = await klien.get('/siswa/saya')

    expectTypeOf(hasil.data.pseudonym).toEqualTypeOf<string | null>()
    expectTypeOf(hasil.data.id).toEqualTypeOf<number>()
    // @ts-expect-error jalur yang tidak ada di OpenAPI ditolak oleh pemeriksa tipe
    await klien.get('/tidak-ada').catch(() => undefined)
  })
})

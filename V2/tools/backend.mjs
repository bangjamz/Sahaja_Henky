#!/usr/bin/env node
// Menjalankan perintah backend dari akar repo.
// Memakai PHP lokal bila ada. Bila tidak, memakai kontainer php di Docker Compose (`pnpm infra:up`).
import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const akar = join(dirname(fileURLToPath(import.meta.url)), '..')
const backend = join(akar, 'backend')
const perintah = process.argv[2]

const daftar = {
  cek: [['composer', 'cek']],
  'uji:akses': [['composer', 'uji:akses']],
  'api:tipe': [
    ['composer', 'api:tipe'],
    ['pnpm', '--filter', '@sahaja/api', 'tipe:buat', { diAkar: true }],
  ],
}

if (!daftar[perintah]) {
  console.error(`Perintah tidak dikenal: ${perintah}. Pilihan: ${Object.keys(daftar).join(', ')}`)
  process.exit(2)
}

const adaPhp = spawnSync('php', ['--version'], { stdio: 'ignore' }).status === 0
if (!existsSync(join(backend, 'vendor')) && adaPhp) {
  console.error('Folder backend/vendor belum ada. Jalankan `composer install` di folder backend.')
  process.exit(1)
}

for (const langkah of daftar[perintah]) {
  const opsi = typeof langkah.at(-1) === 'object' ? langkah.pop() : {}
  let [program, ...argumen] = langkah
  let cwd = opsi.diAkar ? akar : backend
  if (!opsi.diAkar && !adaPhp) {
    // Jalankan di kontainer php milik proyek Compose SAHAJA.
    argumen = ['compose', '-f', 'infra/compose.yml', '-f', 'infra/compose.dev.yml', 'exec', '-T', 'php', program, ...argumen]
    program = 'docker'
    cwd = akar
  }
  const hasil = spawnSync(program, argumen, { cwd, stdio: 'inherit' })
  if (hasil.status !== 0) process.exit(hasil.status ?? 1)
}

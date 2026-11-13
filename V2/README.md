# SAHAJA V2

Repo aplikasi SAHAJA (Sahabat Remaja Jaga Diri), media intervensi disertasi dr. Henky Yoga Prasetya. Berisi dokumen perancangan versi 2.2 dan kode fondasi aplikasi (tonggak M0, mulai 13 November 2026). Tech stack: React (PWA, TWA untuk Android) dan Laravel dengan PostgreSQL dalam Docker Compose di VPS Hostinger.

## Isi

| Jalur | Isi |
|---|---|
| `Rencana Apps/` | Dokumen produk 00 sampai 13. Mulai dari `00 README.md` |
| `AGENTS.md` | Aturan kerja untuk Codex dan alat pengembang AI lain |
| `CLAUDE.md` | Pintu masuk Claude Code (memuat `AGENTS.md`) |
| `STATUS.md` | Catatan serah terima antarsesi dan antaralat, satu-satunya catatan status yang mengikat |
| `GEMINI.md`, `.agent/rules/` | Penunjuk untuk Antigravity dan Gemini (memuat `AGENTS.md`) |
| `agen/` | Lima peran peninjau: model, desain, privasi, konten, penguji |
| `agen/serah-terima.md` | Protokol membuka dan menutup sesi, berlaku untuk semua alat |
| `agen/claude-code/` | Subagen dan perintah Claude Code, perlu disalin sekali ke `.claude/` |
| `apps/siswa`, `apps/pendamping` | Frontend React S1 dan S2 |
| `backend/` | Laravel: API, Situs SAHAJA (Blade), uji Pest. Lihat `backend/README.md` |
| `packages/` | `tokens`, `ui`, `api`, `config` (paket bersama frontend) |
| `infra/` | Docker Compose dan Dockerfile |
| `tools/` | `cek-teks` (pemeriksa aturan tulis) dan penghubung perintah backend |
| `e2e/` | Uji Playwright: responsif, papan ketik, offline, aksesibilitas |

## Menjalankan kode

Butuh Node 22 ke atas dan pnpm 10. Backend butuh Docker, atau PHP 8.4 dan PostgreSQL bila tanpa Docker (rincian di `backend/README.md`).

```
pnpm install
pnpm dev --filter siswa        # http://localhost:5173 (katalog komponen di /katalog)
pnpm dev --filter pendamping   # http://localhost:5174
pnpm cek                       # tipe, lint, uji unit, aturan tulis, Pint, Larastan, Pest
pnpm uji:alur                  # Playwright
```

## Cara memulai sesi kerja dengan alat pengembang AI

Claude Code: subagen dan perintah sudah terpasang di `.claude/` (12 November 2026). Jalankan ulang perintah berikut dari folder `V2` hanya bila isi `agen/claude-code/` berubah.

```
mkdir -p .claude
cp -R agen/claude-code/agents agen/claude-code/commands .claude/
```

Setelah itu buka folder `V2` di Claude Code dan ketik `/mulai M0-02` (atau kode tugas lain).

Antigravity, Gemini, Codex, atau alat lain: buka folder `V2` (atau akar repo), lalu beri perintah pembuka berikut. Perintah pembuka lain ada di `agen/serah-terima.md` bagian 6.

```
Baca AGENTS.md dan agen/serah-terima.md, lalu ikuti bagian 2 untuk membuka sesi.
Kerjakan paket tugas M0-02 dari "Rencana Apps/08 Task dan Roadmap.md".
Sebelum melapor selesai, tinjau dengan agen/penguji.md dan tutup sesi sesuai bagian 4.
```

Untuk meminta tinjauan saja:

```
Tinjau perubahan yang belum dikomit memakai daftar periksa agen/penjaga-desain.md.
Laporkan temuan dengan tingkat Wajib diperbaiki, Sebaiknya diperbaiki, dan Catatan.
Jangan mengubah kode.
```

## Hubungan dengan folder lain

- `../Old`: draft aplikasi lama (Flutter dan prototipe HTML). Hanya bahan, tidak diubah.
- Google Drive "Project (Awatara Inst)/Disertasi/dr. Henky": naskah disertasi, lampiran L01 sampai L17, codebook. Salinan dokumen `Rencana Apps` di sana adalah cermin dari folder ini.

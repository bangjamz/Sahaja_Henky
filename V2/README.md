# SAHAJA V2

Repo aplikasi SAHAJA (Sahabat Remaja Jaga Diri), media intervensi disertasi dr. Henky Yoga Prasetya. Saat ini repo berisi dokumen perancangan versi 2.2 (12 November 2026). Tech stack: React (PWA, TWA untuk Android) dan Laravel dengan PostgreSQL dalam Docker Compose di VPS Hostinger. Kode aplikasi dimulai pada tugas M0-02.

## Isi

| Jalur | Isi |
|---|---|
| `Rencana Apps/` | Dokumen produk 00 sampai 13. Mulai dari `00 README.md` |
| `AGENTS.md` | Aturan kerja untuk Codex dan alat pengembang AI lain |
| `CLAUDE.md` | Pintu masuk Claude Code (memuat `AGENTS.md`) |
| `STATUS.md` | Catatan serah terima antarsesi dan antaralat |
| `agen/` | Lima peran peninjau: model, desain, privasi, konten, penguji |
| `agen/claude-code/` | Subagen dan perintah Claude Code, perlu disalin sekali ke `.claude/` |

## Cara memulai sesi kerja dengan alat pengembang AI

Claude Code: pasang subagen dan perintah sekali saja dengan menjalankan perintah berikut dari folder `V2`.

```
mkdir -p .claude
cp -R agen/claude-code/agents agen/claude-code/commands .claude/
```

Setelah itu buka folder `V2` di Claude Code dan ketik `/mulai M0-02` (atau kode tugas lain).

Codex atau alat lain: buka folder `V2`, lalu beri perintah pembuka berikut.

```
Baca AGENTS.md dan STATUS.md. Kerjakan paket tugas M0-02 dari
"Rencana Apps/08 Task dan Roadmap.md" mengikuti alur kerja di AGENTS.md bagian 8.
Sebelum melapor selesai, tinjau dengan agen/penguji.md dan perbarui STATUS.md.
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

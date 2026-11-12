# CLAUDE.md

Aturan proyek ada di `AGENTS.md` dan berlaku penuh untuk Claude Code.

@AGENTS.md

## Khusus Claude Code

- Pemasangan sekali: salin isi `agen/claude-code/` ke `.claude/` (lihat `README.md`).
- Subagen peninjau: `penjaga-model`, `penjaga-desain`, `penjaga-privasi`, `penjaga-konten`, `penguji`. Masing-masing hanya membaca dan melaporkan; perbaikan dikerjakan di sesi utama.
- Perintah: `/mulai <kode tugas>` untuk memulai paket tugas, `/tinjau` untuk menjalankan peran peninjau yang relevan atas perubahan saat ini, `/checkpoint` untuk memperbarui `STATUS.md`.
- Isi daftar periksa peninjau hanya ada di folder `agen/`. Berkas subagen hanya penunjuk, supaya tidak ada dua versi.
- Jangan menyalin isi dokumen `Rencana Apps/` ke berkas memori. Rujuk berkasnya.

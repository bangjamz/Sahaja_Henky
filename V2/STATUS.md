# STATUS

Catatan serah terima antarsesi dan antaralat, dan satu-satunya catatan status yang mengikat. Cara membuka dan menutup sesi ada di `agen/serah-terima.md`. Perbarui setiap akhir sesi kerja. Tulis fakta: apa yang selesai, apa yang belum diuji, apa yang menunggu keputusan.

## Keadaan saat ini

Diperbarui: 12 November 2026, oleh Claude Code (Claude Opus 5.5), sesi bersama Pak Indra.

- Tahap: perancangan. Belum ada kode aplikasi.
- Dokumen `Rencana Apps` versi 2.2 (14 berkas, 00 sampai 13). Versi 2.1 menulis ulang 00, 01, 02, 03, 04, 06, 08, menambah 09 sampai 12, dan memperbarui 07; 05 tidak diubah. Versi 2.2 hanya mengganti backend dan menambah 13. Berkas 02, 03, 06 masih berlabel 2.1 karena isinya tidak tersentuh perubahan backend.
- Berkas alat pengembang AI dibuat: `AGENTS.md`, `CLAUDE.md`, `agen/` (5 peran) dan `agen/claude-code/` (subagen dan perintah Claude Code).
- Subagen dan perintah Claude Code terpasang di `V2/.claude/` (12 November 2026): 5 subagen dan perintah `/mulai`, `/tinjau`, `/checkpoint`. Belum diuji dari sesi Claude Code yang dibuka di folder `V2`.
- 12 November 2026: backend diganti dari Supabase ke Laravel dan PostgreSQL dalam Docker Compose di VPS Hostinger KVM 4 milik Pak Indra (T10). Berkas 13 Server dan Operasional ditambahkan. VPS dipakai bersama aplikasi lain.
- Galeri prototipe GitHub Pages tetap disajikan dari `docs/` di akar repo, salinan identik dari `Old/docs/`. Bila galeri diperbarui, ubah `docs/`, bukan `Old/docs/`.
- Protokol serah terima antaralat ditulis di `agen/serah-terima.md`. Berkas penunjuk untuk Antigravity dan Gemini (`GEMINI.md`, `.agent/rules/sahaja.md`) ditambahkan di akar repo dan di V2. Belum diuji dari Antigravity, Gemini, atau Codex.
- Cermin Google Drive: terakhir disalin 12 November 2026 (versi 2.2). Baris versi di 01, 09, 10, dan 11 berubah sesudahnya. Atas keputusan Pak Indra (12 November 2026), cermin tidak diperbarui dulu. Alat lain tidak perlu menyalin ke Drive kecuali diminta.

## Keadaan repo

- Repo GitHub: `bangjamz/Sahaja_Henky`, cabang utama `main`.
- PR yang digabung ke `main` per 12 November 2026: #1 (V2 dan pemindahan draft lama ke `Old/`), #2 (penyelarasan label versi). PR #3 (protokol serah terima) menunggu digabung. Untuk keadaan terbaru, periksa riwayat git.
- Cabang terbuka: `chore/protokol-serah-terima` (PR #3), dihapus setelah digabung.
- Galeri prototipe GitHub Pages disajikan dari `docs/` dan diperiksa tampil pada 12 November 2026.

## Sedang dikerjakan

Tidak ada.

## Menunggu keputusan

Lihat `Rencana Apps/12 Catatan Keputusan.md`. Yang menghambat mulai koding: D1 (instrumen di aplikasi), D2 (nama dan domain), D4 (akun Google Play), D10 (siapa fasilitator), D11 (perangkat siswa saat sesi). Tambahan: D16 (tujuan cadangan di luar VPS) sebelum M0-12.

Dua hal untuk dicek di luar repo:
- Berita acara seminar proposal: ada tidaknya catatan penguji tentang butir sensitif STD-KQ (butir 6 dan 13).
- Jadwal lapangan di "03 Rencana Penelitian Lapangan.md" belum dicocokkan ulang dengan tonggak M0 sampai M6 versi 2.1.

## Langkah berikutnya

1. Pak Indra meninjau dokumen 2.2 dan menetapkan keputusan yang menghambat.
2. M0-10: mulai urus akun Google Play organisasi (D-U-N-S), domain, dan email resmi. Prosesnya lama, jadi sebaiknya berjalan bersamaan dengan langkah lain.
3. M0-08: prototipe klik ponsel dan desktop dari prompt di dokumen 02.
4. M0-09: papan gaya, ikon aplikasi, lembar karakter maskot.
5. M0-02 sampai M0-07: penyiapan monorepo, token, komponen dasar, cangkang tata letak, backend Laravel di Docker lokal, pemeriksa aturan tulis.
6. M0-11 dan M0-12: Claude Code memeriksa isi VPS (hanya membaca) lalu menyiapkan staging, cadangan, dan pemantauan. Butuh akses SSH dari Pak Indra.

## Riwayat

| Tanggal | Oleh | Ringkasan |
|---|---|---|
| 21 Okt 2026 | Claude | Rencana Apps versi 2.0 (9 dokumen) |
| 24 Okt 2026 | Claude | Checkpoint App 1: telaah proposal untuk aplikasi, visi platform, modul AI opsional, UI gaya aplikasi kesehatan (diskusi) |
| 11 Nov 2026 | Claude | Rencana Apps versi 2.1, berkas alat pengembang AI, peran peninjau |
| 12 Nov 2026 | Claude | Cermin Rencana Apps 2.1 ke Google Drive |
| 12 Nov 2026 | Claude | Versi 2.2: backend Laravel dan PostgreSQL di VPS sendiri, berkas 13 |
| 12 Nov 2026 | Claude Code | Pasang `.claude/`, komit repo, PR #1 digabung ke `main`, galeri tetap di `docs/`, label versi 01, 09, 10, 11 diselaraskan ke 2.2 |
| 12 Nov 2026 | Claude Code | Protokol serah terima antaralat (`agen/serah-terima.md`), penunjuk untuk Antigravity dan Gemini, cermin Drive ditunda |

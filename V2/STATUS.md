# STATUS

Catatan serah terima antarsesi dan antaralat. Perbarui setiap akhir sesi kerja. Tulis fakta: apa yang selesai, apa yang belum diuji, apa yang menunggu keputusan.

## Keadaan saat ini

Diperbarui: 12 November 2026, oleh Claude (sesi perancangan bersama Pak Indra).

- Tahap: perancangan. Belum ada kode aplikasi.
- Dokumen `Rencana Apps` versi 2.1 selesai ditulis: 00, 01, 02, 03, 04, 06, 08 ditulis ulang; 09 sampai 12 baru; 07 ditambah bagian perubahan 2.0 ke 2.1; 05 tidak diubah.
- Berkas alat pengembang AI dibuat: `AGENTS.md`, `CLAUDE.md`, `agen/` (5 peran) dan `agen/claude-code/` (subagen dan perintah Claude Code).
- Subagen dan perintah Claude Code terpasang di `V2/.claude/` (12 November 2026): 5 subagen dan perintah `/mulai`, `/tinjau`, `/checkpoint`. Belum diuji dari sesi Claude Code yang dibuka di folder `V2`.
- 12 November 2026: backend diganti dari Supabase ke Laravel dan PostgreSQL dalam Docker Compose di VPS Hostinger KVM 4 milik Pak Indra (T10). Berkas 13 Server dan Operasional ditambahkan. VPS dipakai bersama aplikasi lain.
- Salinan `Rencana Apps` di Google Drive dicerminkan ke versi 2.2 (14 berkas). Bila dokumen di V2 berubah, cermin perlu disalin ulang.

## Sedang dikerjakan

Tidak ada.

## Menunggu keputusan

Lihat `Rencana Apps/12 Catatan Keputusan.md`. Yang menghambat mulai koding: D1 (instrumen di aplikasi), D2 (nama dan domain), D4 (akun Google Play), D10 (siapa fasilitator), D11 (perangkat siswa saat sesi). Tambahan: D16 (tujuan cadangan di luar VPS) sebelum M0-12.

Dua hal untuk dicek di luar repo:
- Berita acara seminar proposal: ada tidaknya catatan penguji tentang butir sensitif STD-KQ (butir 6 dan 13).
- Jadwal lapangan di "03 Rencana Penelitian Lapangan.md" belum dicocokkan ulang dengan tonggak M0 sampai M6 versi 2.1.

## Langkah berikutnya

1. Pak Indra meninjau dokumen 2.1 dan menetapkan keputusan yang menghambat.
2. M0-08: prototipe klik ponsel dan desktop dari prompt di dokumen 02.
3. M0-09: papan gaya, ikon aplikasi, lembar karakter maskot.
4. M0-02 sampai M0-07: penyiapan monorepo, token, komponen dasar, cangkang tata letak, backend Laravel di Docker lokal, pemeriksa aturan tulis.
5. M0-11 dan M0-12: Claude Code memeriksa isi VPS (hanya membaca) lalu menyiapkan staging, cadangan, dan pemantauan. Butuh akses SSH dari Pak Indra.

## Riwayat

| Tanggal | Oleh | Ringkasan |
|---|---|---|
| 21 Okt 2026 | Claude | Rencana Apps versi 2.0 (9 dokumen) |
| 24 Okt 2026 | Claude | Checkpoint App 1: telaah proposal untuk aplikasi, visi platform, modul AI opsional, UI gaya aplikasi kesehatan (diskusi) |
| 11 Nov 2026 | Claude | Rencana Apps versi 2.1, berkas alat pengembang AI, peran peninjau |
| 12 Nov 2026 | Claude | Cermin Rencana Apps 2.1 ke Google Drive |
| 12 Nov 2026 | Claude | Versi 2.2: backend Laravel dan PostgreSQL di VPS sendiri, berkas 13 |

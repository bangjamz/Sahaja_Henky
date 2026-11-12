# Rencana Apps SAHAJA (Disertasi dr. Henky)

Versi 2.2, 12 November 2026. Menggantikan versi 2.1 (11 November 2026); perubahannya hanya backend, yang kini Laravel dan PostgreSQL di VPS sendiri. Folder `Old` di repo dan "App Mentah (Lama)" di Google Drive hanya arsip.

Folder ini adalah sumber kebenaran produk. Salinan di Google Drive ("05 App Development/Rencana Apps") adalah cermin dan diperbarui dari sini.

## Lingkup

| Kode | Permukaan | Keterangan |
|---|---|---|
| S1 | SAHAJA | PWA siswa, diajukan ke Google Play |
| S2 | SAHAJA Pendamping | PWA fasilitator, guru BK, peneliti, validator, diajukan ke Google Play |
| S3 | Situs SAHAJA | Halaman Keluarga, kebijakan privasi, hapus akun, panduan instal |
| S4 | Asisten Pra-penyaringan | Worker AI lokal, opsional, mati secara default |

## Daftar dokumen

| File | Isi | Dibaca saat |
|---|---|---|
| 01 PRD.md | Kebutuhan produk, peta model ke fitur, peran, fitur P0 sampai P2, modul, event log, metrik | Selalu, sebelum mengerjakan fitur |
| 02 Desain UI dan Prompt.md | Prinsip, design tokens, tata letak ponsel, tablet, desktop, komponen khas, daftar layar, prompt desain | Mengerjakan tampilan |
| 03 Aset Visual dan Prompt Gambar.md | Cara kerja pembuatan gambar, daftar aset berkode, prompt, daftar periksa | Membuat ikon dan ilustrasi |
| 04 Arsitektur Teknis dan Skema Data.md | Arsitektur, tech stack (React, Laravel, PostgreSQL, Docker), struktur repo, skema basis data, aturan akses, alur kunci | Mengerjakan data dan backend |
| 05 Rencana Rilis Google Play.md | Ketentuan Play, TWA, isian App content, listing, langkah pengajuan | Menyiapkan rilis |
| 06 Peta Konten 8 Sesi.md | Siklus sesi, peta sesi, keterkaitan konten dengan variabel, format konten | Mengerjakan konten dan pemutar sesi |
| 07 Perbandingan dengan Draft Lama.md | Riwayat perubahan dari draft lama ke 2.0 dan dari 2.0 ke 2.1 | Butuh konteks sejarah |
| 08 Task dan Roadmap.md | Paket tugas bernomor per tonggak | Memilih pekerjaan |
| 09 Arsitektur Platform dan Aplikasi Lain.md | Templat program, peran dan jenjang, kelengkapan S2, S3, S4, cetak biru aplikasi baru | Mengerjakan selain S1 atau menambah aplikasi |
| 10 Konvensi Pengembangan dan Definisi Selesai.md | Alur kerja, konvensi kode, pengujian, aturan tulis, definisi selesai, hal yang wajib ditanyakan | Selalu |
| 11 Glosarium dan Kamus Teks.md | Istilah baku, nama fitur, padanan nama di kode, kamus teks inti | Menulis teks apa pun |
| 12 Catatan Keputusan.md | Keputusan D1 sampai D16 dan T1 sampai T12 beserta statusnya | Selalu |
| 13 Server dan Operasional.md | Aturan VPS bersama, pembagian kerja, penyiapan, deploy, cadangan, pemantauan, penanganan masalah | Menyentuh server |

Berkas di luar folder ini: `AGENTS.md` dan `CLAUDE.md` (aturan untuk alat pengembang AI), `STATUS.md` (catatan serah terima), `agen/` (peran peninjau).

## Urutan baca untuk orang baru atau alat pengembang AI

1. `AGENTS.md`
2. `STATUS.md`
3. 12 Catatan Keputusan
4. 01 PRD
5. Dokumen lain sesuai tugas

## Keterkaitan dengan folder Bab IV

- Butir instrumen di aplikasi sama dengan Lampiran L05.
- Ekspor data mengikuti "06 Codebook Data Penelitian.md".
- Garis besar sesi mengikuti Lampiran L17.
- Protokol eskalasi mengikuti Lampiran L15.
- Lembar observasi dan logbook mengikuti L13 dan L14.

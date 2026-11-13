# Catatan Keputusan

Versi 2.2, 12 November 2026. Satu tempat untuk semua keputusan produk, penelitian, dan teknis. Alat pengembang AI membaca dokumen ini sebelum bekerja dan tidak boleh mengubah status keputusan. Hanya Pak Indra (bersama dr. Henky dan promotor bila menyangkut penelitian) yang menetapkan.

Status: **Terbuka** (belum diputuskan; rekomendasi dipakai sebagai asumsi kerja yang mudah dibalik), **Ditetapkan**, **Diganti**.

## 1. Keputusan produk dan penelitian

| No | Keputusan | Rekomendasi (asumsi kerja) | Diputuskan oleh | Status |
|---|---|---|---|---|
| D1 | Instrumen di aplikasi atau Google Form (proposal menyebut Google Form) | Di aplikasi, isi sama dengan L05; kelompok kontrol memakai mode kuesioner di aplikasi yang sama agar cara ukur setara. Perlu penyesuaian teks Bab III | dr. Henky, promotor | Terbuka |
| D2 | Nama aplikasi, ikon, domain | "SAHAJA" dengan ikon netral tanpa simbol medis | Pak Indra, dr. Henky | Terbuka |
| D3 | Distribusi saat penelitian | Tautan PWA dan/atau pengujian tertutup Play; rilis publik setelah penelitian | Pak Indra | Terbuka |
| D4 | Akun Google Play | Akun organisasi (misalnya Awatara Institute); urus D-U-N-S sejak sekarang | Pak Indra | Terbuka |
| D5 | Materi dan butir sensitif (STD-KQ butir 6 dan 13, sikap butir 9) | Diputuskan lewat validasi ahli, sekolah, dan promotor; aplikasi mengikuti | Promotor, ahli materi | Terbuka |
| D6 | Waitlist kelompok kontrol | Ya, konten dibuka setelah posttest | dr. Henky, promotor | Terbuka |
| D7 | Perlindungan data anak | Persetujuan orang tua tertulis, assent digital, identitas terpisah dan terenkripsi, server di VPS sendiri (lokasi datacenter dicatat), disebut di dokumen etik dan kebijakan privasi | dr. Henky, komisi etik | Terbuka |
| D8 | Skrining depresi dan kecemasan | Opsi A: tanpa skrining formal; hanya Cek Perasaan, Atur Napas, dan eskalasi. Opsi B (PHQ-A, GAD-7 dengan kewajiban rujukan) hanya dengan persetujuan promotor dan etik | Promotor, komisi etik | Terbuka |
| D9 | Modul AI pra-penyaringan saat penelitian | Mati. Bila diaktifkan: model lokal, hanya label antrean, disebut di dokumen etik | Promotor, komisi etik | Terbuka |
| D10 | Siapa fasilitator: guru/konselor sekolah atau tim terpisah (proposal menyebut keduanya) | Peran fasilitator dan konselor dipisah di sistem; satu orang boleh memegang keduanya | dr. Henky | Terbuka |
| D11 | Perangkat siswa saat sesi | Izin tertulis sekolah untuk HP saat sesi, atau lab komputer; S1 mendukung keduanya | dr. Henky, sekolah | Terbuka |
| D12 | Bentuk jalur keluarga | Halaman Keluarga tanpa akun, dibuka lewat QR di kartu cetak dan tautan dari langkah Bawa Pulang | dr. Henky, promotor | Terbuka |
| D13 | Penyelarasan 3 fase (Gambar 3.3) dan 4 fase (Gambar 3.4) di naskah | Aplikasi mengikuti 4 fase; naskah diselaraskan saat revisi Bab III | dr. Henky, promotor | Terbuka |
| D14 | Avatar manusia atau bukan manusia | Bukan manusia (flora, fauna, benda) | Pak Indra | Terbuka |
| D15 | Kotak Tanya anonim | Diputuskan setelah uji coba | dr. Henky | Terbuka |
| D16 | Tujuan cadangan di luar VPS | Penyimpanan objek kompatibel S3 atau Google Drive institusi, hanya menerima berkas terenkripsi | Pak Indra | Terbuka |

Keputusan Bab IV (K1 sampai K9) dicatat di folder perencanaan Bab IV. Yang berpengaruh ke aplikasi: K2 (skala sikap), K5 (jumlah sampel), K6 (minggu posttest), K9 (waitlist).

## 2. Keputusan teknis

| No | Keputusan | Alasan | Status |
|---|---|---|---|
| T1 | PWA yang dipaketkan TWA, bukan Flutter native | Kesepakatan lingkup "2 aplikasi PWA beserta pengajuan ke Play Store"; satu basis kode untuk ponsel dan desktop | Ditetapkan (21 Okt 2026) |
| T2 | Supabase sebagai backend | RLS, Auth, Realtime, dan Edge Functions dalam satu layanan | Diganti oleh T10 (12 Nov 2026) |
| T3 | Monorepo pnpm dengan paket bersama | Konsistensi S1, S2, S3 | Asumsi kerja |
| T4 | Frontend: React, TypeScript, Vite, Tailwind, TanStack Query, Zustand, Dexie, Zod | Ringan dan dikenal baik oleh alat pengembang AI | Asumsi kerja; versi dikunci saat M0-02 |
| T5 | Tiga kelas lebar: di bawah 600, 600 sampai 1023, 1024 ke atas | Ponsel, tablet, desktop dengan navigasi berbeda | Asumsi kerja |
| T6 | Peran bercakupan lewat `role_assignments`, diperiksa dengan Policy Laravel dan uji akses | Satu orang banyak peran; siap untuk platform | Asumsi kerja |
| T7 | Server (Laravel) penentu aturan penelitian; versi TypeScript di `packages/domain` untuk tampilan offline; kasus uji JSON bersama | Satu hasil walaupun aturan ditulis di dua bahasa | Asumsi kerja |
| T8 | Tanpa analitik dan SDK pihak ketiga | Perlindungan data anak dan kebijakan Play | Ditetapkan |
| T9 | Dokumen `Rencana Apps` di folder V2 menjadi sumber kebenaran; salinan di Google Drive adalah cermin | Menghindari dua versi | Asumsi kerja |
| T10 | Backend Laravel dan PostgreSQL dalam Docker Compose di VPS Hostinger KVM 4 milik Pak Indra; realtime dengan Laravel Reverb; antrean Redis | VPS sudah tersedia sehingga tanpa biaya langganan; data di server sendiri; bisa dikerjakan Claude Code lewat SSH; Docker memisahkan SAHAJA dari aplikasi lain di VPS | Ditetapkan oleh Pak Indra (12 Nov 2026) |
| T11 | Situs S3 dilayani Laravel (Blade), bukan alat situs terpisah | Mengurangi jumlah alat dan proses deploy | Asumsi kerja |
| T12 | Kontrak API dibuat otomatis (OpenAPI dari Laravel, tipe TypeScript dari OpenAPI) | Frontend dan backend tidak menyimpang | Asumsi kerja |

## 3. Format catatan baru

Keputusan baru ditambahkan sebagai baris tabel. Bila perlu penjelasan panjang, tambahkan bagian di bawah dengan format berikut.

```
### T10. Judul keputusan (tanggal)
Konteks: masalah yang dihadapi.
Pilihan: yang dipertimbangkan.
Keputusan: yang dipilih dan oleh siapa.
Akibat: yang berubah di dokumen atau kode.
```

Keputusan yang diganti tidak dihapus. Statusnya diubah menjadi "Diganti oleh ..." supaya riwayatnya terbaca.

### T10. Backend pindah dari Supabase ke Laravel di VPS sendiri (12 November 2026)
Konteks: Supabase gratis menjeda proyek yang sepi dan kapasitasnya terbatas, sehingga masa penelitian perlu paket berbayar. Pak Indra sudah memiliki VPS Hostinger KVM 4.
Pilihan: Supabase berbayar; Supabase dihos sendiri (terlalu banyak kontainer); Laravel dan PostgreSQL di VPS sendiri.
Keputusan: Laravel dan PostgreSQL dalam Docker Compose di VPS milik Pak Indra, ditetapkan Pak Indra.
Akibat: RLS diganti Policy Laravel dengan uji akses wajib; Auth memakai Sanctum dan Fortify; realtime memakai Reverb; cadangan, pemantauan, dan perawatan server menjadi tanggung jawab proyek (file 13); VPS dipakai bersama aplikasi lain sehingga SAHAJA wajib terisolasi dan tidak boleh menyentuh milik aplikasi lain. Dokumen 01, 04, 08, 09, 10, 11, AGENTS.md, dan peran peninjau disesuaikan.

### Versi pustaka dan citra yang dikunci saat M0-02 (13 November 2026)
Dokumen 04 bagian 2 meminta versi dikunci saat M0-02 dan dicatat di sini. Daftar ini adalah catatan versi, bukan keputusan baru. Menaikkan versi mayor atau menambah pustaka tetap memerlukan catatan keputusan baru.

| Bagian | Pustaka atau citra | Versi |
|---|---|---|
| Monorepo | pnpm, Turborepo, Node | 10.10.0, 2.11.11, 22 ke atas |
| Bahasa | TypeScript | 5.9.3 |
| Frontend | React, React DOM, React Router | 19.3.1, 19.3.1, 8.5.1 |
| Frontend | Vite, @vitejs/plugin-react | 8.3.8, 6.3.0 |
| Frontend | Tailwind CSS, @tailwindcss/vite | 4.3.5 |
| Frontend | Radix Dialog, Lucide | 1.3.1, 1.72.0 |
| Frontend | Fon Plus Jakarta Sans (paket @fontsource-variable, dihos sendiri) | 5.3.0 |
| Mutu | ESLint, typescript-eslint, jsx-a11y, react-hooks, Prettier | 9.39.5, 8.72.2, 6.10.2, 7.1.1, 3.10.1 |
| Uji frontend | Vitest, Testing Library, jsdom | 5.1.0, 16.3.3, 31.0.0 |
| Uji alur | Playwright, @axe-core/playwright | 1.65.0, 4.14.0 |
| Kontrak API | openapi-typescript | 7.13.0 |
| Backend | PHP, Laravel | 8.4, 13.42.0 |
| Backend | Sanctum, Scramble | 4.4.0, 0.13.53 |
| Mutu backend | Pint, Larastan (PHPStan) | 1.32.3, 3.15.0 (2.3.5) |
| Uji backend | Pest, pest-plugin-laravel | 4.7.8, 4.1.0 |
| Citra Docker | php-fpm, composer, nginx, postgres, redis | 8.4-fpm-alpine, 2.8, 1.29-alpine, 17-alpine, 7-alpine |

Alasan memilih versi yang bukan terbaru:
- TypeScript 5.9, bukan 7.0: openapi-typescript dan typescript-eslint belum mendukung TypeScript 7.
- ESLint 9, bukan 10: eslint-plugin-jsx-a11y belum mendukung ESLint 10.
- PHP 8.4: lock file Composer membutuhkan PHP 8.4 (Symfony Console terbaru), di atas syarat minimal Laravel 13.

Pustaka di dokumen 04 yang belum dipasang karena belum dipakai: TanStack Query, Zustand, Dexie, Zod, vite-plugin-pwa, Laravel Echo, Fortify, Reverb, Pulse, dompdf, webpush. Masing-masing dipasang pada paket tugas yang memakainya.

# STATUS

Catatan serah terima antarsesi dan antaralat, dan satu-satunya catatan status yang mengikat. Cara membuka dan menutup sesi ada di `agen/serah-terima.md`. Perbarui setiap akhir sesi kerja. Tulis fakta: apa yang selesai, apa yang belum diuji, apa yang menunggu keputusan.

## Keadaan saat ini

Diperbarui: 13 November 2026, oleh Claude Code (Claude Opus 5.5), sesi bersama Pak Indra.

- Tahap: fondasi kode (tonggak M0). Paket M0-02 sampai M0-07 dikerjakan di cabang `fitur/m0-fondasi` dan menunggu digabung.
- M0-02 monorepo: pnpm workspace, Turborepo, TypeScript strict, ESLint, Prettier, perintah `pnpm cek`. Berkas CI GitHub Actions `.github/workflows/cek.yml` sudah ditulis di folder kerja tetapi belum dikomit, karena token `gh` di Mac tidak punya izin `workflow` sehingga GitHub menolak push berkas itu. CI belum pernah berjalan.
- M0-03 `packages/tokens`: token dokumen 02 sebagai satu sumber, dibuat otomatis menjadi CSS Tailwind dan CSS untuk Blade. Uji kontras warna lulus.
- M0-04 `packages/ui`: Tombol, Kartu, Isian, Chip, Dialog dan lembar bawah, Label Status, Keadaan Layar, Pita Offline, tata letak Imersif. Katalog komponen di `/katalog` aplikasi siswa (hanya mode pengembangan).
- M0-05 cangkang S1 dan S2: bilah bawah di bawah 600 px, rel 600 sampai 1023 px, sidebar yang bisa diciutkan 1024 px ke atas, panel konteks 1280 px ke atas. Halaman fitur masih berupa halaman sementara "sedang disiapkan".
- M0-06 backend Laravel 13: migrasi awal (platform, program, sekolah, kohort, kelas, peran bercakupan, siswa, kode aktivasi, perangkat, log audit, skema `rahasia`), Sanctum untuk staf dan siswa, layanan `Akses::punya`, Policy, dua endpoint contoh (`GET /api/siswa/saya`, `GET /api/kelas/{kelas}`) dengan uji akses, OpenAPI otomatis (Scramble) dan tipe TypeScript di `packages/api`. Berkas Docker Compose ditulis tetapi belum pernah dijalankan karena Docker belum terpasang di Mac.
- M0-07 `tools/cek-teks`: menolak ampersand, em dash, dan garis pemisah horizontal di kamus teks, dokumen, konten, dan Blade.
- Hasil pemeriksaan 13 November 2026 di Mac: `pnpm cek` hijau (17 tugas frontend, cek-teks 70 berkas, Pint, Larastan level 6, Pest 30 uji). `pnpm uji:alur` hijau (21 uji Playwright di 360, 768, 1024, 1440 px, termasuk axe, papan ketik, dan offline). Uji backend memakai PostgreSQL 15 lokal sementara; CI memakai PostgreSQL 17.
- Belum diuji: `pnpm infra:up` dan citra Docker; pemisahan hak pengguna PostgreSQL untuk skema `rahasia` (di uji, koneksi rahasia memakai sesi yang sama); tampilan saat huruf diperbesar 200%; perangkat Android nyata.
- Dokumen `Rencana Apps` versi 2.2 (14 berkas, 00 sampai 13). Versi 2.1 menulis ulang 00, 01, 02, 03, 04, 06, 08, menambah 09 sampai 12, dan memperbarui 07; 05 tidak diubah. Versi 2.2 hanya mengganti backend dan menambah 13. Berkas 02, 03, 06 masih berlabel 2.1 karena isinya tidak tersentuh perubahan backend.
- Berkas alat pengembang AI dibuat: `AGENTS.md`, `CLAUDE.md`, `agen/` (5 peran) dan `agen/claude-code/` (subagen dan perintah Claude Code).
- Subagen dan perintah Claude Code terpasang di `V2/.claude/` (12 November 2026): 5 subagen dan perintah `/mulai`, `/tinjau`, `/checkpoint`. Belum diuji dari sesi Claude Code yang dibuka di folder `V2`.
- 12 November 2026: backend diganti dari Supabase ke Laravel dan PostgreSQL dalam Docker Compose di VPS Hostinger KVM 4 milik Pak Indra (T10). Berkas 13 Server dan Operasional ditambahkan. VPS dipakai bersama aplikasi lain.
- Galeri prototipe GitHub Pages tetap disajikan dari `docs/` di akar repo, salinan identik dari `Old/docs/`. Bila galeri diperbarui, ubah `docs/`, bukan `Old/docs/`.
- Protokol serah terima antaralat ditulis di `agen/serah-terima.md`. Berkas penunjuk untuk Antigravity dan Gemini (`GEMINI.md`, `.agent/rules/sahaja.md`) ditambahkan di akar repo dan di V2. Belum diuji dari Antigravity, Gemini, atau Codex.
- Cermin Google Drive: terakhir disalin 12 November 2026 (versi 2.2). Baris versi di 01, 09, 10, dan 11 berubah sesudahnya. Atas keputusan Pak Indra (12 November 2026), cermin tidak diperbarui dulu. Alat lain tidak perlu menyalin ke Drive kecuali diminta.

## Keadaan repo

- Repo GitHub: `bangjamz/Sahaja_Henky`, cabang utama `main`.
- PR yang digabung ke `main` per 12 November 2026: #1 (V2 dan pemindahan draft lama ke `Old/`), #2 (penyelarasan label versi), #3 (protokol serah terima). Untuk keadaan terbaru, periksa riwayat git.
- Cabang terbuka: `fitur/m0-fondasi` (M0-02 sampai M0-07), PR #4 menunggu tinjauan Pak Indra. Paket digabung dalam satu cabang dengan satu komit per paket, menyimpang dari aturan satu tugas satu cabang di dokumen 10 bagian 1 supaya fondasi bisa ditinjau sekaligus.
- Galeri prototipe GitHub Pages disajikan dari `docs/` dan diperiksa tampil pada 12 November 2026.

## Sedang dikerjakan

Tidak ada.

## Menunggu keputusan

Lihat `Rencana Apps/12 Catatan Keputusan.md`. Yang menghambat mulai koding: D1 (instrumen di aplikasi), D2 (nama dan domain), D4 (akun Google Play), D10 (siapa fasilitator), D11 (perangkat siswa saat sesi). Tambahan: D16 (tujuan cadangan di luar VPS) sebelum M0-12.

Usulan dari pekerjaan M0 (13 November 2026):
- **Fon**: Plus Jakarta Sans dipasang lewat paket npm `@fontsource-variable/plus-jakarta-sans`, lalu dihos sendiri dengan subset Latin saja. Paket ini tidak disebut di dokumen 04. Mohon konfirmasi, atau tentukan cara lain menyediakan berkas fon.
- **Lengan kohort ke siswa**: `GET /api/siswa/saya` mengembalikan lengan kohort (`arm`) karena layar A-35 mode kontrol membutuhkannya. Siswa tidak melihat kata "kontrol" di antarmuka. Perlu dipastikan bersama dr. Henky bahwa ini tidak mengganggu desain penelitian.
- **Aksi CI pihak ketiga**: CI memakai `shivammathur/setup-php` dan `pnpm/action-setup` untuk menyiapkan PHP 8.4 dan pnpm di GitHub Actions. Keduanya hanya berjalan di CI, tidak di aplikasi.
- **Docker di Mac**: perlu Docker Desktop atau OrbStack supaya hasil M0-06 "`docker compose up` jalan di Mac" bisa dibuktikan.
- **Berkas duplikat**: ada sekitar 145 berkas bernama "... 2.md" atau "... 2.png" yang tidak terlacak git (misalnya `V2/AGENTS 2.md`, `Old/App/... 2.md`). Isinya salinan lama dari 11 November, kemungkinan dibuat sinkronisasi iCloud atau Drive. Tidak dikomit dan tidak dihapus; menunggu keputusan Pak Indra.

Dua hal untuk dicek di luar repo:
- Berita acara seminar proposal: ada tidaknya catatan penguji tentang butir sensitif STD-KQ (butir 6 dan 13).
- Jadwal lapangan di "03 Rencana Penelitian Lapangan.md" belum dicocokkan ulang dengan tonggak M0 sampai M6 versi 2.1.

## Langkah berikutnya

1. Pak Indra meninjau dan menggabungkan PR fondasi M0.
2. Pak Indra menjalankan `gh auth refresh -s workflow` di Terminal (login ulang di browser), lalu berkas `.github/workflows/cek.yml` dikomit lewat PR terpisah dan hasil CI pertama diperiksa.
3. Pasang Docker Desktop atau OrbStack, salin `infra/.env.example` menjadi `infra/.env`, jalankan `pnpm infra:up`, dan catat hasilnya (bukti M0-06).
4. Pak Indra menetapkan keputusan yang menghambat (D1, D2, D4, D10, D11). M1-01 (aktivasi) dan M1-04 (instrumen) menunggu D1 dan isi L05.
5. Paket M1 yang tidak terhambat keputusan: M1-02 (service worker, bisa dipasang), M1-03 (antrean sinkron), M1-05 (masuk staf dengan Fortify, penyaringan menu S2 menurut peran), M1-07 (skema konten dengan satu sesi [CONTOH]).
6. M0-10: mulai urus akun Google Play organisasi (D-U-N-S), domain, dan email resmi. Prosesnya lama, jadi sebaiknya berjalan bersamaan dengan langkah lain.
7. M0-08: prototipe klik ponsel dan desktop dari prompt di dokumen 02.
8. M0-09: papan gaya, ikon aplikasi, lembar karakter maskot.
9. M0-11 dan M0-12: Claude Code memeriksa isi VPS (hanya membaca) lalu menyiapkan staging, cadangan, dan pemantauan. Butuh akses SSH dari Pak Indra.

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
| 13 Nov 2026 | Claude Code | M0-02 sampai M0-07 di cabang `fitur/m0-fondasi`: monorepo, token, komponen dasar, cangkang S1 dan S2, backend Laravel dengan uji akses, pemeriksa aturan tulis; berkas CI belum dikomit (izin workflow); `pnpm cek` dan `pnpm uji:alur` hijau di Mac, Docker belum diuji |

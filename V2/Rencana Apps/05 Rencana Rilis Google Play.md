# Rencana Rilis Google Play (2 Aplikasi PWA)

Kedua PWA dipaketkan sebagai Trusted Web Activity (TWA). Ketentuan Google Play sering berubah; poin bertanda "cek ulang" wajib dicocokkan dengan Play Console saat pengajuan.

## 1. Ketentuan yang sudah dicek (per 21 Oktober 2026)

- **Target API level.** Mulai 31 Agustus 2026, aplikasi baru dan pembaruan aplikasi wajib menargetkan Android 16 (API level 36) atau lebih tinggi, dengan opsi perpanjangan sampai 1 November 2026 lewat formulir di Play Console. Jadi paket TWA harus dibangun dengan `targetSdkVersion` 36 atau lebih (cek ulang menjelang pengajuan, karena syarat naik setiap tahun).
- **Akun developer pribadi** yang dibuat setelah 13 November 2023 wajib menjalankan pengujian tertutup dengan minimal 12 penguji yang ikut terus-menerus selama 14 hari sebelum boleh mengajukan akses produksi. Ketentuan ini disebut untuk akun pribadi; untuk akun organisasi, cek di dasbor Play Console.

Rekomendasi: gunakan **akun organisasi** (misalnya atas nama Awatara Institute atau institusi lain yang disepakati). Akun organisasi memerlukan nomor D-U-N-S dan verifikasi identitas organisasi, jadi mulai urus sejak awal. Jika memakai akun pribadi, uji coba terbatas (30 siswa) dan validator dapat sekaligus menjadi penguji tertutup selama 14 hari, asalkan mereka memiliki akun Google dan persetujuan sudah sesuai etik (siswa di bawah umur biasanya tidak memakai akun Google pribadi, jadi penguji sebaiknya guru, validator, dan tim).

## 2. Strategi distribusi

| Periode | Aplikasi siswa | Aplikasi pendamping |
|---|---|---|
| Validasi ahli dan uji coba | Tautan PWA (staging) | Tautan PWA (staging) |
| Implementasi penelitian | Tautan PWA produksi (pasang ke layar utama) dan/atau Play pengujian internal atau tertutup | Tautan PWA, opsional Play pengujian internal |
| Setelah penelitian | Rilis publik Play Store | Rilis publik atau tetap tertutup (hanya guru) |

Alasan: rilis publik sebelum produk divalidasi dan sebelum data penelitian selesai berisiko mengontaminasi kelompok kontrol dan memicu peninjauan kebijakan saat penelitian berjalan.

## 3. Persiapan teknis TWA

1. Domain HTTPS untuk tiap aplikasi.
2. `manifest.webmanifest` lengkap: name, short_name, start_url, scope, display standalone, theme_color, background_color, ikon 192 dan 512 (termasuk maskable).
3. Service worker yang memenuhi syarat installable PWA dan halaman offline.
4. Bubblewrap: `bubblewrap init --manifest https://[domain]/manifest.webmanifest`, set package name (misalnya `id.sahaja.siswa` dan `id.sahaja.pendamping`), targetSdk sesuai syarat, aktifkan delegasi notifikasi.
5. Buat keystore unggahan dan aktifkan Play App Signing. Simpan keystore dan kata sandi di dua tempat aman.
6. Pasang `/.well-known/assetlinks.json` di domain dengan SHA-256 sertifikat penandatanganan **dari Play App Signing** (bukan hanya keystore lokal), agar TWA tampil tanpa bilah alamat.
7. Bangun AAB, uji di perangkat nyata: tidak ada bilah alamat, notifikasi berfungsi (Android 13 ke atas meminta izin notifikasi), mode offline berjalan.

## 4. Isian Play Console (App content)

| Bagian | Isi yang disiapkan |
|---|---|
| Kebijakan privasi | URL publik; isi: data yang dikumpulkan, tujuan penelitian, persetujuan orang tua, penyimpanan, penghapusan, kontak |
| Akses aplikasi | Aplikasi butuh kode aktivasi: sediakan **kode demo** dan petunjuk untuk peninjau Google |
| Iklan | Tidak berisi iklan |
| Rating konten (kuesioner IARC) | Jawab jujur; konten edukasi kesehatan, tanpa konten seksual eksplisit |
| Target audiens dan konten | Pilih kelompok usia yang benar (13 sampai 15 untuk aplikasi siswa; 18+ untuk aplikasi pendamping). Jika audiens termasuk anak menurut kebijakan Play, penuhi kebijakan Families: tanpa iklan, tanpa SDK yang tidak disetujui, data minimal (cek ulang) |
| Keamanan data (Data safety) | Data yang dikumpulkan: identitas penelitian (kode), jawaban kuesioner, aktivitas aplikasi, tulisan forum; dienkripsi saat transit; pengguna dapat meminta penghapusan |
| Penghapusan akun | Tautan web untuk meminta hapus akun dan data, serta jalur di dalam aplikasi |
| Aplikasi kesehatan | Isi deklarasi fitur kesehatan bila diminta (cek ulang formulir terbaru) |
| Kategori | Pendidikan (siswa), Pendidikan atau Produktivitas (pendamping) |

Catatan kebijakan konten: materi pendidikan seksual dan kesehatan reproduksi diperbolehkan selama bersifat edukatif dan tidak eksplisit. Tuliskan konteks penelitian dan sasaran usia di catatan untuk peninjau, dan pastikan tidak ada gambar atau teks vulgar.

## 5. Listing toko

| Item | Aplikasi siswa | Aplikasi pendamping |
|---|---|---|
| Nama | SAHAJA (nama final menunggu D2) | SAHAJA Pendamping |
| Deskripsi singkat (maks 80 karakter) | Belajar menjaga diri dan kesehatan remaja, aman dan seru | Pantau dan dampingi program edukasi kesehatan remaja di sekolah |
| Deskripsi panjang | Tujuan, 8 sesi, fitur, privasi, untuk sekolah peserta program | Fitur guru dan peneliti, privasi siswa |
| Grafis | GP-01 sampai GP-03 (file 03) | GP-01 sampai GP-03 versi biru |
| Kontak | Email resmi tim | Email resmi tim |

## 6. Langkah pengajuan

1. Buat akun developer (organisasi) dan selesaikan verifikasi.
2. Buat dua aplikasi di Play Console.
3. Lengkapi App content (bagian 4) dan listing (bagian 5).
4. Unggah AAB ke **pengujian internal**, uji di perangkat tim.
5. Naikkan ke **pengujian tertutup** (dan penuhi syarat 12 penguji 14 hari bila akun pribadi).
6. Ajukan **produksi** setelah penelitian (atau saat disepakati), dengan rollout bertahap.
7. Simpan bukti setiap langkah (tangkapan layar status) untuk laporan luaran.

## 7. Risiko penolakan dan antisipasi

| Risiko | Antisipasi |
|---|---|
| Peninjau tidak bisa masuk karena kode aktivasi | Sediakan akun demo yang tidak terhubung ke data siswa |
| Dianggap konten seksual | Tidak ada gambar eksplisit; deskripsi menegaskan konteks pendidikan kesehatan sekolah |
| Masalah kebijakan data anak | Data minimal, tanpa SDK pihak ketiga, persetujuan orang tua, kebijakan privasi jelas |
| TWA menampilkan bilah alamat | Periksa assetlinks.json memakai sidik jari Play App Signing |
| Target API kurang | Perbarui Bubblewrap dan targetSdk sebelum setiap rilis |

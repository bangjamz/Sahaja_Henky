# Arsitektur Platform dan Aplikasi Lain

Versi 2.2, 12 November 2026: bagian backend disesuaikan dengan keputusan T10, isi lain tetap versi 2.1 (11 November 2026). Dokumen ini menjawab dua kebutuhan: (1) apa saja yang harus lengkap supaya S2, S3, dan S4 bisa dikembangkan dengan mutu yang sama dengan S1; dan (2) bagaimana model disertasi dr. Henky disiapkan menjadi platform untuk sekolah, jenjang, dan topik lain tanpa mengganggu penelitian.

## 1. Yang digeneralisasi adalah modelnya

SAHAJA tidak digeneralisasi sebagai "aplikasi IMS". Yang dipakai ulang adalah model intervensinya:

- empat fase (persiapan, edukasi dan penguatan personal, puncak kolaborasi, terminasi dan kemandirian);
- delapan sesi mingguan dengan siklus enam langkah;
- pola aktivitas CBT;
- Mode Kelas dengan fasilitator;
- tiga pihak: siswa, fasilitator dan guru, keluarga;
- pengukuran sebelum dan sesudah.

Model ini menjadi **templat program**. Program dr. Henky (`ims-smp`) adalah isian pertama templat itu.

## 2. Struktur platform

```
Organisasi (dinas, yayasan, lembaga riset)
  Program (templat model + konten + instrumen + saklar modul)
    Versi program (konten yang sudah disetujui)
    Kohort (satu putaran program di satu sekolah, dengan lengan penelitian)
      Kelas
        Siswa
```

| Tingkat | Peran | Cakupan |
|---|---|---|
| 0 | Super admin | Platform |
| 1 | Admin program, peneliti | Organisasi atau program |
| 2 | Admin sekolah, admin Puskesmas | Sekolah |
| 3 | Fasilitator, guru BK/konselor | Kelas atau sekolah |
| 4 | Siswa | Diri sendiri |
| Lateral | Peneliti dengan akses identitas, penulis konten, peninjau konten, validator, konselor rujukan | Program |

Peran disimpan di `role_assignments` dengan cakupan, bukan di kolom tunggal. Dengan begitu satu guru bisa menjadi fasilitator di kelas 8A dan konselor di seluruh sekolah.

### Jenjang

| Jenjang | Penyesuaian yang diperlukan | Status |
|---|---|---|
| SMP | Program `ims-smp` | Versi 1.0 |
| SD kelas atas | Konten berbeda (mengenal tubuh, menjaga diri), tanpa forum, peran orang tua lebih besar | Setelah disertasi |
| SMA/SMK | Konten lebih lengkap, forum lebih terbuka, kemungkinan skrining dengan rujukan | Setelah disertasi |

Jenjang adalah atribut program. Antarmuka menyesuaikan lewat saklar modul dan kamus teks per program, bukan lewat cabang kode per jenjang.

## 3. Batas yang menjaga penelitian

- Selama penelitian berjalan, hanya program `ims-smp` yang aktif di lingkungan produksi.
- Semua perubahan untuk kebutuhan platform harus bisa dimatikan lewat saklar dan tidak boleh mengubah perilaku kohort penelitian.
- Tabel `organizations`, `programs`, dan `role_assignments` dibuat sejak awal supaya tidak ada migrasi besar di tengah penelitian. Antarmuka pengelolaannya boleh menyusul.

## 4. Inti bersama

Setiap aplikasi baru berdiri di atas paket yang sama. Aplikasi tidak boleh membuat versi sendiri dari hal-hal berikut.

| Paket | Isi | Dipakai oleh |
|---|---|---|
| `tokens` | Warna, tipografi, jarak, gerak | S1, S2, S3 |
| `ui` | Komponen dan cangkang tata letak responsif | S1, S2, S3 |
| `domain` | Aturan penelitian versi TypeScript dan kasus uji JSON bersama | S1, S2; kasus ujinya juga dipakai Laravel |
| `content` | Skema dan konten program | S1, S2, S3 |
| `api` | Klien API dan tipe hasil OpenAPI dari Laravel | S1, S2 |
| `backend/` | Laravel: API, otorisasi, Blade S3, job, skoring | Semua |
| `moderasi` | Normalisasi teks dan daftar pola (JSON dibaca klien dan Laravel) | S1, backend, S4 |
| `config` | Konfigurasi alat pengembang | Semua |

## 5. Kelengkapan per aplikasi

### 5.1 S2 SAHAJA Pendamping

| Kelompok | Kelengkapan |
|---|---|
| Produk | Fitur B1 sampai B5 di PRD; daftar layar B-01 sampai B-22 di file 02 |
| Akses | Masuk email atau magic link, peran bercakupan, pemilih cakupan, sesi kedaluwarsa |
| Sesi | Panduan sesi dari konten yang sama dengan S1, kendali Sesi Kelas, Layar Kelas |
| Keamanan siswa | Antrean moderasi, eskalasi tiga tingkat, permintaan bicara, formulir insiden |
| Penelitian | Kelengkapan data, ekspor sesuai codebook, audit log, kunci versi instrumen |
| Kelola | Sekolah, kohort, kelas, siswa, kode, konten, kata kunci, pengguna, modul |
| Dokumen | Panduan fasilitator, materi pelatihan, lembar L13 dan L14 dalam bentuk formulir |
| Play | Ikon ID-05, listing, akun demo fasilitator, deklarasi audiens dewasa |

### 5.2 S3 Situs SAHAJA

| Kelompok | Kelengkapan |
|---|---|
| Halaman | Depan, Halaman Keluarga (8 kartu), kebijakan privasi, syarat penggunaan, hapus akun dan data, panduan instal, kontak |
| Teknis | Halaman Blade dari Laravel, tanpa JavaScript berat, tanpa cookie, tanpa pelacak, noindex untuk kartu keluarga, token kohort |
| Aset | ST-01, KL-01 sampai KL-09, gambar pratinjau tautan |
| Hukum | Teks kebijakan ditinjau sesuai UU PDP dan dokumen etik |

### 5.3 S4 Asisten Pra-penyaringan (opsional)

| Kelompok | Kelengkapan |
|---|---|
| Prasyarat | Keputusan D9, persetujuan promotor dan komisi etik, disebut di dokumen etik |
| Teknis | Model terbuka lewat Ollama di komputer peneliti, menarik `ai_jobs`, hanya teks bernama samaran |
| Batas | Hanya memberi label pada antrean; tidak memutuskan, tidak berbicara dengan siswa, tidak menilai instrumen |
| Operasi | Bisa dinyalakan dan dimatikan kapan saja; saat mati, moderasi tetap berjalan |
| Evaluasi | Diuji pada data sintetis dan uji coba 30 siswa; dicatat ketepatan labelnya dibanding keputusan guru |

Sebagian layanan AI komersial membatasi pemakaian untuk pengguna di bawah 18 tahun, dan versi gratisnya dapat memakai data untuk pelatihan. Ketentuan layanan harus dicek ulang sebelum memilih layanan apa pun selain model lokal.

## 6. Cetak biru aplikasi baru

Daftar ini dipakai setiap kali menambah permukaan baru (misalnya aplikasi Puskesmas atau dasbor dinas). Aplikasi dianggap siap dikerjakan bila semua butir bagian A terisi, dan siap rilis bila bagian B terpenuhi.

### A. Sebelum menulis kode

- [ ] Mini PRD satu halaman: pengguna, masalah, 5 sampai 10 fitur P0, yang bukan tujuan
- [ ] Baris baru di tabel permukaan PRD dan di tabel peran
- [ ] Daftar layar berkode dan pola navigasi untuk ponsel dan desktop
- [ ] Data yang dibaca dan ditulis, beserta Policy dan aturan akses yang dibutuhkan
- [ ] Modul yang dipakai dan saklarnya
- [ ] Catatan keputusan untuk pilihan teknis baru

### B. Sebelum rilis

- [ ] Memakai `tokens` dan `ui`; tidak ada warna atau ukuran yang ditulis langsung
- [ ] Lolos uji di 360, 768, 1024, dan 1440 px; bisa dipakai dengan papan ketik
- [ ] Semua teks ada di kamus dan lolos pemeriksa aturan tulis
- [ ] Uji akses untuk setiap endpoint yang disentuh
- [ ] Keadaan memuat, kosong, galat, dan offline tersedia
- [ ] Tanpa pelacak pihak ketiga; CSP aktif
- [ ] Manifest, ikon, dan service worker (bila PWA)
- [ ] Kebijakan privasi diperbarui bila ada data baru
- [ ] Ditinjau dengan lima peran peninjau di folder `agen/`
- [ ] `STATUS.md` dan catatan rilis diperbarui

## 7. Kelengkapan proyek yang belum ada

| Kebutuhan | Penanggung jawab yang disarankan | Catatan |
|---|---|---|
| Keputusan D1 sampai D13 | Pak Indra, dr. Henky, promotor | Lihat file 12 |
| Nama final, domain, email resmi | Pak Indra | Dibutuhkan untuk manifest, TWA, dan Play |
| Akun Google Play organisasi dan D-U-N-S | Pak Indra | Prosesnya bisa berminggu-minggu |
| Naskah 8 sesi dan 8 kartu keluarga | dr. Henky dan ahli materi | Aplikasi hanya wadah |
| Daftar kata kunci eskalasi | Guru BK dan psikolog | Diuji saat uji coba |
| Kontak layanan per sekolah | Admin sekolah | Sesuai L15 |
| Izin pemakaian HP atau lab komputer | Sekolah | D11 |
| Persetujuan etik yang menyebut aplikasi, data, dan lokasi server | dr. Henky | D7 |
| Berkas desain (Figma atau sejenis) | Tim desain | Dari prompt file 02 |
| Perangkat uji | Tim | HP kelas bawah, tablet, laptop sekolah, proyektor |

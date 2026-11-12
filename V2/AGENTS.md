# AGENTS.md: Aturan Kerja untuk Alat Pengembang AI

Berkas ini dibaca otomatis oleh Codex dan alat lain yang mengenali `AGENTS.md`. Claude Code membacanya lewat `CLAUDE.md`. Isinya sama untuk semua alat supaya hasil kerja konsisten siapa pun yang mengerjakan.

## 1. Proyek ini apa

SAHAJA (Sahabat Remaja Jaga Diri) adalah media intervensi pada disertasi dr. Henky Yoga Prasetya (S3 Kesehatan Masyarakat FK UNNES): model edukasi berbasis mobile app untuk siswa SMP usia 13 sampai 15 tahun dalam upaya mencegah risiko Infeksi Menular Seksual (IMS) di Eks-Karesidenan Pati. Pemilik pekerjaan: Dr. Indra Surya Permana (panggil "Pak Indra").

Tech stack: frontend React dan TypeScript (PWA, dipaketkan TWA untuk Android); backend Laravel dan PostgreSQL dalam Docker Compose di VPS Hostinger milik Pak Indra (rincian di `Rencana Apps/04`).

Permukaan produk: S1 SAHAJA (PWA siswa), S2 SAHAJA Pendamping (PWA fasilitator, guru BK, peneliti), S3 Situs SAHAJA (Halaman Keluarga dan halaman hukum), S4 Asisten Pra-penyaringan (opsional, mati).

Pengguna utamanya anak di bawah umur dan datanya dipakai untuk penelitian. Dua hal itu membuat proyek ini berbeda dari aplikasi biasa: kesalahan kecil pada instrumen merusak data disertasi, dan kelalaian privasi merugikan anak.

## 2. Sebelum mengerjakan apa pun

Baca berurutan:
1. `STATUS.md` (keadaan terakhir dan serah terima)
2. `Rencana Apps/12 Catatan Keputusan.md`
3. `Rencana Apps/01 PRD.md`
4. `Rencana Apps/10 Konvensi Pengembangan dan Definisi Selesai.md`
5. Dokumen lain sesuai tugas (peta di `Rencana Apps/00 README.md`)

Urutan sumber kebenaran bila ada pertentangan: naskah disertasi dan lampiran (L05, L15, L17, codebook), lalu Catatan Keputusan, lalu PRD, lalu dokumen 02 sampai 11, lalu kode. Folder `Old` hanya bahan dan tidak mengikat. Pertentangan dicatat di `STATUS.md`, bukan diputuskan sendiri.

## 3. Aturan yang tidak boleh dilanggar

1. **Instrumen penelitian tidak diubah.** Isi, urutan, pilihan jawaban, dan skoring butir mengikuti L05 dan codebook. Satu butir per layar, tanpa tombol kembali, tanpa menampilkan skor kepada siswa, tampilan setara di semua ukuran layar.
2. **Desain penelitian tidak diubah.** 8 sesi, 4 fase, kelompok eksperimen dan kelompok kontrol, kontrol tidak melihat konten sebelum posttest.
3. **Komponen model boleh ditambah, tidak boleh dikurangi.** Lihat peta model ke fitur di PRD bagian 4.
4. **Tidak mengarang.** Tidak ada fakta kesehatan, angka, kutipan, referensi, atau data contoh yang dibuat-buat seolah nyata. Konten contoh diberi penanda [CONTOH]. Data yang belum ada diberi penanda [DATA BELUM ADA].
5. **Data siswa asli tidak pernah** masuk repo, log, prompt, tangkapan layar, atau lingkungan dev. Data contoh selalu sintetis.
6. **Privasi secara default.** Nama samaran, identitas terpisah dan terenkripsi, Policy untuk setiap endpoint beserta uji aksesnya, tanpa analitik, SDK, fon, atau skrip pihak ketiga.
7. **Manusia yang memutuskan urusan keselamatan.** Aplikasi dan AI hanya menandai. Tidak ada chatbot untuk siswa dan tidak ada penilaian instrumen oleh AI.
8. **Notifikasi netral.** Tidak memuat kata IMS, seksual, reproduksi, atau nama sesi.
9. **Tidak ada skor, peringkat, atau perbandingan antarsiswa.** Tidak ada pesan pribadi antarsiswa.
10. **Folder `Old` tidak diubah.** Tidak menghapus berkas atau data tanpa izin.
11. **VPS dipakai bersama aplikasi lain.** Jangan menyentuh kontainer, layanan, basis data, volume, atau konfigurasi yang bukan milik SAHAJA. Perintah yang mengubah sistem bersama atau menghapus data harus disetujui Pak Indra lebih dulu. `docker system prune` tidak pernah dipakai. Rincian di `Rencana Apps/13 Server dan Operasional.md` bagian 1.

Bila sebuah tugas tampak menuntut pelanggaran salah satu aturan ini, berhenti, tulis usulan dan alasannya di `STATUS.md` bagian "Menunggu keputusan", lalu lanjutkan bagian lain yang tidak terpengaruh. Daftar lengkap hal yang wajib ditanyakan ada di dokumen 10 bagian 8.

## 4. Aturan tampilan

- Ponsel dulu, tetapi desktop bukan ponsel yang diregangkan. Tiga kelas lebar: di bawah 600 px (bilah bawah), 600 sampai 1023 px (rel navigasi), 1024 px ke atas (sidebar yang bisa diciutkan dengan tombol hamburger, ditambah panel konteks di 1280 px ke atas).
- Layar imersif (kuesioner, materi, aktivitas, kuis, Atur Napas) tanpa navigasi, isi di kartu tengah.
- Hanya memakai token dari `packages/tokens` dan komponen dari `packages/ui`. Tidak ada nilai warna atau ukuran yang ditulis langsung.
- Tombol berisi memakai `primary-strong` (#006766), bukan `primary` (#0E9594), karena alasan kontras.
- Tidak ada warna merah untuk umpan balik belajar. Status tidak hanya dibedakan lewat warna.
- Setiap layar punya keadaan memuat, kosong, galat, dan offline, serta bisa dipakai dengan papan ketik.
- Rincian di `Rencana Apps/02 Desain UI dan Prompt.md`.

## 5. Aturan tulis

Berlaku untuk dokumen, konten, teks antarmuka, komentar kode, dan pesan komit.

- Bahasa Indonesia untuk dokumen dan teks antarmuka. Nama di kode bahasa Inggris, mengikuti padanan di dokumen 11.
- Tidak memakai simbol ampersand; tulis "dan".
- Tidak memakai em dash sebagai penghubung kalimat; pakai koma, titik dua, atau kalimat baru.
- Tidak memakai garis pemisah horizontal di dokumen. Kepala tabel abu-abu muda.
- Istilah baku: "Infeksi Menular Seksual (IMS)", "mobile app", "siswa SMP", "Eks-Karesidenan Pati", "kelompok eksperimen", "kelompok kontrol", "pengetahuan", "sikap pencegahan IMS".
- Semua teks antarmuka berada di berkas kamus, bukan di komponen.
- Sapaan: "kamu" untuk siswa, "Anda" untuk staf, "Bapak/Ibu" untuk orang tua. Tidak menakut-nakuti, tidak menghakimi.

## 6. Struktur repo

```
V2/
  AGENTS.md  CLAUDE.md  README.md  STATUS.md
  agen/            peran peninjau (dipakai semua alat)
  Rencana Apps/    dokumen produk 00 sampai 13 (sumber kebenaran)
  apps/siswa  apps/pendamping          frontend React (S1, S2)
  backend/                            Laravel: API, Blade S3, job, uji Pest
  packages/tokens  ui  domain  content  api  moderasi  config
  infra/                              Docker Compose, Dockerfile, skrip deploy dan cadangan
  tools/  assets-source/
```

Folder `apps`, `backend`, `packages`, `infra`, dan `tools` dibuat pada tugas M0-02 dan M0-06. Sampai saat itu repo hanya berisi dokumen.

## 7. Perintah

Perintah berikut berlaku setelah M0-02 selesai. Bila ada yang belum tersedia, catat di `STATUS.md` dan jangan mengarang hasilnya.

| Perintah | Fungsi |
|---|---|
| `pnpm install` | Pasang dependensi frontend |
| `pnpm infra:up` | Jalankan Laravel, PostgreSQL, Redis, dan Reverb di Docker lokal |
| `pnpm dev --filter siswa` | Jalankan S1 (ganti `pendamping` atau `situs`) |
| `pnpm cek` | Frontend (tipe, lint, uji unit, konten, aturan tulis) dan backend (Pint, Larastan, Pest) |
| `pnpm api:tipe` | Buat ulang tipe TypeScript dari OpenAPI Laravel |
| `pnpm uji:alur` | Playwright: alur, responsif, offline, aksesibilitas |
| `pnpm uji:akses` | Uji akses per peran (Pest) |
| `pnpm build` | Bangun semua aplikasi |

Sebuah tugas tidak boleh dilaporkan selesai bila `pnpm cek` belum hijau. Bila uji gagal dan tidak bisa diperbaiki, laporkan apa adanya beserta keluarannya.

## 8. Alur kerja satu tugas

1. Ambil satu paket dari `Rencana Apps/08 Task dan Roadmap.md`; catat di `STATUS.md`.
2. Baca bagian dokumen terkait dan tulis rencana singkat.
3. Kerjakan di cabang `fitur/<kode>-<ringkas>`.
4. Jalankan `pnpm cek` dan uji alur yang relevan.
5. Tinjau dengan peran di `agen/` yang sesuai (bagian 9).
6. Perbarui `STATUS.md` dan, bila perilaku produk berubah, dokumen di `Rencana Apps/`.
7. Komit: `<jenis>(<area>): <ringkasan> [<kode tugas>]`.

## 9. Peran peninjau

Lima peran di folder `agen/` menjaga konsistensi. Masing-masing berupa daftar periksa yang bisa dijalankan alat mana pun.

| Peran | Berkas | Dipakai saat |
|---|---|---|
| Penjaga Model | `agen/penjaga-model.md` | Menyentuh instrumen, sesi, jadwal, lengan kohort, ekspor, event log |
| Penjaga Desain | `agen/penjaga-desain.md` | Menyentuh tampilan atau komponen |
| Penjaga Privasi | `agen/penjaga-privasi.md` | Menyentuh data, Policy, autentikasi, moderasi, eskalasi, dependensi, server |
| Penjaga Konten | `agen/penjaga-konten.md` | Menyentuh konten sesi, teks antarmuka, dokumen |
| Penguji | `agen/penguji.md` | Sebelum melaporkan tugas selesai |

Di Claude Code, peran ini tersedia sebagai subagen dan perintah `/mulai`, `/tinjau`, `/checkpoint` setelah isi `agen/claude-code/` disalin sekali ke `.claude/` (caranya di `README.md`). Di Codex atau alat lain, panggil dengan kalimat seperti: "Tinjau perubahan di cabang ini memakai daftar periksa `agen/penjaga-privasi.md`, laporkan temuan tanpa mengubah kode."

Peninjau melaporkan temuan dengan tiga tingkat: **Wajib diperbaiki**, **Sebaiknya diperbaiki**, **Catatan**. Temuan "Wajib diperbaiki" menahan status selesai.

## 10. Serah terima antaralat

Karena proyek dikerjakan bergantian oleh beberapa alat, `STATUS.md` adalah ingatan bersama. Setiap sesi kerja diakhiri dengan memperbarui: tugas yang selesai, tugas yang sedang berjalan beserta cabangnya, hal yang menunggu keputusan, dan langkah berikutnya. Tulis fakta, bukan niat. Bila sesuatu belum diuji, katakan belum diuji.

# PRD: Aplikasi Edukasi Pencegahan IMS untuk Siswa SMP

Nama kerja: **SAHAJA** (Sahabat Remaja Jaga Diri). Alternatif: PRIMA, KANCA.
Konteks: instrumen intervensi disertasi Henky Yoga Prasetya (S3 Kesmas UNNES). Model edukasi CBT 8 sesi, quasi-experimental pretest-posttest dengan kelompok kontrol, sasaran siswa SMP 13-15 tahun di Eks-Karesidenan Pati.

## 1. Tujuan Produk

1. Menyampaikan intervensi edukasi kesehatan reproduksi dan pencegahan IMS berbasis CBT dalam 8 sesi terstruktur (drip mingguan).
2. Mengumpulkan data penelitian yang valid dan lengkap: pretest, posttest, log partisipasi, angket kepuasan; siap ekspor ke SPSS/AMOS.
3. Menjamin keamanan dan privasi pengguna anak (UU PDP No. 27 Tahun 2022, ethical clearance KEPK).

Non-tujuan (v1): rilis publik Play Store, chatbot, konten di luar 8 sesi, fitur untuk sekolah di luar sampel penelitian.

## 2. Peran Pengguna

| Peran | Kebutuhan utama |
|---|---|
| Siswa (13-15 th) | Belajar mandiri, aman, privat; bertanya tanpa malu; lihat progres sendiri |
| Fasilitator (guru/konselor) | Pantau progres kelas, moderasi forum, terima peringatan eskalasi |
| Peneliti/Admin | Kelola sekolah dan kohort (eksperimen/kontrol), kunci jadwal drip, ekspor data |
| Orang tua/Wali | Beri consent; terima ringkasan program (tanpa akses isi refleksi anak) |

## 3. Fitur MVP (P0)

### 3.1 Onboarding dan Consent
- Login dengan kode aktivasi unik per siswa (dibagikan setelah consent wali diterima).
- Consent digital berjenjang: persetujuan wali dulu, lalu assent siswa. Tanpa consent, konten terkunci.
- Pilih nama samaran dan avatar (tidak ada nama asli di area sosial).
- Penugasan kohort oleh peneliti: eksperimen mendapat 8 sesi; kontrol hanya pretest/posttest (waitlist, akses konten dibuka setelah posttest).

### 3.2 Instrumen Penelitian (in-app, bukan Google Form)
- Pretest: STD-KQ 27 butir (benar/salah/tidak tahu, skor 1/0/0, rentang 0-27) + kuesioner sikap Likert 1-5.
- Posttest: instrumen sama, terbuka otomatis 1 minggu setelah sesi 8.
- Angket kepuasan/respon siswa (evaluasi proses).
- Aturan: wajib isi semua butir, sekali kirim lalu terkunci, stempel waktu mulai-selesai, versi instrumen tercatat, tersimpan lokal dulu lalu sinkron (tidak boleh hilang saat offline).

### 3.3 Sesi Belajar (8 sesi drip mingguan)
- Materi teks, infografis, video (terkompresi, bisa diunduh sekali via Wi-Fi sekolah).
- Kuis pemahaman di akhir tiap sesi; sesi berikutnya terbuka sesuai jadwal minggu DAN penuntasan sesi sebelumnya.
- Pemetaan fase: Sesi 1 = Engagement (trust building, kenalan CBT); Sesi 2-5 = Proses Personal (worksheet CBT); Sesi 6 = forum kolaboratif + Kesepakatan Dukungan; Sesi 7-8 = terminasi, rangkuman, sertifikat.

### 3.4 Worksheet CBT dan Self-monitoring
- Catatan refleksi pikiran (restrukturisasi kognitif): situasi -> pikiran otomatis -> pikiran alternatif sehat.
- Rencana aksi sehat (behavioral activation) dengan ceklis mingguan.
- Latihan regulasi emosi (panduan napas dalam, self-talk positif).
- Jurnal harian singkat (emoji + slider) dengan grafik perkembangan pribadi.

### 3.5 Forum Diskusi Termoderasi
- Per kelas/sekolah, nama samaran saja.
- Pra-moderasi: posting tampil setelah disetujui fasilitator.
- Filter kata (daftar kata kasar/berisiko Indonesia dan Jawa) + tombol lapor.
- Deteksi kata kunci berisiko (mis. indikasi kekerasan, ajakan seksual, distress berat) -> notifikasi eskalasi ke fasilitator sesuai protokol disertasi.

### 3.6 Reminder dan Gamifikasi
- Notifikasi terjadwal: sesi baru, tugas rumah, jurnal harian. Teks notifikasi netral (tidak menyebut IMS di lockscreen).
- Poin, lencana per sesi, streak mingguan.
- Sertifikat digital PDF otomatis saat menuntaskan 8 sesi + posttest.

### 3.7 Dashboard Web (Fasilitator dan Peneliti)
- Fasilitator: progres per siswa, antrean moderasi, daftar tanda bahaya, panduan sesi.
- Peneliti/Admin: kelola sekolah/kelas/kohort, atur tanggal mulai drip, monitor kelengkapan data, ekspor CSV (skor per butir + total, log event, kepuasan) dengan ID samaran.

## 4. Fitur P1 (setelah penelitian)
Leaderboard antar kelas, mode orang tua, konten bahasa Jawa, chatbot tanya jawab, integrasi UKS/PKPR Puskesmas, rilis publik via kemitraan kelembagaan.

## 5. Kebutuhan Non-Fungsional
- **Offline-first**: semua sesi, kuis, worksheet berfungsi tanpa internet; sinkronisasi antrean saat online. Hanya forum yang butuh koneksi.
- **Perangkat**: Android minimal 8.0 (API 26), lancar di RAM 2-3 GB, APK < 40 MB tanpa video.
- **Privasi**: tabel identitas terpisah dan terenkripsi dari tabel jawaban; tidak ada SDK iklan/pelacak; ekspor riset hanya memakai ID samaran.
- **Integritas data**: at-least-once sync dengan idempotency key; tidak ada kehilangan data saat app force close.
- **Keamanan**: TLS, RLS (row level security) Supabase per peran, enkripsi at-rest.

## 6. Metrik Keberhasilan
| Metrik | Target |
|---|---|
| Aktivasi kelompok eksperimen | 100% dari 76 siswa |
| Penuntasan 8 sesi | >= 80% (antisipasi drop out 20%) |
| Kelengkapan pretest + posttest | 100% terisi penuh (missing < 5% per responden) |
| Partisipasi mingguan (forum + worksheet) | tercatat per siswa (data variabel bebas) |
| Skor kepuasan | dilaporkan sebagai evaluasi proses |

## 7. Batasan dan Asumsi
- Distribusi tertutup selama penelitian: Play Closed Testing / Firebase App Distribution / APK dipasang saat sesi sekolah. Jangan rilis publik dulu (risiko kebijakan Google Play Families untuk konten kesehatan seksual anak).
- Konten final 8 sesi divalidasi 3 pakar (psikolog klinis, pakar kesehatan remaja, praktisi kesehatan sekolah) sebelum implementasi.
- Kelompok kontrol tetap mendapat edukasi standar sekolah; akses aplikasi dibuka setelah posttest (etika waitlist).

# Perbandingan Draft Lama dengan Proposal Terbaru

Draft lama ("App Mentah (Lama)": prd.md, struktur.md, task.md, design.md, prompt-desain-frontend.md, dan sekitar 30 layar prototipe "sahaja_app_mobile_prototype") disusun dari proposal 18 Juli 2026. Acuan sekarang adalah proposal versi seminar (3 Oktober 2026, direvisi strukturnya 21 Oktober 2026).

## Yang tetap dipakai

| Unsur | Keterangan |
|---|---|
| Nama kerja SAHAJA dan maskot Saja | Tetap, menunggu keputusan nama final |
| Palet teal, biru, kuning dan Plus Jakarta Sans | Tetap; prototipe lama bisa jadi titik awal desain |
| Kode aktivasi, assent, nama samaran | Tetap |
| Instrumen di aplikasi, sekali kirim, offline | Tetap, dengan penyesuaian di bawah |
| Forum pra-moderasi dan eskalasi kata kunci | Tetap |
| Notifikasi netral, tombol keluar cepat, tanpa iklan | Tetap |
| Waitlist kelompok kontrol | Tetap, kini dicatat juga sebagai usulan K9 di Bab 4 |
| Skema data Supabase | Dipakai ulang dan diperluas |

## Yang berubah

| Unsur | Draft lama | Sekarang | Alasan |
|---|---|---|---|
| Platform | Flutter native + dasbor Next.js | 2 PWA (siswa dan pendamping) dipaketkan TWA untuk Play | Kesepakatan lingkup "2 aplikasi PWA beserta pengajuan ke Play Store"; satu basis kode web, lebih cepat dikembangkan |
| Struktur sesi | Sesi 1 Engagement, 2 sampai 5 proses personal, 6 forum, 7 sampai 8 terminasi; judul (Tubuhku Berubah, Kenali Pikiranmu, dst.) | Fase I sampai IV mengikuti proposal terbaru; topik 2 sampai 5 mengikuti daftar materi Tahap Development (pengertian, jenis, penularan, gejala, faktor risiko, dampak, pencegahan, layanan) | Konsistensi dengan Bab III |
| Posttest | Minggu ke-9 | Minggu ke-9 (diusulkan sebagai keputusan K6 karena proposal masih ganda) | |
| Skala sikap | Likert 1 sampai 5 | Likert 1 sampai 5, 10 butir, butir negatif diskor terbalik | Sesuai teks Bab III; lampiran proposal masih Ya/Tidak (K2) |
| Analisis | ANCOVA, SEM, ekspor ke AMOS | ANCOVA dan PROCESS Model 4; ekspor CSV sesuai codebook | Kunci desain penelitian |
| Jumlah sampel di metrik | 76 siswa eksperimen | Mengikuti angka final K5 | Proposal masih tidak konsisten (63, 126, 152) |
| Uji coba | Pearson dan Cronbach | Point-biserial dan KR-20 untuk butir pengetahuan; Cronbach untuk sikap | Butir dikotomus (K3) |
| Jurnal mood dan komponen depresi | Grafik mood 30 hari sebagai fitur utama | Jurnal tetap ringan; tidak ada pengukuran depresi atau ketahanan diri | Variabel tersebut tidak diukur di proposal (K8) |
| Peran pengguna | Siswa, fasilitator, peneliti, orang tua | Siswa, fasilitator, peneliti, validator; orang tua di luar aplikasi (consent kertas) | Mengurangi beban privasi data anak |
| Mode khusus | Tidak ada | Mode kontrol, uji coba, validator | Kebutuhan tahap ADDIE |
| Data keterlaksanaan | event_log umum | Event log terdefinisi sesuai indikator variabel X di definisi operasional | Bahan Tabel 4.22 sampai 4.24 |
| Distribusi | Play closed testing / Firebase App Distribution / APK | Tautan PWA saat penelitian, Play internal atau tertutup, publik setelah penelitian | Mengikuti TWA dan syarat Play terbaru |

## Yang dibuang

- Sisa desain lama di proposal yang ikut terbawa (grup WhatsApp, edukasi oleh teman sebaya, program 2 minggu) tidak dipakai sama sekali.
- Leaderboard dan mode orang tua tidak masuk versi 1.

## Status prototipe lama

Layar prototipe lama masih berguna sebagai referensi visual untuk: splash, kode aktivasi, assent, nama samaran, peta belajar, detail sesi, kuis, forum, profil, sertifikat. Yang harus didesain ulang: semua layar instrumen (butir sikap kini berlabel teks, tanpa skor), beranda mode kontrol, halaman Butuh bantuan?, dan seluruh aplikasi pendamping (draft lama hanya menyebut dasbor Next.js tanpa desain).

## Perubahan versi 2.0 (21 Oktober 2026) ke versi 2.1 (11 November 2026)

Versi 2.0 kuat sebagai alat penelitian tetapi belum mewujudkan seluruh model di Bab III. Versi 2.1 menutup celah itu dan menyiapkan dokumen untuk dikerjakan beberapa alat pengembang AI.

| Unsur | Versi 2.0 | Versi 2.1 | Alasan |
|---|---|---|---|
| Sesi 90 menit di sekolah | Hanya panduan sesi untuk guru | Mode Kelas: kendali sesi, kode gabung, kehadiran, Layar Kelas | Model menyebut sesi dipandu fasilitator |
| Struktur sesi | Materi, aktivitas, kuis, refleksi | Enam langkah seragam mengikuti struktur baku L17 | Sama di semua sesi dan semua sekolah |
| Penugasan rumah | Tidak ada | Langkah Bawa Pulang dan ceklis tugas | Luaran tahap Design menyebut penugasan rumah |
| Keluarga | Di luar aplikasi | Halaman Keluarga tanpa akun dan tanpa data anak | Gambar 3.4 menempatkan keluarga sebagai pendukung |
| Komitmen pribadi | Refleksi di Sesi 6 | Fitur Komitmenku | Langkah akhir Fase III |
| Faktor pelindung | Jurnal ringan, Atur Napas | Cek Perasaan, Atur Napas, tombol "Aku ingin bicara dengan guru" sebagai fitur pendukung | Gambar 3.3; tetap bukan variabel ukur |
| Beranda | Kartu sesi, lencana, streak | Tiga Lingkaran mingguan, tanpa streak harian | Self-monitoring tanpa tekanan dan tanpa peringkat |
| Tampilan | Ponsel; pendamping 2 kolom di desktop | Tiga kelas lebar dengan navigasi berbeda untuk S1 dan S2 | Sekolah yang melarang HP memakai lab komputer |
| Warna tombol | primary #0E9594 | primary-strong #006766 | Kontras teks putih |
| Peran | Kolom `staff.role` | Peran bercakupan di `role_assignments`; fasilitator dan konselor dipisah | Satu orang banyak peran; siap untuk platform |
| Struktur data | Sekolah, kohort, kelas | Ditambah organisasi dan program dengan saklar modul | Model bisa dipakai ulang |
| Deteksi risiko | Kata kunci | Tiga lapis: laporan diri, kata kunci berbobot, AI opsional | Keputusan tetap oleh manusia |
| Eskalasi | Satu daftar | Tiga tingkat sesuai L15, formulir insiden terpisah | Sesuai protokol |
| Konten lokal | Tidak ada | Slot Suara Remaja Pati | Temuan tahap Analysis masuk ke produk |
| Kaitan konten dengan variabel | Tidak ada | Matriks wilayah isi STD-KQ dan butir sikap ke sesi | Memastikan cakupan tanpa menyalin butir |
| Avatar | 12 potret manusia | Usulan 16 avatar bukan manusia (D14) | Lebih anonim dan mudah diseragamkan |
| Permukaan | 2 PWA | 2 PWA, situs ringan, worker AI opsional | Halaman hukum wajib untuk Play; jalur keluarga |
| Dokumen | 9 berkas | 14 berkas (termasuk 13 Server dan Operasional), ditambah AGENTS.md, STATUS.md, lima peran peninjau | Konsistensi antaralat |
| Keputusan terbuka | D1 sampai D6 | D1 sampai D16 dan T1 sampai T12 di berkas 12 | Satu tempat |

Yang tidak berubah: PWA dan TWA, kode aktivasi, assent, nama samaran, instrumen di aplikasi, pra-moderasi forum, notifikasi netral, tanpa iklan dan pelacak, rencana rilis Google Play (berkas 05).

## Perubahan 12 November 2026: backend

| Unsur | Sebelumnya | Sekarang | Alasan |
|---|---|---|---|
| Backend | Supabase (layanan cloud) | Laravel dan PostgreSQL dalam Docker Compose di VPS Hostinger KVM 4 milik Pak Indra | Tanpa biaya langganan, data di server sendiri (T10) |
| Pengaman data | Row Level Security | Policy Laravel dan uji akses wajib per endpoint; skema `rahasia` dengan koneksi terpisah | Pengganti RLS |
| Auth | Supabase Auth | Sanctum (token PWA) dan Fortify (staf) | Bawaan Laravel |
| Realtime | Supabase Realtime | Laravel Reverb | WebSocket dihos sendiri |
| Fungsi server | Edge Functions | Controller, Job, dan Scheduler Laravel | |
| Situs S3 | Situs statis terpisah | Blade dari Laravel | Lebih sedikit alat (T11) |
| Server | Diurus Supabase | Diurus proyek dengan panduan di file 13 | Cadangan, pemantauan, isolasi dari aplikasi lain |

Yang tidak berubah: aplikasi React di Android dan TWA, offline-first, nama tabel, alur penelitian.


# PRD SAHAJA: Platform Edukasi Pencegahan IMS untuk Siswa SMP

Versi 2.2, 12 November 2026: bagian backend disesuaikan dengan keputusan T10, isi lain tetap versi 2.1 (11 November 2026). Menggantikan versi 2.0 (21 Oktober 2026). Perubahan utama dari 2.0: aplikasi kini mewujudkan model secara utuh (Mode Kelas, jalur keluarga, siklus sesi seragam, faktor pelindung), tampilan dibedakan untuk ponsel dan layar lebar, peran pengguna memakai cakupan, dan ada modul opsional yang bisa dimatikan. Ringkasan perubahan ada di "07 Perbandingan dengan Draft Lama.md". Pembaruan 12 November 2026: backend memakai Laravel dan PostgreSQL di VPS sendiri (file 04 dan 13).

Nama kerja: **SAHAJA** (Sahabat Remaja Jaga Diri). Nama final menunggu keputusan D2.

## 1. Latar dan posisi produk

SAHAJA adalah media intervensi pada disertasi dr. Henky Yoga Prasetya (S3 Kesehatan Masyarakat FK UNNES): penelitian dan pengembangan model ADDIE, mixed methods sekuensial eksploratori, uji efektivitas kuasi-eksperimen non-equivalent control group pretest-posttest. Intervensi 8 sesi, 1 sesi per minggu, sekitar 90 menit, untuk siswa SMP usia 13 sampai 15 tahun di Eks-Karesidenan Pati.

Variabel yang harus didukung:
- X: edukasi berbasis mobile app (1 eksperimen, 0 kontrol)
- M: pengetahuan IMS (adaptasi STD-KQ 27 butir, benar/salah/tidak tahu, skor 0 sampai 27)
- Y: sikap pencegahan IMS (10 butir Likert 1 sampai 5, skor 10 sampai 50)

Dua prinsip yang mengikat semua keputusan produk:

1. **Setia pada model.** Komponen model di Bab III boleh ditambah, tidak boleh dikurangi. Aplikasi boleh lebih baik dari uraian proposal selama tetap bisa dilaporkan sebagai wujud model yang sama.
2. **Penelitian dulu, platform kemudian.** Versi 1.0 melayani penelitian dr. Henky. Struktur datanya sudah disiapkan agar model yang sama bisa dipakai sekolah, jenjang, dan topik lain tanpa menulis ulang (lihat file 09).

## 2. Permukaan produk

Kesepakatan lingkup tetap **2 aplikasi PWA** yang diajukan ke Google Play. Keduanya dilengkapi satu situs ringan dan satu modul opsional.

| Kode | Permukaan | Pengguna | Bentuk | Fungsi utama |
|---|---|---|---|---|
| S1 | SAHAJA | Siswa | PWA + TWA (Play) | 8 sesi, aktivitas CBT, cek perasaan, forum termoderasi, pretest dan posttest |
| S2 | SAHAJA Pendamping | Fasilitator, guru BK, peneliti/admin, validator | PWA + TWA (Play) | Mode Kelas dan Layar Kelas, panduan sesi, progres, moderasi, eskalasi, kelola kohort, ekspor data |
| S3 | Situs SAHAJA | Publik, orang tua | Halaman web ringan dari backend (Blade) | Halaman Keluarga (kartu obrolan mingguan tanpa akun), kebijakan privasi, hapus akun, panduan instal |
| S4 | Asisten Pra-penyaringan | Tidak ada antarmuka pengguna | Worker lokal opsional | Memberi label risiko pada antrean moderasi; mati secara default (D9) |

Satu monorepo, satu backend, dua manifest PWA, dua paket TWA.

## 3. Tujuan produk

1. Menyampaikan intervensi 8 sesi sesuai model (Fase I sampai IV) dengan cara yang sama di semua sekolah eksperimen.
2. Mengumpulkan data penelitian yang lengkap dan dapat diaudit: pretest, posttest, keterlaksanaan, SUS, angket respon.
3. Melindungi siswa: privasi, nama samaran, forum termoderasi, notifikasi netral, jalur ke orang dewasa yang bisa menolong.
4. Berjalan baik di HP Android kelas bawah dengan kuota terbatas, dan tetap nyaman di laptop, Chromebook, atau komputer lab sekolah.
5. Lolos peninjauan Google Play untuk S1 dan S2.

Bukan tujuan versi 1: chatbot untuk siswa, penilaian instrumen oleh AI, konten di luar 8 sesi, akun orang tua, leaderboard, pesan pribadi, iOS App Store.

## 4. Peta model ke fitur

Tabel ini adalah alat periksa utama. Setiap komponen model harus punya wujud di produk, dan setiap fitur besar harus bisa ditunjuk asalnya.

| Komponen model (Bab III) | Wujud di produk |
|---|---|
| Fase I Persiapan dan Inisiasi: registrasi, orientasi, pretest, trust building | Aktivasi dengan kode, assent, nama samaran, tur, pretest, Sesi 1 dengan kesepakatan kelompok |
| Fase II Edukasi dan Penguatan Personal: materi bertahap, worksheet, kuis, studi kasus, latihan keputusan | Sesi 2 sampai 5 dengan siklus sesi seragam dan 5 aktivitas CBT |
| Fase III Puncak Kolaborasi: forum, refleksi, komitmen pribadi | Sesi 6: forum termoderasi dengan topik pemantik, Komitmenku |
| Fase IV Terminasi dan Kemandirian: posttest, refleksi akhir, sertifikat, keberlanjutan | Sesi 7 dan 8, posttest, sertifikat, halaman layanan, mode pasca program |
| Tiga pihak di Gambar 3.4: siswa, fasilitator, guru/konselor dan keluarga | S1 untuk siswa, S2 untuk fasilitator dan guru BK, Halaman Keluarga di S3 |
| Sesi sekitar 90 menit dipandu fasilitator | Mode Kelas di S2 dan S1, struktur baku 6 bagian dari L17 |
| Penugasan rumah (modul siswa) | Langkah Bawa Pulang di tiap sesi, ceklis tugas mingguan |
| Pemantauan berkala dan umpan balik fasilitator | Kelasku, catatan penguatan per kelas, pengumuman |
| Pengingat, self-monitoring, gamifikasi (kebaruan) | Pengingat netral, Tiga Lingkaran mingguan, lencana, sertifikat |
| Faktor pelindung Gambar 3.3: mindfulness, ketahanan diri, dukungan sekolah, informasi tepercaya | Atur Napas, Cek Perasaan, Butuh bantuan?, Sesi 7 |
| Person-Centered Care dan rapport (Sesi 1) | Nada bahasa, maskot, kesepakatan kelompok, tombol "Aku ingin bicara dengan guru" |
| Protokol eskalasi (panduan fasilitator, L15) | Deteksi berlapis, antrean eskalasi tiga tingkat, formulir insiden |
| Lima luaran tahap Design | Konten sesi (modul siswa), panduan sesi di S2 (panduan fasilitator), modul pelatihan fasilitator di S2, mode validator (instrumen validasi ahli), dokumen model |
| Temuan tahap Analysis | Slot konten lokal "Suara Remaja Pati" di setiap sesi |

Catatan untuk naskah, bukan untuk aplikasi: Gambar 3.3 membagi proses menjadi 3 fase (Sesi 1, 2 sampai 3, 4 sampai 6) sedangkan Gambar 3.4 membagi 4 fase selama 8 minggu. Aplikasi mengikuti 4 fase Gambar 3.4 karena itulah yang dijabarkan langkahnya. Penyelarasan teks proposal dicatat sebagai D13.

## 5. Peran pengguna

Peran diberikan pada cakupan tertentu (organisasi, sekolah, kohort, kelas), bukan sebagai satu kolom di tabel pengguna. Satu orang bisa punya lebih dari satu peran.

| Tingkat | Peran | Permukaan | Cakupan | Kebutuhan utama |
|---|---|---|---|---|
| 0 | Super admin | S2 | Seluruh platform | Kelola organisasi dan program |
| 1 | Admin program/peneliti | S2 | Program | Kohort, kode aktivasi, kelengkapan data, ekspor |
| 2 | Admin sekolah | S2 | Sekolah | Daftar siswa, kontak layanan, jadwal |
| 3 | Fasilitator | S2 | Kelas | Memandu sesi, memantau, memoderasi |
| 3 | Guru BK/konselor | S2 | Sekolah | Menerima eskalasi dan permintaan bicara |
| 4 | Siswa eksperimen | S1 | Diri sendiri | Belajar, berlatih, merenung, aman dan privat |
| 4 | Siswa kontrol | S1 mode kuesioner | Diri sendiri | Pretest dan posttest; konten terbuka setelah posttest |
| 4 | Siswa uji coba | S1 mode uji coba | Diri sendiri | 1 sampai 2 sesi, kuesioner, keterbacaan, SUS |
| Lateral | Validator ahli | S2 mode validasi | Program | Melihat semua konten, mengisi lembar validasi |
| Lateral | Penulis/peninjau konten | S2 | Program | Menyusun dan menyetujui versi konten |
| Tanpa akun | Orang tua/wali | S3 | Tidak ada | Membaca kartu obrolan mingguan |

Fasilitator dan guru BK dipisah sebagai peran karena proposal menyebut keduanya dengan cara berbeda. Jika di lapangan orangnya sama, ia cukup diberi dua peran (D10).

## 6. Fitur S1 (siswa)

Prioritas: P0 wajib untuk penelitian, P1 bila waktu cukup, P2 setelah penelitian.

### A1. Aktivasi dan persetujuan (P0)
- Masuk dengan kode aktivasi 6 karakter per siswa. Tanpa email, nomor HP, atau akun Google.
- Kode hanya dibuat setelah persetujuan orang tua (kertas, L02) tercatat.
- Assent digital 4 kartu dan centang "Aku mengerti dan mau ikut", tersimpan dengan stempel waktu. Assent menjelaskan bahwa tulisan yang menandakan bahaya dapat diteruskan ke guru.
- Nama samaran (tombol acak) dan avatar. Tolak nama yang mirip nama asli di kelas dan kata tidak pantas.
- Tur singkat 3 layar.
- Satu kode bisa dipakai ulang di perangkat lain oleh siswa yang sama (ganti HP, pakai komputer lab), dengan batas jumlah perangkat aktif.

### A2. Instrumen penelitian (P0)
- Pretest dan posttest: Bagian A (karakteristik), B (pengetahuan 27 butir), C (sikap 10 butir). Isi dan urutan identik dengan L05.
- Satu butir per layar, tombol besar, progres "Soal 4 dari 27", tidak bisa kembali ke butir sebelumnya, boleh melewati butir (tercatat kosong).
- Sekali kirim lalu terkunci. Simpan waktu mulai dan selesai, versi instrumen, ID perangkat anonim, dan kelas tampilan (ponsel, tablet, desktop).
- Tersimpan lokal dulu, terkirim otomatis saat online, dengan indikator "tersimpan di perangkat" dan "terkirim".
- Pretest wajib sebelum Sesi 1 terbuka. Posttest terbuka pada minggu yang diatur per kohort.
- SUS dan angket respon tampil setelah posttest kelompok eksperimen. Mode uji coba menampilkan lembar keterbacaan (L10).
- Siswa tidak melihat skor pretest atau posttest.
- **Tampilan butir harus setara di semua ukuran layar**: teks, urutan, jumlah butir per layar, dan label pilihan sama persis. Di layar lebar, butir tetap berada di satu kartu tengah selebar maksimum 560 px.

### A3. Beranda dan Tiga Lingkaran (P0)
- Sapaan dengan nama samaran, kartu "Sesi minggu ini", kartu tugas rumah, kartu Cek Perasaan, pengumuman fasilitator.
- **Tiga Lingkaran mingguan**: Belajar (materi dan kuis sesi minggu ini), Berlatih (aktivitas CBT dan tugas rumah), Merenung (cek perasaan, refleksi, Atur Napas). Bentuknya tiga cincin terpisah yang tersusun seperti daun semanggi, bukan cincin konsentris.
- Tidak ada skor, peringkat, atau perbandingan dengan siswa lain.
- Grafik batang keaktifan mingguan hanya terlihat oleh siswa itu sendiri.

### A4. Peta belajar 8 sesi (P0)
- Peta perjalanan 8 titik dengan status selesai, aktif, terkunci (beserta tanggal buka).
- Sesi terbuka bila minggunya tiba dan sesi sebelumnya tuntas, atau dibuka fasilitator untuk kelasnya (tercatat).
- Materi dan gambar diunduh per sesi lalu tersedia offline. Video dikompresi, bersubtitle, dan punya alternatif teks.

### A5. Siklus sesi seragam (P0)
Setiap sesi memakai enam langkah yang sama, mengikuti struktur baku L17:

| Langkah di aplikasi | Bagian L17 | Durasi kelas | Isi |
|---|---|---|---|
| Buka | Pembuka | 10 menit | Cek perasaan, ulasan tugas rumah, kesepakatan kelompok |
| Pahami | Materi inti | 25 menit | Kartu bacaan, video pendek, infografis, "Suara Remaja Pati" |
| Latih | Aktivitas CBT | 25 menit | Satu atau dua aktivitas CBT |
| Bahas | Diskusi | 15 menit | Pertanyaan pemantik di kelas, kotak tanya anonim |
| Cek dan Renung | Kuis dan refleksi | 10 menit | Kuis 5 soal, satu pertanyaan refleksi |
| Bawa Pulang | Penutup | 5 menit | Rangkuman, tugas rumah, kartu obrolan keluarga |

### A6. Dua mode pemakaian sesi (P0)
- **Mode Kelas**: siswa bergabung ke sesi yang dibuka fasilitator dengan kode 4 angka atau pindai QR. Langkah terbuka mengikuti fasilitator. Kehadiran tercatat dari bergabungnya siswa.
- **Mode Mandiri**: untuk tugas rumah, mengulang materi, dan sesi susulan bagi siswa yang tidak hadir. Sesi susulan ditandai di data agar bisa dibedakan saat analisis.
- Jika jaringan sekolah mati, sesi tetap jalan dari konten yang sudah diunduh dan fasilitator memandu dengan panduan sesi. Data tersinkron setelah online.

### A7. Aktivitas CBT (P0)
- **Catat Pikiranmu** (restrukturisasi kognitif): situasi, pikiran, perasaan, cek fakta, pikiran yang lebih sehat. Gaya percakapan dengan maskot.
- **Keputusanku** (simulasi bercabang): cerita pendek, 2 sampai 3 pilihan, konsekuensi, umpan balik suportif.
- **Berani Bilang Tidak** (latihan asertif): pilih atau tulis kalimat menolak.
- **Rencana Aksi Sehat** (behavioral activation): 1 sampai 3 rencana mingguan dengan ceklis.
- **Atur Napas** (regulasi emosi dan mindfulness): panduan napas 1 menit, selalu tersedia dari beranda.
- **Komitmenku** (Sesi 6 dan 8): pernyataan komitmen pribadi yang bisa dilihat kembali di profil.
- Isian bersifat pribadi. Fasilitator hanya melihat status selesai. Pengecualian: teks yang memicu deteksi risiko diteruskan sesuai L15.

### A8. Cek Perasaan dan jurnal (P0)
- Lima pilihan perasaan berlabel kata, chip penyebab (sekolah, teman, keluarga, kesehatan, media sosial, lainnya), satu kalimat opsional.
- Tombol **"Aku ingin bicara dengan guru"** yang membuat permintaan ke guru BK tanpa harus menjelaskan alasannya.
- Riwayat perasaan hanya untuk siswa. Guru hanya melihat permintaan bicara dan tanda eskalasi.
- Ini fitur pendukung, bukan alat ukur. Tidak ada skrining depresi atau kecemasan di versi penelitian (D8).

### A9. Forum termoderasi (P0, dipakai penuh di Sesi 6)
- Satu forum per kelas, hanya nama samaran. Topik pemantik dari fasilitator.
- Pra-moderasi: posting tampil setelah disetujui. Label "Menunggu persetujuan guru".
- Filter kata (Indonesia dan Jawa, termasuk ejaan alay) dan pola data pribadi (nomor HP, akun media sosial, alamat). Posting yang terdeteksi tidak terkirim dan siswa diberi pesan ramah.
- Tombol suka dan lapor. Tidak ada pesan pribadi.
- **Kotak Tanya** (P1): pertanyaan anonim ke fasilitator yang dijawab di sesi berikutnya (tingkat hijau di L15).

### A10. Pengingat (P0)
- Notifikasi lokal dan push: sesi baru, tugas rumah, kuis belum selesai.
- Teks netral, tanpa kata IMS atau seksual. Contoh: "Ada materi baru untukmu".
- Siswa dapat mengatur jam pengingat atau mematikannya.

### A11. Bantuan dan keamanan (P0)
- "Butuh bantuan?" bisa dibuka dari semua layar: guru BK, Puskesmas (PKPR), SAPA 129. Kontak diatur per sekolah.
- Tombol keluar cepat di layar materi sensitif, langsung ke beranda netral.
- Kunci aplikasi dengan PIN 4 angka (P1) untuk HP yang dipakai bersama keluarga.

### A12. Profil, lencana, sertifikat (P0)
- Avatar, nama samaran, lencana per sesi, Komitmenku, pengaturan pengingat.
- Sertifikat digital terbuka setelah 8 sesi dan posttest selesai, dengan nama samaran atau nama asli sesuai pilihan siswa (nama asli diambil dari data peneliti).

### A13. Mode khusus (P0)
- Mode kontrol: hanya instrumen; konten terbuka setelah posttest (D6).
- Mode uji coba: 1 sampai 2 sesi terbuka langsung, instrumen uji coba aktif.
- Mode demo: data contoh untuk peninjau Google Play dan pelatihan fasilitator, tidak terhubung ke data siswa.

### A14. P1 dan P2
- P1: mode hemat data, glosarium, bacakan teks (text to speech bawaan peramban), ukuran huruf besar.
- P2: mode pasca program (ulang materi, kuis tantangan), jenjang lain, bahasa daerah.

## 7. Fitur S2 (pendamping)

### B1. Fasilitator (P0)
- Masuk dengan email dan kata sandi atau magic link yang dibuat admin.
- **Mulai Sesi Kelas**: pilih kelas dan sesi, tampilkan kode gabung dan QR, kendalikan langkah aktif, pengatur waktu per bagian, jumlah siswa yang sudah bergabung dan selesai tiap langkah.
- **Layar Kelas**: tampilan untuk proyektor atau TV yang menayangkan materi, pertanyaan pemantik, dan hasil gabungan anonim (misalnya sebaran jawaban fakta atau mitos). Tidak pernah menampilkan jawaban per siswa.
- **Panduan sesi**: tujuan, langkah 90 menit, poin diskusi, antisipasi pertanyaan sulit.
- **Kelasku**: nama samaran, status pretest, sesi tuntas, kehadiran, terakhir aktif.
- **Antrean moderasi**: setujui, tolak dengan alasan, tandai eskalasi. Tata letak dua panel di layar lebar.
- **Catatan penguatan**: pesan umpan balik untuk kelas setelah sesi, tampil sebagai pengumuman di beranda siswa.
- **Logbook** (L14) dan **lembar observasi** (L13) sebagai formulir.
- Kehadiran manual untuk siswa tanpa perangkat.

### B2. Guru BK/konselor (P0)
- **Eskalasi**: daftar tanda merah, kuning, hijau sesuai L15, dengan catatan tindak lanjut dan rujukan.
- **Permintaan bicara**: daftar siswa (nama samaran dan, bila diizinkan, nama asli) yang menekan tombol "Aku ingin bicara dengan guru".
- Formulir insiden digital sesuai L15, disimpan terpisah dari data penelitian.

### B3. Peneliti/admin (P0)
- Kelola sekolah, kelas, kohort (eksperimen, kontrol, uji coba, survei), tanggal mulai, minggu posttest.
- Impor siswa (CSV), centang persetujuan orang tua, buat kode aktivasi, cetak kartu kode per kelas (PDF).
- Cetak **kartu keluarga** per kohort (QR ke Halaman Keluarga).
- Kelola kontak layanan, daftar kata filter, kata kunci eskalasi berbobot per kategori.
- Monitor kelengkapan data per sekolah.
- Ekspor riset (CSV) sesuai "06 Codebook Data Penelitian.md": satu baris per siswa per pengukuran, ditambah tabel keterlaksanaan. Hanya kode responden.
- Kelola konten dengan riwayat versi dan status persetujuan. Butir instrumen terkunci setelah pretest kohort pertama dimulai.
- Kelola pengguna dan peran bercakupan.
- Audit log.
- Saklar modul per program (lihat bagian 9).

### B4. Validator (P1)
- Melihat semua konten tanpa kunci jadwal dan mengisi lembar validasi L07 sampai L09 secara digital. Versi kertas tetap bisa dipakai.

### B5. Pelatihan fasilitator (P1)
- Modul pelatihan singkat di dalam S2: komunikasi empatik, batasan peran, cara memakai Mode Kelas, protokol eskalasi. Penyelesaiannya tercatat.

## 8. Fitur S3 (situs dan Halaman Keluarga)

- **Halaman Keluarga** (P0): satu kartu obrolan per minggu. Isinya topik minggu ini dalam bahasa orang tua, dua atau tiga pertanyaan pembuka obrolan, dan apa yang sebaiknya dihindari. Tanpa akun, tanpa data anak, tanpa pelacak.
- Dibuka lewat QR di kartu cetak atau tautan dari langkah Bawa Pulang. Tautan memakai token per kohort dan halaman diberi noindex, supaya tidak mudah tersebar ke kelompok kontrol.
- Yang dicatat hanya hitungan pembukaan per kartu per kohort, tanpa pengenal perangkat.
- Kebijakan privasi, syarat penggunaan, halaman permintaan hapus akun dan data, panduan instal bergambar (P0, syarat Google Play).

## 9. Modul yang bisa dimatikan

Setiap program punya saklar modul. Konfigurasi penelitian dr. Henky ditandai di kolom terakhir.

| Modul | Fungsi | Penelitian dr. Henky |
|---|---|---|
| instrumen_riset | Pretest, posttest, SUS, angket | Aktif |
| mode_kelas | Sesi dipandu fasilitator | Aktif |
| forum | Forum termoderasi | Aktif |
| cek_perasaan | Cek perasaan dan jurnal | Aktif |
| jalur_keluarga | Halaman Keluarga | Aktif (D12) |
| gamifikasi | Lingkaran, lencana, sertifikat | Aktif |
| kotak_tanya | Pertanyaan anonim | Diputuskan saat uji coba |
| skrining_psikologis | PHQ-A, GAD-7 dengan kewajiban rujukan | Mati (D8) |
| ai_prapenyaringan | Label risiko oleh model lokal | Mati (D9) |

## 10. Keamanan berlapis untuk tulisan siswa

1. **Laporan diri**: pilihan perasaan, chip penyebab, tombol "Aku ingin bicara dengan guru".
2. **Kata kunci berbobot per kategori**: data pribadi, kata kasar Indonesia dan Jawa, paksaan atau kekerasan, ajakan orang dewasa atau permintaan foto, menyakiti diri atau putus asa. Teks dinormalkan dulu (huruf berulang, angka pengganti huruf). Daftar disusun bersama guru BK dan psikolog, lalu diuji pada uji coba 30 siswa.
3. **AI pra-penyaringan (opsional)**: hanya memberi label pada antrean. Keputusan selalu oleh manusia. Tidak dipakai untuk chatbot siswa dan tidak untuk menilai instrumen.

Hasil deteksi masuk antrean eskalasi dengan tingkat merah, kuning, atau hijau dan waktu respons sesuai L15.

## 11. Kebutuhan non-fungsional

| Aspek | Ketentuan |
|---|---|
| Platform | PWA; Chrome Android sebagai target utama; berjalan juga di Chrome, Edge, Firefox, dan Safari versi terbaru di laptop dan tablet |
| Tata letak | Mobile first dengan tiga kelas lebar: ponsel, tablet, desktop. Navigasi bawah di ponsel, sidebar di desktop (rincian di file 02) |
| Perangkat minimum | Android 8, RAM 2 GB, layar 360 x 640 dp |
| Ukuran | Muat awal di bawah 1,5 MB tanpa media; media diunduh per sesi |
| Offline | Sesi yang sudah diunduh, aktivitas, kuis, jurnal, dan instrumen bisa dipakai tanpa internet; forum dan Mode Kelas langsung butuh internet |
| Sinkronisasi | Antrean lokal dengan kunci idempotensi; tidak ada data hilang saat aplikasi ditutup paksa |
| Kinerja | Layar utama tampil kurang dari 3 detik di HP kelas bawah setelah cache terisi |
| Privasi | Identitas di tabel terpisah dan terenkripsi; tanpa SDK iklan atau analitik pihak ketiga; fon dan ikon dihos sendiri |
| Keamanan | HTTPS, otorisasi per peran dan cakupan di server dengan uji akses untuk setiap endpoint, sesi kedaluwarsa, batas percobaan kode aktivasi |
| Aksesibilitas | Kontras WCAG AA, target sentuh minimal 48 dp, huruf dapat diperbesar sampai 200%, bisa dipakai dengan papan ketik di desktop, video bersubtitle, hormati pengaturan kurangi gerak |
| Bahasa | Bahasa Indonesia santai dan sopan; istilah medis selalu dijelaskan; semua teks antarmuka berada di berkas kamus, bukan di kode |
| Kepatuhan | UU 27/2022 Pelindungan Data Pribadi (data anak, persetujuan orang tua), kebijakan Google Play (file 05), persetujuan komisi etik |

## 12. Data keterlaksanaan (event log)

| Event | Data | Dipakai untuk |
|---|---|---|
| app_open, session_start, session_end | waktu, durasi | Menit belajar, hari aktif |
| class_session_join | sesi, kelas, waktu | Kehadiran sesi (dosis intervensi) |
| step_complete | sesi, langkah, mode (kelas, mandiri, susulan) | Penuntasan per langkah |
| content_view, content_complete | sesi, item, durasi | Keterpaparan materi |
| quiz_submit | sesi, skor, jawaban | Skor kuis per sesi |
| activity_submit | jenis, sesi (tanpa isi teks) | Penyelesaian aktivitas CBT |
| homework_complete | sesi | Penugasan rumah |
| checkin_submit | tingkat perasaan (tanpa teks) | Keterlibatan |
| breathing_complete | durasi | Keterlibatan |
| forum_post, forum_approved | jumlah, status | Partisipasi forum |
| help_request | waktu (tanpa isi) | Pemakaian jalur bantuan |
| instrument_submit | tahap, durasi, versi, kelas tampilan | Kelengkapan data |
| notification_open | jenis | Efektivitas pengingat |
| family_card_open | kartu, kohort (tanpa siswa) | Jangkauan jalur keluarga |

Isi teks bebas siswa tidak masuk ekspor riset kuantitatif. Analisis kualitatif atas teks itu perlu persetujuan etik tersendiri.

## 13. Metrik keberhasilan produk

| Metrik | Target |
|---|---|
| Siswa eksperimen yang berhasil aktivasi | 100% dari yang mendapat kode |
| Kehadiran Sesi Kelas | 80% atau lebih per sesi |
| Penuntasan minimal 6 dari 8 sesi | 80% atau lebih |
| Kelengkapan pretest dan posttest | 95% atau lebih responden tanpa butir kosong |
| Rata-rata skor SUS uji coba | Di atas 68 |
| Kehilangan data karena galat sinkronisasi | 0 |
| Waktu moderasi rata-rata | Kurang dari 24 jam |
| Waktu respons eskalasi merah | Hari yang sama |

## 14. Kebutuhan alat dan biaya yang perlu disiapkan

| Kebutuhan | Catatan |
|---|---|
| Perangkat siswa saat sesi | Studi pendahuluan: sekitar 82% siswa punya HP, tetapi banyak sekolah melarang HP. Perlu izin tertulis sekolah atau pemakaian lab komputer (D11). Inilah alasan tampilan desktop S1 dibuat serius |
| Wi-Fi atau kuota | Unduh sesi sebelum kelas; sediakan mode offline |
| Proyektor atau TV kelas | Untuk Layar Kelas |
| Produksi video dan ilustrasi | Lihat file 03 |
| Akun Google Play organisasi | Butuh nomor D-U-N-S (D4) |
| Domain dan hosting | Domain dan subdomain (dibeli); hosting di VPS Hostinger KVM 4 milik Pak Indra, tanpa biaya langganan tambahan |
| Penyimpanan cadangan di luar VPS | Kecil, tergantung pilihan D16 |

## 15. Keputusan terbuka

Daftar lengkap, status, dan alasan ada di "12 Catatan Keputusan.md". Ringkasnya: D1 instrumen di aplikasi atau Google Form; D2 nama dan ikon; D3 distribusi saat penelitian; D4 akun Google Play; D5 materi sensitif; D6 waitlist kontrol; D7 perlindungan data anak; D8 skrining psikologis; D9 modul AI; D10 siapa fasilitator; D11 perangkat siswa saat sesi; D12 bentuk jalur keluarga; D13 penyelarasan 3 fase dan 4 fase di naskah.

## 16. Rencana rilis singkat

| Versi | Isi | Untuk |
|---|---|---|
| 0.1 | Prototipe klik ponsel dan desktop | Uji keterbacaan desain, tahap Design |
| 0.5 | Prototipe 1 fungsional (S1, S2 inti, S3, 8 sesi konten draf) | Validasi ahli |
| 0.8 | Prototipe 2 (hasil revisi validator) | Uji coba terbatas 30 siswa |
| 1.0 | Produk final | Implementasi 8 minggu |
| 1.1 | Perbaikan pasca penelitian, waitlist kontrol | Rilis publik Play Store |
| 2.0 | Platform: program dan jenjang lain | Setelah disertasi |

Rincian tugas ada di "08 Task dan Roadmap.md".

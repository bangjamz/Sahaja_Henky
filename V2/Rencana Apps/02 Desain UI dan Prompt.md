# Desain UI dan Prompt

Versi 2.1, 11 November 2026. Berisi prinsip desain, design tokens, pola tata letak responsif, daftar layar S1 dan S2, serta prompt siap salin untuk alat desain berbasis AI (Claude Design, Google Stitch, v0, Figma Make, dan sejenisnya).

Palet teal dan maskot "Saja" dilanjutkan dari draft lama. Yang baru di versi ini: aturan kontras, pola navigasi yang berbeda untuk ponsel dan layar lebar, Tiga Lingkaran, Cek Perasaan, Mode Kelas, dan Layar Kelas.

## 1. Prinsip desain

1. **Aman dan tidak menghakimi.** Topik sensitif terasa wajar dibicarakan. Tidak menakut-nakuti, tidak vulgar, tidak menggurui.
2. **Pantas dilihat guru dan orang tua.** Setiap layar harus lolos jika dibuka di depan guru BK atau orang tua.
3. **Ringan.** HP kelas bawah, kuota terbatas, layar 360 dp.
4. **Privat secara default.** Nama samaran, notifikasi netral, keluar cepat.
5. **Satu tugas per layar** di instrumen, kuis, dan aktivitas.
6. **Ponsel dulu, tetapi layar lebar bukan ponsel yang diregangkan.** Navigasi, kepadatan, dan susunan panel berubah mengikuti lebar layar. Isi dan urutannya tetap sama.
7. **Tenang seperti aplikasi kesehatan.** Banyak ruang kosong, satu aksen warna per layar, angka besar yang mudah dibaca, gerak yang halus.

## 2. Design tokens

Token ditulis sekali di `packages/tokens` lalu dipakai S1, S2, dan S3. Tidak boleh ada nilai warna, ukuran, atau radius yang ditulis langsung di komponen.

### 2.1 Warna

| Token | Nilai | Pemakaian |
|---|---|---|
| primary | #0E9594 | Ikon aktif, cincin Belajar, latar ilustrasi, garis fokus |
| primary-strong | #006766 | Tombol utama berisi, tautan, teks di atas latar teal muda |
| primary-soft | #E3F4F4 | Latar kartu aktif, item navigasi terpilih |
| secondary | #2D6CDF | Cincin Berlatih, chip materi, aksen S2 |
| secondary-soft | #E7EFFC | Latar kartu informasi |
| accent | #F5B841 | Cincin Merenung, sorotan, lencana (selalu dengan teks gelap) |
| success | #2FBF71 | Jawaban benar, selesai (ikon dan garis) |
| success-strong | #1B7F4B | Teks status selesai |
| caution | #E8871E | Jawaban belum tepat, perlu perhatian (ikon dan garis) |
| caution-soft | #FCEFDD | Latar umpan balik belum tepat |
| danger | #C2410C | Galat sistem dan eskalasi merah di S2; tidak untuk umpan balik belajar |
| bg | #F7F9FB | Latar aplikasi |
| surface | #FFFFFF | Kartu |
| border | #E3E8EE | Garis kartu dan pemisah |
| text | #1F2933 | Teks utama |
| text-muted | #5B6770 | Teks sekunder |

Aturan kontras:
- Teks putih di atas `primary` (#0E9594) hanya mencapai rasio sekitar 3,7:1, tidak cukup untuk teks biasa. Karena itu tombol berisi memakai `primary-strong` (#006766, sekitar 6,7:1). Ini juga yang dipakai prototipe lama.
- `accent` dan `caution` tidak pernah diberi teks putih.
- Informasi tidak boleh hanya dibedakan lewat warna. Status selalu disertai ikon atau kata.
- Setiap pasangan warna baru diperiksa dengan alat kontras sebelum dipakai.

Mode gelap tidak dibuat di versi 1. Token tetap diberi nama semantik supaya mode gelap bisa ditambahkan tanpa mengubah komponen.

### 2.2 Tipografi

Fon: Plus Jakarta Sans (variabel, dihos sendiri dalam format woff2, subset Latin). Cadangan: system-ui.

| Gaya | Ponsel | Desktop | Berat |
|---|---|---|---|
| display | 28/34 | 36/44 | 800 |
| title | 22/28 | 26/32 | 700 |
| heading | 18/24 | 20/28 | 700 |
| body | 16/24 | 16/26 | 400 |
| body-strong | 16/24 | 16/26 | 600 |
| small | 14/20 | 14/20 | 400 |
| label | 13/16 | 13/16 | 600 |

Ukuran ditulis dalam rem agar mengikuti pengaturan huruf pengguna. Panjang baris bacaan maksimum sekitar 68 karakter.

### 2.3 Bentuk, jarak, gerak

| Token | Nilai |
|---|---|
| radius | kartu 20, tombol 16 atau pill, input 12, chip pill |
| spacing | kelipatan 4; margin layar 20 (ponsel), 24 (tablet), 32 (desktop) |
| elevation-1 | 0 4 20 rgba(31,41,51,0.05) untuk kartu |
| elevation-2 | 0 8 28 rgba(31,41,51,0.10) untuk lembar bawah dan dialog |
| ikon | Lucide, stroke 2, ukuran 24; ikon khusus domain digambar pada grid yang sama |
| motion-fast | 120 ms untuk tekan dan hover |
| motion-base | 220 ms untuk transisi layar dan kartu |
| motion-slow | 600 ms untuk pengisian cincin dan perayaan |
| easing | cubic-bezier(0.2, 0, 0, 1) |

Semua animasi nonaktif atau disederhanakan saat pengguna memilih kurangi gerak.

## 3. Tata letak responsif

### 3.1 Kelas lebar

| Kelas | Lebar viewport | Contoh perangkat | Navigasi utama |
|---|---|---|---|
| Ponsel | di bawah 600 px | HP Android | Bilah bawah |
| Tablet | 600 sampai 1023 px | Tablet, HP mendatar | Rel navigasi di kiri (ikon dan label, lebar 80 px) |
| Desktop | 1024 px ke atas | Laptop, Chromebook, komputer lab | Sidebar 264 px yang bisa diciutkan menjadi 72 px dengan tombol hamburger |
| Desktop lebar | 1280 px ke atas | Monitor | Sidebar ditambah panel konteks kanan 320 px |

Komponen memakai container query, bukan hanya media query, supaya kartu yang sama bisa dipakai di kolom sempit maupun lebar.

### 3.2 S1 (siswa) di ponsel

```
+--------------------------------+
| SAHAJA            (?)   (bel)  |  bilah atas: logo, bantuan, notifikasi
+--------------------------------+
| Halo, Bintang27!               |
| [ Sesi minggu ini  Lanjutkan ] |
| [ Tiga Lingkaran minggu ini  ] |
| [ Tugas rumah                ] |
| [ Gimana perasaanmu?         ] |
| [ Dari gurumu                ] |
+--------------------------------+
| Beranda  Belajar  Forum   Aku  |  bilah bawah 4 tab
+--------------------------------+
```

- Empat tab: Beranda, Belajar, Forum, Aku. Jurnal, lencana, sertifikat, dan pengaturan berada di dalam Aku.
- Tombol bantuan (ikon pelampung) selalu ada di bilah atas.
- Aksi utama berada di sepertiga bawah layar agar terjangkau ibu jari.
- Daftar pilihan dan formulir pendek muncul sebagai lembar bawah.

### 3.3 S1 (siswa) di desktop

```
+----------+--------------------------------------+----------------+
| [=] SAHAJA|  Halo, Bintang27!                   | Minggu ini     |
|          |                                      | (Tiga Lingkaran)|
| Beranda  |  [ Sesi minggu ini      Lanjutkan ]  |                |
| Belajar  |                                      | Tugas rumah    |
| Forum    |  [ Gimana perasaanmu? ]              | [ ] ...        |
| Jurnalku |  [ Dari gurumu ]                     |                |
| Lencana  |                                      | Butuh bantuan? |
| ........ |                                      |                |
| Bantuan  |                                      |                |
| Atur     |                                      |                |
+----------+--------------------------------------+----------------+
 sidebar 264   kolom isi, maksimum 720 px           panel konteks 320
```

- Sidebar memunculkan tujuan yang di ponsel tersimpan di dalam Aku: Jurnalku, Lencana dan Sertifikat, Pengaturan. Tombol hamburger menciutkan sidebar menjadi deretan ikon; pilihan ini diingat.
- Panel konteks kanan berisi Tiga Lingkaran, tugas rumah, dan pintasan bantuan. Di bawah 1280 px panel ini turun menjadi kartu di kolom isi.
- Peta belajar berubah dari jalur vertikal berkelok menjadi jalur mendatar dua baris, dengan panel rincian sesi di kanan (pola daftar dan rincian).
- Forum memakai dua panel: daftar topik di kiri, isi topik di kanan.
- Lembar bawah berubah menjadi dialog tengah atau popover.
- Semua fungsi bisa dijalankan dengan papan ketik; fokus terlihat jelas.

### 3.4 Layar imersif (semua ukuran)

Kuesioner, pemutar materi, aktivitas CBT, kuis, dan Atur Napas menyembunyikan navigasi. Yang tampil hanya progres, tombol keluar, dan isi dalam satu kartu tengah.

- Lebar isi maksimum 560 px untuk kuesioner dan kuis, 640 px untuk materi dan aktivitas.
- Di desktop, latar di luar kartu dibiarkan polos. Tidak ada panel tambahan yang mengalihkan perhatian.
- Untuk kuesioner penelitian, teks, urutan, dan jumlah butir per layar sama persis di semua ukuran. Ini syarat penelitian, bukan sekadar selera desain.

### 3.5 S2 (pendamping)

S2 dirancang dari desktop karena pekerjaannya padat data, lalu diturunkan ke ponsel untuk tugas cepat.

Desktop:

```
+-------------------+---------------------------------------------+
| [=] Pendamping    | SMP N 1 ... / Kelas 8A  v      (bel) (akun) |
|                   +---------------------------------------------+
| PENDAMPINGAN      |  Antrean moderasi (5)                       |
|  Beranda          |  +----------------+------------------------+|
|  Sesi dan Panduan |  | daftar posting | isi posting, konteks,  ||
|  Kelasku          |  | (pilih dengan  | tombol Setujui, Tolak, ||
|  Moderasi   (5)   |  |  panah)        | Tandai eskalasi        ||
|  Eskalasi   (1)   |  +----------------+------------------------+|
|  Logbook          |                                             |
| PENELITIAN        |                                             |
|  Dasbor           |                                             |
|  Kelengkapan data |                                             |
|  Ekspor           |                                             |
| KELOLA            |                                             |
|  Sekolah, Kohort, |                                             |
|  Siswa, Konten... |                                             |
+-------------------+---------------------------------------------+
```

- Sidebar dikelompokkan menurut pekerjaan. Kelompok yang tampil mengikuti peran pengguna.
- Pemilih cakupan (sekolah dan kelas) ada di bilah atas.
- Tabel memakai kepala kolom abu-abu muda, baris bisa disaring dan diurutkan, lebar isi mengikuti layar.
- Pintasan papan ketik di antrean moderasi: S setujui, T tolak, E eskalasi, panah untuk pindah.

Ponsel:
- Bilah bawah mengikuti peran. Fasilitator: Beranda, Sesi, Kelas, Moderasi, Lainnya. Peneliti: Beranda, Data, Siswa, Lainnya.
- Tabel berubah menjadi kartu bertumpuk dengan tiga atau empat keterangan terpenting.
- Pekerjaan berat (impor CSV, ekspor, kelola konten) tetap bisa dibuka, dengan catatan "lebih nyaman di layar lebar".

### 3.6 Layar Kelas (proyektor)

- Rasio 16:9, huruf sangat besar (judul 48 px ke atas), kontras tinggi, tanpa detail kecil.
- Isi: nama sesi dan langkah aktif, pengatur waktu, materi atau pertanyaan pemantik, kode gabung dan QR, hasil gabungan anonim.
- Tidak pernah menampilkan nama samaran bersama jawaban, isi tulisan siswa, atau data perasaan.

## 4. Komponen khas

| Komponen | Uraian |
|---|---|
| Tiga Lingkaran | Tiga cincin terpisah tersusun seperti daun semanggi: Belajar (primary), Berlatih (secondary), Merenung (accent). Tiap cincin punya ikon di tengah dan keterangan teks "3 dari 4". Bukan cincin konsentris |
| Kartu Sesi | Sampul, nomor dan judul sesi, enam titik langkah, tombol Lanjutkan |
| Jalur Langkah | Enam langkah sesi: Buka, Pahami, Latih, Bahas, Cek dan Renung, Bawa Pulang |
| Cek Perasaan | Lima wajah sederhana berlabel kata, chip penyebab, kolom satu kalimat, tombol "Aku ingin bicara dengan guru" |
| Atur Napas | Lingkaran yang mengembang dan mengempis dengan hitungan, durasi 1 menit, bisa dihentikan kapan saja |
| Kartu Bacaan | Maksimum sekitar 80 kata, satu ilustrasi, digeser satu per satu |
| Gelembung Maskot | Percakapan untuk Catat Pikiranmu |
| Pilihan Cabang | Kartu pilihan besar untuk Keputusanku |
| Umpan Balik Kuis | Benar: hijau dengan centang. Belum tepat: latar caution-soft dengan penjelasan. Tidak ada warna merah |
| Butir Kuesioner | Satu pernyataan, pilihan vertikal berlabel teks, tombol Lanjut, tautan kecil Lewati |
| Label Status | Menunggu persetujuan, Tersimpan di perangkat, Terkirim, Offline |
| Keluar Cepat | Tombol X tetap di pojok kanan atas layar materi sensitif |
| Kartu Eskalasi (S2) | Tingkat merah, kuning, hijau dengan ikon dan kata, sumber, waktu, tindak lanjut |

Setiap komponen wajib punya keadaan: bawaan, hover (desktop), fokus, ditekan, nonaktif, memuat, kosong, galat, offline.

## 5. Daftar layar S1 (siswa)

| Kode | Layar | Catatan |
|---|---|---|
| A-01 | Splash | Logo, maskot, tagline |
| A-02 | Masukkan kode aktivasi | 6 kotak karakter, bantuan, keadaan galat |
| A-03 | Assent (4 kartu) | Apa itu, yang dilakukan 8 minggu, datamu aman, boleh berhenti |
| A-04 | Nama samaran dan avatar | Grid avatar, tombol acak, peringatan jangan pakai nama asli |
| A-05 | Tur singkat (3 slide) | Belajar di kelas dan di rumah, forum aman, Tiga Lingkaran |
| A-06 | Intro kuesioner | "Ini bukan ujian", perkiraan 25 menit |
| A-07 | Butir data diri | Satu pertanyaan per layar |
| A-08 | Butir pengetahuan | Benar, Salah, Tidak tahu |
| A-09 | Butir sikap | Lima pilihan berlabel teks, tanpa warna yang menghakimi |
| A-10 | Kuesioner selesai | Status tersimpan dan terkirim |
| A-11 | Beranda | Sesi minggu ini, Tiga Lingkaran, tugas rumah, Cek Perasaan, pengumuman |
| A-12 | Peta belajar | 8 titik, status, tanggal buka |
| A-13 | Detail sesi | Enam langkah, tombol unduh, tombol Gabung Sesi Kelas |
| A-14 | Gabung Sesi Kelas | Masukkan kode 4 angka atau pindai QR; layar tunggu "Menunggu gurumu membuka langkah berikutnya" |
| A-15 | Pemutar materi | Kartu bacaan, video bersubtitle, Suara Remaja Pati, keluar cepat |
| A-16 | Catat Pikiranmu | Percakapan 5 langkah dengan maskot |
| A-17 | Keputusanku | Cerita bergambar dan pilihan |
| A-18 | Berani Bilang Tidak | Pilih atau ketik kalimat menolak |
| A-19 | Rencana Aksi Sehat | 1 sampai 3 rencana dengan ceklis |
| A-20 | Atur Napas | Lingkaran napas 1 menit |
| A-21 | Kuis sesi | 5 soal, umpan balik langsung, layar hasil dan lencana |
| A-22 | Refleksi | Satu pertanyaan |
| A-23 | Bawa Pulang | Rangkuman, tugas rumah, kartu obrolan keluarga (bagikan tautan atau tunjukkan QR) |
| A-24 | Komitmenku | Tulis atau pilih komitmen (Sesi 6 dan 8) |
| A-25 | Forum kelas | Topik pemantik dan posting |
| A-26 | Detail topik | Balasan, suka, lapor, banner "dijaga guru" |
| A-27 | Tulis posting | Peringatan data pribadi |
| A-28 | Cek Perasaan | Lembar bawah (ponsel) atau dialog (desktop) |
| A-29 | Jurnalku | Riwayat perasaan dan grafik keaktifan, hanya untuk siswa |
| A-30 | Aku (profil) | Avatar, lencana, Komitmenku, sertifikat, pengaturan |
| A-31 | Butuh bantuan? | Guru BK, Puskesmas (PKPR), SAPA 129, tombol "Aku ingin bicara dengan guru" |
| A-32 | Sertifikat | Pratinjau, simpan gambar |
| A-33 | Posttest dan penutup | Kartu di beranda, alur sama dengan pretest, layar selamat |
| A-34 | SUS dan angket respon | Satu butir per layar |
| A-35 | Mode kontrol | Beranda sederhana: status kuesioner |
| A-36 | Keadaan umum | Offline, memuat, kosong, galat, konfirmasi keluar kuesioner, pembaruan aplikasi tersedia |

## 6. Daftar layar S2 (pendamping)

| Kode | Layar | Peran |
|---|---|---|
| B-01 | Masuk | Semua |
| B-02 | Beranda fasilitator | Kelas, sesi minggu ini, moderasi tertunda, peringatan |
| B-03 | Sesi dan panduan | Fasilitator |
| B-04 | Kendali Sesi Kelas | Fasilitator: kode gabung, langkah aktif, pengatur waktu, jumlah bergabung dan selesai |
| B-05 | Layar Kelas | Tampilan proyektor |
| B-06 | Kelasku | Tabel siswa dan kehadiran |
| B-07 | Antrean moderasi | Fasilitator |
| B-08 | Eskalasi dan permintaan bicara | Guru BK, fasilitator, peneliti |
| B-09 | Formulir insiden | Guru BK, peneliti |
| B-10 | Logbook dan observasi | Fasilitator, peneliti |
| B-11 | Catatan penguatan dan pengumuman | Fasilitator |
| B-12 | Dasbor peneliti | Kelengkapan data, penuntasan sesi, kehadiran |
| B-13 | Sekolah, kohort, kelas | Peneliti |
| B-14 | Siswa dan kode aktivasi | Peneliti; impor CSV, persetujuan orang tua, cetak kartu kode dan kartu keluarga |
| B-15 | Konten dan versi | Peneliti, penulis konten |
| B-16 | Ekspor data | Peneliti |
| B-17 | Layanan, kata filter, kata kunci | Peneliti, admin sekolah |
| B-18 | Pengguna dan peran | Admin |
| B-19 | Saklar modul | Admin program |
| B-20 | Audit log | Peneliti |
| B-21 | Mode validator | Validator |
| B-22 | Pelatihan fasilitator | Fasilitator |

## 7. Bahasa antarmuka

- Sapaan "kamu", kalimat pendek, nada kakak yang ramah. Di S2 memakai "Anda" dan nada profesional.
- Contoh benar: "Yuk kenali risikonya, biar kamu yang pegang kendali."
- Contoh salah: "Seks bebas menghancurkan masa depanmu."
- Istilah medis selalu dijelaskan: "IMS (infeksi yang bisa menular lewat hubungan seksual)".
- Hindari kata "dosa", "aib", "jijik", dan sejenisnya.
- Umpan balik kuis salah: "Belum tepat. Ini penjelasannya..."
- Daftar istilah baku dan kamus teks ada di "11 Glosarium dan Kamus Teks.md".

## 8. Prompt induk (tempel pertama kali)

```
Rancang prototipe UI high-fidelity untuk PWA bernama SAHAJA (Sahabat Remaja Jaga
Diri): aplikasi edukasi kesehatan reproduksi dan pencegahan Infeksi Menular Seksual
(IMS) untuk siswa SMP usia 13 sampai 15 tahun di Jawa Tengah, bagian dari penelitian
disertasi. Program 8 sesi mingguan berbasis Cognitive Behavioral Therapy, dipandu
fasilitator di kelas dan dilanjutkan tugas di rumah.

Buat DUA tata letak untuk setiap layar utama:
1. Ponsel 360 x 800: bilah atas (logo, ikon bantuan, ikon notifikasi) dan bilah
   bawah 4 tab (Beranda, Belajar, Forum, Aku).
2. Desktop 1440 x 900: sidebar kiri 264 px yang bisa diciutkan dengan tombol
   hamburger (Beranda, Belajar, Forum, Jurnalku, Lencana, Bantuan, Pengaturan),
   kolom isi maksimum 720 px, panel konteks kanan 320 px.
Tata letak desktop bukan ponsel yang diregangkan: pakai sidebar, dua panel, dan
dialog sebagai pengganti lembar bawah. Isi dan urutannya tetap sama.

Nada visual: tenang seperti aplikasi kesehatan, hangat, tidak menghakimi, tidak
vulgar, pantas dilihat guru dan orang tua. Semua teks Bahasa Indonesia santai
dan sopan.

Design system:
- Warna: primary teal #0E9594 (ikon, aksen), primary-strong #006766 (tombol berisi
  dengan teks putih), primary-soft #E3F4F4, secondary biru #2D6CDF, accent kuning
  #F5B841 (teks gelap), success #2FBF71, caution #E8871E dengan latar #FCEFDD,
  latar #F7F9FB, kartu #FFFFFF, garis #E3E8EE, teks #1F2933, teks sekunder #5B6770.
  Jangan pakai merah untuk umpan balik belajar.
- Font Plus Jakarta Sans; body 16, sekunder 14, judul 22 sampai 26 bold.
- Sudut kartu 20, tombol 16 atau pill, input 12. Bayangan sangat halus.
- Ikon outline Lucide stroke 2.
- Maskot "Saja": remaja netral berhoodie teal, gaya flat vector, muncul di
  onboarding, keadaan kosong, dan layar sukses.
- Target sentuh minimal 48, kontras WCAG AA, mode terang.

Komponen khas: Tiga Lingkaran mingguan (tiga cincin terpisah tersusun seperti daun
semanggi: Belajar teal, Berlatih biru, Merenung kuning; bukan cincin konsentris),
kartu Cek Perasaan dengan lima wajah berlabel kata, jalur enam langkah sesi (Buka,
Pahami, Latih, Bahas, Cek dan Renung, Bawa Pulang).

Larangan: foto orang nyata, gambar anatomi eksplisit, ilustrasi menakutkan, iklan,
tombol berbagi ke media sosial, login Google atau Facebook, skor atau peringkat
antarsiswa, kata IMS atau seksual pada contoh notifikasi.

Data contoh: nama samaran "Bintang27", Sesi 3 aktif, sesi 1 sampai 2 selesai,
sesi 4 sampai 8 terkunci dengan tanggal buka.
```

## 9. Prompt per kelompok layar

Tempel setelah prompt induk, satu per satu. Setiap prompt menghasilkan versi ponsel dan desktop.

**P1. Onboarding (A-01 sampai A-05)**
```
Buat 5 layar onboarding: splash; masukkan kode aktivasi 6 karakter dengan teks
bantuan "Kodemu ada di kartu dari Bapak/Ibu guru" dan keadaan galat "Kode belum
cocok, cek lagi ya"; assent berupa 4 kartu bergambar (Apa itu SAHAJA, Yang kamu
lakukan selama 8 minggu, Datamu aman dan pakai nama samaran, Kamu boleh berhenti
kapan saja) dengan kotak centang "Aku mengerti dan mau ikut"; pilih avatar dan nama
samaran dengan tombol acak serta peringatan "Jangan pakai nama aslimu ya"; tur
singkat 3 slide. Di desktop, semuanya berada di satu kartu tengah selebar 560 px
dengan ilustrasi di sisi kiri.
```

**P2. Kuesioner (A-06 sampai A-10)**
```
Buat alur kuesioner penelitian sebagai layar imersif tanpa navigasi: intro (maskot,
"Ini bukan ujian dan tidak memengaruhi nilai. Kalau tidak tahu, pilih Tidak tahu",
perkiraan 25 menit); butir pengetahuan satu pernyataan per layar dengan tiga tombol
besar Benar, Salah, Tidak tahu, progres "Soal 4 dari 27", tautan kecil "Lewati";
butir sikap dengan 5 pilihan berlabel (Sangat tidak setuju, Tidak setuju, Ragu-ragu,
Setuju, Sangat setuju) tersusun vertikal; layar selesai dengan centang dan status
"Tersimpan di perangkat, akan terkirim otomatis". Tanpa tombol kembali, tanpa skor.
Versi desktop memakai kartu tengah 560 px dengan teks, urutan, dan pilihan yang sama
persis dengan versi ponsel.
```

**P3. Beranda dan peta belajar (A-11, A-12)**
```
Buat beranda: sapaan "Halo, Bintang27!"; kartu besar "Sesi minggu ini: Sesi 3,
Bagaimana IMS Menular" dengan enam titik langkah dan tombol Lanjutkan; komponen Tiga
Lingkaran minggu ini (Belajar 3 dari 4, Berlatih 1 dari 2, Merenung 2 dari 3); kartu
tugas rumah dengan ceklis; kartu "Gimana perasaanmu hari ini?" dengan lima wajah
berlabel; kartu "Dari gurumu". Versi desktop: Tiga Lingkaran, tugas rumah, dan
pintasan bantuan pindah ke panel kanan. Lalu buat peta belajar 8 sesi: jalur
vertikal berkelok di ponsel, jalur mendatar dua baris dengan panel rincian sesi di
kanan pada desktop. Sesi 1 sampai 2 selesai, sesi 3 aktif dengan maskot, sesi 4
sampai 8 terkunci dengan tanggal buka. Judul sesi: Kenalan Yuk; Remaja dan Kesehatan
Reproduksi; Bagaimana IMS Menular; Fakta atau Mitos?; Aku yang Memutuskan; Forum
Sahabat; Cari Info yang Tepat; Aku Siap Mandiri.
```

**P4. Sesi belajar (A-13 sampai A-24)**
```
Buat alur satu sesi dengan jalur enam langkah di bagian atas (Buka, Pahami, Latih,
Bahas, Cek dan Renung, Bawa Pulang): detail sesi dengan tombol "Unduh sesi untuk
offline (12 MB)" dan tombol "Gabung Sesi Kelas"; layar gabung dengan kode 4 angka
dan layar tunggu "Menunggu gurumu membuka langkah berikutnya"; pemutar materi berupa
kartu bacaan bergeser dengan ilustrasi flat dan tombol keluar cepat (X) di kanan
atas; aktivitas "Catat Pikiranmu" berbentuk percakapan dengan maskot (situasi,
pikiran yang muncul, perasaan, cek fakta, pikiran yang lebih sehat); simulasi
"Keputusanku" dengan cerita pendek dan 3 pilihan; "Atur Napas" dengan lingkaran yang
mengembang dan hitungan; kuis 5 soal dengan umpan balik langsung (benar: hijau dan
centang; belum tepat: latar krem oranye dan penjelasan); layar lencana; refleksi satu
pertanyaan; layar Bawa Pulang berisi rangkuman 3 poin, tugas rumah, dan kartu "Ajak
ngobrol orang di rumah" dengan tombol tunjukkan QR.
```

**P5. Forum (A-25 sampai A-27)**
```
Buat forum kelas: daftar topik pemantik dari guru dan posting siswa (nama samaran,
avatar, jumlah balasan, label Tanya, Cerita, Info); posting sendiri yang belum
disetujui diberi lencana kuning "Menunggu persetujuan guru"; detail topik dengan
balasan bergaya gelembung, tombol suka dan menu Laporkan; banner tipis "Forum ini
dijaga guru pendamping supaya tetap aman"; layar tulis posting dengan peringatan
"Jangan tulis nama asli, nomor HP, atau akun media sosial". Tidak ada pesan pribadi.
Versi desktop memakai dua panel: daftar topik di kiri, isi topik di kanan.
```

**P6. Perasaan, profil, bantuan, penutup (A-28 sampai A-35)**
```
Buat Cek Perasaan (lembar bawah di ponsel, dialog di desktop): lima wajah berlabel
(Berat, Kurang enak, Biasa, Baik, Senang), chip penyebab (Sekolah, Teman, Keluarga,
Kesehatan, Media sosial, Lainnya), kolom satu kalimat opsional, dan tautan "Aku
ingin bicara dengan guru". Buat Jurnalku dengan riwayat perasaan dan grafik batang
keaktifan mingguan berlabel "Hanya kamu yang bisa melihat ini". Buat profil (avatar,
nama samaran, grid 8 lencana, kartu Komitmenku, kartu sertifikat terkunci, menu
pengingat); halaman Butuh bantuan? berisi kartu kontak Guru BK, Puskesmas (PKPR),
dan SAPA 129 dengan tombol telepon; sertifikat bernuansa teal dan kuning; kartu
posttest di beranda "Satu langkah terakhir!"; layar selamat dengan maskot merayakan;
dan beranda mode kelompok pembanding yang hanya berisi status kuesioner serta pesan
"Materi akan terbuka setelah kuesioner akhir".
```

**P7. SAHAJA Pendamping (B-01 sampai B-22)**
```
Rancang aplikasi web SAHAJA Pendamping untuk fasilitator, guru BK, dan peneliti
dengan design system yang sama, aksen biru #2D6CDF lebih dominan, dan kepadatan
informasi lebih tinggi. Rancang desktop 1440 x 900 lebih dulu: sidebar kiri
berkelompok (Pendampingan: Beranda, Sesi dan Panduan, Kelasku, Moderasi, Eskalasi,
Logbook; Penelitian: Dasbor, Kelengkapan Data, Ekspor; Kelola: Sekolah dan Kohort,
Siswa dan Kode, Konten, Layanan dan Kata Kunci, Pengguna dan Peran), bilah atas
dengan pemilih sekolah dan kelas. Layar: beranda fasilitator; panduan sesi 90 menit
berbentuk garis waktu enam bagian; Kendali Sesi Kelas (kode gabung besar dan QR,
langkah aktif, pengatur waktu, "24 dari 30 siswa bergabung"); tabel Kelasku (nama
samaran, pretest, sesi tuntas 0 sampai 8, kehadiran, terakhir aktif); antrean
moderasi dua panel dengan tombol Setujui, Tolak, Tandai eskalasi; daftar eskalasi
tiga tingkat dengan ikon dan kata (Darurat, Perlu tindak lanjut, Informasi); dasbor
peneliti (kartu kelengkapan pretest, posttest, SUS per sekolah; grafik penuntasan
sesi per minggu); kelola siswa dan kode aktivasi dengan impor CSV dan centang
persetujuan orang tua; ekspor data. Kepala tabel abu-abu muda. Lalu buat versi
ponsel 360 x 800: bilah bawah (Beranda, Sesi, Kelas, Moderasi, Lainnya) dan tabel
berubah menjadi kartu bertumpuk.
```

**P8. Layar Kelas (B-05)**
```
Rancang tampilan proyektor 1920 x 1080 untuk sesi kelas SAHAJA: latar terang, huruf
sangat besar, kontras tinggi. Tiga keadaan: (1) layar gabung dengan kode 4 angka
raksasa, QR, dan hitungan "18 siswa sudah bergabung"; (2) layar materi dengan nama
sesi, langkah aktif "Pahami", pengatur waktu 25:00, satu kartu bacaan besar; (3)
layar hasil gabungan anonim "Fakta atau mitos?" berupa dua batang besar dengan
persentase. Tidak ada nama siswa atau isi tulisan siswa di layar mana pun.
```

## 10. Catatan untuk desainer

- Semua ilustrasi orang bergaya kartun netral dan berbusana sopan (sebagian berhijab), mencerminkan siswa SMP di pesisir utara Jawa Tengah.
- Tidak ada gambar organ reproduksi. Materi tubuh memakai diagram sederhana yang disetujui ahli materi.
- Uji setiap layar pada 360 px, 768 px, 1024 px, dan 1440 px sebelum dianggap selesai.
- Uji dengan huruf diperbesar 200% dan dengan papan ketik saja.
- Simpan setiap iterasi desain dan hasil uji keterbacaan sebagai bukti tahap Design ADDIE (bahan gambar di Bab IV).

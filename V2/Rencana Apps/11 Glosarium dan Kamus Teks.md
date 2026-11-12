# Glosarium dan Kamus Teks

Versi 2.2, 12 November 2026: bagian backend disesuaikan dengan keputusan T10, isi lain tetap versi 2.1 (11 November 2026). Satu rujukan untuk istilah, nama fitur, dan teks antarmuka yang sering dipakai, supaya dokumen, kode, dan tampilan memakai kata yang sama siapa pun yang mengerjakannya.

## 1. Istilah penelitian (wajib sama dengan naskah disertasi)

| Istilah baku | Jangan ditulis |
|---|---|
| Infeksi Menular Seksual (IMS) | PMS, penyakit kelamin |
| mobile app | aplikasi seluler, apps (di naskah) |
| siswa SMP | murid, pelajar SMP, anak SMP |
| Eks-Karesidenan Pati | eks karesidenan Pati, Karesidenan Pati |
| kelompok eksperimen | kelompok intervensi, kelompok perlakuan |
| kelompok kontrol | kelompok pembanding (boleh di teks antarmuka siswa) |
| pengetahuan | pengetahuan tentang IMS disingkat lain |
| sikap pencegahan IMS | sikap saja (bila merujuk variabel Y) |
| pretest, posttest | pre-test, tes awal (di naskah) |
| fasilitator | mentor, tutor |
| guru BK/konselor | guru pembimbing |

Di teks antarmuka siswa, pretest dan posttest disebut "kuesioner awal" dan "kuesioner akhir".

## 2. Nama permukaan dan fitur

| Nama baku | Kode | Keterangan |
|---|---|---|
| SAHAJA | S1 | Aplikasi siswa |
| SAHAJA Pendamping | S2 | Aplikasi fasilitator, guru BK, peneliti, validator |
| Situs SAHAJA | S3 | Halaman web ringan dari Laravel |
| Halaman Keluarga | S3 | Kartu obrolan mingguan untuk orang tua |
| Asisten Pra-penyaringan | S4 | Modul AI opsional |
| Mode Kelas | | Sesi dipandu fasilitator |
| Sesi Kelas | | Satu pertemuan yang dibuka fasilitator |
| Layar Kelas | | Tampilan proyektor |
| Mode Mandiri | | Pemakaian di luar Sesi Kelas |
| sesi susulan | | Sesi yang dikerjakan mandiri karena tidak hadir |
| Tiga Lingkaran | | Belajar, Berlatih, Merenung |
| Cek Perasaan | | Pilihan perasaan harian |
| Jurnalku | | Riwayat perasaan |
| Atur Napas | | Latihan napas 1 menit |
| Catat Pikiranmu | | Restrukturisasi kognitif |
| Keputusanku | | Simulasi bercabang |
| Berani Bilang Tidak | | Latihan asertif |
| Rencana Aksi Sehat | | Rencana mingguan |
| Komitmenku | | Komitmen pribadi |
| Suara Remaja Pati | | Konten lokal dari tahap Analysis |
| Kotak Tanya | | Pertanyaan anonim ke fasilitator |
| Butuh bantuan? | | Halaman kontak layanan |
| Bawa Pulang | | Langkah penutup sesi |
| kartu obrolan keluarga | | Isi Halaman Keluarga |
| nama samaran | | Bukan "username" atau "nickname" |
| kode aktivasi | | 6 karakter, per siswa |
| kode gabung | | 4 angka, per Sesi Kelas |

Enam langkah sesi: Buka, Pahami, Latih, Bahas, Cek dan Renung, Bawa Pulang.

Judul sesi: (1) Kenalan Yuk; (2) Remaja dan Kesehatan Reproduksi; (3) Bagaimana IMS Menular; (4) Fakta atau Mitos?; (5) Aku yang Memutuskan; (6) Forum Sahabat; (7) Cari Info yang Tepat; (8) Aku Siap Mandiri.

## 3. Padanan nama di kode

| Di antarmuka | Di kode dan basis data |
|---|---|
| sesi program (8 sesi) | `sessions_content` |
| Sesi Kelas | `class_sessions` |
| kehadiran | `attendance` |
| Cek Perasaan | `mood_checkins` |
| permintaan bicara | `help_requests` |
| Komitmenku | `commitments` |
| tugas rumah | `homework` |
| catatan penguatan | `class_notes` |
| kartu obrolan keluarga | `family_cards` |
| eskalasi | `escalations` |
| tanda risiko | `risk_flags` |
| langkah sesi | `session_steps.stage`: buka, pahami, latih, bahas, cek_renung, bawa_pulang |
| mode pengerjaan | `progress.mode`: class, self, makeup |
| lengan kohort | `cohorts.arm`: experiment, control, pilot, survey, demo |

## 4. Gaya bahasa

| Untuk | Sapaan | Nada |
|---|---|---|
| Siswa (S1) | kamu, aku | Kakak yang ramah, kalimat pendek, tidak menggurui |
| Staf (S2) | Anda | Profesional, ringkas |
| Orang tua (S3) | Bapak/Ibu | Hangat, hormat, tanpa istilah teknis |

Kata yang dihindari di semua permukaan: dosa, aib, jijik, nakal, rusak, terjerumus, korban pergaulan. Kalimat yang menakut-nakuti atau menyalahkan tidak dipakai.

Istilah medis selalu dijelaskan saat pertama muncul, misalnya "IMS (infeksi yang bisa menular lewat hubungan seksual)".

## 5. Kamus teks inti

Kunci mengikuti pola `area.layar.elemen`. Daftar ini contoh yang mengikat gaya; kamus lengkap ada di `apps/*/src/teks/id.json`.

| Kunci | Teks |
|---|---|
| umum.lanjut | Lanjut |
| umum.kembali | Kembali |
| umum.simpan | Simpan |
| umum.lewati | Lewati |
| umum.coba_lagi | Coba lagi |
| umum.offline | Kamu sedang offline. Tenang, yang kamu kerjakan tetap tersimpan. |
| umum.tersimpan_lokal | Tersimpan di perangkat |
| umum.terkirim | Terkirim |
| umum.galat | Ada yang belum beres. Coba lagi sebentar ya. |
| aktivasi.kode.judul | Masukkan kodemu |
| aktivasi.kode.bantuan | Kodemu ada di kartu dari Bapak/Ibu guru. |
| aktivasi.kode.galat | Kode belum cocok, cek lagi ya. |
| aktivasi.assent.setuju | Aku mengerti dan mau ikut |
| aktivasi.samaran.peringatan | Jangan pakai nama aslimu ya. |
| kuesioner.intro.judul | Ini bukan ujian |
| kuesioner.intro.isi | Jawabanmu tidak memengaruhi nilai. Kalau tidak tahu, pilih "Tidak tahu". |
| kuesioner.progres | Soal {n} dari {total} |
| kuesioner.selesai | Terima kasih! Jawabanmu sudah tersimpan. |
| beranda.sapaan | Halo, {nama}! |
| beranda.sesi_minggu_ini | Sesi minggu ini |
| beranda.lingkaran.belajar | Belajar |
| beranda.lingkaran.berlatih | Berlatih |
| beranda.lingkaran.merenung | Merenung |
| beranda.perasaan.tanya | Gimana perasaanmu hari ini? |
| perasaan.tingkat | Berat, Kurang enak, Biasa, Baik, Senang |
| perasaan.bicara | Aku ingin bicara dengan guru |
| perasaan.privat | Hanya kamu yang bisa melihat ini. |
| kelas.gabung.judul | Gabung Sesi Kelas |
| kelas.gabung.tunggu | Menunggu gurumu membuka langkah berikutnya. |
| kuis.benar | Tepat! |
| kuis.belum_tepat | Belum tepat. Ini penjelasannya. |
| forum.menunggu | Menunggu persetujuan guru |
| forum.dijaga | Forum ini dijaga guru pendamping supaya tetap aman. |
| forum.tulis.peringatan | Jangan tulis nama asli, nomor HP, atau akun media sosial. |
| forum.ditahan | Tulisanmu belum bisa dikirim karena memuat data pribadi. Coba ubah sedikit ya. |
| bantuan.judul | Butuh bantuan? |
| notifikasi.sesi_baru | Ada materi baru untukmu. |
| notifikasi.tugas | Ada yang menunggumu minggu ini. |
| kontrol.pesan | Materi akan terbuka setelah kuesioner akhir. |
| pendamping.moderasi.setujui | Setujui |
| pendamping.moderasi.tolak | Tolak |
| pendamping.moderasi.eskalasi | Tandai eskalasi |
| pendamping.eskalasi.merah | Darurat |
| pendamping.eskalasi.kuning | Perlu tindak lanjut |
| pendamping.eskalasi.hijau | Informasi |

Aturan notifikasi: tidak memuat kata IMS, seksual, reproduksi, atau nama sesi.

## 6. Glosarium untuk siswa

Glosarium di dalam aplikasi diisi dari naskah konten yang sudah divalidasi ahli materi. Dokumen ini tidak memuat definisi medis supaya tidak ada dua versi. Daftar istilah yang perlu didefinisikan di naskah: IMS, HIV, HPV, hepatitis B, gonore, klamidia, herpes genital, kutil kelamin, vaksin, gejala, pemeriksaan, PKPR, UKS, Puskesmas, asertif, pubertas.

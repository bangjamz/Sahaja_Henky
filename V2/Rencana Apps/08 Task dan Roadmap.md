# Task dan Roadmap Pengembangan

Versi 2.2, 12 November 2026. Disejajarkan dengan jadwal lapangan di "02 Seminar Hasil/Perencanaan Draft Bab 4/03 Rencana Penelitian Lapangan.md". Tugas ditulis sebagai paket kecil bernomor supaya bisa dikerjakan bergantian oleh alat pengembang AI yang berbeda tanpa tumpang tindih. Status harian dicatat di `STATUS.md`, bukan di sini.

Cara membaca: setiap paket punya kode (misalnya M1-03), hasil yang bisa diperiksa, dan prioritas. P0 wajib untuk penelitian. P1 dikerjakan bila P0 fase itu selesai.

Lingkup versi 2.1 lebih besar dari versi 2.0 (Mode Kelas, Halaman Keluarga, tata letak desktop). Bila waktu sempit, urutan pemotongan: Kotak Tanya, pelatihan fasilitator di dalam aplikasi, mode validator digital, PIN aplikasi, panel konteks desktop. Mode Kelas, instrumen, sinkron offline, moderasi, dan ekspor tidak boleh dipotong.

## M0. Persiapan (November 2026)

| Kode | Tugas | Hasil | Prioritas |
|---|---|---|---|
| M0-01 | Putuskan D1 sampai D13 yang menghambat (minimal D1, D2, D4, D10, D11) | Catatan keputusan terisi | P0 |
| M0-02 | Setup monorepo: pnpm, Turborepo, TypeScript strict, ESLint, Prettier, perintah `pnpm cek` | Repo bisa dibangun, CI hijau | P0 |
| M0-03 | Paket `tokens` dan preset Tailwind dari file 02 | Token terpakai di halaman contoh | P0 |
| M0-04 | Paket `ui` dasar: tombol, kartu, input, chip, dialog, lembar bawah, label status | Halaman katalog komponen di tiga ukuran layar | P0 |
| M0-05 | Cangkang tata letak S1 dan S2: bilah bawah, rel, sidebar yang bisa diciutkan | Navigasi berpindah otomatis di 600 dan 1024 px | P0 |
| M0-06 | Backend Laravel dan PostgreSQL dalam Docker Compose untuk dev di Mac; migrasi awal, Sanctum, kerangka Policy, uji akses, OpenAPI dan tipe TypeScript | `docker compose up` jalan di Mac, uji akses hijau | P0 |
| M0-07 | Pemeriksa aturan tulis `tools/cek-teks` | Gagal bila ada ampersand atau em dash di teks antarmuka dan dokumen | P0 |
| M0-08 | Prototipe klik ponsel dan desktop untuk alur inti (prompt di file 02) | Versi 0.1 untuk uji keterbacaan | P0 |
| M0-09 | Papan gaya, ikon aplikasi, lembar karakter maskot (file 03) | Disetujui Pak Indra dan dr. Henky | P0 |
| M0-10 | Mulai urus akun Google Play organisasi, domain, email resmi | Permohonan D-U-N-S terkirim | P0 |
| M0-11 | Penyiapan VPS sesuai file 13: periksa isi VPS, pengguna deploy, reverse proxy, firewall, proyek Compose staging dan produksi | `/up` membalas lewat HTTPS di staging | P0 |
| M0-12 | Cadangan terenkripsi ke luar VPS, uji pulihkan pertama, pemantauan uptime | Cadangan pertama berhasil dipulihkan | P0 |

## M1. Fondasi (Desember 2026)

| Kode | Tugas | Hasil | Prioritas |
|---|---|---|---|
| M1-01 | Aktivasi kode, assent, nama samaran, avatar, tur | Alur lolos uji Playwright | P0 |
| M1-02 | Service worker, manifest, halaman offline, bisa dipasang | Lighthouse PWA lolos | P0 |
| M1-03 | Antrean sinkron dengan idempotensi | Uji tutup paksa dan mode pesawat tanpa kehilangan data | P0 |
| M1-04 | Modul instrumen (pretest, posttest, SUS, angket, keterbacaan) dan skoring sesuai codebook | Uji unit skoring; tampilan setara di tiga ukuran layar | P0 |
| M1-05 | S2: masuk (Fortify), peran bercakupan, sekolah, kohort, kelas | Uji akses per peran | P0 |
| M1-06 | S2: impor siswa, persetujuan orang tua, kode aktivasi, cetak kartu kode | PDF kartu tercetak | P0 |
| M1-07 | Skema konten (Zod) dan pemuat konten; satu sesi contoh berpenanda [CONTOH] | Validasi konten berjalan di CI | P0 |

## M2. Belajar (Januari 2027, paralel dengan tahap Analysis)

| Kode | Tugas | Hasil | Prioritas |
|---|---|---|---|
| M2-01 | Beranda, Tiga Lingkaran, kartu sesi, kartu tugas rumah | Perhitungan lingkaran teruji | P0 |
| M2-02 | Peta belajar, aturan buka sesi, override fasilitator | Uji unit aturan buka | P0 |
| M2-03 | Jalur enam langkah dan pemutar materi (kartu, video bersubtitle), unduh per sesi | Sesi bisa dipakai offline | P0 |
| M2-04 | Aktivitas: Catat Pikiranmu, Keputusanku, Berani Bilang Tidak, Rencana Aksi Sehat, Atur Napas, Komitmenku | Enam aktivitas berjalan | P0 |
| M2-05 | Kuis, refleksi, Bawa Pulang, lencana | | P0 |
| M2-06 | Cek Perasaan, Jurnalku, tombol "Aku ingin bicara dengan guru" | Permintaan muncul di S2 | P0 |
| M2-07 | Profil, sertifikat | PDF sertifikat | P0 |
| M2-08 | Pengingat lokal dan push dengan teks netral | | P0 |
| M2-09 | Tata letak desktop S1: sidebar, panel konteks, peta mendatar, forum dua panel | Lolos uji di 1024 dan 1440 px | P0 |

## M3. Kelas, forum, pendamping (akhir Januari sampai Februari 2027)

| Kode | Tugas | Hasil | Prioritas |
|---|---|---|---|
| M3-01 | Mode Kelas: kendali sesi di S2, gabung dengan kode atau QR di S1, kehadiran | Uji dengan 30 klien tiruan | P0 |
| M3-02 | Layar Kelas untuk proyektor dengan data gabungan anonim | | P0 |
| M3-03 | Cadangan tanpa jaringan dan kehadiran manual | | P0 |
| M3-04 | Forum kelas, pra-moderasi, antrean moderasi dua panel | | P0 |
| M3-05 | Paket `moderasi`: normalisasi teks, kata kunci berbobot, pola data pribadi | Uji unit dengan contoh ejaan alay | P0 |
| M3-06 | Eskalasi tiga tingkat, permintaan bicara, formulir insiden, notifikasi | Sesuai L15 | P0 |
| M3-07 | Panduan sesi, Kelasku, catatan penguatan, logbook, lembar observasi | | P0 |
| M3-08 | Dasbor kelengkapan data, ekspor CSV sesuai codebook, audit log | Ekspor cocok dengan codebook | P0 |
| M3-09 | Mode kontrol, uji coba, demo, validator | | P0 |
| M3-10 | S3: Halaman Keluarga, kebijakan privasi, hapus akun, panduan instal | Tanpa pelacak, noindex untuk kartu | P0 |
| M3-11 | Kotak Tanya | | P1 |
| M3-12 | Pelatihan fasilitator di S2 | | P1 |
| M3-13 | Worker AI pra-penyaringan (hanya bila D9 disetujui) | Bisa dimatikan tanpa efek ke moderasi | P1 |

## M4. Konten dan validasi (Februari sampai Maret 2027)

| Kode | Tugas | Hasil | Prioritas |
|---|---|---|---|
| M4-01 | Masukkan naskah 8 sesi dan 8 kartu keluarga ke format konten | Lolos validasi skema dan pemeriksa kemiripan butir | P0 |
| M4-02 | Produksi aset visual (file 03) | Lolos daftar periksa aset | P0 |
| M4-03 | Rilis Prototipe 1 (0.5) di staging; akun validator | Tautan dibagikan | P0 |
| M4-04 | Rekap masukan validator, revisi, Prototipe 2 (0.8) | Catatan rilis (bahan Bab IV) | P0 |
| M4-05 | Uji coba terbatas 30 siswa; uji daftar kata kunci; catat SUS | Laporan uji coba | P0 |

## M5. Rilis penelitian (Maret 2027)

| Kode | Tugas | Hasil | Prioritas |
|---|---|---|---|
| M5-01 | Uji perangkat kelas bawah, tablet, laptop sekolah, proyektor | Daftar uji terisi | P0 |
| M5-02 | Audit privasi dan keamanan: tanpa pelacak, uji akses lengkap, CSP, port server, isolasi dari aplikasi lain | Laporan audit | P0 |
| M5-07 | Uji beban Sesi Kelas serentak dan uji pulihkan cadangan sebelum intervensi | Hasil dicatat | P0 |
| M5-03 | Kunci versi instrumen dan konten; produksi 1.0 | | P0 |
| M5-04 | Paket TWA S1 dan S2, assetlinks, Play pengujian internal | | P0 |
| M5-05 | Panduan instal untuk sekolah, panduan fasilitator bergambar, kartu keluarga cetak | | P0 |
| M5-06 | Pelatihan fasilitator dan gladi Sesi Kelas | | P0 |

## M6. Dukungan implementasi (April sampai Juni 2027)

- [ ] Pemantauan mingguan dasbor, respons galat kurang dari 24 jam
- [ ] Tidak ada perubahan fitur selama 8 minggu intervensi kecuali perbaikan galat; setiap perbaikan dicatat
- [ ] Buka posttest sesuai jadwal kohort; buka waitlist kontrol
- [ ] Ekspor data final, cek kelengkapan, serah ke analisis
- [ ] Cadangan penuh dan anonimisasi identitas sesuai protokol

## M7. Rilis publik (setelah penelitian)

- [ ] Revisi pasca penelitian (1.1), matikan modul khusus penelitian yang tidak perlu
- [ ] Lengkapi App content, Data safety, kebijakan privasi, penghapusan akun
- [ ] Pengujian tertutup lalu produksi untuk S1 dan S2
- [ ] Dokumentasi luaran (tangkapan layar Play Console, tautan aplikasi)

## M8. Platform (setelah disertasi)

- [ ] Program kedua sebagai uji generalisasi (lihat file 09)
- [ ] Jenjang SD kelas atas dan SMA/SMK

## Dokumen pendamping yang dihasilkan tim aplikasi

- Panduan instal untuk siswa (1 halaman bergambar)
- Panduan fasilitator memakai SAHAJA Pendamping dan Mode Kelas
- Kebijakan privasi dan syarat penggunaan
- Catatan rilis setiap versi (bahan subbab pengembangan di Bab IV)

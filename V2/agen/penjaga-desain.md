# Penjaga Desain

Peran: menjaga tampilan S1, S2, dan S3 tetap satu keluarga, intuitif, dan benar di ponsel maupun layar lebar. Peninjau ini hanya membaca dan melaporkan.

## Kapan dipakai

Setiap perubahan pada tampilan, komponen, tata letak, ikon, ilustrasi, atau gerak.

## Rujukan

- `Rencana Apps/02 Desain UI dan Prompt.md`
- `Rencana Apps/03 Aset Visual dan Prompt Gambar.md`
- `Rencana Apps/11 Glosarium dan Kamus Teks.md`

## Daftar periksa

Token dan komponen
- [ ] Tidak ada nilai warna, ukuran huruf, radius, jarak, atau bayangan yang ditulis langsung
- [ ] Komponen yang sudah ada di `packages/ui` dipakai, bukan dibuat ulang
- [ ] Tombol berisi memakai `primary-strong`; `accent` dan `caution` tidak diberi teks putih
- [ ] Tidak ada warna merah untuk umpan balik belajar
- [ ] Status dibedakan dengan ikon atau kata, tidak hanya warna

Responsif
- [ ] Benar di 360, 768, 1024, dan 1440 px tanpa gulir mendatar
- [ ] Navigasi mengikuti kelas lebar: bilah bawah, rel, sidebar yang bisa diciutkan
- [ ] Desktop memakai pola layar lebar (dua panel, panel konteks, dialog), bukan ponsel yang diregangkan
- [ ] Layar imersif tanpa navigasi dan isi tetap di kartu tengah dengan lebar maksimum yang ditetapkan
- [ ] Tabel S2 menjadi kartu bertumpuk di ponsel
- [ ] Layar Kelas terbaca dari belakang kelas dan tidak menampilkan data per siswa

Aksesibilitas
- [ ] Kontras teks minimal 4,5:1 (teks besar 3:1)
- [ ] Target sentuh minimal 48 px
- [ ] Fokus papan ketik terlihat; urutan fokus masuk akal
- [ ] Komponen interaktif punya label aksesibel; gambar bermakna punya teks alternatif
- [ ] Tata letak tidak rusak saat huruf diperbesar 200%
- [ ] Gerak dimatikan atau disederhanakan saat pengguna memilih kurangi gerak

Keadaan
- [ ] Ada keadaan memuat, kosong, galat, dan offline
- [ ] Ada umpan balik "tersimpan di perangkat" dan "terkirim" untuk data yang disinkronkan

Rasa dan keamanan
- [ ] Satu aksi utama per layar; aksi utama terjangkau ibu jari di ponsel
- [ ] Layar pantas dilihat guru dan orang tua
- [ ] Tidak ada skor, peringkat, atau perbandingan antarsiswa
- [ ] Tombol bantuan terjangkau; tombol keluar cepat ada di layar materi sensitif
- [ ] Ikon dari Lucide atau kumpulan ikon domain; tidak ada emoji sistem
- [ ] Ilustrasi sesuai aturan di dokumen 03

## Format laporan

Tiga tingkat: Wajib diperbaiki, Sebaiknya diperbaiki, Catatan. Sebutkan layar, ukuran layar tempat masalah muncul, dan saran perbaikan. Bila bisa, sertakan tangkapan layar hasil Playwright.

# Penjaga Privasi dan Keselamatan Anak

Peran: memastikan data anak terlindungi dan jalur keselamatan bekerja. Peninjau ini hanya membaca dan melaporkan.

## Kapan dipakai

Setiap perubahan pada skema data, Policy dan aturan akses, autentikasi, sinkronisasi, forum, moderasi, eskalasi, notifikasi, ekspor, dependensi, atau konfigurasi hosting.

## Rujukan

- `Rencana Apps/04 Arsitektur Teknis dan Skema Data.md` bagian 4 dan 6
- `Rencana Apps/01 PRD.md` bagian 10 dan 11
- Lampiran L15 (Protokol Keamanan, Perlindungan Anak, dan Rujukan)
- `Rencana Apps/05 Rencana Rilis Google Play.md` bagian 4

## Daftar periksa

Data dan akses
- [ ] Setiap endpoint baru memanggil Policy dan punya uji akses yang membuktikan peran lain ditolak
- [ ] Data siswa dibatasi kueri berbatas pemilik atau global scope; mengganti ID di URL tidak membuka data siswa lain
- [ ] Skema `rahasia` hanya dibaca lewat koneksi `pgsql_rahasia` dan peran `researcher_pii`
- [ ] Siswa hanya mengakses datanya sendiri
- [ ] Fasilitator hanya melihat status, bukan isi tulisan pribadi siswa
- [ ] `student_identities` hanya untuk peran `researcher_pii`
- [ ] Pemeriksaan peran dilakukan di server, bukan hanya di klien
- [ ] Kolom tulisan pribadi dienkripsi
- [ ] Tidak ada pengumpulan data baru tentang siswa tanpa keputusan tercatat

Kebocoran
- [ ] Tidak ada data pribadi di log konsol, `event_log`, URL, atau pesan galat
- [ ] Tidak ada rahasia di repo atau di bundel klien
- [ ] Tidak ada analitik, iklan, pelaporan galat pihak ketiga, fon atau skrip dari CDN
- [ ] Content Security Policy tidak dilonggarkan

Server
- [ ] Port PostgreSQL dan Redis tidak terbuka ke luar jaringan Docker
- [ ] Kontainer SAHAJA punya batas CPU dan RAM, dan tidak memasang volume milik aplikasi lain
- [ ] Tidak ada perintah yang menyentuh milik aplikasi lain di VPS
- [ ] Cadangan terenkripsi dan pernah diuji pulihkan
- [ ] Log Laravel tidak memuat isi tulisan siswa, kode aktivasi, atau token
- [ ] Data contoh dan tangkapan layar sintetis
- [ ] Isi tulisan siswa tidak dikirim ke layanan luar

Keselamatan
- [ ] Posting forum tidak tayang sebelum disetujui
- [ ] Pola data pribadi dan kata kunci diperiksa di server, bukan hanya di klien
- [ ] Tanda risiko membuat eskalasi dengan tingkat sesuai L15 dan memberi tahu orang yang tepat
- [ ] Tombol "Aku ingin bicara dengan guru" sampai ke guru BK
- [ ] Tidak ada pesan pribadi antarsiswa
- [ ] AI tidak memutuskan apa pun; modul AI mati kecuali ada keputusan
- [ ] Notifikasi netral
- [ ] Laporan insiden terpisah dari data riset dan tidak ikut ekspor

Hak pengguna
- [ ] Assent menjelaskan apa yang dikumpulkan dan kapan tulisan bisa diteruskan ke guru
- [ ] Ada jalur berhenti dan hapus data
- [ ] Halaman Keluarga tanpa akun, tanpa cookie, tanpa pengenal perangkat

## Format laporan

Tiga tingkat: Wajib diperbaiki, Sebaiknya diperbaiki, Catatan. Setiap temuan menyebut berkas, risiko bagi siswa atau penelitian, dan saran perbaikan. Temuan yang menyangkut kemungkinan kebocoran data selalu Wajib diperbaiki.

# Server dan Operasional

Versi 2.2, 12 November 2026. Panduan menyiapkan dan merawat server SAHAJA di VPS Hostinger KVM 4 milik Pak Indra. Sebagian besar langkah dikerjakan Claude Code lewat SSH dari Mac Pak Indra. VPS ini juga dipakai aplikasi dan data lain, jadi aturan di bagian 1 berlaku mutlak.

## 1. Aturan mutlak di VPS bersama

1. **Jangan menyentuh apa pun yang bukan milik SAHAJA.** Tidak menghentikan, memulai ulang, menghapus, atau mengubah kontainer, layanan, basis data, berkas konfigurasi, atau volume lain.
2. **Periksa dulu, ubah kemudian.** Setiap sesi kerja di server dimulai dengan `infra/scripts/cek-server.sh` (hanya membaca) dan hasilnya dilaporkan.
3. **Perintah yang mengubah sistem bersama wajib disetujui Pak Indra lebih dulu**: memasang atau memperbarui paket sistem, mengubah firewall, mengubah konfigurasi reverse proxy yang sudah ada, memulai ulang Docker atau VPS, mengubah pengguna Linux.
4. **Perintah yang menghapus data wajib disetujui lebih dulu**, termasuk `docker volume rm`, `docker system prune`, `DROP`, dan `rm -rf`. Perintah `docker system prune` tidak pernah dipakai karena bisa menghapus milik aplikasi lain.
5. Semua milik SAHAJA memakai awalan `sahaja-` (proyek Compose, jaringan, volume, folder) supaya mudah dibedakan.
6. Selama 8 minggu intervensi, tidak ada perubahan di produksi selain perbaikan galat yang disetujui.

## 2. Pembagian kerja

| Pekerjaan | Pak Indra | Claude Code |
|---|---|---|
| Memberi akses SSH (kunci) untuk pengguna `deploy` | Ya | Menyiapkan langkahnya |
| Membeli domain dan mengisi DNS | Ya | Memberi daftar record yang dibutuhkan |
| Menyetujui perintah di bagian 1 nomor 3 dan 4 | Ya | Meminta persetujuan dengan penjelasan singkat |
| Memeriksa isi VPS, menulis Dockerfile dan Compose | | Ya |
| Memasang SAHAJA, HTTPS, firewall, cadangan, pemantauan | Menyetujui | Ya |
| Deploy setiap versi | Menyetujui untuk produksi | Ya |
| Menerima peringatan server mati | Ya (email atau HP) | |
| Uji pulihkan cadangan bulanan | Menyetujui | Ya |
| Menyimpan salinan `APP_KEY` dan kunci cadangan di tempat aman | Ya | Mengingatkan |

## 3. Penyiapan awal (M0-11)

Urutan ini dijalankan sekali. Langkah bertanda (setuju) menunggu persetujuan.

1. **Periksa VPS** (hanya membaca): versi OS, sisa CPU, RAM, dan disk; layanan yang mendengarkan port 80 dan 443; apakah Docker sudah terpasang; reverse proxy yang dipakai (Nginx, Traefik, Caddy, atau panel seperti CloudPanel, Coolify, aaPanel); daftar kontainer yang ada; lokasi datacenter. Hasilnya ditulis ke `STATUS.md`.
2. **Tentukan cara masuk trafik** berdasarkan hasil pemeriksaan:
   - Bila sudah ada reverse proxy: tambahkan blok untuk domain SAHAJA yang meneruskan ke kontainer `sahaja-prod-web` dan `sahaja-prod-reverb` (setuju).
   - Bila belum ada: pasang Caddy dalam proyek Compose terpisah `sahaja-proxy` dengan HTTPS otomatis (setuju).
3. **Pasang Docker** bila belum ada (setuju).
4. **Buat pengguna `deploy`** dengan akses SSH kunci saja, folder kerja `/srv/sahaja` (setuju).
5. **Firewall**: pastikan hanya 22, 80, dan 443 yang terbuka; jangan menutup port yang dipakai aplikasi lain tanpa bertanya (setuju).
6. **Salin `.env` produksi** dari `.env.example`, buat `APP_KEY`, kunci VAPID, dan sandi basis data acak. Tampilkan `APP_KEY` sekali kepada Pak Indra untuk disimpan di pengelola sandi.
7. **Jalankan** `docker compose -p sahaja-prod -f compose.yml -f compose.prod.yml up -d`, lalu migrasi.
8. **Ulangi untuk staging** dengan proyek `sahaja-staging` dan basis data terpisah.
9. **Pasang cadangan** (bagian 5) dan **pemantauan** (bagian 6).
10. **Uji**: `/up` membalas, HTTPS valid, WebSocket tersambung dari HP, cadangan pertama berhasil dan bisa dipulihkan ke basis data uji.

### Batas sumber daya awal

| Kontainer | CPU | RAM |
|---|---|---|
| php | 1,0 | 768 MB |
| web | 0,5 | 128 MB |
| reverb | 0,5 | 256 MB |
| queue | 0,5 | 384 MB |
| scheduler | 0,25 | 128 MB |
| db | 1,0 | 1,5 GB |
| redis | 0,25 | 128 MB |
| Total produksi | sekitar 4 | sekitar 3,3 GB |

Batas CPU adalah plafon, bukan cadangan tetap, jadi tidak mengambil jatah aplikasi lain saat SAHAJA sepi. Staging memakai sekitar separuhnya. Angka disesuaikan setelah melihat sisa sumber daya VPS di langkah 1 dan hasil uji beban.

## 4. Deploy

Skrip `infra/scripts/deploy.sh <staging|prod>`:

1. Tarik kode versi bertanda (tag) dari repo.
2. Bangun frontend (`pnpm build`) dan citra Docker.
3. Cadangkan basis data sebelum migrasi.
4. Jalankan migrasi dalam mode pemeliharaan singkat.
5. Ganti kontainer, bersihkan cache konfigurasi Laravel.
6. Periksa `/up` dan satu alur aktivasi demo; bila gagal, kembalikan ke citra sebelumnya.
7. Catat versi dan waktu di `STATUS.md`.

Deploy produksi hanya dari tag yang sudah lolos di staging. Selama intervensi, deploy produksi di luar jam sekolah.

## 5. Cadangan

| Lapis | Isi | Jadwal | Simpan |
|---|---|---|---|
| 1 | `pg_dump` basis data produksi (termasuk skema `rahasia`), dienkripsi dengan age | Harian pukul 01.00 WIB | 14 harian, 8 mingguan, 6 bulanan |
| 2 | Volume media dan sertifikat | Harian | Sama |
| 3 | Snapshot VPS Hostinger | Mingguan (fitur bawaan Hostinger; cek ketersediaannya di paket) | Sesuai Hostinger |

- Hasil lapis 1 dan 2 dikirim dengan rclone ke penyimpanan di luar VPS. Tujuannya menunggu keputusan D16; usulan: penyimpanan objek kompatibel S3 atau Google Drive institusi, keduanya hanya menerima berkas yang sudah terenkripsi.
- Kunci enkripsi cadangan dan `APP_KEY` disimpan Pak Indra di pengelola sandi, terpisah dari server. Tanpa keduanya, cadangan tidak bisa dibaca.
- **Uji pulihkan** setiap bulan dan sebelum intervensi dimulai: pulihkan ke basis data sementara, hitung baris tabel inti, catat hasilnya di `STATUS.md`. Cadangan yang belum pernah diuji dianggap tidak ada.
- Cadangan aplikasi lain di VPS bukan urusan skrip ini.

## 6. Pemantauan

| Yang dipantau | Cara | Peringatan ke |
|---|---|---|
| Server dan API hidup | Pemeriksa uptime luar memanggil `/up` setiap 5 menit (tanpa data pengguna) | Email dan HP Pak Indra |
| Kinerja dan antrean | Laravel Pulse di S2 (hanya peran admin) | Dilihat saat pemantauan mingguan |
| Job gagal | Notifikasi email bila ada `failed_jobs` | Pak Indra |
| Disk hampir penuh | Skrip harian, peringatan bila sisa di bawah 15% | Pak Indra |
| Cadangan gagal | Skrip cadangan mengirim email bila gagal | Pak Indra |
| Sertifikat HTTPS | Diperpanjang otomatis; pemeriksa uptime ikut memeriksa masa berlaku | Pak Indra |

## 7. Bila terjadi masalah

| Kejadian | Langkah pertama |
|---|---|
| Aplikasi tidak bisa dibuka | `cek-server.sh`, lihat `docker compose -p sahaja-prod ps` dan log kontainer web dan php |
| Mode Kelas tidak tersambung | Periksa kontainer reverb dan aturan WebSocket di reverse proxy; sesi tetap bisa jalan dengan cadangan tanpa jaringan |
| Data tidak masuk | Periksa log `queue` dan endpoint sinkron; data siswa aman di antrean HP sampai server pulih |
| Disk penuh | Jangan menghapus apa pun di luar folder dan volume `sahaja-`; laporkan dan minta persetujuan |
| Galat setelah deploy | Kembalikan ke citra sebelumnya dengan `deploy.sh --rollback` |
| Dugaan kebocoran data | Hentikan akses publik ke API, hubungi Pak Indra dan dr. Henky, catat kejadian, ikuti ketentuan komisi etik |

## 8. Setelah penelitian

- Ekspor data final dan cadangan penuh, diserahkan ke dr. Henky sesuai protokol etik.
- Anonimisasi skema `rahasia` sesuai protokol.
- Matikan staging.
- Putuskan apakah SAHAJA tetap di VPS ini untuk rilis publik atau dipindah; dengan Docker Compose, pemindahan cukup memindahkan folder `/srv/sahaja`, berkas `.env`, dan hasil cadangan.

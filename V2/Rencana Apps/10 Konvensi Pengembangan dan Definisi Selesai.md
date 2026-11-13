# Konvensi Pengembangan dan Definisi Selesai

Versi 2.2, 12 November 2026: bagian backend disesuaikan dengan keputusan T10, isi lain tetap versi 2.1 (11 November 2026). Aturan ini berlaku untuk semua orang dan semua alat pengembang AI yang menyentuh repo. Ringkasannya ada di `AGENTS.md`; dokumen ini adalah versi lengkapnya.

## 1. Alur kerja satu tugas

1. Baca `STATUS.md` untuk tahu keadaan terakhir dan apa yang sedang dikerjakan pihak lain.
2. Ambil satu paket dari "08 Task dan Roadmap.md" (misalnya M2-03). Tulis di `STATUS.md` bahwa paket itu sedang dikerjakan.
3. Baca bagian dokumen yang terkait: PRD untuk perilaku, file 02 untuk tampilan, file 04 untuk data, file 06 untuk konten.
4. Tulis rencana singkat (berkas yang disentuh, uji yang ditambah). Bila rencana menyentuh hal di bagian 8 dokumen ini, berhenti dan minta keputusan.
5. Kerjakan di cabang `fitur/<kode>-<ringkas>`, misalnya `fitur/m2-03-pemutar-materi`.
6. Jalankan `pnpm cek`. Perbaiki sampai hijau.
7. Tinjau sendiri dengan peran peninjau yang relevan di folder `agen/`.
8. Perbarui `STATUS.md` (apa yang selesai, apa yang tersisa, hal yang perlu diputuskan). Bila perilaku produk berubah, perbarui dokumen di `Rencana Apps/` dalam komit yang sama.
9. Komit dengan pesan berformat di bagian 5.

Satu tugas, satu cabang, satu tujuan. Jangan merapikan kode yang tidak terkait dalam cabang yang sama.

## 2. Urutan sumber kebenaran

Bila dua sumber bertentangan, yang lebih atas menang. Pertentangan dicatat di `STATUS.md` untuk diselesaikan, bukan diputuskan diam-diam.

1. Naskah disertasi versi acuan dan lampiran (L05 instrumen, L15 protokol, L17 garis besar sesi, codebook)
2. "12 Catatan Keputusan.md"
3. "01 PRD.md"
4. Dokumen 02 sampai 11
5. Kode yang sudah ada
6. Folder `Old` (hanya bahan, tidak mengikat)

## 3. Konvensi kode

### Umum
- TypeScript mode strict. Tanpa `any` kecuali di batas pustaka dengan komentar alasan.
- Nama variabel, fungsi, dan berkas kode dalam bahasa Inggris. Nama fitur mengikuti padanan di file 11 dan nama tabel di file 04 (misalnya Cek Perasaan ditulis `moodCheckin`, bukan `cekPerasaan`).
- Nama folder fitur dan teks antarmuka dalam bahasa Indonesia.
- Komentar menjelaskan alasan, bukan mengulang kode. Komentar dan dokumen mengikuti aturan tulis di bagian 6.
- Fungsi aturan penelitian (skoring, jadwal buka, lingkaran, kelayakan sertifikat) berada di `packages/domain`, murni, dan punya uji unit.

### Antarmuka
- Tidak ada nilai warna, ukuran huruf, radius, atau bayangan yang ditulis langsung. Pakai token.
- Tidak ada teks antarmuka di dalam komponen. Pakai kunci kamus `teks/id.json`.
- Komponen yang dipakai dua aplikasi masuk `packages/ui`.
- Setiap layar dibuat untuk ponsel dulu, lalu diberi tata letak tablet dan desktop sesuai file 02. Sebuah layar belum selesai bila baru benar di satu ukuran.
- Setiap komponen interaktif punya keadaan fokus yang terlihat, label aksesibel, dan target sentuh minimal 48 px.
- Setiap layar punya keadaan memuat, kosong, galat, dan offline.
- Ikon dari Lucide atau dari kumpulan ikon domain di `packages/ui`. Tidak memakai emoji sistem.

### Data
- Frontend hanya berbicara dengan server lewat `packages/api`. Komponen tidak memanggil `fetch` langsung.
- Tipe API tidak ditulis tangan; jalankan `pnpm api:tipe` setelah endpoint berubah.
- Setiap endpoint baru memanggil Policy dan punya uji akses di `backend/tests/Akses` dalam komit yang sama.
- Aturan yang ada di dua bahasa (skoring, buka sesi, lingkaran, moderasi) diubah bersamaan dan kasus ujinya di `packages/domain/fixtures` diperbarui.
- Laravel: controller tipis, logika di `app/Domain` atau Action; validasi dengan Form Request; Pint dan Larastan harus bersih.
- Setiap tulisan dari klien siswa lewat antrean sinkron dengan `client_id`.
- Muatan yang melintas jaringan divalidasi dengan skema Zod.
- Migrasi hanya maju. Tidak mengubah migrasi yang sudah dijalankan di staging atau produksi.
- Data contoh selalu sintetis dan dibuat oleh skrip seed.

### Larangan teknis
- Tidak menambah SDK analitik, iklan, pelaporan galat pihak ketiga, fon atau skrip dari CDN.
- Tidak menyimpan kunci atau rahasia di repo, di klien, atau di prompt.
- Tidak menulis data pribadi siswa ke log konsol atau `event_log`.
- Tidak mengirim isi tulisan siswa ke layanan luar.

## 4. Pengujian

| Jenis | Alat | Wajib untuk |
|---|---|---|
| Unit | Vitest | Semua fungsi di `domain` dan `moderasi` |
| Komponen | Testing Library | Komponen `ui` yang punya logika |
| Alur | Playwright | Aktivasi, kuesioner, satu sesi lengkap, Sesi Kelas, moderasi, ekspor |
| Responsif | Playwright pada 360, 768, 1024, 1440 px | Semua layar utama |
| Offline | Playwright mode offline | Kuesioner, sesi yang diunduh, antrean sinkron |
| Aksesibilitas | axe | Semua layar utama |
| Akses | Pest di `backend/tests/Akses` | Semua endpoint |
| Backend | Pest (fitur dan unit), Larastan, Pint | Semua kode Laravel |
| Aturan bersama | Kasus JSON di `packages/domain/fixtures` dijalankan Vitest dan Pest | Skoring, buka sesi, lingkaran, moderasi |
| Konten | Validasi skema dan pemeriksa kemiripan butir | Semua berkas konten |
| Aturan tulis | `tools/cek-teks` | Kamus teks, konten, dokumen |

Perintah tunggal: `pnpm cek` menjalankan pemeriksaan tipe, lint, uji unit frontend, validasi konten, pemeriksa aturan tulis, serta Pint, Larastan, dan Pest (memakai PHP lokal bila ada, bila tidak memakai kontainer backend). `pnpm uji:alur` menjalankan Playwright terhadap lingkungan Docker lokal.

## 5. Git

- Cabang: `fitur/<kode>-<ringkas>`, `perbaikan/<ringkas>`, `dok/<ringkas>`.
- Pesan komit: `<jenis>(<area>): <ringkasan> [<kode tugas>]`, misalnya `fitur(siswa): pemutar materi kartu bacaan [M2-03]`. Jenis: fitur, perbaikan, dok, uji, rapikan, konfig.
- Folder `Old` tidak diubah.
- Tidak ada komit langsung ke cabang utama selama penelitian berjalan.
- Rilis ditandai dengan tag versi (0.1, 0.5, 0.8, 1.0) dan catatan rilis, karena catatan rilis menjadi bahan Bab IV.

## 6. Aturan tulis (dokumen, konten, teks antarmuka, komentar)

- Tidak memakai simbol ampersand. Tulis "dan".
- Tidak memakai em dash sebagai penghubung kalimat. Pakai koma, titik dua, atau kalimat baru.
- Tidak memakai garis pemisah horizontal di dokumen.
- Kepala tabel berlatar abu-abu muda, bukan warna gelap.
- Desimal memakai koma dalam bahasa Indonesia (31,6%).
- Istilah baku mengikuti "11 Glosarium dan Kamus Teks.md": "Infeksi Menular Seksual (IMS)", "mobile app", "siswa SMP", "Eks-Karesidenan Pati", "kelompok eksperimen", "kelompok kontrol", "pengetahuan", "sikap pencegahan IMS".
- Bahasa terdengar ditulis manusia: kalimat langsung, tanpa frasa pembuka klise.

## 7. Definisi selesai

Sebuah paket tugas selesai bila semua butir berikut terpenuhi.

- [ ] Perilaku sesuai PRD dan, bila menyangkut penelitian, sesuai lampiran acuan
- [ ] Benar di ponsel, tablet, dan desktop sesuai file 02
- [ ] Bisa dipakai dengan papan ketik; lolos axe tanpa pelanggaran serius
- [ ] Keadaan memuat, kosong, galat, dan offline ada
- [ ] Semua teks di kamus; lolos pemeriksa aturan tulis
- [ ] Hanya memakai token dan komponen bersama
- [ ] Uji yang relevan ditambahkan; `pnpm cek` hijau
- [ ] Endpoint baru memakai Policy dan punya uji akses
- [ ] Tidak ada data siswa asli, rahasia, atau pelacak
- [ ] Event log yang diwajibkan PRD tercatat
- [ ] Dokumen dan `STATUS.md` diperbarui

## 8. Hal yang wajib dihentikan dan ditanyakan

Alat pengembang AI tidak boleh memutuskan sendiri hal-hal berikut. Tulis usulan beserta alasannya di `STATUS.md` bagian "Menunggu keputusan", lalu berhenti pada bagian itu.

- Mengubah isi, urutan, pilihan jawaban, atau skoring instrumen
- Mengubah jumlah sesi, fase, urutan topik, atau lengan penelitian
- Menampilkan skor pretest atau posttest kepada siswa
- Membuka konten untuk kelompok kontrol sebelum posttest
- Melonggarkan Policy atau aturan akses, atau membuka akses ke skema `rahasia`
- Menjalankan perintah di VPS yang mengubah sistem bersama atau menghapus data (file 13 bagian 1), dan apa pun yang menyentuh aplikasi lain di VPS
- Menambah pengumpulan data baru tentang siswa
- Mengaktifkan modul yang berstatus mati di PRD bagian 9
- Menambah pustaka baru, layanan luar, atau menaikkan versi mayor
- Menulis fakta kesehatan, angka, atau kutipan yang tidak ada di naskah konten
- Menghapus berkas atau data

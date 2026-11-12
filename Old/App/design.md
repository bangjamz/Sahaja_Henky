# Design Guideline: Aplikasi SAHAJA

## 1. Prinsip
Aman, hangat, tidak menghakimi, tidak menakutkan. Pengguna adalah siswa SMP 13-15 tahun di wilayah dengan norma budaya dan agama yang kuat. Desain harus membuat topik sensitif terasa wajar dibicarakan, sekaligus lolos penilaian guru, orang tua, dan pakar.

## 2. Visual
- Palet: primer teal `#0E9594`, sekunder biru `#2D6CDF`, aksen kuning hangat `#F5B841`, netral `#F7F9FB` / `#1F2933`. Hindari merah dominan dan citra medis menyeramkan.
- Tipografi: Nunito atau Plus Jakarta Sans; body minimal 14 sp, judul 20-24 sp.
- Ilustrasi: flat/kartun, non-eksplisit; anatomi mengikuti standar UNESCO ITGSE untuk usia 12-15.
- Maskot: karakter remaja netral (bukan foto orang nyata) sebagai pemandu tiap sesi.
- Animasi: Lottie ringan untuk feedback kuis dan lencana; tanpa animasi berat.

## 3. Struktur Layar
- Bottom bar 4 menu: Beranda, Belajar, Forum, Profil.
- Beranda: kartu sesi minggu ini, streak, reminder tugas, jurnal cepat.
- Belajar: peta perjalanan 8 sesi (journey map), sesi terkunci tampak jelas dengan tanggal buka.
- Sesi: materi -> aktivitas/worksheet -> kuis -> rangkuman; progress bar di atas.
- Forum: daftar topik per kelas, tulis post (masuk antrean moderasi), badge "menunggu persetujuan".
- Profil: nama samaran, avatar, lencana, sertifikat, grafik jurnal.

## 4. Bahasa dan Nada
- Indonesia santai dan sopan khas remaja; kalimat pendek; istilah medis selalu diberi penjelasan sederhana.
- Tidak menghakimi dan tidak menakut-nakuti; fokus pada "kamu berhak tahu dan berhak sehat".
- Contoh salah: "Seks bebas menghancurkan masa depanmu". Contoh benar: "Yuk kenali risikonya, biar kamu yang pegang kendali."

## 5. Privasi di Antarmuka
- Nama samaran + avatar di semua area sosial; nama asli tidak pernah tampil.
- Notifikasi lockscreen netral: "Ada materi baru untukmu" (tanpa kata IMS/seksual).
- Tombol quick exit di halaman materi sensitif (langsung ke beranda netral).
- Ikon dan nama aplikasi netral di launcher.

## 6. Aksesibilitas dan Perangkat
- Kontras WCAG AA; dukung TalkBack; target sentuh minimal 48 dp.
- Semua video bersubtitle; materi inti juga tersedia sebagai teks.
- Layar utama < 3 detik di perangkat RAM 2 GB; mode hemat data (gambar dikompresi, video hanya via unduhan).

## 7. Validasi Desain
- Prototipe Figma diuji ke 5-10 siswa SMP sebelum koding (think-aloud, 5 tugas inti).
- Review desain oleh 3 pakar bersamaan dengan validasi konten (expert judgment).
- Dokumentasikan semua iterasi sebagai bukti tahap Design ADDIE untuk disertasi.

# PROMPT DESAIN FRONTEND (copy-paste ke AI pembuat prototype)

Buatkan desain prototype frontend high-fidelity untuk aplikasi mobile Android bernama **SAHAJA** (Sahabat Remaja Jaga Diri): aplikasi edukasi kesehatan reproduksi dan pencegahan Infeksi Menular Seksual (IMS) untuk siswa SMP usia 13-15 tahun di Jawa Tengah. Aplikasi ini adalah bagian dari penelitian disertasi (intervensi psikoedukasi berbasis Cognitive Behavioral Therapy, 8 sesi mingguan). Frontend saja, semua data pakai mock/dummy, tidak perlu backend.

## KONTEKS PENGGUNA
- Pengguna utama: siswa SMP 13-15 tahun, perangkat Android murah (layar 360 x 800 dp), literasi digital sedang, kuota internet terbatas.
- Topik sensitif (kesehatan seksual) di lingkungan dengan norma agama dan budaya Jawa yang kuat. Desain TIDAK boleh vulgar, TIDAK menakut-nakuti, TIDAK menghakimi. Harus terasa aman dilihat guru dan orang tua.
- Seluruh teks antarmuka dalam Bahasa Indonesia santai tapi sopan khas remaja. Kalimat pendek. Istilah medis selalu diberi penjelasan sederhana.

## DESIGN SYSTEM
- Warna primer: teal #0E9594. Sekunder: biru #2D6CDF. Aksen: kuning hangat #F5B841. Sukses: #2FBF71. Peringatan lembut: #E8871E. Latar terang: #F7F9FB. Teks gelap: #1F2933. JANGAN pakai merah dominan.
- Tipografi: Nunito (atau Plus Jakarta Sans). Body 14-16 sp, judul layar 22-24 sp bold, kartu 16-18 sp semibold.
- Bentuk: sudut membulat 16-20 dp, kartu dengan shadow sangat halus, banyak ruang putih.
- Ilustrasi: flat/kartun ramah remaja, non-eksplisit. Maskot: satu karakter remaja netral (hoodie teal, ekspresi ramah) bernama "Saja" yang muncul sebagai pemandu di beranda, sesi, dan empty state.
- Ikon: outline rounded (Lucide/Material Symbols rounded).
- Target sentuh minimal 48 dp, kontras WCAG AA.
- Mode terang saja (v1).

## NAVIGASI
Bottom navigation bar 4 tab: **Beranda** (ikon rumah), **Belajar** (ikon buku/peta), **Forum** (ikon chat), **Profil** (ikon avatar). Tab aktif berwarna teal dengan label.

## DAFTAR LAYAR (buat semuanya)

### A. Onboarding dan Consent (5 layar)
1. **Splash**: logo SAHAJA + maskot + tagline "Sahabat Remaja Jaga Diri".
2. **Masukkan Kode Aktivasi**: input 6 karakter besar di tengah, teks bantuan "Kode kamu ada di lembar yang dibagikan Bapak/Ibu guru", tombol "Masuk". State error: "Kode tidak ditemukan, cek lagi ya."
3. **Persetujuan (Assent) Siswa**: ringkasan program dalam 4 kartu bergambar (Apa itu SAHAJA, Apa yang kamu lakukan 8 minggu, Datamu aman dan pakai nama samaran, Kamu boleh berhenti kapan saja), checkbox "Aku mengerti dan mau ikut", tombol "Setuju dan Lanjut". Catatan kecil: "Orang tua/walimu sudah memberikan izin."
4. **Buat Nama Samaran**: pilih avatar dari grid 12 avatar kartun netral, input nama samaran dengan tombol acak (contoh hasil acak: "Bintang27", "LangitBiru"), peringatan lembut "Jangan pakai nama aslimu ya".
5. **Tur Singkat**: 3 slide carousel (Belajar 8 sesi seru, Curhat aman di forum, Kumpulkan lencana) dengan tombol "Mulai".

### B. Pretest (3 layar)
6. **Intro Pretest**: maskot + teks "Sebelum mulai, jawab dulu yuk. Ini bukan ujian, tidak ada nilai jelek. Kalau tidak tahu, pilih Tidak Tahu, jangan menebak." Info: 27 + 10 pertanyaan, sekitar 15 menit. Tombol "Mulai Sekarang".
7. **Soal Pengetahuan** (benar/salah/tidak tahu): progress bar "Soal 4 dari 27" di atas, kartu soal besar, contoh soal: "Seseorang bisa terkena infeksi menular seksual walaupun tidak terlihat sakit." Tiga tombol pilihan besar: Benar / Salah / Tidak Tahu. Tombol kembali nonaktif (tidak bisa mundur). 
8. **Soal Sikap** (Likert 1-5): pernyataan contoh: "Aku mau mencari informasi kesehatan dari sumber yang terpercaya." Lima pilihan emoji berlabel: Sangat Tidak Setuju sampai Sangat Setuju. Layar akhir: "Selesai! Jawabanmu tersimpan" dengan animasi centang + info tersimpan offline.

### C. Beranda (tab 1)
9. **Beranda**: header "Halo, Bintang27!" + avatar + ikon lonceng notifikasi. Kartu utama besar: "Sesi Minggu Ini: Sesi 3 - Kenali Pikiranmu" dengan progress ring 40% dan tombol "Lanjutkan". Baris streak: 5 ikon api "Streak 5 hari!". Kartu jurnal cepat: "Bagaimana perasaanmu hari ini?" dengan 5 emoji mood langsung bisa ditap. Kartu tugas: "1 worksheet belum selesai". Kartu pengumuman dari fasilitator.

### D. Belajar (tab 2)
10. **Peta Perjalanan 8 Sesi**: jalur vertikal berkelok gaya peta petualangan, 8 titik sesi. Sesi 1-2: selesai (centang hijau + skor kuis). Sesi 3: aktif (membesar, teal, foto maskot). Sesi 4-8: terkunci (gembok abu + "Terbuka 28 Jul"). Judul 8 sesi: (1) Kenalan Yuk, (2) Tubuhku Berubah, (3) Kenali Pikiranmu, (4) Fakta vs Mitos IMS, (5) Berani Bilang Tidak, (6) Forum Sahabat, (7) Rencanaku Sehat, (8) Aku Siap Mandiri.
11. **Detail Sesi (Sesi 3)**: header ilustrasi, 4 langkah berurutan dengan status: Materi (video 6 menit, selesai), Baca (infografis, selesai), Worksheet "Catat Pikiranmu" (sedang dikerjakan), Kuis 5 soal (terkunci sampai worksheet selesai). Tombol unduh video "Unduh dulu di WiFi sekolah (28 MB)".
12. **Player Materi**: video player dengan subtitle aktif, di bawahnya ringkasan poin materi dalam kartu, tombol "Tandai Selesai".
13. **Worksheet CBT "Catat Pikiranmu"**: form 3 langkah bergaya chat dengan maskot: (a) "Ceritakan situasinya" (textarea), (b) "Apa yang terlintas di pikiranmu?" (textarea + chip contoh pikiran), (c) "Yuk cek faktanya, pikiran sehatnya apa?" (textarea + kartu tips). Tombol simpan "Simpan Catatanku", indikator tersimpan offline.
14. **Kuis Sesi**: 5 soal pilihan ganda, feedback langsung: benar = confetti kecil + penjelasan singkat, salah = "Belum tepat, ini penjelasannya" (warna oranye lembut, bukan merah). Layar hasil: skor besar "4/5", lencana sesi terbuka, tombol "Kembali ke Peta".

### E. Forum (tab 3)
15. **Daftar Forum**: tab kelas "Kelas 8A". Daftar thread kartu: judul, nama samaran + avatar penulis, jumlah balasan, label topik (Tanya, Cerita, Info). Thread yang dibuat sendiri dan berstatus menunggu: badge kuning "Menunggu persetujuan guru". FAB tombol tulis.
16. **Detail Thread**: post utama + balasan bergaya bubble, tombol suka (hati), tombol titik tiga dengan opsi "Laporkan". Banner tipis di atas: "Forum ini dijaga Bapak/Ibu fasilitator supaya tetap aman dan nyaman."
17. **Tulis Post**: input judul + isi, pilihan label topik, catatan: "Post kamu akan muncul setelah disetujui fasilitator. Jangan tulis nama asli atau nomor HP ya." Bottom sheet konfirmasi setelah kirim.

### F. Jurnal dan Profil (tab 4)
18. **Profil**: avatar + nama samaran, tombol edit avatar. Grid lencana (8 slot, 3 terbuka berwarna, sisanya siluet). Kartu streak terbesar. Kartu sertifikat (terkunci: "Selesaikan 8 sesi untuk membuka sertifikatmu"). Menu: Jurnalku, Pengaturan Notifikasi, Tentang SAHAJA, Keluar.
19. **Jurnalku**: grafik garis mood 30 hari (sumbu emoji), daftar entri harian (tanggal, emoji, catatan singkat), tombol tambah entri: bottom sheet dengan 5 emoji + slider energi + catatan opsional.
20. **Sertifikat (terbuka)**: pratinjau sertifikat elegan (nama samaran, "telah menuntaskan Program SAHAJA 8 Sesi", tanggal, ornamen teal-kuning), tombol "Simpan sebagai Gambar".

### G. Posttest dan Penutup
21. **Kartu Posttest di Beranda** (muncul minggu ke-9): "Satu langkah terakhir! Isi kuesioner penutup" -> alur soal sama seperti pretest -> layar selamat: maskot merayakan, "Kamu hebat sudah menyelesaikan semuanya!", lencana final + tombol lihat sertifikat.
22. **Angket Kepuasan**: 8 pernyataan Likert bintang 1-5 tentang aplikasi (materi jelas, mudah dipakai, dst) + 1 textarea saran.

## KOMPONEN DAN STATE WAJIB
- Empty state bergambar maskot untuk: forum kosong, jurnal kosong, belum ada notifikasi.
- Offline state: banner tipis abu "Kamu sedang offline. Jangan khawatir, semua tersimpan dan akan terkirim otomatis." Semua tombol simpan tetap berfungsi.
- Loading: skeleton card, bukan spinner polos.
- Bottom sheet konfirmasi keluar dari kuis/instrumen: "Yakin keluar? Jawabanmu di halaman ini belum tersimpan."
- Notifikasi in-app list: teks netral, contoh "Ada materi baru untukmu", "Jangan lupa isi jurnal hari ini".
- Tombol quick exit (ikon X kecil di pojok kanan atas halaman materi sensitif) yang langsung kembali ke beranda.

## LARANGAN
- Jangan ada foto orang nyata, gambar anatomi eksplisit, atau ilustrasi menakutkan.
- Jangan ada kata IMS/seksual pada contoh teks notifikasi push/lockscreen.
- Jangan pakai bahasa menggurui atau menakut-nakuti; selalu suportif.
- Jangan ada elemen iklan, share ke media sosial, atau login Google/Facebook.

## OUTPUT YANG DIMINTA
Prototype mobile (frame 360 x 800) dengan semua 22 layar di atas, saling terhubung (tappable flow): onboarding -> pretest -> beranda -> sesi 3 lengkap (materi -> worksheet -> kuis) -> forum -> profil -> posttest -> sertifikat. Gunakan konten dummy Bahasa Indonesia sesuai contoh di atas, konsisten dengan design system.

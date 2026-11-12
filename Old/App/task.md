# Task Breakdown: Aplikasi SAHAJA

Estimasi total pengembangan MVP: 6-8 minggu (1 developer penuh waktu, atau tim kecil mahasiswa Informatika dengan supervisi).

## Fase 0: Persiapan Konten dan Desain (Minggu 1-2)
- [ ] Finalisasi naskah 8 sesi bersama promotor dan pakar materi (dari draf modul disertasi)
- [ ] Konversi naskah ke format konten aplikasi (markdown/JSON per sesi: materi, kuis, worksheet)
- [ ] Digitalisasi instrumen: STD-KQ 27 butir (terjemahan baku + kunci), sikap Likert, angket kepuasan
- [ ] Susun daftar kata filter forum (Indonesia + Jawa) dan daftar kata kunci eskalasi
- [ ] Wireframe + prototipe Figma (alur siswa lengkap)
- [ ] Uji keterbacaan prototipe ke 5-10 siswa SMP, catat sebagai data tahap Design ADDIE
- [ ] Ilustrasi dan maskot (flat, non-eksplisit, acuan UNESCO ITGSE usia 12-15)

## Fase 1: Fondasi Teknis (Minggu 3)
- [ ] Setup monorepo, project Supabase, project Flutter, project Next.js
- [ ] Migrasi skema database (lihat struktur.md bagian 4) + RLS per peran
- [ ] Seed konten sesi dan butir instrumen
- [ ] Auth kode aktivasi + alur consent berjenjang (wali -> siswa)
- [ ] Sync engine offline-first (drift + antrean + idempotency)

## Fase 2: Fitur Inti Siswa (Minggu 4-5)
- [ ] Onboarding: nama samaran, avatar, tur aplikasi
- [ ] Modul instrumen: pretest wajib sebelum sesi 1, sekali kirim, stempel waktu, simpan offline
- [ ] Sesi belajar: render materi, video offline, kuis akhir sesi, drip lock mingguan
- [ ] Worksheet CBT (refleksi pikiran, rencana aksi, regulasi emosi)
- [ ] Jurnal harian + grafik progres
- [ ] Gamifikasi: poin, lencana, streak
- [ ] Notifikasi: reminder lokal terjadwal + push FCM (teks lockscreen netral)

## Fase 3: Forum dan Dashboard (Minggu 5-6)
- [ ] Forum: thread per kohort, pra-moderasi, tombol lapor, filter kata
- [ ] Pipeline eskalasi kata kunci berisiko -> notifikasi fasilitator
- [ ] Dashboard fasilitator: progres siswa, antrean moderasi, daftar eskalasi
- [ ] Dashboard admin/peneliti: kelola sekolah/kohort/jadwal, monitor kelengkapan data
- [ ] Ekspor CSV riset (skor per butir, total, event_log, kepuasan) dengan pseudonym
- [ ] Sertifikat PDF otomatis
- [ ] Posttest auto-unlock minggu ke-9 + pembukaan konten kelompok kontrol

## Fase 4: Kualitas dan Validasi (Minggu 7-8)
- [ ] Uji offline ekstrem: isi pretest tanpa sinyal, force close, cek tidak ada data hilang
- [ ] Uji perangkat low-end (RAM 2 GB, Android 8) dan ukuran APK < 40 MB
- [ ] Audit privasi: tidak ada pelacak pihak ketiga, identitas terpisah, RLS teruji
- [ ] Validasi ahli (3 pakar) atas konten DI DALAM aplikasi -> catat revisi -> Prototype 2
- [ ] Pilot testing 30 siswa non-sampel: uji validitas Pearson + Cronbach Alpha instrumen, umpan balik usability
- [ ] Perbaikan hasil pilot -> build rilis (Firebase App Distribution / Play Closed Testing)
- [ ] Dokumen: panduan fasilitator (screenshot per langkah), panduan instalasi sekolah

## Fase 5: Implementasi Penelitian (8-10 minggu, tim riset)
- [ ] ToT fasilitator + uji kompetensi
- [ ] Aktivasi siswa, consent, pretest kedua kelompok
- [ ] Intervensi 8 minggu (monitor mingguan via dashboard)
- [ ] Posttest + angket kepuasan
- [ ] Ekspor data, cek missing, serah ke analisis (ANCOVA, SEM)
- [ ] Backup penuh + anonimisasi data identitas setelah selesai

## Non-teknis (paralel)
- [ ] Ethical clearance KEPK (lampirkan protokol eskalasi dan alur consent)
- [ ] Perizinan Dinas Pendidikan / Kemenag + MoU sekolah
- [ ] Cetak lembar consent wali versi kertas
- [ ] Rapikan naskah proposal (lihat bagian 8 dokumen Word: sampel 63/76/126/152, sisa teks WhatsApp/kualitas hidup, hipotesis, Google Form vs in-app)

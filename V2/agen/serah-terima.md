# Serah Terima Antaralat

Protokol membuka dan menutup sesi kerja. Berlaku sama untuk Claude Code, Codex, Antigravity, Gemini, Cursor, dan alat lain. Tujuannya: siapa pun yang bekerja berikutnya mendapat gambaran status yang sama tanpa harus menebak.

Perintah Claude Code `/mulai` dan `/checkpoint` hanya penunjuk ke berkas ini. Isi protokol hanya ada di sini.

## 1. Sumber status

| Sumber | Peran | Siapa yang memperbarui |
|---|---|---|
| `V2/STATUS.md` | Satu-satunya catatan status yang mengikat | Setiap alat, di akhir setiap sesi |
| `V2/Rencana Apps/12 Catatan Keputusan.md` | Status keputusan D dan T | Hanya Pak Indra yang menetapkan; alat tidak mengubah status keputusan |
| `V2/Rencana Apps/08 Task dan Roadmap.md` | Daftar paket tugas, bukan status harian | Diubah hanya bila lingkup tugas berubah |
| Riwayat git (`main`, PR di GitHub) | Bukti apa yang sudah benar-benar digabung | Otomatis |
| Cermin Google Drive "05 App Development/Rencana Apps" | Salinan untuk dibaca orang | Ditunda, lihat `STATUS.md` |
| Catatan Obsidian "SAHAJA - Aplikasi.md" | Ringkasan pribadi Pak Indra | Tidak wajib; bila berbeda, `STATUS.md` yang benar |

Bila sumber-sumber ini saling bertentangan, ikuti urutan di `AGENTS.md` bagian 2 dan catat pertentangannya di `STATUS.md`. Jangan memutuskan sendiri.

## 2. Membuka sesi

1. Bekerja dari folder `V2`. Folder `Old` tidak diubah.
2. Baca `AGENTS.md`, lalu `STATUS.md`, lalu `Rencana Apps/12 Catatan Keputusan.md`.
3. Periksa keadaan git: cabang aktif, perubahan yang belum dikomit, dan apakah `main` lokal sudah sama dengan `origin/main`. Bila ada perubahan yang belum dikomit dari sesi lain, jangan ditimpa atau dibuang. Laporkan ke Pak Indra.
4. Lihat bagian "Sedang dikerjakan" di `STATUS.md`. Paket yang tercatat sedang dikerjakan alat lain tidak diambil, kecuali Pak Indra memintanya.
5. Ambil satu paket dari dokumen 08. Tulis di "Sedang dikerjakan": kode paket, nama alat, cabang, dan tanggal.
6. Baca dokumen yang terkait, tulis rencana singkat, dan tandai hal yang wajib ditanyakan menurut dokumen 10 bagian 8.

## 3. Selama sesi

- Kerjakan di cabang `fitur/<kode>-<ringkas>` untuk paket tugas, atau `chore/<ringkas>` untuk perapian dokumen dan repo. Jangan mengomit langsung ke `main`.
- Gabungkan ke `main` lewat pull request di GitHub (`bangjamz/Sahaja_Henky`).
- Bila menemukan pertentangan atau hal yang butuh keputusan, tulis di "Menunggu keputusan" lalu lanjutkan bagian lain.
- Bila sesi terputus di tengah jalan, `STATUS.md` di cabang kerja harus sudah menyebut apa yang tersisa.

## 4. Menutup sesi

Perbarui `STATUS.md` sebelum mengakhiri sesi, walaupun pekerjaan belum selesai.

1. **Keadaan saat ini**: ubah baris "Diperbarui" menjadi tanggal, nama alat, dan model bila diketahui. Tulis fakta terbaru.
2. **Keadaan repo**: cabang dan PR terakhir yang digabung ke `main`, serta cabang yang masih terbuka.
3. **Sedang dikerjakan**: paket yang belum selesai, cabangnya, dan langkah yang tersisa. Hapus paket yang sudah selesai.
4. **Menunggu keputusan**: usulan baru beserta alasannya.
5. **Langkah berikutnya**: tiga sampai enam langkah konkret, berurutan.
6. **Riwayat**: tambahkan satu baris dengan tanggal, nama alat, dan ringkasan.

Aturan menulisnya:
- Tulis fakta, bukan niat. Yang belum diuji ditulis belum diuji.
- Hasil `pnpm cek` dan uji lain ditulis apa adanya, termasuk yang gagal.
- Ikuti aturan tulis di `AGENTS.md` bagian 5.
- Jangan menyalin isi dokumen `Rencana Apps` ke `STATUS.md`. Rujuk berkasnya.

## 5. Contoh baris riwayat

```
| 14 Nov 2026 | Codex | M0-02 selesai di cabang fitur/M0-02-monorepo, PR #3 digabung, pnpm cek hijau |
| 15 Nov 2026 | Antigravity | M0-03 sebagian: token warna selesai, token tipografi belum; cabang fitur/M0-03-token belum digabung |
```

## 6. Perintah pembuka untuk alat tanpa perintah khusus

Untuk memulai paket tugas:

```
Baca AGENTS.md dan agen/serah-terima.md, lalu ikuti bagian 2 untuk membuka sesi.
Kerjakan paket tugas <kode> dari "Rencana Apps/08 Task dan Roadmap.md".
Sebelum melapor selesai, tinjau dengan agen/penguji.md dan tutup sesi sesuai bagian 4.
```

Untuk menutup sesi saja:

```
Tutup sesi ini sesuai agen/serah-terima.md bagian 4. Perbarui STATUS.md dengan fakta dari sesi ini.
```

Untuk menanyakan status proyek:

```
Baca STATUS.md dan Rencana Apps/12 Catatan Keputusan.md, lalu ringkas status proyek.
Jangan menambahkan apa pun yang tidak tertulis di dua berkas itu atau di riwayat git.
```

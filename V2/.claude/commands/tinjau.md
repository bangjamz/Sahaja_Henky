---
description: Menjalankan peran peninjau yang relevan atas perubahan saat ini
argument-hint: [model|desain|privasi|konten|penguji|semua]
---

Tinjau perubahan saat ini. Peran yang diminta: $ARGUMENTS (bila kosong, pilih sendiri berdasarkan berkas yang berubah, memakai tabel di `AGENTS.md` bagian 9).

1. Lihat berkas yang berubah dengan git.
2. Jalankan subagen peninjau yang relevan secara paralel: `penjaga-model`, `penjaga-desain`, `penjaga-privasi`, `penjaga-konten`. Jalankan `penguji` terakhir.
3. Gabungkan laporan menjadi satu daftar yang diurutkan: Wajib diperbaiki, Sebaiknya diperbaiki, Catatan.
4. Jangan memperbaiki apa pun sebelum daftar ditampilkan. Setelah itu tawarkan untuk memperbaiki temuan "Wajib diperbaiki".

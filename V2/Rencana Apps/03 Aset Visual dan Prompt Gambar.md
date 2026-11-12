# Aset Visual dan Prompt Gambar

Versi 2.1, 11 November 2026. Daftar gambar, ikon, dan ilustrasi untuk S1, S2, S3, dan listing Google Play, lengkap dengan ukuran, prompt, dan cara kerja supaya hasil dari alat yang berbeda tetap terlihat satu keluarga.

## 1. Cara kerja yang disarankan

Masalah utama gambar buatan AI adalah tidak konsisten: wajah maskot berubah, palet bergeser, gaya garis berbeda. Urutan berikut menekan masalah itu.

1. **Kunci gaya dulu.** Buat satu "papan gaya" berisi 4 gambar contoh (maskot, satu sampul sesi, satu ilustrasi kosong, satu lencana). Setelah disetujui Pak Indra dan dr. Henky, papan ini menjadi rujukan semua gambar berikutnya.
2. **Buat lembar karakter maskot** (MS-00) dan pakai sebagai gambar rujukan di setiap prompt pose. Pilih alat yang menerima gambar rujukan karakter dan gaya.
3. **Kerjakan per kelompok dalam satu sesi alat**, bukan satu gambar hari ini dan satu minggu depan. Gaya lebih seragam bila satu kelompok dibuat berurutan.
4. **Jangan minta teks di dalam gambar.** Teks ditambahkan di aplikasi supaya bisa direvisi dan dibaca pembaca layar.
5. **Rapikan hasilnya**: buang latar, vektorkan bila perlu, samakan palet ke token warna, optimalkan ukuran.
6. **Catat asal-usul** setiap aset di `assets-source/manifest.json` (kode, alat, prompt, gambar rujukan, tanggal, pembuat, status tinjauan).
7. **Tinjau dengan daftar periksa** di bagian 12 sebelum aset masuk aplikasi.

### Pilihan alat

| Kebutuhan | Alat yang cocok | Catatan |
|---|---|---|
| Ikon aplikasi, logo, lencana, ikon domain | Digambar sebagai vektor di Figma, Illustrator, atau Inkscape; generator gambar hanya untuk mencari ide bentuk | Ikon harus tajam di 48 px; hasil generator jarang rapi di ukuran kecil |
| Ilustrasi flat dan vektor | Generator yang bisa mengeluarkan SVG atau gaya vektor (misalnya Recraft), atau Canva | Paling mudah diseragamkan paletnya |
| Maskot dengan banyak pose | Generator yang menerima gambar rujukan karakter (misalnya fitur rujukan karakter di Midjourney, penyuntingan gambar di Gemini atau ChatGPT) | Selalu lampirkan MS-00 |
| Ilustrasi suasana (sampul sesi) | Generator gambar apa pun dengan rujukan gaya | Vektorkan atau simpan sebagai WebP |
| Animasi sederhana | CSS atau SVG beranimasi; Lottie hanya bila perlu | Atur Napas cukup dengan CSS |
| Tata letak listing Play | Canva | Bingkai ponsel dan judul singkat |

Fitur dan ketentuan tiap alat berubah cepat. Sebelum produksi, cek ketentuan pemakaian komersial dan hak atas hasil gambar pada paket yang dipakai, lalu simpan tangkapan layarnya di `assets-source/lisensi/`.

### Pengolahan setelah gambar jadi

| Langkah | Alat | Hasil |
|---|---|---|
| Buang latar | Fitur bawaan Canva atau alat sejenis | PNG transparan |
| Vektorkan (untuk gambar flat) | Image Trace di Illustrator, Inkscape, atau vtracer | SVG |
| Rapikan SVG | SVGO | SVG kecil tanpa metadata |
| Samakan warna | Ganti warna terdekat ke nilai token | Palet seragam |
| Ekspor raster | sharp atau Squoosh | WebP, lebar maksimum 1080 px, di bawah 120 KB |
| Ikon PWA dan TWA | Pembuat aset PWA (misalnya @vite-pwa/assets-generator) dari satu SVG sumber | Semua ukuran ikon, termasuk maskable |
| Uji area aman ikon | Pratinjau ikon maskable | Tidak terpotong di bentuk lingkaran dan kotak membulat |

## 2. Aturan umum

- Gaya: ilustrasi flat vector, garis bersih, bentuk membulat, warna dari palet aplikasi (teal #0E9594, teal tua #006766, biru #2D6CDF, kuning #F5B841, latar terang #F7F9FB).
- Tokoh: remaja Indonesia usia SMP, kartun netral, berbusana sopan (seragam SMP putih-biru atau pakaian kasual sopan), sebagian siswi berhijab, ekspresi ramah.
- Latar tempat: sekolah, rumah, dan suasana pesisir utara Jawa Tengah yang digambarkan secara wajar, tanpa stereotip.
- Dilarang: foto orang nyata, wajah yang mirip orang tertentu, anatomi organ reproduksi, adegan romantis atau intim, simbol medis menakutkan (jarum, darah, virus seram), logo merek, teks di dalam gambar.
- Format: SVG untuk ikon dan ilustrasi sederhana; WebP untuk ilustrasi kompleks; PNG hanya untuk aset Play Store.
- Nama berkas memakai kode aset dan huruf kecil, misalnya `ms-01-melambai.svg`, `ss-03-penularan.webp`.
- Setiap ilustrasi yang bermakna punya teks alternatif di berkas kamus; ilustrasi hiasan diberi alt kosong.

**Prompt gaya (tempel di awal setiap prompt gambar):**
```
Flat vector illustration, friendly and modern, rounded shapes, clean lines, soft
shadows, limited palette of teal (#0E9594), deep teal (#006766), blue (#2D6CDF),
warm yellow (#F5B841), off-white background (#F7F9FB), Indonesian junior high school
teenagers (age 13 to 15) in modest clothing, some girls wearing hijab, warm and
non-judgmental mood, educational health app style, no text, no logos, no realistic
photos, no anatomical or sexual imagery.
```

**Prompt negatif (bila alat mendukung):**
```
text, letters, watermark, logo, photorealistic, 3d render, scary, blood, needles,
virus monsters, romantic scene, revealing clothes, anatomy, extra fingers, distorted
faces
```

## 3. Identitas aplikasi

| Kode | Aset | Ukuran | Catatan |
|---|---|---|---|
| ID-01 | Ikon aplikasi siswa | SVG sumber, ekspor 512 dan 1024 PNG | Netral, tanpa kata IMS, tanpa simbol medis |
| ID-02 | Ikon adaptif Android (latar depan dan latar belakang) | Lapisan 108 x 108 dp, area aman lingkaran 66 dp | Untuk TWA |
| ID-03 | Ikon maskable PWA | 512 x 512 dengan area aman 80% | manifest |
| ID-04 | Ikon monokrom | SVG satu warna | Ikon bertema Android 13 ke atas |
| ID-05 | Ikon aplikasi pendamping | 512 x 512 | Varian ID-01 beraksen biru dengan simbol papan klip |
| ID-06 | Logo teks SAHAJA | SVG | Plus Jakarta Sans ExtraBold, teal tua |
| ID-07 | Favicon | 32 dan 192 PNG, SVG | |
| ID-08 | Splash | 1080 x 1920 WebP | Maskot dan logo di tengah |
| ID-09 | Gambar pratinjau tautan | 1200 x 630 PNG | Untuk S3 saat tautan dibagikan; netral |

Saran bentuk ikon: tiga cincin kecil tersusun seperti daun semanggi di dalam kotak membulat teal. Bentuk ini sama dengan Tiga Lingkaran di beranda, sehingga ikon dan pengalaman di dalam aplikasi saling mengenalkan. Alternatif: perisai membulat yang menyatu dengan gelembung percakapan dan daun kecil.

Prompt ide ID-01 (hasilnya digambar ulang sebagai vektor):
```
[prompt gaya] App icon concept, three small rings arranged like a clover leaf in
teal, blue and warm yellow on a deep teal rounded square, simple, centered, bold
shapes that stay readable at 48 pixels, flat, no text.
```

Prompt ide ID-05:
```
[prompt gaya] App icon concept, rounded blue square with a simple clipboard and the
same three small clover rings, calm and professional for teachers, flat, centered,
no text.
```

## 4. Maskot "Saja"

Satu karakter dengan banyak pose. Buat lembar karakter dulu, lalu pose satu per satu dengan lembar karakter sebagai rujukan.

| Kode | Pose | Dipakai di |
|---|---|---|
| MS-00 | Lembar karakter (depan, samping, belakang, 4 ekspresi wajah) | Rujukan |
| MS-01 | Melambai menyapa | Splash, beranda |
| MS-02 | Menunjuk ke kanan | Onboarding, petunjuk |
| MS-03 | Berpikir (tangan di dagu) | Catat Pikiranmu |
| MS-04 | Merayakan (tangan ke atas, konfeti) | Kuis selesai, sertifikat |
| MS-05 | Membaca di HP | Pemutar materi |
| MS-06 | Bernapas tenang (mata terpejam) | Atur Napas |
| MS-07 | Mendengarkan dengan empati | Forum, Butuh bantuan? |
| MS-08 | Memegang perisai | Privasi, assent |
| MS-09 | Tertidur di samping awan | Offline, keadaan kosong |
| MS-10 | Memegang peta | Peta belajar |
| MS-11 | Menunggu sambil duduk | Layar tunggu Mode Kelas |
| MS-12 | Membawa tas pulang | Bawa Pulang |
| MS-13 | Kepala dan bahu (bust) | Gelembung percakapan, ukuran kecil 48 px |

Prompt MS-00:
```
[prompt gaya] Character sheet of a friendly gender-neutral Indonesian teenage mascot
named Saja, about 14 years old, short neat hair, wearing a teal hoodie over a white
shirt, dark blue trousers, white sneakers, big kind eyes, gentle smile, front view,
side view, back view, full body, plus four facial expressions (happy, thinking,
calm, empathetic), consistent proportions, plain off-white background.
```

Prompt pose (lampirkan MS-00, ganti bagian dalam kurung):
```
[prompt gaya] The same mascot Saja from the reference character sheet, same face,
same teal hoodie, [waving hello with a warm smile | pointing to the right | thinking
with hand on chin | celebrating with arms up and small confetti | reading on a
smartphone | breathing calmly with eyes closed | listening with an empathetic
expression | holding a rounded shield | sleeping next to a small cloud | holding an
unfolded map | sitting and waiting patiently | walking home with a backpack],
full body, transparent background.
```

Jika pose yang dihasilkan tidak mirip, lebih baik mengurangi jumlah pose daripada memakai maskot yang wajahnya berubah-ubah. Pose wajib: MS-01, MS-03, MS-04, MS-06, MS-09, MS-13.

## 5. Avatar siswa

Saran: avatar **bukan manusia** sebagai bawaan. Alasannya: lebih anonim, tidak menimbulkan soal keterwakilan (jenis kelamin, hijab, warna kulit), dan jauh lebih mudah dibuat seragam.

| Kode | Deskripsi |
|---|---|
| AV-01 sampai AV-16 | Lingkaran 256 x 256, latar pastel berbeda. Tema flora dan fauna yang akrab bagi remaja pesisir Jawa: kancil, burung jalak, penyu, kucing, ikan, kupu-kupu, bunga melati, pohon kelapa, perahu, bintang, bulan, matahari, layang-layang, ombak, gunung, daun |

Prompt:
```
[prompt gaya] Set of 16 circular avatar icons, cute simple characters and objects:
mouse-deer, starling bird, sea turtle, cat, fish, butterfly, jasmine flower, coconut
tree, small boat, star, moon, sun, kite, wave, mountain, leaf, each on a different
pastel circle background, friendly faces where appropriate, consistent flat style,
grid layout, no text.
```

Jika tim tetap ingin avatar manusia, pakai 12 potret kartun (6 laki-laki, 6 perempuan dengan 3 berhijab) dan pastikan semuanya dari satu sesi pembuatan.

## 6. Onboarding

| Kode | Aset | Prompt inti |
|---|---|---|
| OB-01 | Kartu assent: Apa itu SAHAJA | Saja holding a phone showing a friendly learning app, small books and stars around |
| OB-02 | Kartu assent: 8 minggu belajar | A winding path with 8 small stepping stones and a teen walking happily |
| OB-03 | Kartu assent: data aman | Saja holding a shield, a small padlock and a mask icon for nickname |
| OB-04 | Kartu assent: boleh berhenti | A teen gently stepping out through an open door, relaxed expression |
| OB-05 | Tur: belajar di kelas dan di rumah | Students learning together with phones in a classroom, teacher nearby, a small house icon |
| OB-06 | Tur: forum aman | Speech bubbles with smiley faces inside a protective rounded shield |
| OB-07 | Tur: Tiga Lingkaran | Three rings arranged like a clover being filled, small sparkles |

Ukuran 720 x 540 WebP. Awali dengan [prompt gaya].

## 7. Sampul 8 sesi

| Kode | Sesi | Prompt inti (720 x 405, awali [prompt gaya]) |
|---|---|---|
| SS-01 | Kenalan Yuk | Group of diverse SMP students in a circle waving, teacher counselor smiling, phones in hand |
| SS-02 | Remaja dan Kesehatan Reproduksi | A teen looking at a growth chart on a wall, plant growing in a pot beside, symbolizing growing up |
| SS-03 | Bagaimana IMS Menular | Abstract diagram of connected dots between simple shapes, a magnifying glass, calm colors, no people touching |
| SS-04 | Fakta atau Mitos? | Two signboards with a check icon and a question icon, a curious teen choosing between them |
| SS-05 | Aku yang Memutuskan | A teen standing at a fork in the road with confident posture, one path bright |
| SS-06 | Forum Sahabat | Students sitting together on a bench sharing thoughts, speech bubbles with icons |
| SS-07 | Cari Info yang Tepat | A teen with a phone showing a verified check, a friendly community health center building in background |
| SS-08 | Aku Siap Mandiri | A teen raising a flag on a small hill at sunrise, proud and calm |

Sampul dibuat lebar 16:9 dengan subjek di tengah, supaya bisa dipotong menjadi 4:3 untuk kartu ponsel dan tetap utuh di kartu lebar desktop.

## 8. Infografis materi

Ilustrasi dibuat tanpa teks; teks ditambahkan di aplikasi sebagai komponen kartu supaya bisa direvisi setelah validasi ahli.

| Kode | Isi | Elemen gambar |
|---|---|---|
| IG-02a | Perubahan masa remaja | Ikon tinggi badan, suara, emosi, kebersihan diri |
| IG-02b | Apa itu IMS | Ikon kuman sederhana yang ramah (bukan seram), tanda tanya |
| IG-03a | Cara penularan | Ikon panah dan simbol aman atau tidak aman (tanpa adegan) |
| IG-03b | Bukan cara penularan | Ikon berjabat tangan, makan bersama, berbagi toilet, nyamuk |
| IG-04a | Sering tanpa gejala | Dua remaja tampak sehat, ikon kaca pembesar |
| IG-04b | Fakta atau mitos | Kartu bolak-balik |
| IG-05a | Langkah pencegahan | Ikon tangga 4 langkah |
| IG-07a | Layanan kesehatan remaja | Ikon UKS, Puskesmas, guru BK, telepon |

Isi akhir infografis sensitif mengikuti keputusan ahli materi dan promotor (D5).

## 9. Aktivitas, komponen khas, lencana, keadaan

| Kode | Aset | Ukuran |
|---|---|---|
| AK-01 | Catat Pikiranmu (kepala dengan awan pikiran berubah dari abu ke cerah) | 600 x 400 |
| AK-02 | Keputusanku (persimpangan jalan) | 600 x 400 |
| AK-03 | Berani Bilang Tidak (tangan terbuka tanda berhenti yang ramah) | 600 x 400 |
| AK-04 | Atur Napas (lingkaran mengembang dan mengempis) | CSS |
| AK-05 | Komitmenku (tangan memegang bintang kecil) | 600 x 400 |
| TL-01 sampai TL-03 | Ikon tengah Tiga Lingkaran: buku terbuka (Belajar), tangan dan bintang (Berlatih), daun (Merenung) | 24 x 24 SVG |
| CP-01 sampai CP-05 | Lima wajah Cek Perasaan, bentuk bulat sederhana, satu gaya | 64 x 64 SVG |
| LK-01 sampai LK-06 | Ikon enam langkah sesi: Buka, Pahami, Latih, Bahas, Cek dan Renung, Bawa Pulang | 24 x 24 SVG |
| BD-01 sampai BD-08 | Lencana per sesi, lingkaran dengan ikon sesi | 256 x 256 SVG |
| BD-09 | Lencana tamat program | 256 x 256 SVG |
| ES-01 sampai ES-05 | Keadaan kosong: forum, jurnal, notifikasi, offline, galat | 400 x 300 |
| CT-01 | Bingkai sertifikat (ornamen teal dan kuning, ruang kosong untuk teks) | A4 lanskap, 2480 x 1754 |

Wajah Cek Perasaan, ikon langkah, dan ikon lingkaran digambar tangan sebagai vektor pada grid 24 dengan stroke 2 supaya menyatu dengan Lucide. Jangan memakai emoji bawaan sistem karena tampilannya berbeda di tiap merek HP.

Prompt lencana:
```
Set of 9 circular achievement badges in flat vector style, teal, blue and warm yellow,
each with a simple icon: waving hand, growing plant, connected dots, check and
question cards, fork in the road, speech bubbles, map pin for health center, flag on
hill, and a star trophy for completion, no text, consistent outline, transparent
background.
```

## 10. Aset S2, S3, dan Layar Kelas

| Kode | Aset | Ukuran | Catatan |
|---|---|---|---|
| PD-01 | Ilustrasi beranda fasilitator kosong | 400 x 300 | Nada profesional, lebih sedikit maskot |
| PD-02 | Ilustrasi "semua sudah dimoderasi" | 400 x 300 | |
| LK-10 | Latar Layar Kelas | 1920 x 1080 | Sangat polos, ruang luas untuk teks besar |
| KL-01 sampai KL-08 | Ilustrasi kartu obrolan keluarga per minggu | 720 x 405 | Orang tua dan anak mengobrol santai di rumah; tanpa menyebut IMS secara visual |
| KL-09 | Templat kartu keluarga cetak (A6) dengan ruang QR | PDF | Untuk dibagikan lewat sekolah |
| KK-01 | Templat kartu kode aktivasi (8 kartu per A4) | PDF | |
| ST-01 | Ilustrasi utama situs | 1200 x 800 | Untuk halaman depan S3 |

Prompt KL (ganti bagian dalam kurung):
```
[prompt gaya] A warm home scene in Central Java, a parent and a teenager talking
casually [while having tea on a porch | while cooking together | while walking home
from the market | while watching the sunset near fishing boats], relaxed and
respectful mood, modest clothing, no text.
```

## 11. Aset Google Play (untuk S1 dan S2)

| Kode | Aset | Ketentuan umum |
|---|---|---|
| GP-01 | Ikon listing | 512 x 512 PNG 32-bit |
| GP-02 | Feature graphic | 1024 x 500 PNG atau JPG, tanpa teks penting di tepi |
| GP-03 | Tangkapan layar ponsel | Minimal 2, disarankan 4 sampai 8; tanpa data siswa asli |
| GP-04 | Tangkapan layar tablet 7 dan 10 inci | Disarankan karena tata letak tablet dan desktop memang dibuat |
| GP-05 | Video promo | Opsional |

Cek ulang ukuran di Play Console saat unggah karena ketentuan bisa berubah.

Prompt GP-02:
```
[prompt gaya] Wide banner 1024x500, mascot Saja on the left waving, a smartphone mockup
showing a friendly learning path with 8 steps in the center, soft teal to blue
gradient background, plenty of empty space on the right for a title to be added later,
no text.
```

Tangkapan layar dibuat dari aplikasi asli dalam mode demo (nama samaran "Bintang27"), diambil otomatis dengan Playwright pada ukuran ponsel, tablet, dan desktop, lalu diberi bingkai dan judul singkat di Canva: "Belajar 8 sesi bersama guru", "Latihan dan kuis seru", "Forum aman dijaga guru", "Datamu pakai nama samaran".

## 12. Daftar periksa tinjauan aset

- [ ] Sesuai papan gaya dan palet token
- [ ] Tidak ada teks, logo, atau tanda air di dalam gambar
- [ ] Tidak ada anatomi, adegan intim, atau gambar menakutkan
- [ ] Busana sopan; tokoh beragam secara wajar
- [ ] Wajah tidak mirip orang nyata; jari dan proporsi tidak aneh
- [ ] Maskot mirip MS-00
- [ ] Terbaca di ukuran terkecil pemakaiannya
- [ ] Ukuran berkas sesuai batas
- [ ] Teks alternatif sudah ditulis
- [ ] Asal-usul tercatat di manifest
- [ ] Untuk materi sesi: sudah dilihat ahli materi

## 13. Ringkasan jumlah aset

| Kelompok | Jumlah |
|---|---|
| Identitas aplikasi | 9 |
| Maskot | 14 (6 wajib) |
| Avatar | 16 |
| Onboarding | 7 |
| Sampul sesi | 8 |
| Infografis | 8 (bertambah sesuai naskah) |
| Aktivitas, komponen khas, lencana, keadaan, sertifikat | 34 |
| S2, S3, Layar Kelas | 22 |
| Google Play (per aplikasi) | 4 sampai 6 |

Urutan produksi yang disarankan: papan gaya, ID-01, MS-00, lalu aset alur inti (onboarding, beranda, satu sesi lengkap) untuk prototipe 0.1. Sisanya menyusul sebelum validasi ahli.

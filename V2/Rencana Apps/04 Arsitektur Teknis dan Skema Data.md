# Arsitektur Teknis dan Skema Data

Versi 2.2, 12 November 2026. Aplikasi tetap PWA yang dipaketkan sebagai Trusted Web Activity (TWA) untuk Google Play. Perubahan dari versi 2.1: backend tidak lagi Supabase, tetapi **Laravel dan PostgreSQL dalam Docker Compose di VPS Hostinger KVM 4 milik Pak Indra** (keputusan T10). Alasannya: VPS sudah tersedia sehingga tidak ada biaya langganan tambahan, data berada di server sendiri, dan seluruh penyiapan bisa dikerjakan Claude Code. Halaman Keluarga dan halaman hukum (S3) kini dilayani Laravel, jadi tidak perlu alat situs terpisah.

## 1. Arsitektur

```
 HP Android / laptop / komputer lab
 [S1 PWA Siswa]                 [S2 PWA Pendamping]          [S3 Situs]
  React + Vite + TS              React + Vite + TS            Halaman Blade ringan
  Service Worker                 Service Worker               (dilayani Laravel)
  IndexedDB (Dexie): konten,     (cache app shell)
  jawaban, antrean sinkron
        |  HTTPS (REST API)           |  HTTPS                     |  HTTPS
        |  WSS (Reverb)               |  WSS                       |
        v                             v                            v
 VPS Hostinger KVM 4 (dipakai bersama aplikasi lain Pak Indra)
  Reverse proxy (yang sudah ada, atau Caddy bila belum ada) + HTTPS
  Proyek Docker Compose "sahaja-prod" (dan "sahaja-staging"):
    web       Nginx: berkas statis S1 dan S2, meneruskan /api ke php
    php       Laravel (PHP-FPM): API, Blade S3, otorisasi, ekspor, PDF
    reverb    Laravel Reverb: WebSocket untuk Mode Kelas, moderasi, eskalasi
    queue     Laravel queue worker: push, PDF, ekspor, notifikasi eskalasi
    scheduler Laravel scheduler: buka posttest, pengingat, pembersihan
    db        PostgreSQL (hanya jaringan internal, tidak terbuka ke luar)
    redis     Redis: antrean, cache, batas percobaan
    backup    Skrip cadangan harian terenkripsi ke penyimpanan di luar VPS
        |
 [Web Push (VAPID)] --> notifikasi ke S1 dan S2 (termasuk di TWA Android)

 [S4 Worker AI lokal, opsional]  Ollama di komputer peneliti, menarik antrean
                                  lewat API khusus; mati secara default

 Google Play: dua paket TWA (Bubblewrap atau PWABuilder) + Digital Asset Links
```

Prinsip:
- Yang dipasang di Android tetap aplikasi React. Laravel hanya server; Android, Play Store, dan TWA tidak bergantung pada jenis backend.
- Klien siswa **offline-first**: sesi yang sudah diunduh, aktivitas, kuis, jurnal, dan instrumen ditulis ke IndexedDB dulu, lalu dikirim lewat antrean.
- Server adalah sumber kebenaran untuk kohort, jadwal, Sesi Kelas, forum, skoring instrumen, dan data riset.
- **SAHAJA terisolasi dari aplikasi lain di VPS**: kontainer, jaringan Docker, basis data, volume, dan batas sumber daya sendiri. Aplikasi dan data lain di VPS tidak disentuh.
- Satu monorepo berisi frontend (TypeScript) dan backend (PHP). Kontrak keduanya ditulis sebagai OpenAPI yang dibuat otomatis dari Laravel, lalu diubah menjadi tipe TypeScript.
- Modul dinyalakan atau dimatikan lewat konfigurasi program, bukan dengan menghapus kode.

## 2. Tech stack

### Frontend (S1 dan S2)

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Framework | React + TypeScript (strict) + Vite | Ringan, dikenal baik oleh alat pengembang AI |
| PWA | vite-plugin-pwa (Workbox) | Precache app shell, cache media, pembaruan terkontrol |
| UI | Tailwind CSS + komponen sendiri di `packages/ui` (primitif aksesibel Radix) | Token mudah diterapkan, aksesibilitas terjaga |
| Tata letak | Container query dan tiga kelas lebar (file 02) | Komponen sama di ponsel dan desktop |
| State dan data | TanStack Query + Zustand | Cache server dan state lokal |
| Penyimpanan lokal | Dexie (IndexedDB) | Antrean sinkron dan konten offline |
| Router | React Router | |
| Validasi | Zod | Konten dan muatan API |
| Klien API | `packages/api` dengan tipe hasil openapi-typescript | Satu sumber kontrak dengan backend |
| Realtime | Laravel Echo (protokol Pusher) ke Reverb | Pasangan resmi Reverb |
| Teks antarmuka | Berkas kamus `id.json` | Teks bisa ditinjau tanpa membuka kode |

### Backend

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Framework | Laravel versi stabil terbaru, PHP 8.3 ke atas | Lengkap, dokumentasi luas, dikenal baik oleh alat pengembang AI |
| Basis data | PostgreSQL 16 atau 17 | Relasional, cocok untuk data penelitian dan ekspor SQL |
| Auth | Laravel Sanctum (token untuk PWA); Laravel Fortify untuk masuk, atur ulang sandi, dan verifikasi dua langkah staf | Bawaan Laravel |
| Otorisasi | Policy dan Gate dengan peran bercakupan (`role_assignments`) | Menggantikan RLS Supabase; diuji per peran |
| Realtime | Laravel Reverb | WebSocket resmi Laravel, dihos sendiri |
| Antrean dan jadwal | Laravel Queue (Redis) dan Scheduler | Push, PDF, ekspor, pembukaan posttest |
| Enkripsi kolom | Cast `encrypted` Laravel (kunci `APP_KEY`) | Tulisan pribadi siswa terenkripsi di basis data |
| Notifikasi | laravel-notification-channels/webpush (VAPID) | Bekerja di TWA Android |
| PDF | barryvdh/laravel-dompdf | Sertifikat, kartu kode, kartu keluarga |
| Dokumentasi API | dedoc/scramble (OpenAPI otomatis) | Kontrak untuk frontend dan alat AI |
| Halaman S3 | Blade tanpa JavaScript berat | Tidak perlu alat situs terpisah |
| Pemantauan internal | Laravel Pulse (dihos sendiri) | Tanpa layanan pihak ketiga |
| Cadangan | Skrip `pg_dump` + enkripsi (age) + rclone ke penyimpanan di luar VPS; snapshot VPS Hostinger sebagai lapis kedua | Rincian di file 13 |

### Infrastruktur, alat, dan pengujian

| Lapisan | Pilihan |
|---|---|
| Kontainer | Docker dan Docker Compose (berkas di `infra/`) |
| Lingkungan dev | Docker Compose di Mac (Docker Desktop atau OrbStack); konfigurasi sama dengan server |
| Reverse proxy dan HTTPS | Yang sudah ada di VPS; bila belum ada, Caddy dengan HTTPS otomatis |
| Monorepo | pnpm workspaces + Turborepo untuk frontend; Composer untuk backend |
| Mutu frontend | ESLint, Prettier, pemeriksaan tipe |
| Mutu backend | Laravel Pint (format), Larastan (analisis statis) |
| Uji frontend | Vitest, Testing Library, Playwright (alur, offline, tiga ukuran layar), axe |
| Uji backend | Pest: fitur, otorisasi per peran, sinkron, ekspor |
| Uji bersama | Berkas kasus JSON di `packages/domain/fixtures` dijalankan oleh Vitest dan Pest |
| Pemantauan luar | Pemeriksa uptime yang hanya memanggil `/up` (tanpa data pengguna) dengan peringatan ke email atau HP Pak Indra |
| Paket Play | Bubblewrap CLI atau PWABuilder |

Versi pustaka dan citra Docker dikunci saat M0-02 dan dicatat di "12 Catatan Keputusan.md". Menaikkan versi mayor atau menambah pustaka baru memerlukan catatan keputusan baru.

Contoh domain: `app.sahaja.id` (S1), `pendamping.sahaja.id` (S2), `sahaja.id` (S3 dan API di `sahaja.id/api`, WebSocket di `ws.sahaja.id`). Nama domain menunggu D2. Staging memakai subdomain `staging-`.

## 3. Struktur repo

```
V2/
  AGENTS.md, CLAUDE.md, README.md, STATUS.md
  agen/                      # peran peninjau untuk alat pengembang AI
  Rencana Apps/              # dokumen produk (sumber kebenaran)
  apps/
    siswa/                   # S1 (React)
      src/
        app/                 # router, cangkang tata letak (ponsel, tablet, desktop)
        features/            # aktivasi, instrumen, beranda, belajar, kelas, aktivitas,
                             # perasaan, forum, aku, bantuan
        sync/                # antrean, idempotensi, coba ulang
        sw/                  # service worker
        teks/id.json
      public/manifest.webmanifest
      twa/
    pendamping/              # S2 (React)
      src/features/          # sesi, kelas, moderasi, eskalasi, logbook, riset, kelola,
                             # validator, pelatihan
      twa/
  backend/                   # Laravel
    app/
      Http/Controllers/Api/  # aktivasi, sinkron, sesi kelas, forum, moderasi, ekspor, ...
      Http/Controllers/Situs/  # Halaman Keluarga, privasi, hapus akun, panduan (S3)
      Models/  Policies/  Jobs/  Events/  Notifications/
      Domain/                # skoring instrumen, aturan buka sesi, moderasi (PHP)
    database/migrations/  database/seeders/
    resources/views/situs/   # Blade untuk S3
    routes/api.php  routes/web.php  routes/channels.php
    tests/Feature/  tests/Akses/  tests/Unit/
  packages/
    tokens/                  # design tokens, preset Tailwind, juga diekspor ke CSS untuk Blade
    ui/                      # komponen bersama
    domain/                  # aturan versi TypeScript + fixtures/*.json (kasus uji bersama)
    content/                 # skema konten (Zod), program ims-smp
    api/                     # klien API dan tipe hasil OpenAPI
    moderasi/                # normalisasi teks, daftar pola (JSON dipakai klien dan server)
    config/                  # konfigurasi ESLint, TypeScript, Tailwind bersama
  infra/
    compose.yml              # layanan bersama
    compose.dev.yml          # tambahan untuk Mac
    compose.prod.yml         # batas sumber daya, restart, jaringan proxy
    docker/                  # Dockerfile php, web, reverb
    caddy/                   # hanya bila VPS belum punya reverse proxy
    scripts/                 # deploy.sh, backup.sh, restore.sh, cek-server.sh
    .env.example
  tools/
    worker-ai/               # S4, opsional
    cek-teks/                # pemeriksa aturan tulis
  assets-source/
```

### Menjaga aturan tetap sama di frontend dan backend

Beberapa aturan dibutuhkan di dua tempat: di HP untuk umpan balik saat offline, dan di server sebagai penentu. Supaya tidak berbeda:

- **Server selalu penentu.** Skoring instrumen, buka sesi, kelayakan sertifikat, dan keputusan moderasi yang tersimpan berasal dari Laravel.
- Versi TypeScript di `packages/domain` hanya untuk tampilan dan perilaku offline.
- Kasus uji ditulis sekali sebagai JSON di `packages/domain/fixtures/` (contoh: input progres, tanggal, hasil yang diharapkan). Vitest dan Pest sama-sama membaca berkas itu. Bila satu sisi diubah tanpa sisi lain, uji gagal.
- Daftar kata kunci, pola data pribadi, dan peta normalisasi teks disimpan sebagai JSON di `packages/moderasi` dan dibaca oleh kedua sisi.
- Tipe muatan API dibuat otomatis dari OpenAPI Laravel (`pnpm api:tipe`), tidak ditulis tangan.

## 4. Skema database inti

Nama tabel sama dengan versi 2.1 supaya dokumen lain tetap berlaku. Tabel bawaan Laravel (`users`, `personal_access_tokens`, `jobs`, `failed_jobs`, `cache`, `sessions` milik Laravel) ditambahkan oleh framework.

```
-- Platform dan program
organizations(id, name, type)
programs(id, organization_id, code, title, level, modules_json, status)
program_versions(id, program_id, version, content_hash, approved_by, approved_at)
schools(id, organization_id, code, name, district, type, contacts_json)
cohorts(id, program_id, school_id, arm, start_date, posttest_week, status)
        -- arm: experiment | control | pilot | survey | demo
classes(id, school_id, cohort_id, name)

-- Pengguna dan peran
users(id, name, email, password, two_factor_secret, ...)        -- staf (bawaan Laravel)
role_assignments(id, user_id, role, scope_type, scope_id, granted_by, granted_at, revoked_at)
        -- role: super_admin | program_admin | researcher | researcher_pii | school_admin |
        --       facilitator | counselor | validator | content_author | content_reviewer
        -- scope_type: platform | organization | program | school | cohort | class
students(id, class_id, resp_code, pseudonym, avatar, status,
         parent_consent_at, assent_at, activated_at)             -- pemilik token Sanctum siswa
activation_codes(code_hash, student_id, expires_at, used_at)
student_devices(id, student_id, device_hash, display_class, first_seen, last_seen)

-- Skema terpisah "rahasia" (koneksi basis data khusus)
rahasia.student_identities(student_id, real_name_enc, gender, birth_year)
rahasia.incident_reports(id, escalation_id, payload_enc, by_user, created_at)

-- Instrumen
instruments(id, program_id, code, version, locked_at)
instrument_items(id, instrument_id, no, text, type, options_json, answer_key, reverse)
responses(id, student_id, instrument_id, phase, started_at, submitted_at,
          device_hash, display_class, client_id)
response_items(response_id, item_id, answer, score)

-- Sesi dan belajar
sessions_content(id, program_id, no, phase, title, unlock_week, version)
        -- nama "sessions" dipakai Laravel, jadi sesi program memakai sessions_content
session_steps(id, session_id, ord, stage, kind, content_ref)
        -- stage: buka | pahami | latih | bahas | cek_renung | bawa_pulang
progress(student_id, session_id, step_id, mode, completed_at, client_id)
        -- mode: class | self | makeup
quiz_items(id, session_id, ord, question, options_json, answer, explanation)
quiz_attempts(id, student_id, session_id, score, answers_json, submitted_at, client_id)
activity_entries(id, student_id, session_id, kind, payload_enc, created_at, client_id)
homework(id, student_id, session_id, done_at, client_id)
commitments(id, student_id, session_id, body_enc, created_at, client_id)
session_overrides(class_id, session_id, open_at, reason, by_user)

-- Mode Kelas
class_sessions(id, class_id, session_id, join_code, status, current_stage,
               started_at, ended_at, by_user)
attendance(class_session_id, student_id, joined_at, source)     -- source: app | manual
class_notes(id, class_id, session_id, body, by_user, published_at)

-- Perasaan dan bantuan
mood_checkins(id, student_id, level, tags, note_enc, created_at, client_id)
help_requests(id, student_id, status, handled_by, handled_at, note)

-- Forum, moderasi, eskalasi
forum_topics(id, class_id, title, created_by, pinned)
forum_posts(id, topic_id, student_id, body, status, moderated_by, moderated_at,
            reject_reason, client_id)
question_box(id, class_id, student_id, body, status, answered_in_session)
risk_flags(id, source_table, source_id, layer, category, weight, created_at)
escalations(id, student_id, source, source_id, level, status, note, handled_by, handled_at)
        -- level: red | yellow | green (L15)
word_lists(id, program_id, category, term, weight)
ai_jobs(id, source_table, source_id, status, label, model, created_at, done_at)

-- Keluarga
family_cards(id, program_id, session_no, title, body_md, version)
family_card_opens(card_id, cohort_id, opened_on, count)

-- Lain-lain
badges(id, code, title) ; student_badges(student_id, badge_id, earned_at)
certificates(student_id, issued_at, file_path)
event_log(id, student_id, event, payload_json, client_ts, server_ts, client_id)
audit_log(id, user_id, action, target, created_at)
logbooks(id, class_id, week, payload_json, by_user)
observations(id, class_id, session_id, payload_json, by_user)
```

### Aturan akses (pengganti RLS)

- Semua akses data lewat controller yang memanggil **Policy**. Tidak ada endpoint yang membaca model tanpa pemeriksaan Policy.
- Data siswa dibatasi dengan **global scope** atau kueri berbatas pemilik, sehingga siswa tidak mungkin membaca data siswa lain walaupun mengganti ID di URL.
- Peran bercakupan diperiksa lewat satu layanan `Akses::punya($user, $role, $scope)` yang membaca `role_assignments`. Pemeriksaan di frontend hanya untuk tampilan, bukan pengaman.
- Fasilitator hanya melihat status kelasnya, bukan isi `activity_entries`, `commitments`, atau `mood_checkins`.
- Konselor melihat `help_requests` dan `escalations` di sekolahnya.
- Peneliti melihat data riset tanpa identitas. Skema `rahasia` hanya dibaca lewat koneksi basis data terpisah (`pgsql_rahasia`) dengan pengguna PostgreSQL berhak terbatas, dan hanya dipanggil dari kode yang memeriksa peran `researcher_pii`.
- `incident_reports` tidak pernah ikut ekspor riset.
- Kolom berakhiran `_enc` memakai cast `encrypted`. `APP_KEY` disimpan di luar repo dan dicadangkan terpisah, karena tanpa kunci itu data terenkripsi tidak bisa dibaca.
- Setiap endpoint punya **uji akses** (Pest) yang membuktikan peran lain ditolak. Direktori `tests/Akses` wajib bertambah setiap ada endpoint baru.
- Butir instrumen terkunci setelah pretest kohort pertama dimulai; perubahan membuat versi baru.
- Setiap tulisan dari klien membawa `client_id` (UUID) dengan indeks unik sebagai kunci idempotensi.

## 5. Alur kunci

1. **Aktivasi**: peneliti mengimpor siswa, mencentang persetujuan orang tua, sistem membuat kode (hash disimpan). Siswa memasukkan kode di `POST /api/aktivasi`; Laravel memverifikasi, menerbitkan token Sanctum yang terikat ke `students.id` dan perangkat, lalu siswa mengisi assent dan nama samaran.
2. **Buka sesi**: `unlock = start_date + (unlock_week - 1) x 7 hari`. Sesi terbuka jika tanggal tercapai dan sesi sebelumnya tuntas, atau ada `session_overrides`, atau siswa bergabung ke Sesi Kelas untuk sesi itu.
3. **Sesi Kelas**: fasilitator membuat `class_sessions` (kode gabung 4 angka). Siswa bergabung, baris `attendance` dibuat. Perubahan `current_stage` disiarkan lewat Reverb di kanal privat kelas; klien siswa membuka langkah yang sesuai. Layar Kelas hanya menerima data gabungan.
4. **Tanpa jaringan di kelas**: klien siswa membuka sesi dari cache dan menandai progres mode `class` dengan kode sesi yang ditulis fasilitator di papan; kode diverifikasi saat sinkron. Kehadiran bisa dilengkapi manual.
5. **Unduh offline**: tombol unduh menyimpan JSON konten dan media ke Cache Storage dan IndexedDB. Media dilayani Nginx dengan header cache panjang.
6. **Sinkron**: tulis lokal, masuk antrean, dikirim batch ke `POST /api/sinkron` saat online. Server menolak duplikat berdasarkan `client_id`.
7. **Tiga Lingkaran**: dihitung di klien dari progres minggu berjalan memakai `packages/domain`; target mingguan diatur per program.
8. **Moderasi dan eskalasi**: posting masuk `pending`. Klien memeriksa pola lebih dulu untuk umpan balik cepat; server memeriksa ulang sebagai penentu. Kecocokan membuat `risk_flags`; kategori risiko membuat `escalations`, disiarkan lewat Reverb, dan dikirim sebagai push ke fasilitator, konselor, dan peneliti. Penanganan manual sesuai L15.
9. **AI pra-penyaringan (opsional)**: bila modul aktif, posting `pending` membuat `ai_jobs`. Worker lokal mengambil pekerjaan lewat endpoint khusus dengan token terbatas, memberi label, lalu menulis `risk_flags` layer `ai`. Bila worker mati, moderasi tetap berjalan.
10. **Halaman Keluarga**: rute Blade `/keluarga/{token}` memeriksa token kohort, menampilkan kartu minggu berjalan, dan menambah hitungan pembukaan. Tanpa cookie dan tanpa pengenal perangkat.
11. **Posttest**: scheduler membuka posttest pada minggu `posttest_week`. Setelah terkirim, job membuat sertifikat. Untuk kohort kontrol, konten dibuka (waitlist).
12. **Ekspor**: peneliti memilih kohort dan tahap; job menyusun CSV dari view SQL sesuai codebook (lebar dan panjang) ditambah ringkasan keterlaksanaan, tanpa nama, lalu memberi tautan unduh sekali pakai.

## 6. Keamanan dan privasi

Aplikasi:
- HTTPS wajib, HSTS, Content Security Policy ketat, tanpa skrip pihak ketiga.
- Tidak ada Google Analytics, Firebase, SDK iklan, layanan pelaporan galat pihak ketiga, atau fon dari CDN. Analitik hanya `event_log` sendiri.
- Batas percobaan (rate limiter Laravel) untuk kode aktivasi, kode gabung, dan masuk staf.
- Verifikasi dua langkah wajib untuk peran `researcher_pii`, `program_admin`, dan `super_admin`.
- Token siswa bisa dicabut per perangkat; token staf kedaluwarsa.
- Log Laravel tidak memuat isi tulisan siswa, kode aktivasi, atau token.
- Kebijakan privasi dan halaman hapus akun tersedia di S3 (syarat Google Play).
- Data contoh untuk pengembangan dan demo selalu sintetis. Data siswa asli tidak pernah dipakai di Mac pengembang, di prompt alat AI, atau di tangkapan layar.

Server (rincian di file 13):
- PostgreSQL, Redis, dan worker hanya di jaringan internal Docker; port basis data tidak dibuka ke luar.
- Firewall hanya membuka SSH, 80, dan 443. SSH hanya dengan kunci.
- Kontainer SAHAJA diberi batas CPU dan RAM, dan tidak memasang volume milik aplikasi lain.
- Rahasia di berkas `.env` di server, tidak di repo.
- Cadangan harian terenkripsi ke luar VPS, dengan uji pulihkan berkala.
- Lokasi datacenter VPS dicatat di dokumen etik dan kebijakan privasi (D7).

## 7. Kebutuhan perangkat dan kinerja

- Uji di perangkat nyata kelas bawah (RAM 2 GB, Android 8 sampai 10), satu tablet, satu laptop sekolah, dan proyektor untuk Layar Kelas.
- Bundel awal di bawah 1,5 MB; pemisahan kode per fitur; gambar WebP; video 480p H.264 dengan subtitle WebVTT, maksimum sekitar 3 menit per klip.
- Lighthouse PWA dan Performance di atas 90 pada profil mobile; Accessibility di atas 95.
- Server diuji beban untuk satu Sesi Kelas serentak di tiga sekolah (sekitar 100 klien WebSocket dan lonjakan sinkron di akhir sesi).

## 8. Lingkungan

| Lingkungan | Tempat | Fungsi |
|---|---|---|
| dev | Mac Pak Indra, Docker Compose | Pengembangan, data sintetis |
| staging | VPS, proyek Compose `sahaja-staging`, basis data sendiri | Validasi ahli dan uji coba terbatas |
| production | VPS, proyek Compose `sahaja-prod`, basis data sendiri | Implementasi penelitian dan rilis Play |

Staging diberi batas sumber daya lebih kecil dan bisa dimatikan setelah uji coba selesai. Data uji coba tidak dicampur dengan data implementasi.

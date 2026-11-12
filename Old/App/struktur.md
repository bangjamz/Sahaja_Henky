# Struktur dan Arsitektur: Aplikasi SAHAJA

## 1. Arsitektur Tingkat Tinggi

```
[App Flutter - Siswa]  <--sync-->  [Supabase: Auth + PostgreSQL + Storage + Realtime]
   (offline-first, SQLite/drift)            ^
                                            |
[Dashboard Next.js - Fasilitator/Peneliti] -+
   (moderasi, monitoring, ekspor CSV)

[FCM] --> notifikasi push        [pdf-lib] --> sertifikat PDF
```

Prinsip: klien siswa offline-first (materi + instrumen lokal, antrean sinkronisasi), server sebagai sumber kebenaran untuk kohort, jadwal drip, forum, dan data riset.

## 2. Tech Stack

| Lapisan | Pilihan | Catatan |
|---|---|---|
| Mobile | Flutter (Dart), state: Riverpod | Android-first, min API 26 |
| DB lokal | drift (SQLite) | materi, jawaban, antrean sync |
| Backend | Supabase (PostgreSQL, Auth, Storage, Realtime, Edge Functions) | RLS per peran |
| Dashboard | Next.js (App Router) + supabase-js, deploy Vercel | fasilitator + admin |
| Notifikasi | FCM + flutter_local_notifications | reminder terjadwal lokal |
| Media | video H.264 720p terkompresi, unduh per sesi | subtitle wajib |
| Sertifikat | Edge Function + pdf-lib | trigger saat lulus sesi 8 + posttest |
| Analitik | tabel `event_log` sendiri (bukan pihak ketiga) | data riset harus mentah dan auditable |

## 3. Struktur Repo (monorepo)

```
sahaja/
├── apps/
│   ├── mobile/                  # Flutter app siswa
│   │   ├── lib/
│   │   │   ├── core/            # theme, router, constants, utils, sync engine
│   │   │   ├── data/            # drift db, repositories, supabase client
│   │   │   ├── features/
│   │   │   │   ├── onboarding/  # kode aktivasi, consent, nama samaran
│   │   │   │   ├── instrument/  # pretest, posttest, angket kepuasan
│   │   │   │   ├── session/     # 8 sesi, materi, kuis, drip lock
│   │   │   │   ├── worksheet/   # refleksi CBT, rencana aksi, regulasi emosi
│   │   │   │   ├── journal/     # jurnal harian, grafik progres
│   │   │   │   ├── forum/       # forum termoderasi
│   │   │   │   ├── gamification/# poin, lencana, streak, sertifikat
│   │   │   │   └── profile/
│   │   │   └── main.dart
│   │   └── assets/              # ilustrasi, lottie, konten sesi (json)
│   └── dashboard/               # Next.js fasilitator + peneliti
│       ├── app/
│       │   ├── (fasilitator)/   # progres kelas, moderasi, eskalasi
│       │   └── (admin)/         # sekolah, kohort, jadwal drip, ekspor
│       └── lib/
├── supabase/
│   ├── migrations/              # skema SQL
│   ├── functions/               # edge functions (sertifikat, ekspor, eskalasi)
│   └── seed/                    # konten 8 sesi, butir instrumen
├── content/                     # sumber konten (markdown per sesi, review pakar)
└── docs/                        # prd.md, struktur.md, task.md, design.md
```

## 4. Skema Database Inti (PostgreSQL)

```
schools(id, name, district, type)                 -- sekolah intervensi/kontrol
cohorts(id, school_id, arm)                       -- arm: 'experiment' | 'control'
users(id, role)                                   -- role: student|facilitator|researcher
student_identities(user_id, real_name_enc, ...)   -- TERPISAH + terenkripsi, akses researcher saja
students(user_id, cohort_id, pseudonym, avatar, activation_code, consent_parent_at, consent_student_at)

instruments(id, code, version)                    -- 'stdkq27' | 'sikap' | 'kepuasan'
instrument_items(id, instrument_id, no, text, type, options, answer_key)
responses(id, student_id, instrument_id, phase, started_at, submitted_at, locked)  -- phase: pre|post
response_items(response_id, item_id, answer, score)

sessions(id, no, title, unlock_week)              -- 8 sesi
session_contents(id, session_id, type, body/url, order)
quiz_items(id, session_id, ...) / quiz_answers(...)
worksheets(id, session_id, type)                  -- cbt_reflection | action_plan | emotion
worksheet_entries(id, student_id, worksheet_id, payload_json, created_at)
journal_entries(id, student_id, mood, note, date)

forum_threads(id, cohort_id, ...) / forum_posts(id, thread_id, student_id, body, status)
                                                  -- status: pending|approved|rejected|flagged
escalations(id, student_id, source, keyword, status, handled_by, handled_at)

progress(student_id, session_id, completed_at, quiz_score)
badges(...) / student_badges(...)
event_log(id, student_id, event, payload_json, client_ts, server_ts)  -- data partisipasi riset
```

Aturan penting:
- RLS: siswa hanya baca/tulis miliknya; fasilitator hanya kohortnya; researcher semua kecuali `student_identities` butuh peran khusus.
- Semua tulis dari mobile lewat antrean sync dengan `idempotency_key`.
- Ekspor riset: view SQL yang join skor + log tapi hanya `pseudonym`, tanpa identitas.

## 5. Alur Kunci

1. **Aktivasi**: peneliti input siswa -> sistem buat kode aktivasi -> consent wali (kertas/digital) diterima -> kode dibagikan -> siswa login, assent, pilih nama samaran.
2. **Drip**: `unlock_week` dihitung dari tanggal mulai kohort; sesi terbuka jika minggu tercapai DAN sesi sebelumnya tuntas.
3. **Sync**: tulis lokal dulu (drift) -> antrean -> kirim batch saat online -> server idempotent.
4. **Eskalasi**: filter kata di klien + server -> match kata berisiko -> baris `escalations` + push ke fasilitator -> penanganan manual sesuai protokol disertasi (bukan oleh aplikasi).
5. **Posttest**: terbuka otomatis pada minggu ke-9 kohort; setelah submit -> sertifikat -> (kontrol: konten dibuka).
6. **Ekspor**: admin klik ekspor -> Edge Function hasilkan CSV per instrumen + event_log -> siap SPSS/AMOS.

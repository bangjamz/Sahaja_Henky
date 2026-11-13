# Backend SAHAJA

Laravel 13 dan PostgreSQL: API untuk S1 dan S2, Situs SAHAJA (Blade, S3), job, dan uji Pest. Aturan kerja ada di `AGENTS.md` folder ini dan di `../AGENTS.md`.

## Menjalankan di Mac

Dengan Docker (cara utama, dokumen 04 bagian 8): dari folder `V2`, salin `infra/.env.example` menjadi `infra/.env`, isi `DB_PASSWORD`, lalu jalankan `pnpm infra:up`. API ada di http://localhost:8000.

Tanpa Docker: butuh PHP 8.4 dengan ekstensi `pdo_pgsql`, Composer, dan PostgreSQL 15 ke atas.

```
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Seeder hanya membuat data sintetis. Akun contoh ada di `database/seeders/DatabaseSeeder.php`.

## Uji

Uji memakai basis data PostgreSQL `sahaja_test` (bukan SQLite), karena skema `rahasia` hanya ada di PostgreSQL. Buat basis data itu sekali, lalu jalankan:

```
composer cek        # Pint, Larastan, Pest
composer uji:akses  # hanya uji akses per peran
```

Alamat basis data uji bisa diganti lewat variabel lingkungan, misalnya `DB_PORT=54329 composer cek`.

## Kontrak API

Setelah endpoint berubah, jalankan `pnpm api:tipe` dari folder `V2`. Perintah ini membuat ulang `packages/api/openapi.json` dari kode Laravel (Scramble) dan tipe TypeScript di `packages/api/src/schema.d.ts`. CI gagal bila keduanya tidak sama dengan kode.

# AGENTS.md (backend Laravel)

Aturan proyek ada di `../AGENTS.md` dan berlaku penuh. Status proyek hanya di `../STATUS.md`. Buka dan tutup sesi sesuai `../agen/serah-terima.md`.

Khusus backend:
- Arsitektur, skema, dan aturan akses: `../Rencana Apps/04 Arsitektur Teknis dan Skema Data.md`.
- Controller tipis, logika di `app/Domain` atau Action, validasi dengan Form Request.
- Setiap endpoint memanggil Policy dan punya uji akses di `tests/Akses` dalam komit yang sama.
- Pemeriksaan peran hanya lewat `App\Domain\Akses\Akses::punya()`.
- Jalankan `composer cek` (Pint, Larastan, Pest) sebelum melapor selesai.

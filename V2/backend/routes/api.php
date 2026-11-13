<?php

use App\Http\Controllers\Api\KelasController;
use App\Http\Controllers\Api\SiswaSayaController;
use Illuminate\Support\Facades\Route;

// Setiap rute di sini wajib memanggil Policy dan punya uji di tests/Akses (dokumen 10 bagian 3).

Route::middleware(['auth:sanctum', 'siswa'])->group(function (): void {
    Route::get('/siswa/saya', SiswaSayaController::class)->name('siswa.saya');
});

Route::middleware(['auth:sanctum', 'staf'])->group(function (): void {
    Route::get('/kelas/{kelas}', [KelasController::class, 'show'])->name('kelas.show');
});

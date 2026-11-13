<?php

use Illuminate\Support\Facades\Route;

// Situs SAHAJA (S3) dikerjakan di M3-10. Sementara hanya halaman penanda tanpa skrip atau fon pihak ketiga.
Route::view('/', 'situs.sementara')->name('situs.beranda');

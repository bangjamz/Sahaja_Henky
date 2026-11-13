<?php

namespace Tests;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\DB;

abstract class TestCase extends BaseTestCase
{
    use RefreshDatabase;

    private static bool $rahasiaDibuang = false;

    /**
     * migrate:fresh hanya mengosongkan skema public. Skema rahasia dibuang di sini supaya
     * basis data uji selalu dibuat ulang dari migrasi. Hanya berlaku untuk basis data uji.
     */
    protected function beforeRefreshingDatabase()
    {
        // Hook ini dipanggil sebelum setiap uji; migrasi hanya sekali per proses, begitu juga ini.
        if (! self::$rahasiaDibuang) {
            DB::statement('drop schema if exists rahasia cascade');
            self::$rahasiaDibuang = true;
        }
    }

    protected function setUp(): void
    {
        parent::setUp();

        // Selama uji, koneksi rahasia memakai sesi basis data yang sama dengan koneksi utama,
        // supaya berada di dalam transaksi RefreshDatabase. Pemisahan hak pengguna PostgreSQL
        // untuk skema rahasia diperiksa di server (file 13), bukan di uji ini.
        DB::connection('pgsql_rahasia')->setPdo(DB::connection()->getPdo());
    }
}

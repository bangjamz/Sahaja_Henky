<?php

use App\Models\Student;
use App\Models\StudentIdentity;
use Illuminate\Support\Facades\DB;

it('menyimpan identitas di skema rahasia, bukan di skema public', function () {
    $ada = DB::selectOne("select count(*) as n from information_schema.tables where table_schema = 'rahasia' and table_name = 'student_identities'");
    $bocor = DB::selectOne("select count(*) as n from information_schema.columns where table_schema = 'public' and column_name like 'real_name%'");

    expect($ada->n)->toBe(1)->and($bocor->n)->toBe(0);
});

it('mengenkripsi nama asli di basis data', function () {
    $siswa = Student::factory()->create();
    StudentIdentity::query()->create(['student_id' => $siswa->id, 'real_name_enc' => 'Nama Sintetis Uji']);

    $mentah = DB::connection('pgsql_rahasia')->table('rahasia.student_identities')->value('real_name_enc');

    expect($mentah)->not->toContain('Nama Sintetis Uji')
        ->and(StudentIdentity::query()->findOrFail($siswa->id)->real_name_enc)->toBe('Nama Sintetis Uji');
});

it('tidak menyertakan identitas saat model siswa diubah ke array atau JSON', function () {
    $siswa = Student::factory()->create();
    StudentIdentity::query()->create(['student_id' => $siswa->id, 'real_name_enc' => 'Nama Sintetis Uji']);

    expect(json_encode($siswa->fresh()))->not->toContain('Nama Sintetis Uji');
});

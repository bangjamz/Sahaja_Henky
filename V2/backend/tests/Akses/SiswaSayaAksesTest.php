<?php

use App\Enums\Role;
use App\Enums\ScopeType;
use App\Models\Student;
use App\Models\StudentIdentity;
use Laravel\Sanctum\Sanctum;

// GET /api/siswa/saya: hanya siswa, dan hanya datanya sendiri.

it('menolak permintaan tanpa token dengan 401', function () {
    $this->getJson('/api/siswa/saya')->assertUnauthorized();
});

it('menolak token staf, termasuk super admin', function () {
    Sanctum::actingAs(stafDenganPeran(Role::SuperAdmin, ScopeType::Platform));

    $this->getJson('/api/siswa/saya')->assertForbidden();
});

it('mengembalikan data siswa itu sendiri lewat token Sanctum asli', function () {
    $siswa = Student::factory()->create();
    Student::factory()->for($siswa->schoolClass, 'schoolClass')->create();
    $token = $siswa->createToken('perangkat-uji')->plainTextToken;

    $this->withToken($token)
        ->getJson('/api/siswa/saya')
        ->assertOk()
        ->assertJsonPath('data.id', $siswa->id)
        ->assertJsonPath('data.pseudonym', $siswa->pseudonym)
        ->assertJsonPath('data.arm', 'experiment');
});

it('tidak pernah memuat kode responden atau identitas asli', function () {
    $siswa = Student::factory()->create();
    StudentIdentity::query()->create(['student_id' => $siswa->id, 'real_name_enc' => 'Nama Sintetis Uji']);
    Sanctum::actingAs($siswa);

    $respons = $this->getJson('/api/siswa/saya')->assertOk();

    expect($respons->getContent())
        ->not->toContain($siswa->resp_code)
        ->not->toContain('Nama Sintetis Uji');
    expect($respons->json('data'))->not->toHaveKeys(['resp_code', 'identity', 'real_name']);
});

it('menolak token yang sudah dicabut', function () {
    $siswa = Student::factory()->create();
    $token = $siswa->createToken('perangkat-uji');
    $token->accessToken->delete();

    $this->withToken($token->plainTextToken)->getJson('/api/siswa/saya')->assertUnauthorized();
});

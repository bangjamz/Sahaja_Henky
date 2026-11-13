<?php

use App\Enums\Role;
use App\Enums\ScopeType;
use App\Models\Cohort;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

// GET /api/kelas/{kelas}: hanya staf dengan peran yang tepat di cakupan kelas itu.

beforeEach(function () {
    $this->kelas = SchoolClass::factory()->create();
    $this->kelasLain = SchoolClass::factory()->create();
    $this->url = "/api/kelas/{$this->kelas->id}";
});

it('menolak permintaan tanpa token dengan 401', function () {
    $this->getJson($this->url)->assertUnauthorized();
});

it('menolak token siswa walaupun siswa itu anggota kelas', function () {
    $siswa = Student::factory()->for($this->kelas, 'schoolClass')->create();
    Sanctum::actingAs($siswa);

    $this->getJson($this->url)->assertForbidden();
});

it('menolak staf tanpa peran', function () {
    Sanctum::actingAs(User::factory()->create());

    $this->getJson($this->url)->assertForbidden();
});

it('mengizinkan fasilitator kelas itu dan mengembalikan ringkasan', function () {
    Sanctum::actingAs(stafDenganPeran(Role::Facilitator, ScopeType::SchoolClass, $this->kelas->id));
    Student::factory()->count(3)->for($this->kelas, 'schoolClass')->create();

    $this->getJson($this->url)
        ->assertOk()
        ->assertJsonPath('data.id', $this->kelas->id)
        ->assertJsonPath('data.student_count', 3)
        ->assertJsonStructure(['data' => ['id', 'name', 'school' => ['id', 'name'], 'cohort' => ['id', 'arm', 'start_date', 'posttest_week'], 'student_count']]);
});

it('menolak fasilitator kelas lain', function () {
    Sanctum::actingAs(stafDenganPeran(Role::Facilitator, ScopeType::SchoolClass, $this->kelasLain->id));

    $this->getJson($this->url)->assertForbidden();
});

it('menolak fasilitator kelas lain di sekolah yang sama', function () {
    $tetangga = SchoolClass::factory()->for($this->kelas->cohort)->create(['school_id' => $this->kelas->school_id]);
    Sanctum::actingAs(stafDenganPeran(Role::Facilitator, ScopeType::SchoolClass, $tetangga->id));

    $this->getJson($this->url)->assertForbidden();
});

it('mengizinkan guru BK bercakupan sekolah untuk kelas di sekolahnya saja', function () {
    Sanctum::actingAs(stafDenganPeran(Role::Counselor, ScopeType::School, $this->kelas->school_id));

    $this->getJson($this->url)->assertOk();
    $this->getJson("/api/kelas/{$this->kelasLain->id}")->assertForbidden();
});

it('mengizinkan peneliti bercakupan program untuk kelas di program itu saja', function () {
    Sanctum::actingAs(stafDenganPeran(Role::Researcher, ScopeType::Program, $this->kelas->cohort->program_id));

    $this->getJson($this->url)->assertOk();
    $this->getJson("/api/kelas/{$this->kelasLain->id}")->assertForbidden();
});

it('mengizinkan peran bercakupan kohort untuk kelas di kohort itu', function () {
    Sanctum::actingAs(stafDenganPeran(Role::SchoolAdmin, ScopeType::Cohort, $this->kelas->cohort_id));

    $this->getJson($this->url)->assertOk();
});

it('mengizinkan admin program bercakupan organisasi pemilik program', function () {
    $orgId = $this->kelas->cohort->program->organization_id;
    Sanctum::actingAs(stafDenganPeran(Role::ProgramAdmin, ScopeType::Organization, $orgId));

    $this->getJson($this->url)->assertOk();
});

it('mengizinkan super admin bercakupan platform', function () {
    Sanctum::actingAs(stafDenganPeran(Role::SuperAdmin, ScopeType::Platform));

    $this->getJson($this->url)->assertOk();
});

it('menolak peran yang sudah dicabut', function () {
    $staf = stafDenganPeran(Role::Facilitator, ScopeType::SchoolClass, $this->kelas->id);
    $staf->roleAssignments()->update(['revoked_at' => now()]);
    Sanctum::actingAs($staf);

    $this->getJson($this->url)->assertForbidden();
});

it('menolak peran konten dan validator walaupun bercakupan platform', function (Role $peran) {
    Sanctum::actingAs(stafDenganPeran($peran, ScopeType::Platform));

    $this->getJson($this->url)->assertForbidden();
})->with([Role::Validator, Role::ContentAuthor, Role::ContentReviewer]);

it('mengembalikan 404 untuk kelas yang tidak ada tanpa membocorkan apa pun', function () {
    Sanctum::actingAs(stafDenganPeran(Role::SuperAdmin, ScopeType::Platform));

    $this->getJson('/api/kelas/999999')->assertNotFound();
});

it('tidak menganggap kohort kontrol berbeda dalam hal akses', function () {
    $kelasKontrol = SchoolClass::factory()->for(Cohort::factory()->kontrol())->create();
    Sanctum::actingAs(stafDenganPeran(Role::Facilitator, ScopeType::SchoolClass, $kelasKontrol->id));

    $this->getJson("/api/kelas/{$kelasKontrol->id}")->assertOk()->assertJsonPath('data.cohort.arm', 'control');
});

<?php

use App\Domain\Akses\Akses;
use App\Enums\Role;
use App\Enums\ScopeType;
use App\Models\SchoolClass;
use App\Models\User;

it('menyusun rantai cakupan kelas sampai platform', function () {
    $kelas = SchoolClass::factory()->create();
    $kohort = $kelas->cohort;

    $rantai = array_map(fn (array $c) => [$c[0]->value, $c[1]], Akses::rantaiCakupan($kelas));

    expect($rantai)->toEqualCanonicalizing([
        ['class', $kelas->id],
        ['cohort', $kohort->id],
        ['program', $kohort->program_id],
        ['organization', $kohort->program->organization_id],
        ['school', $kohort->school_id],
        ['organization', $kohort->school->organization_id],
        ['platform', null],
    ]);
});

it('membuang cakupan ganda saat program dan sekolah satu organisasi', function () {
    $kelas = SchoolClass::factory()->create();
    $kelas->cohort->school->update(['organization_id' => $kelas->cohort->program->organization_id]);

    $jenis = array_map(fn (array $c) => $c[0]->value, Akses::rantaiCakupan($kelas->fresh()));

    expect(array_count_values($jenis)['organization'])->toBe(1);
});

it('tidak memberi akses dari peran di cakupan yang lebih sempit', function () {
    $kelas = SchoolClass::factory()->create();
    $staf = stafDenganPeran(Role::Researcher, ScopeType::SchoolClass, $kelas->id);

    expect(Akses::punya($staf, Role::Researcher, $kelas->cohort->program))->toBeFalse();
});

it('tidak memberi akses untuk peran lain di cakupan yang sama', function () {
    $kelas = SchoolClass::factory()->create();
    $staf = stafDenganPeran(Role::Facilitator, ScopeType::SchoolClass, $kelas->id);

    expect(Akses::punya($staf, Role::Counselor, $kelas))->toBeFalse()
        ->and(Akses::punya($staf, Role::Facilitator, $kelas))->toBeTrue();
});

it('peran platform hanya berlaku bila diminta tanpa cakupan atau di cakupan apa pun', function () {
    $staf = stafDenganPeran(Role::SuperAdmin, ScopeType::Platform);

    expect(Akses::punya($staf, Role::SuperAdmin))->toBeTrue()
        ->and(Akses::punya(User::factory()->create(), Role::SuperAdmin))->toBeFalse();
});

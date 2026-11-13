<?php

namespace Database\Seeders;

use App\Enums\Role;
use App\Enums\ScopeType;
use App\Models\Cohort;
use App\Models\RoleAssignment;
use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;

/**
 * Data contoh sintetis untuk pengembangan lokal. Tidak pernah dijalankan di produksi.
 * Akun contoh memakai sandi "sandi-contoh" dan hanya ada di basis data dev.
 */
class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $kohort = Cohort::factory()->create();
        $kelas = SchoolClass::factory()->for($kohort)->create(['school_id' => $kohort->school_id, 'name' => '8A']);
        Student::factory()->count(5)->for($kelas, 'schoolClass')->create();

        $fasilitator = User::factory()->create([
            'name' => 'Fasilitator Contoh',
            'email' => 'fasilitator@contoh.test',
            'password' => 'sandi-contoh',
        ]);
        RoleAssignment::factory()->create([
            'user_id' => $fasilitator->id,
            'role' => Role::Facilitator,
            'scope_type' => ScopeType::SchoolClass,
            'scope_id' => $kelas->id,
        ]);
    }
}

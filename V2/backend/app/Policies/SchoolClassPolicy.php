<?php

namespace App\Policies;

use App\Domain\Akses\Akses;
use App\Enums\Role;
use App\Models\SchoolClass;
use App\Models\User;

class SchoolClassPolicy
{
    /**
     * Melihat ringkasan kelas. Peran konten dan validator tidak melihat data kelas.
     */
    public function view(User $user, SchoolClass $kelas): bool
    {
        return Akses::punya($user, [
            Role::Facilitator,
            Role::Counselor,
            Role::SchoolAdmin,
            Role::Researcher,
            Role::ResearcherPii,
            Role::ProgramAdmin,
            Role::SuperAdmin,
        ], $kelas);
    }
}

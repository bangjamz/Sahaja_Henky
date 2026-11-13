<?php

namespace App\Policies;

use App\Models\Student;

class StudentPolicy
{
    /** Siswa hanya bisa melihat datanya sendiri. */
    public function viewSelf(Student $pengguna, Student $siswa): bool
    {
        return $pengguna->is($siswa);
    }
}

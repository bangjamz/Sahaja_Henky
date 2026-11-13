<?php

use App\Enums\Role;
use App\Enums\ScopeType;
use App\Models\RoleAssignment;
use App\Models\User;
use Tests\TestCase;

// RefreshDatabase dipasang di Tests\TestCase.
pest()->extend(TestCase::class)->in('Feature', 'Akses', 'Unit');

/** Membuat staf dengan satu peran di satu cakupan. */
function stafDenganPeran(Role $peran, ScopeType $jenis, ?int $id = null): User
{
    $user = User::factory()->create();
    RoleAssignment::factory()->create([
        'user_id' => $user->id,
        'role' => $peran,
        'scope_type' => $jenis,
        'scope_id' => $id,
    ]);

    return $user;
}

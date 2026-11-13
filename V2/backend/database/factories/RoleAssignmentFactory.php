<?php

namespace Database\Factories;

use App\Enums\Role;
use App\Enums\ScopeType;
use App\Models\RoleAssignment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<RoleAssignment> */
class RoleAssignmentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'role' => Role::Facilitator,
            'scope_type' => ScopeType::Platform,
            'scope_id' => null,
        ];
    }
}

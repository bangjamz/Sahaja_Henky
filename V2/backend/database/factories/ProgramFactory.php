<?php

namespace Database\Factories;

use App\Models\Organization;
use App\Models\Program;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Program> */
class ProgramFactory extends Factory
{
    public function definition(): array
    {
        return [
            'organization_id' => Organization::factory(),
            'code' => 'program-'.fake()->unique()->numberBetween(1, 99999),
            'title' => 'Program Contoh',
            'level' => 'smp',
            'modules_json' => [],
            'status' => 'draft',
        ];
    }
}

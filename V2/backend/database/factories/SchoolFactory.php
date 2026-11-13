<?php

namespace Database\Factories;

use App\Models\Organization;
use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<School> */
class SchoolFactory extends Factory
{
    public function definition(): array
    {
        $n = fake()->unique()->numberBetween(1, 99999);

        return [
            'organization_id' => Organization::factory(),
            'code' => 'sekolah-'.$n,
            'name' => 'SMP Contoh '.$n,
            'district' => 'Kabupaten Contoh',
            'type' => 'negeri',
            'contacts_json' => [],
        ];
    }
}

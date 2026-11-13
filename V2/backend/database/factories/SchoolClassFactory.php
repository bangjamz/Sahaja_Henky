<?php

namespace Database\Factories;

use App\Models\Cohort;
use App\Models\SchoolClass;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<SchoolClass> */
class SchoolClassFactory extends Factory
{
    public function definition(): array
    {
        return [
            'cohort_id' => Cohort::factory(),
            // Kelas berada di sekolah yang sama dengan kohortnya.
            'school_id' => fn (array $a) => Cohort::query()->findOrFail($a['cohort_id'])->school_id,
            'name' => '8'.fake()->randomElement(['A', 'B', 'C', 'D']),
        ];
    }
}

<?php

namespace Database\Factories;

use App\Enums\CohortArm;
use App\Models\Cohort;
use App\Models\Program;
use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Cohort> */
class CohortFactory extends Factory
{
    public function definition(): array
    {
        return [
            'program_id' => Program::factory(),
            'school_id' => School::factory(),
            'arm' => CohortArm::Experiment,
            'start_date' => '2027-04-05',
            'posttest_week' => 9,
            'status' => 'draft',
        ];
    }

    public function kontrol(): static
    {
        return $this->state(['arm' => CohortArm::Control]);
    }
}

<?php

namespace Database\Factories;

use App\Models\SchoolClass;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Student> Data siswa selalu sintetis. */
class StudentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'class_id' => SchoolClass::factory(),
            'resp_code' => 'R'.fake()->unique()->numerify('#####'),
            'pseudonym' => fake()->randomElement(['Bintang', 'Awan', 'Pelangi', 'Samudra']).fake()->numberBetween(10, 99),
            'avatar' => 'daun-'.fake()->numberBetween(1, 16),
            'status' => 'active',
        ];
    }
}

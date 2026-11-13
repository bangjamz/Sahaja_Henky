<?php

namespace Database\Factories;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Organization> */
class OrganizationFactory extends Factory
{
    public function definition(): array
    {
        return ['name' => 'Organisasi Contoh '.fake()->unique()->numberBetween(1, 9999), 'type' => 'research'];
    }
}

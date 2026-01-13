<?php

namespace Database\Factories;

use App\Models\LabTest;
use App\Models\Visit;
use App\Models\LabTestType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LabTest>
 */
class LabTestFactory extends Factory
{
    protected $model = LabTest::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('id_ID');

        return [
            'visit_id' => Visit::factory(),
            'lab_test_type_id' => LabTestType::factory(),
            'result_value' => $faker->randomFloat(1, 50, 300),
            'result_text' => null,
            'is_normal' => $faker->boolean(70), // 70% normal
            'tested_at' => $faker->dateTimeBetween('-1 month', 'now'),
            'notes' => $faker->optional()->sentence(),
        ];
    }

    public function normal(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_normal' => true,
        ]);
    }

    public function abnormal(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_normal' => false,
        ]);
    }
}

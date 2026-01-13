<?php

namespace Database\Factories;

use App\Models\VitalSign;
use App\Models\Visit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\VitalSign>
 */
class VitalSignFactory extends Factory
{
    protected $model = VitalSign::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('id_ID');

        $weight = $faker->randomFloat(1, 45, 100);
        $height = $faker->randomFloat(0, 150, 185);
        $bmi = $height > 0 ? round($weight / (($height / 100) ** 2), 1) : null;

        return [
            'visit_id' => Visit::factory(),
            'blood_pressure_systolic' => $faker->numberBetween(100, 160),
            'blood_pressure_diastolic' => $faker->numberBetween(60, 100),
            'pulse' => $faker->numberBetween(60, 100),
            'respiratory_rate' => $faker->numberBetween(14, 24),
            'temperature' => $faker->randomFloat(1, 36.0, 39.0),
            'spo2' => $faker->numberBetween(95, 100),
            'weight' => $weight,
            'height' => $height,
            'bmi' => $bmi,
            'measured_at' => now(),
        ];
    }
}
